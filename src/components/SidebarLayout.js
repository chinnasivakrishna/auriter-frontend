import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, LogOut, Bell, User, HelpCircle, Settings, Mic } from 'lucide-react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import Airuter from '../assets/airuter_logo.png';
import SidebarMenu from './SidebarMenu';
import RecruiterMenu from './Recruiter/RecruiterMenu';
import Cookies from "js-cookie";

const SidebarLayout = ({ onLogout, userRole }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [profileComplete, setProfileComplete] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set currentPath based on current location
    setCurrentPath(location.pathname);
  }, [location]);

  useEffect(() => {
    checkProfileStatus();
  }, []);

  const checkProfileStatus = async () => {
    try {
      const response = await fetch('https://auriter-backen.onrender.com/api/profile/status', {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      const data = await response.json();
      setProfileComplete(data.isComplete);
    } catch (error) {
      console.error('Error checking profile status:', error);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    setCurrentPath(path);
  };

  const handleLogoutClick = () => {
    // Let the parent component handle everything
    onLogout();
  };

  const handleProfileClick = () => {
    if (userRole === 'recruiter') {
      navigate('/company-profile');
    } else {
      navigate('/profile');
    }
  };

  // Get page title from current path
  const getPageTitle = () => {
    if (currentPath === '/dashboard') return 'Dashboard';
    
    // Remove leading slash and convert to title case
    return currentPath.slice(1).split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-20'
        } relative`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center overflow-hidden">
            <img src={Airuter} alt="Logo" className="w-full h-full object-cover" />
          </div>
          {isExpanded && (
            <span className="ml-3 font-semibold text-gray-700 animate-fade-in">
              Airuter
            </span>
          )}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-20 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        {/* Navigation items based on role */}
        {userRole === 'recruiter' ? (
          <RecruiterMenu
            isExpanded={isExpanded}
            currentPath={currentPath}
            handleNavigate={handleNavigate}
          />
        ) : (
          <SidebarMenu
            isExpanded={isExpanded}
            currentPath={currentPath}
            handleNavigate={handleNavigate}
          />
        )}

        {/* Logout button */}
        <div className="absolute bottom-0 w-full border-t p-4">
          <div 
            onClick={handleLogoutClick}
            className="flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-200 p-2 rounded-full"
          >
            <LogOut size={20} />
            {isExpanded && (
              <span className="ml-4">Log Out</span>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            {currentPath !== '/dashboard' && (
              <div className="mr-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 p-2 rounded-full">
                <span className="text-gray-600 font-semibold">
                  {getPageTitle()}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center">
            <div 
              onClick={() => handleNavigate('/voice-assistant')}
              className="mr-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 p-2 rounded-full"
            >
              <Mic size={20} />
            </div>
            <div 
              onClick={handleProfileClick}
              className="mr-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 p-2 rounded-full"
            >
              <User size={20} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;