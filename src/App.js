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
import AdminLoginPage from './components/Auth/AdminLoginPage';
import AdminRegistrationPage from './components/Auth/AdminRegistrationPage';

// Layout Components
import SidebarLayout from './components/SidebarLayout';

// Admin Components
import AdminDashboard from './components/Admin/AdminDashboard';
import RecruiterManagement from './components/Admin/RecruiterManagement';
import DataAnalytics from './components/Admin/DataAnalytics';
import UserManagement from './components/Admin/UserManagement';
import SystemSettings from './components/Admin/SystemSettings';
import AdminApprovals from './components/Admin/AdminApprovals';
import Tickets from './components/Admin/TicketsPage'
import Courses from './components/Admin/CoursesPage'
import Payments from './components/Admin/PaymentsPage'
import Shorts from './components/Admin/ShortsPage';
import ShortsAnalytics  from './components/Admin/ShortsAnalytics';
// New Admin Components for Recruiter Details
import RecruiterJobsView from './components/Admin/RecruiterJobsView';
import RecruiterApplicationsView from './components/Admin/RecruiterApplicationsView';

// Existing Page Components (kept as is)
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
import DatastoreContent from './components/DataStore/DatastoreContent';
import JobPreviewPage from './components/Jobs/JobPreviewPage';

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
    const initializeAuth = async () => {
      // Check if token exists in cookies
      const token = Cookies.get('token');
      const adminToken = Cookies.get('admintoken');
      const adminUser = Cookies.get('adminUser');
      const userCookie = Cookies.get('user');
      
      // If we have a regular token and user data
      if (token && userCookie) {
        try {
          const userData = JSON.parse(userCookie);
          
          // Validate the token is still valid
          const response = await fetch('https://auriter-backen.onrender.com/api/auth/validate', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          const data = await response.json();
          
          if (data.success) {
            setIsAuthenticated(true);
            setUserRole(userData.role || data.role);
            setIsLoading(false);
            return;
          } else {
            throw new Error('Invalid token');
          }
        } catch (error) {
          console.error('Error validating token:', error);
          clearAuth();
        }
      }
      
      // If admin user exists and admin token exists, authenticate as admin
      if (adminToken && adminUser) {
        try {
          const userData = JSON.parse(adminUser);
          if (userData.role === 'admin') {
            setIsAuthenticated(true);
            setUserRole('admin');
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.error('Error parsing admin user data:', error);
          clearAuth();
          return;
        }
      }
      
      setIsLoading(false);
      setIsAuthenticated(false);
    };
  
    initializeAuth();
  }, []);

  const clearAuth = () => {
    Cookies.remove('token', { path: '/' });
    Cookies.remove('admintoken', { path: '/' });
    Cookies.remove('adminUser', { path: '/' });
    Cookies.remove('user', { path: '/' });
    setIsAuthenticated(false);
    setUserRole(null);
    setIsLoading(false);
  };

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
        throw new Error('Invalid token');
      }
    } catch (error) {
      console.error('Error validating token:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = (role, isAdmin = false) => {
    setIsAuthenticated(true);
    setUserRole(role);
    
    // For debugging
    console.log(`Auth success: role=${role}, isAdmin=${isAdmin}`);
  };

  const handleLogout = () => {
    // Clear all authentication data
    clearAuth();
    
    // Clear state first
    setIsAuthenticated(false);
    setUserRole(null);
    
    // Wait for state updates and then navigate
    setTimeout(() => {
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      } else {
        window.location.href = '/auth';
      }
    }, 100);
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
            
            {/* Admin Routes */}
            <Route 
              path="/admin/login" 
              element={
                isAuthenticated && userRole === 'admin' ? 
                  <Navigate to="/admin/dashboard" replace /> : 
                  <AdminLoginPage onAuthSuccess={handleAuthSuccess} />
              } 
            />
            <Route 
              path="/admin/register" 
              element={
                isAuthenticated && userRole === 'admin' ? 
                  <Navigate to="/admin/dashboard" replace /> : 
                  <AdminRegistrationPage />
              } 
            />

            {/* Landing Page route with authentication check */}
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                  <Navigate to={userRole === 'admin' ? '/admin/dashboard' : '/dashboard'} replace /> 
                  : <LandingPage />
              } 
            />
            
            {/* Public Interview Room route - accessible without authentication */}
            <Route path="/interview/:roomId" element={<InterviewRoom />} />
            
            {/* Auth callback route for Google OAuth */}
            <Route 
              path="/auth/callback" 
              element={
                isAuthenticated 
                  ? <Navigate to="/dashboard" replace /> 
                  : <AuthFlow onAuthSuccess={handleAuthSuccess} />
              } 
            />
            
            {isAuthenticated ? (
              <>
                {/* Main layout with sidebar for authenticated users */}
                <Route element={<SidebarLayout onLogout={handleLogout} userRole={userRole} />}>
                  {/* Admin Routes */}
                  {userRole === 'admin' && (
                    <>
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                      <Route path="/admin/clients" element={<RecruiterManagement />} />
                      <Route path="/admin/users" element={<UserManagement />} />
                      <Route path="/admin/analytics" element={<DataAnalytics />} />
                      <Route path="/admin/settings" element={<SystemSettings />} />
                      <Route path="/admin/approvals" element={<AdminApprovals />} />
                      <Route path='/admin/tickets' element={<Tickets />} />
                      <Route path='/admin/courses' element={<Courses />} />
                      <Route path='/admin/payments' element={<Payments />} />
                      <Route path='/admin/shorts' element={<Shorts />} />
                      <Route path='/admin/shorts/analytics' element={<ShortsAnalytics />} />
                      
                      {/* New routes for admin to view recruiter details */}
                      <Route path="/admin/recruiter/:recruiterId/jobs" element={<RecruiterJobsView />} />
                      <Route path="/admin/recruiter/:recruiterId/applications" element={<RecruiterApplicationsView />} />
                      <Route path="/admin/jobs/:jobId" element={<JobDetail />} />
                      <Route path="/admin/applications/:applicationId" element={<JobApplicationsContent />} />
                    </>
                  )}

                  {/* Existing routes for users and recruiters */}
                  {userRole !== 'admin' && (
                    <>
                      <Route path="/dashboard" element={<DashboardContent />} />
                      <Route path="/jobs" element={<JobsContent />} />
                      <Route path="/jobs-applied" element={<JobsAppliedContent />} />
                      <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
                      <Route path="/profile-setup" element={<ProfileSetup />} />
                      <Route path="/ai-telephonic" element={<AiTelephonic />} />
                      <Route path="/ai-video" element={<AiVideo />} />
                      <Route path="/expert-video" element={<ExpertVideo />} />
                      <Route path="/courses" element={<CoursesContent />} />
                      <Route path="/chat" element={<ChatContent />} />
                      <Route path="/profile" element={<ProfileContent />} />
                      <Route path="/settings" element={<SettingsContent />} />
                      <Route path="/help" element={<HelpContent />} />
                      <Route path="/notifications" element={<NotificationsContent />} />
                      <Route path="/voice-assistant" element={<VoiceInteraction />} />

                      {/* Job-related Dynamic Routes */}
                      <Route path="/jobs/detail/:jobId" element={<JobDetail />} />
                      <Route path="/detail/:jobId" element={<JobDetail />} />
                      <Route path="/edit-job/:jobId" element={<EditJobContent />} />
                      <Route path="/applications/:jobId" element={<JobApplicationsContent />} />
                      <Route path="/interview-results/:applicantId" element={<InterviewResultsPage />} />

                      {/* Recruiter-specific Routes */}
                      {userRole === 'recruiter' && (
                        <>
                          <Route path="/post-jobs" element={<PostJobsContent />} />
                          <Route path="/my-listings" element={<MyListingsContent />} />
                          <Route path="/candidates" element={<CandidatesContent />} />
                          <Route path="/candidates/:applicationId" element={<CandidateProfile />} />
                          <Route path="/candidates/:jobId" element={<CandidatesContent />} />
                          <Route path="/messages" element={<MessagesContent />} />
                          <Route path="/interview-resultss/:applicationId" element={<InterviewResults />} />
                          <Route path="/job-candidates/:jobId" element={<JobCandidatesContent />} />
                          <Route path="/company-profile" element={<CompanyProfile />} />
                          <Route path="/datastore" element={<DatastoreContent />} />
                          <Route path="/job-preview/:jobId" element={<JobPreviewPage />} />
                        </>
                      )}
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