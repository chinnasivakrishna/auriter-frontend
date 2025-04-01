import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Card, CardHeader, CardTitle, CardContent } from '../UI/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../UI/Tabs';
import { Progress } from '../UI/Progress';
import { ChevronRight, Calendar, Clock, Award, BookOpen, Target, Video, Download } from 'lucide-react';
import { saveAs } from 'file-saver';

const InterviewResults = () => {
  const { applicationId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [interviewData, setInterviewData] = useState(null);
  const [downloadingVideo, setDownloadingVideo] = useState(false);

  useEffect(() => {
    fetchInterviewResults();
  }, [applicationId]);

  const fetchInterviewResults = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`https://auriter-backen.onrender.com/api/interview/application/${applicationId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch interview results');
      }

      const data = await response.json();
      setInterviewData(data.interview);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadVideo = async () => {
    if (!interviewData || !interviewData.screenRecordingUrl) {
      alert("No video available to download");
      return;
    }
  
    try {
      setDownloadingVideo(true);
      
      // Extract filename from URL or create a basic one
      const videoUrl = interviewData.screenRecordingUrl;
      const fileName = `interview-recording-${new Date(interviewData.date).toISOString().split('T')[0]}.mp4`;
      
      // Use the file-saver library that's already imported
      // First, fetch the video as a blob
      const response = await fetch(videoUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch video data");
      }
      
      // Get the video data as blob
      const blob = await response.blob();
      
      // Use saveAs from file-saver to download the blob
      saveAs(blob, fileName);
    } catch (err) {
      console.error("Error downloading video:", err);
      alert(`Failed to download video. Please try again.`);
    } finally {
      setDownloadingVideo(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent"></div>
          <p className="text-purple-800 font-medium">Loading your interview results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 flex justify-center">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md max-w-2xl">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold">Error Loading Results</h3>
          </div>
          <p>{error}</p>
          <button 
            onClick={fetchInterviewResults}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!interviewData) {
    return (
      <div className="p-8 flex justify-center">
        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-6 rounded-lg shadow-md max-w-2xl">
          <p className="font-medium">No interview data found for this application.</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-blue-600";
    if (score >= 4) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBackground = (score) => {
    if (score >= 8) return "bg-green-50";
    if (score >= 6) return "bg-blue-50";
    if (score >= 4) return "bg-yellow-50";
    return "bg-red-50";
  };

  const getProgressColor = (score) => {
    if (score >= 8) return "bg-green-500";
    if (score >= 6) return "bg-blue-500";
    if (score >= 4) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Results</h1>
          <div className="flex items-center text-gray-500">
            <span>{interviewData.jobTitle}</span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>{new Date(interviewData.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </header>

        <Tabs defaultValue="summary" className="space-y-8">
          <TabsList className="bg-white p-1 rounded-lg shadow-sm">
            <TabsTrigger value="summary" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              Summary
            </TabsTrigger>
            <TabsTrigger value="details" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              Detailed Feedback
            </TabsTrigger>
            {interviewData.screenRecordingUrl && (
              <TabsTrigger value="recording" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
                Recording
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="summary" className="space-y-6">
            <Card className="overflow-hidden shadow-md border-0">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <CardTitle className="text-xl flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {interviewData.analysis && Object.entries(interviewData.analysis.overallScores).map(([category, score]) => (
                    <div key={category} className={`${getScoreBackground(score)} rounded-xl p-6 transition-all hover:shadow-md`}>
                      <h3 className="text-gray-700 font-medium capitalize mb-1">{category}</h3>
                      <div className={`text-3xl font-bold ${getScoreColor(score)} mb-2`}>{score}/10</div>
                      <Progress 
                        value={score * 10} 
                        className="h-2 bg-gray-200" 
                        indicatorClassName={getProgressColor(score)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-md border-0">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-lg flex items-center">
                    <Target className="mr-2 h-5 w-5 text-blue-600" />
                    Key Focus Areas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {interviewData.analysis && (
                    <ul className="space-y-3">
                      {interviewData.analysis.focusAreas.map((area, index) => (
                        <li key={index} className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 mt-0.5 text-sm font-bold">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{area}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-md border-0">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-purple-600" />
                    Interview Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mr-4">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-500">Job Title</h3>
                        <p className="text-gray-900 font-medium">{interviewData.jobTitle}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-500">Date</h3>
                        <p className="text-gray-900 font-medium">{new Date(interviewData.date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mr-4">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-500">Time</h3>
                        <p className="text-gray-900 font-medium">{interviewData.time}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            {interviewData.analysis && Object.entries(interviewData.analysis.feedback).map(([category, feedback], index) => (
              <Card key={category} className="shadow-md border-0">
                <CardHeader className={`bg-gradient-to-r ${index % 3 === 0 ? 'from-blue-500 to-blue-600' : index % 3 === 1 ? 'from-purple-500 to-purple-600' : 'from-indigo-500 to-indigo-600'} text-white`}>
                  <CardTitle className="capitalize">{category}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900">Strengths</h3>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">{feedback.strengths}</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-3">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900">Areas for Improvement</h3>
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">{feedback.areasOfImprovement}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {interviewData.screenRecordingUrl && (
            <TabsContent value="recording" className="space-y-6">
              <Card className="shadow-md border-0">
                <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Video className="mr-2 h-5 w-5" />
                      Interview Recording
                    </div>
                    <button 
                      onClick={handleDownloadVideo}
                      disabled={downloadingVideo}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm flex items-center text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {downloadingVideo ? (
                        <>
                          <div className="animate-spin h-4 w-4 mr-1 border-2 border-white border-t-transparent rounded-full"></div>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="mr-1 h-4 w-4" />
                          Download Video
                        </>
                      )}
                    </button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <video
                      controls
                      className="w-full h-auto max-h-96 bg-black"
                      src={interviewData.screenRecordingUrl}
                      poster="/video-thumbnail.jpg"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-2">Playback Instructions</h3>
                    <p className="text-gray-700 text-sm">
                      This recording shows your entire interview session. Use the video controls to pause, 
                      rewind, or skip to specific parts of your interview. Watching your recording can help 
                      you identify areas for improvement mentioned in your feedback.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default InterviewResults;