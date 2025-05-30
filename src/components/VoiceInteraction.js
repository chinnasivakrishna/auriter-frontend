import React, { useState, useRef, useEffect } from 'react';
import { Mic, Loader, AlertCircle, StopCircle, MessageSquare, Globe, Languages, Volume2, VolumeX, Clock } from 'lucide-react';
import { AudioStream } from './Audio/AudioStream';
import Cookies from 'js-cookie';
import { useTheme } from '../context/ThemeContext';
import { useThemeStyles } from './hooks/useThemeStyles';

const VoiceInteraction = () => {
  const { theme, isDark } = useTheme();
  const { colors, styles, cx } = useThemeStyles();
  
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [language, setLanguage] = useState('en');
  const [ttsSpeed, setTtsSpeed] = useState(1.0);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const [audioRef, setAudioRef] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState('lily');

  const transcriptWsRef = useRef(null);
  const speechWsRef = useRef(null);
  const streamRef = useRef(null);
  const audioStreamRef = useRef(null);
  const processingRef = useRef(false);
  const silenceTimeoutRef = useRef(null);
  const conversationContainerRef = useRef(null);

  const getVoiceOptions = (lang) => {
    const voiceMap = {
      'en': ['lily', 'anthony', 'rachel', 'josh', 'emma'],
      'hi': ['lily']
    };
    return voiceMap[lang] || voiceMap['en'];
  };

  useEffect(() => {
    audioStreamRef.current = new AudioStream();
    fetchVoiceHistory();
    return () => {
      stopMediaTracks();
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      if (audioRef) {
        audioRef.pause();
        audioRef.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    setSelectedVoice(getVoiceOptions(language)[0]);
  }, [language]);

  const fetchVoiceHistory = async () => {
    try {
      const token = Cookies.get('usertoken');
      if (!token) {
        setError('Authentication required');
        return;
      }

      const response = await fetch('https://auriter-backen.onrender.com/api/chat/voice-history', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      if (response.status === 401) {
        setError('Session expired. Please login again.');
        // Optionally redirect to login page
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch voice history');
      
      const data = await response.json();
      if (data.length > 0) {
        setConversationHistory(data[0].messages);
      }
    } catch (error) {
      setError('Failed to load voice history');
      console.error('Voice history error:', error);
    }
  };

  const speakText = async (text, messageId) => {
    try {
      if (currentPlayingId === messageId && isSpeaking) {
        audioStreamRef.current.reset();
        setIsSpeaking(false);
        setCurrentPlayingId(null);
        return;
      }

      setIsSpeaking(true);
      setCurrentPlayingId(messageId);
      setError(null);

      if (!audioStreamRef.current) {
        audioStreamRef.current = new AudioStream();
      }
      
      await audioStreamRef.current.resume();

      const ws = new WebSocket('wss://auriter-backen.onrender.com/ws/speech');
      
      ws.onopen = () => {
        const request = {
          text,
          voice: selectedVoice,
          language,
          speed: ttsSpeed
        };
        ws.send(JSON.stringify(request));
      };

      ws.onmessage = async (event) => {
        try {
          if (event.data instanceof Blob) {
            const arrayBuffer = await event.data.arrayBuffer();
            await audioStreamRef.current.playAudio(arrayBuffer);
          } else {
            const data = JSON.parse(event.data);
            if (data.type === 'end') {
              setIsSpeaking(false);
              setCurrentPlayingId(null);
              ws.close();
            } else if (data.type === 'error') {
              throw new Error(data.error);
            }
          }
        } catch (error) {
          setError('Failed to play audio');
          setIsSpeaking(false);
          setCurrentPlayingId(null);
          ws.close();
        }
      };

      ws.onerror = () => {
        setError('Connection error occurred');
        setIsSpeaking(false);
        setCurrentPlayingId(null);
      };

      ws.onclose = () => {
        if (isSpeaking) {
          setIsSpeaking(false);
          setCurrentPlayingId(null);
        }
      };

    } catch (error) {
      setError(`Failed to synthesize speech: ${error.message}`);
      setIsSpeaking(false);
      setCurrentPlayingId(null);
    }
  };

  const processTranscript = async (transcript) => {
    if (processingRef.current) return;
    processingRef.current = true;

    try {
      setLoading(true);
      setError(null);

      const token = Cookies.get('usertoken');
      if (!token) {
        setError('Authentication required');
        return;
      }

      const chatResponse = await fetch('https://auriter-backen.onrender.com/api/chat/voice-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({
          message: transcript,
          language: language,
          isVoiceInteraction: true
        })
      });

      if (chatResponse.status === 401) {
        setError('Session expired. Please login again.');
        return;
      }

      if (!chatResponse.ok) throw new Error(`Chat error! status: ${chatResponse.status}`);
      
      const chatData = await chatResponse.json();
      
      if (chatData.chatHistory) {
        setConversationHistory(chatData.chatHistory);
        const latestAIMessage = chatData.chatHistory[chatData.chatHistory.length - 1];
        if (!latestAIMessage.isUser) {
          await speakText(latestAIMessage.content, chatData.chatHistory.length - 1);
        }
      }

    } catch (error) {
      setError('Failed to process voice interaction. Please try again.');
      console.error('Process transcript error:', error);
    } finally {
      setLoading(false);
      processingRef.current = false;
    }
  };

  const connectWebSockets = async () => {
    try {
      if (transcriptWsRef.current) transcriptWsRef.current.close();
      if (speechWsRef.current) speechWsRef.current.close();

      setError(null);
      setIsSpeaking(false);

      transcriptWsRef.current = new WebSocket(
        `wss://auriter-backen.onrender.com/ws/transcribe?language=${language}&model=nova-2`
      );

      await new Promise((resolve, reject) => {
        transcriptWsRef.current.onopen = resolve;
        transcriptWsRef.current.onerror = reject;
      });

      transcriptWsRef.current.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'transcript' && data.data.trim()) {
            await processTranscript(data.data);
          }
        } catch (error) {
          console.error('Transcript WebSocket Message Error:', error);
        }
      };

    } catch (error) {
      setError('Failed to connect WebSockets');
    }
  };

  const startRecording = async () => {
    try {
      await connectWebSockets();
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 48000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0 && transcriptWsRef.current?.readyState === WebSocket.OPEN) {
          transcriptWsRef.current.send(event.data);
        }
      };

      recorder.onstop = () => {
        stopMediaTracks();
      };

      setMediaRecorder(recorder);
      setIsRecording(true);
      setError(null);
      audioStreamRef.current.reset();
      recorder.start(250);
    } catch (err) {
      setError('Failed to start recording. Please check microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const stopMediaTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (transcriptWsRef.current) {
      transcriptWsRef.current.close();
    }
    if (speechWsRef.current) {
      speechWsRef.current.close();
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const MessageComponent = ({ message, index }) => (
    <div className={`mb-6 flex ${message.isUser ? 'justify-end' : 'justify-start'} group`}>
      <div className={cx(
        'max-w-[70%] rounded-2xl p-4 shadow-sm transition-all duration-200',
        message.isUser
          ? isDark 
            ? 'bg-gradient-to-r from-purple-800 to-purple-900 text-white hover:shadow-md hover:shadow-purple-900/30' 
            : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-md'
          : isDark
            ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 hover:shadow-md hover:shadow-black/20'
            : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 hover:shadow-md'
      )}>
        <div className="break-words whitespace-pre-wrap text-[15px] leading-relaxed">
          {message.content}
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <Clock size={14} className={cx(
              message.isUser 
                ? isDark ? 'text-purple-300' : 'text-purple-200'
                : isDark ? 'text-gray-400' : 'text-gray-400'
            )} />
            <span className={cx(
              'text-xs',
              message.isUser 
                ? isDark ? 'text-purple-300' : 'text-purple-200'
                : isDark ? 'text-gray-400' : 'text-gray-500'
            )}>
              {formatTimestamp(message.timestamp)}
            </span>
          </div>
          {!message.isUser && (
            <button
              onClick={() => speakText(message.content, index)}
              className={cx(
                'transition-all duration-200 flex items-center gap-1',
                isDark
                  ? 'text-gray-300 hover:text-purple-400'
                  : 'text-gray-400 hover:text-purple-600'
              )}
              disabled={isSpeaking && currentPlayingId !== index}
            >
              {isSpeaking && currentPlayingId === index ? (
                <>
                  <VolumeX size={16} className="animate-pulse" />
                  <span className="text-xs">Stop</span>
                </>
              ) : (
                <>
                  <Volume2 size={16} className="hover:scale-110" />
                  <span className="text-xs">Listen</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={cx(
      'flex h-[600px] rounded-2xl shadow-lg overflow-hidden',
      styles.transition,
      isDark ? 'bg-gray-800' : 'bg-white'
    )}>
      <div className={cx(
        'w-1/3 p-6 flex flex-col justify-between',
        isDark
          ? 'bg-gradient-to-br from-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-purple-50 to-purple-100'
      )}>
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Mic className={isDark ? 'text-purple-400' : 'text-purple-600'} />
            <h2 className={cx(
              'text-xl font-semibold',
              isDark ? 'text-purple-300' : 'text-purple-800'
            )}>Voice AI Companion</h2>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className={isDark ? 'text-purple-400' : 'text-purple-600'} size={20} />
              <label className={cx(
                'text-sm font-medium',
                isDark ? 'text-gray-300' : 'text-gray-700'
              )}>Language</label>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={cx(
                  'px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2',
                  language === 'en' 
                    ? isDark
                      ? 'bg-purple-700 text-white shadow-md shadow-black/30'
                      : 'bg-purple-500 text-white shadow-md'
                    : isDark
                      ? 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
                      : 'bg-white text-gray-700 border hover:bg-purple-50'
                )}
              >
                🇺🇸 English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={cx(
                  'px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2',
                  language === 'hi' 
                    ? isDark
                      ? 'bg-purple-700 text-white shadow-md shadow-black/30'
                      : 'bg-purple-500 text-white shadow-md'
                    : isDark
                      ? 'bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600'
                      : 'bg-white text-gray-700 border hover:bg-purple-50'
                )}
              >
                🇮🇳 Hindi
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className={isDark ? 'text-purple-400' : 'text-purple-600'} size={20} />
              <label className={cx(
                'text-sm font-medium',
                isDark ? 'text-gray-300' : 'text-gray-700'
              )}>Voice</label>
            </div>
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className={cx(
                'w-full p-2 rounded-lg border',
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-400 focus:ring-1 focus:ring-purple-400'
                  : 'border-gray-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500'
              )}
            >
              {getVoiceOptions(language).map((voice) => (
                <option key={voice} value={voice}>
                  {voice.charAt(0).toUpperCase() + voice.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Languages className={isDark ? 'text-purple-400' : 'text-purple-600'} size={20} />
                <label className={cx(
                  'text-sm font-medium',
                  isDark ? 'text-gray-300' : 'text-gray-700'
                )}>Speech Speed</label>
              </div>
              <div className={cx(
                'text-sm',
                isDark ? 'text-gray-400' : 'text-gray-600'
              )}>{ttsSpeed.toFixed(1)}x</div>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="2" 
              step="0.1" 
              value={ttsSpeed}
              onChange={(e) => setTtsSpeed(parseFloat(e.target.value))}
              className={cx(
                'w-full h-2 rounded-lg appearance-none cursor-pointer',
                isDark ? 'bg-purple-900' : 'bg-purple-200'
              )}
            />
          </div>

          <div className="space-y-2">
            <button
              onClick={() => isRecording ? stopRecording() : startRecording()}
              className={cx(
                'w-full py-3 rounded-lg transition-all duration-300 flex items-center justify-center',
                isRecording
                  ? isDark
                    ? 'bg-red-700 hover:bg-red-600 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                  : isDark
                    ? 'bg-purple-700 hover:bg-purple-600 text-white'
                    : 'bg-purple-500 hover:bg-purple-600 text-white',
                loading ? 'opacity-70 cursor-not-allowed' : '',
                isDark
                  ? 'shadow-lg shadow-black/30 hover:shadow-lg hover:shadow-black/40'
                  : 'shadow-lg hover:shadow-lg hover:shadow-xl'
              )}
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin" size={24} />
              ) : isRecording ? (
                <>
                  <StopCircle size={24} className="mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic size={24} className="mr-2" />
                  Start Recording
                </>
              )}
            </button>

            {error && (
              <div className={cx(
                'mt-4 p-3 rounded-lg text-sm flex items-center',
                isDark
                  ? 'bg-red-900 border border-red-700 text-red-300'
                  : 'bg-red-50 border border-red-200 text-red-700'
              )}>
                <AlertCircle size={16} className="mr-2" />
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={cx(
        'w-2/3 p-6 flex flex-col',
        isDark ? 'bg-gray-800' : 'bg-gray-50'
      )}>
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className={isDark ? 'text-blue-400' : 'text-blue-600'} />
          <h2 className={cx(
            'text-xl font-semibold',
            isDark ? 'text-blue-300' : 'text-blue-800'
          )}>Voice Conversation</h2>
        </div>

        <div 
          ref={conversationContainerRef}
          className={cx(
            'flex-grow p-4 rounded-lg shadow-sm overflow-y-auto',
            isDark ? 'bg-gray-900' : 'bg-white'
          )}
        >
          {conversationHistory.length === 0 ? (
            <div className={cx(
              'text-center py-10 italic',
              isDark ? 'text-gray-400' : 'text-gray-500'
            )}>
              Your multilingual conversation will appear here
            </div>
          ) : (
            <div className="space-y-4">
              {conversationHistory.map((message, index) => (
                <MessageComponent 
                  key={index}
                  message={message}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceInteraction;