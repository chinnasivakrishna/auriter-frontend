import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Eye, Users, List, Calendar, Tag, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../Alerts/AlertDialog';
import { Card, CardHeader, CardTitle, CardContent } from '../UI/Card';
import Cookies from 'js-cookie';
import { useTheme } from '../../context/ThemeContext';
import { useThemeStyles } from '../hooks/useThemeStyles';

const StatusBadge = ({ status }) => {
  const { isDark } = useTheme();
  
  const statusStyles = {
    active: isDark ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800',
    draft: isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800',
    closed: isDark ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-800',
    expired: isDark ? 'bg-yellow-800 text-yellow-200' : 'bg-yellow-100 text-yellow-800'
  };

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status] || (isDark ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800')}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const JobCard = ({ job, onView, onEdit, onDelete, onViewApplications }) => {
  const { isDark } = useTheme();
  const { colors, styles } = useThemeStyles();
  
  const date = new Date(job.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card className="mb-4 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-700'} mb-2`}>{job.title}</h3>
            <div className={`flex items-center ${colors.textMuted} mb-1`}>
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm">Posted on {date}</span>
            </div>
            <div className={`flex items-center ${colors.textMuted} mb-3`}>
              <Tag className="h-4 w-4 mr-2" />
              <StatusBadge status={job.status} />
            </div>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => onView(job._id)}
              className={`flex items-center justify-center h-8 w-8 rounded-full ${
                isDark 
                  ? 'bg-blue-900 text-blue-300 hover:bg-blue-800 hover:text-blue-200 active:bg-blue-950' 
                  : 'bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-600 active:bg-blue-200'
              } transition-all shadow-sm hover:shadow-md`}
              title="View Job"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button 
              onClick={() => onEdit(job._id)}
              className={`flex items-center justify-center h-8 w-8 rounded-full ${
                isDark 
                  ? 'bg-green-900 text-green-300 hover:bg-green-800 hover:text-green-200 active:bg-green-950' 
                  : 'bg-green-50 text-green-500 hover:bg-green-100 hover:text-green-600 active:bg-green-200'
              } transition-all shadow-sm hover:shadow-md`}
              title="Edit Job"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button 
              onClick={() => onDelete(job._id)}
              className={`flex items-center justify-center h-8 w-8 rounded-full ${
                isDark 
                  ? 'bg-red-900 text-red-300 hover:bg-red-800 hover:text-red-200 active:bg-red-950' 
                  : 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 active:bg-red-200'
              } transition-all shadow-sm hover:shadow-md`}
              title="Delete Job"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <button 
          onClick={() => onViewApplications(job._id)}
          className={`mt-4 flex items-center ${
            isDark 
              ? 'text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 active:bg-purple-900/30' 
              : 'text-purple-600 hover:text-purple-800 hover:bg-purple-50 active:bg-purple-100'
          } font-medium py-1 px-2 rounded transition-all`}
        >
          <Users className="h-4 w-4 mr-2" />
          View Applicants
        </button>
      </CardContent>
    </Card>
  );
};

const MyListingsContent = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteJobId, setDeleteJobId] = useState(null);
  const [viewType, setViewType] = useState('cards'); // 'cards' or 'table'
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { colors, styles } = useThemeStyles();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('token');
      const response = await fetch('https://auriter-backen.onrender.com/api/jobs/my-jobs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch listings');
      
      const data = await response.json();
      setListings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteJobId) return;

    try {
      const token = Cookies.get('token');
      const response = await fetch(`https://auriter-backen.onrender.com/api/jobs/${deleteJobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete job');
      
      setListings(listings.filter(job => job._id !== deleteJobId));
      setDeleteJobId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleEditJob = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  const handleViewApplications = (jobId) => {
    navigate(`/job-candidates/${jobId}`);
  };

  const handlePostJob = () => {
    navigate('/post-jobs');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>My Job Listings</CardTitle>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePostJob} 
              className={`flex items-center px-4 py-2 ${colors.buttonPrimary} text-white rounded-md transition-colors`}
            >
              <Plus className="h-4 w-4 mr-2" />
              Post a Job
            </button>
            <button 
              onClick={() => setViewType('cards')} 
              className={`p-2.5 rounded-md ${viewType === 'cards' 
                ? (isDark ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-700') 
                : (isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100')}`}
              title="Card View"
            >
              <List className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setViewType('table')} 
              className={`p-2.5 rounded-md ${viewType === 'table' 
                ? (isDark ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-700') 
                : (isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100')}`}
              title="Table View"
            >
              <Users className="h-5 w-5" />
            </button>
          </div>
        </CardHeader>
        
        <CardContent>
          {error && (
            <div className={`mb-6 p-4 ${isDark ? 'bg-red-900 text-red-200 border-red-700' : 'bg-red-50 text-red-800 border-red-200'} rounded-lg border`}>
              <p className="font-medium">{error}</p>
              <button 
                onClick={() => setError('')} 
                className={`mt-2 text-sm ${isDark ? 'text-red-300 hover:text-red-200' : 'text-red-600 hover:text-red-800'} underline`}
              >
                Dismiss
              </button>
            </div>
          )}

          {listings.length === 0 ? (
            <div className="text-center py-10">
              <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-700'} mb-2`}>No job listings yet</h3>
              <p className={`${colors.textMuted} mb-4`}>Post your first job to get started</p>
              <button 
                onClick={handlePostJob} 
                className={`px-4 py-2 ${colors.buttonPrimary} text-white rounded-md`}
              >
                Post a Job
              </button>
            </div>
          ) : viewType === 'cards' ? (
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
              {listings.map((job) => (
                <JobCard 
                  key={job._id} 
                  job={job} 
                  onView={handleViewJob}
                  onEdit={handleEditJob}
                  onDelete={setDeleteJobId}
                  onViewApplications={handleViewApplications}
                />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className={`min-w-full divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                <thead className={isDark ? 'bg-gray-800' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Job Title</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Status</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Posted Date</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Applicants</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>Actions</th>
                  </tr>
                </thead>
                <tbody className={`${isDark ? 'bg-gray-800' : 'bg-white'} divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {listings.map((job) => (
                    <tr key={job._id} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`font-medium ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>{job.title}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={job.status} />
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${colors.textMuted}`}>
                        {new Date(job.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => handleViewApplications(job._id)}
                          className={`flex items-center ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-800'}`}
                        >
                          <Users className="h-4 w-4 mr-1" />
                          View Applicants
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-3">
                          <Eye 
                            className={`h-5 w-5 ${isDark ? 'text-blue-400 cursor-pointer hover:text-blue-300' : 'text-blue-500 cursor-pointer hover:text-blue-700'}`} 
                            onClick={() => handleViewJob(job._id)}
                          />
                          <Edit2 
                            className={`h-5 w-5 ${isDark ? 'text-green-400 cursor-pointer hover:text-green-300' : 'text-green-500 cursor-pointer hover:text-green-700'}`} 
                            onClick={() => handleEditJob(job._id)}
                          />
                          <Trash2 
                            className={`h-5 w-5 ${isDark ? 'text-red-400 cursor-pointer hover:text-red-300' : 'text-red-500 cursor-pointer hover:text-red-700'}`} 
                            onClick={() => setDeleteJobId(job._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteJobId} onOpenChange={() => setDeleteJobId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the job listing
              and remove all associated applications.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className={isDark ? 'bg-red-700 hover:bg-red-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyListingsContent;