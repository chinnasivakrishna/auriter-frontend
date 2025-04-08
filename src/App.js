import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { HMSRoomProvider } from '@100mslive/react-sdk';
import Cookies from 'js-cookie';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Landing Page Component
import LandingPage from './LandingPage';

// Auth Components
import AuthFlow from './components/Auth/AuthFlow';
import RoleSelectionPage from './components/Auth/RoleSelectionPage';

// Layout Components
import SidebarLayout from './components/SidebarLayout';

// Page Components
import DashboardContent from './components/Dashboard/DashboardContent';
import JobsContent from './components/Jobs/JobsContent';
import JobsAppliedContent from './components/Jobs/JobsAppliedContent';
import ResumeAnalyzerPage from './components/Resume/ResumeAnalyzerPage';
import ProfileSetup from './components/Profile/ProfileSetup';
import AiTelephonic from './components/AI/AiTelephonic';
import AiVideo from './components/AI/AiVideo';
import ExpertVideo from './components/AI/ExpertVideo';
import CoursesContent from './components/Courses/CoursesContent';
import ChatContent from './components/Chat/ChatContent';
import ProfileContent from './components/Profile/ProfileContent';
import SettingsContent from './components/Settings/SettingsContent';
import HelpContent from './components/Help/HelpContent';
import NotificationsContent from './components/Notifications/NotificationsContent';
import VoiceInteraction from './components/VoiceInteraction';
import InterviewRoom from './AI/InterviewRoom';

// Recruiter Components
import PostJobsContent from './components/Jobs/PostJobsContent';
import MyListingsContent from './components/Listings/MyListingsContent';
import CandidatesContent from './components/Candidates/CandidatesContent';
import MessagesContent from './components/Messages/MessagesContent';
import InterviewResultsPage from './components/Candidates/InterviewResultsPage'; 
import InterviewResults from './components/InterviewResults/InterviewResults';
import CandidateProfile from './components/Candidates/CandidateProfile';
// Job-related Components
import JobDetail from './components/Jobs/JobDetail';
import EditJobContent from './components/Jobs/EditJobContent';
import JobApplicationsContent from './components/Applications/JobApplicationsContent';
import JobCandidatesContent from './components/Candidates/JobCandidatesContent';
import CompanyProfile from './components/Recruiter/CompanyProfile';

const App = () => {
  const { theme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in cookies
    const token = Cookies.get('token');
    if (token) {
      // Validate the token
      validateToken(token);
    } else {
      setIsLoading(false);
      setIsAuthenticated(false);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await fetch('https://auriter-backen.onrender.com/api/auth/validate', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        setUserRole(data.role);
      } else {
        // Token is invalid, remove it
        Cookies.remove('token');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error validating token:', error);
      Cookies.remove('token');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    // Remove the token cookie
    Cookies.remove('token');
    
    // Update application state
    setIsAuthenticated(false);
    setUserRole(null);
    
    // Navigate to auth page
    window.location.href = '/auth';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className={`app-container ${theme}`}>
      <Router>
        <HMSRoomProvider>
          <Routes>
            {/* Landing Page route with authentication check */}
            <Route path="/" element={
              isAuthenticated 
                ? <Navigate to="/dashboard" replace /> 
                : <LandingPage />
            } />
            
            {/* Public Interview Room route - accessible without authentication */}
            <Route path="/interview/:roomId" element={<InterviewRoom />} />
            
            {/* Auth callback route for Google OAuth */}
            <Route path="/auth/callback" element={
              isAuthenticated 
                ? <Navigate to="/dashboard" replace /> 
                : <AuthFlow onAuthSuccess={handleAuthSuccess} />
            } />
            
            {isAuthenticated ? (
              <>
                {/* Main layout with sidebar for authenticated users */}
                <Route element={<SidebarLayout onLogout={handleLogout} userRole={userRole} />}>
                  <Route path="/dashboard" element={<DashboardContent />} />
                  <Route path="jobs" element={<JobsContent />} />
                  <Route path="jobs-applied" element={<JobsAppliedContent />} />
                  <Route path="resume-analyzer" element={<ResumeAnalyzerPage />} />
                  <Route path="profile-setup" element={<ProfileSetup />} />
                  <Route path="ai-telephonic" element={<AiTelephonic />} />
                  <Route path="ai-video" element={<AiVideo />} />
                  <Route path="expert-video" element={<ExpertVideo />} />
                  <Route path="courses" element={<CoursesContent />} />
                  <Route path="chat" element={<ChatContent />} />
                  <Route path="profile" element={<ProfileContent />} />
                  <Route path="settings" element={<SettingsContent />} />
                  <Route path="help" element={<HelpContent />} />
                  <Route path="notifications" element={<NotificationsContent />} />
                  <Route path="voice-assistant" element={<VoiceInteraction />} />

                  {/* Job-related Dynamic Routes */}
                  <Route path="jobs/detail/:jobId" element={<JobDetail />} />
                  <Route path="detail/:jobId" element={<JobDetail />} />
                  <Route path="edit-job/:jobId" element={<EditJobContent />} />
                  <Route path="applications/:jobId" element={<JobApplicationsContent />} />
                  <Route path="/interview-results/:applicantId" element={<InterviewResultsPage />} />

                  {/* Recruiter-specific Routes */}
                  {userRole === 'recruiter' && (
                    <>
                      <Route path="post-jobs" element={<PostJobsContent />} />
                      <Route path="my-listings" element={<MyListingsContent />} />
                      <Route path="candidates" element={<CandidatesContent />} />
                      <Route path="candidates/:applicationId" element={<CandidateProfile />} />
                      <Route path="candidates/:jobId" element={<CandidatesContent />} />
                      <Route path="messages" element={<MessagesContent />} />
                      <Route path="/interview-resultss/:applicationId" element={<InterviewResults />} />
                      <Route path="/job-candidates/:jobId" element={<JobCandidatesContent />} />
                      <Route path="/company-profile" element={<CompanyProfile />} />
                    </>
                  )}
                </Route>
                
                {/* Role selection route */}
                <Route 
                  path="/role-selection" 
                  element={<RoleSelectionPage onAuthSuccess={handleAuthSuccess} />} 
                />
                
                {/* Redirect authenticated users from /auth to dashboard */}
                <Route path="/auth" element={<Navigate to="/dashboard" replace />} />
              </>
            ) : (
              <>
                {/* Unauthenticated Routes */}
                <Route path="/auth" element={<AuthFlow onAuthSuccess={handleAuthSuccess} />} />
                <Route path="/role-selection" element={<RoleSelectionPage onAuthSuccess={handleAuthSuccess} />} />
                
                {/* Job Details route for unauthenticated users */}
                <Route path="/jobs/detail/:jobId" element={<JobDetail />} />
                <Route path="/detail/:jobId" element={<JobDetail />} />
                
                {/* Redirect all other routes to auth when not authenticated */}
                <Route path="*" element={<Navigate to="/auth" replace />} />
              </>
            )}
            
            <Route path="/company-profile" element={<CompanyProfile />} />
          </Routes>
        </HMSRoomProvider>
      </Router>
    </div>
  );
};

export default App;