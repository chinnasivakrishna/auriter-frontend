import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Building2, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  Filter,
  Briefcase,
  Calendar,
  ArrowUpRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Cookies from 'js-cookie';
import { useTheme } from '../../context/ThemeContext';
import { useThemeStyles } from '../hooks/useThemeStyles';

const JobsAppliedContent = () => {
  const { theme } = useTheme();
  const { isDark, colors, styles, cx } = useThemeStyles();
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [expandedItems, setExpandedItems] = useState(new Set());

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('https://auriter-backen.onrender.com/api/jobs-applied/my-applications', {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      setApplications(data.applications || []);
      setStats(data.stats || {});
      setLoading(false);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(`Failed to fetch applications: ${err.message}`);
      setApplications([]);
      setStats({});
      setLoading(false);
    }
  };

  const toggleDetails = (id) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Generate a gradient based on application status
  const getStatusGradient = (status) => {
    const gradients = {
      accepted: isDark 
        ? 'bg-gradient-to-r from-green-900 to-emerald-800' 
        : 'bg-gradient-to-r from-green-50 to-emerald-100',
      rejected: isDark 
        ? 'bg-gradient-to-r from-red-900 to-rose-800' 
        : 'bg-gradient-to-r from-red-50 to-rose-100',
      pending: isDark 
        ? 'bg-gradient-to-r from-yellow-900 to-amber-800' 
        : 'bg-gradient-to-r from-yellow-50 to-amber-100',
      reviewed: isDark 
        ? 'bg-gradient-to-r from-blue-900 to-indigo-800' 
        : 'bg-gradient-to-r from-blue-50 to-indigo-100',
      shortlisted: isDark 
        ? 'bg-gradient-to-r from-purple-900 to-violet-800' 
        : 'bg-gradient-to-r from-purple-50 to-violet-100'
    };
    return gradients[status] || (isDark 
      ? 'bg-gradient-to-r from-gray-800 to-gray-700' 
      : 'bg-gradient-to-r from-gray-50 to-gray-100');
  };

  // Card gradient based on status with subtle effect
  const getCardGradient = (status) => {
    // Create softer gradients for cards based on status
    const cardGradients = {
      accepted: isDark 
        ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-green-900' 
        : 'bg-gradient-to-br from-white via-white to-green-50',
      rejected: isDark 
        ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-red-900' 
        : 'bg-gradient-to-br from-white via-white to-red-50',
      pending: isDark 
        ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-yellow-900' 
        : 'bg-gradient-to-br from-white via-white to-yellow-50',
      reviewed: isDark 
        ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-blue-900' 
        : 'bg-gradient-to-br from-white via-white to-blue-50',
      shortlisted: isDark 
        ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-purple-900' 
        : 'bg-gradient-to-br from-white via-white to-purple-50'
    };
    return cardGradients[status] || (isDark 
      ? 'bg-gradient-to-br from-gray-800 to-gray-700' 
      : 'bg-gradient-to-br from-white to-gray-50');
  };

  const getStatusColor = (status) => {
    const baseColors = {
      accepted: isDark ? 'bg-green-900 text-green-200 border-green-700' : 'bg-green-100 text-green-800 border-green-300',
      rejected: isDark ? 'bg-red-900 text-red-200 border-red-700' : 'bg-red-100 text-red-800 border-red-300',
      pending: isDark ? 'bg-yellow-900 text-yellow-200 border-yellow-700' : 'bg-yellow-100 text-yellow-800 border-yellow-300',
      reviewed: isDark ? 'bg-blue-900 text-blue-200 border-blue-700' : 'bg-blue-100 text-blue-800 border-blue-300',
      shortlisted: isDark ? 'bg-purple-900 text-purple-200 border-purple-700' : 'bg-purple-100 text-purple-800 border-purple-300'
    };
    return baseColors[status] || (isDark ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300');
  };

  const getStatusIcon = (status) => {
    const icons = {
      accepted: <CheckCircle className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />,
      reviewed: <Clock className="w-4 h-4" />,
      shortlisted: <ArrowUpRight className="w-4 h-4" />,
      pending: <AlertCircle className="w-4 h-4" />
    };
    return icons[status] || <AlertCircle className="w-4 h-4" />;
  };

  const filteredApplications = Array.isArray(applications) ? applications
    .filter(app => {
      const matchesSearch = searchTerm === '' || 
        app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    }) : [];

  if (loading) {
    return (
      <div className={cx("flex justify-center items-center h-screen", colors.bg)}>
        <div className="space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
          <p className={colors.textSecondary + " animate-pulse"}>Loading your applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cx("max-w-2xl mx-auto mt-8 p-4 rounded-lg", isDark ? "bg-red-900 text-white" : "bg-red-100 text-red-800")}>
        <h2 className="text-lg font-semibold mb-2">Error</h2>
        <p>{error}</p>
        <button 
          onClick={() => {
            setError(null);
            setLoading(true);
            fetchApplications();
          }}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={cx("max-w-7xl mx-auto px-4 py-8", colors.bg)}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className={cx("text-3xl font-bold", colors.text)}>My Applications</h1>
          <p className={colors.textSecondary + " mt-2"}>Track and manage your job applications</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        {Object.entries(stats || {}).map(([key, value], index) => {
          // Create alternating gradients for stats cards
          const gradientClasses = [
            "bg-gradient-to-r from-purple-600 to-indigo-600",
            "bg-gradient-to-r from-blue-600 to-cyan-600",
            "bg-gradient-to-r from-emerald-600 to-teal-600",
            "bg-gradient-to-r from-amber-600 to-yellow-600",
            "bg-gradient-to-r from-rose-600 to-pink-600",
            "bg-gradient-to-r from-violet-600 to-fuchsia-600"
          ];
          
          const cardGradient = isDark 
            ? gradientClasses[index % gradientClasses.length]
            : `bg-gradient-to-r from-white to-${gradientClasses[index % gradientClasses.length].split('from-')[1].split(' ')[0].replace('600', '50')}`;
          
          return (
            <div key={key} className={cx(
              "rounded-lg shadow p-4 transition-all duration-300 hover:shadow-lg", 
              isDark ? cardGradient : cardGradient,
              isDark ? "text-white" : "text-gray-800"
            )}>
              <div className="py-4">
                <h3 className={cx("text-sm font-medium capitalize", isDark ? "text-gray-200" : "text-gray-700")}>
                  {key.replace('_', ' ')}
                </h3>
              </div>
              <div className="px-4">
                <div className={cx("text-2xl font-bold", isDark ? "text-white" : "text-gray-900")}>{value}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by job title or company..."
            className={cx(
              "pl-10 pr-4 py-2 w-full border rounded-lg",
              isDark ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500",
              "focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            )}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className={cx(
            "w-[180px] border rounded-lg p-2",
            isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900",
            "focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          )}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          className={cx(
            "w-[180px] border rounded-lg p-2",
            isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900",
            "focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          )}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div className={cx("text-center py-12 rounded-lg", colors.bgSection)}>
          <Briefcase className={cx("mx-auto h-12 w-12", colors.textMuted)} />
          <p className={cx("mt-4 text-lg font-medium", colors.text)}>No applications found</p>
          <p className={cx("mt-2", colors.textSecondary)}>
            {searchTerm || statusFilter !== 'all' 
              ? "Try adjusting your filters"
              : "You haven't applied to any jobs yet"}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredApplications.map((application) => (
            <div 
              key={application._id} 
              className={cx(
                "rounded-lg shadow-sm hover:shadow-lg transition-all duration-300",
                getCardGradient(application.status),
                "border border-transparent",
                isDark ? "hover:shadow-purple-900/30" : "hover:shadow-purple-300/30",
              )}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <h2 className={cx("text-xl font-semibold", colors.text)}>
                      {application.job.title}
                    </h2>
                    <div className={cx("flex items-center", colors.textSecondary)}>
                      <Building2 className="w-4 h-4 mr-2" />
                      <span>{application.job.company}</span>
                    </div>
                  </div>
                  <div className={`flex items-center px-3 py-1 rounded-full border ${getStatusColor(application.status)}`}>
                    {getStatusIcon(application.status)}
                    <span className="ml-2 text-sm font-medium capitalize">
                      {application.status}
                    </span>
                  </div>
                </div>

                <div className={cx("flex flex-wrap gap-4 mt-4", colors.textSecondary)}>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{application.job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Applied {new Date(application.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <span>{application.job.type}</span>
                  </div>
                </div>

                {/* Expandable Content */}
                <div className={`mt-4 space-y-4 transition-all duration-300 ${expandedItems.has(application._id) ? 'block' : 'hidden'}`}>
                  {application.coverLetter && (
                    <div className={cx(
                      "p-4 rounded-md backdrop-blur-sm", 
                      isDark ? "bg-gray-800/70" : "bg-white/70"
                    )}>
                      <h3 className={cx("font-medium mb-2", colors.text)}>Cover Letter</h3>
                      <p className={colors.textSecondary}>{application.coverLetter}</p>
                    </div>
                  )}

                  {application.additionalNotes && (
                    <div>
                      <h3 className={cx("font-medium mb-2", colors.text)}>Additional Notes</h3>
                      <p className={colors.textSecondary}>{application.additionalNotes}</p>
                    </div>
                  )}
                </div>

                <div className={cx("mt-4 pt-4 border-t flex justify-end", colors.border)}>
                  <button 
                    onClick={() => toggleDetails(application._id)}
                    className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1 transition-colors duration-200"
                  >
                    {expandedItems.has(application._id) ? (
                      <>
                        Hide Details
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        View Details
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsAppliedContent;