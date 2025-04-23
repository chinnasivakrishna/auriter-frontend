import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Pencil, Trash2, Check, X, Briefcase, FileText } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [resumeContent, setResumeContent] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const navigate = useNavigate();

  // Filter states updated to match recruiter management style
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    applicationRange: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('admintoken');
      
      if (!token) {
        toast.error('Authentication required');
        navigate('/admin/login');
        return;
      }

      const response = await axios.get('https://auriter-backen.onrender.com/api/admin/users?role=jobSeeker', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.data.success) {
        throw new Error('Failed to fetch users');
      }

      const usersWithJobData = await Promise.all(response.data.users.map(async (user) => {
        try {
          const jobResponse = await axios.get(`https://auriter-backen.onrender.com/api/admin/users/${user._id}/applications`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.isActive ? 'Active' : 'Suspended',
            totalApplications: jobResponse.data.totalApplications || 0,
            activeApplications: jobResponse.data.activeApplications || 0,
            createdAt: user.createdAt
          };
        } catch (err) {
          console.error(`Error fetching job data for user ${user._id}:`, err);
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.isActive ? 'Active' : 'Suspended',
            totalApplications: 0,
            activeApplications: 0,
            createdAt: user.createdAt
          };
        }
      }));
      
      setUsers(usersWithJobData);
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        Cookies.remove('admintoken');
        navigate('/admin/login');
        return;
      }
      toast.error(error.response?.data?.message || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    const newActiveFilters = [];
    
    if (filters.status) {
      newActiveFilters.push({
        type: 'status',
        value: filters.status === 'active' ? 'Active' : 'Suspended',
        label: 'Status'
      });
    }
    
    if (filters.applicationRange) {
      const rangeLabels = {
        none: 'No Applications',
        low: '1-5 Applications',
        medium: '6-15 Applications',
        high: '16+ Applications'
      };
      newActiveFilters.push({
        type: 'applicationRange',
        value: rangeLabels[filters.applicationRange],
        label: 'Application Range'
      });
    }
    
    if (filters.sortBy) {
      const sortLabels = {
        createdAt: 'Join Date',
        name: 'Name',
        applications: 'Application Count'
      };
      newActiveFilters.push({
        type: 'sortBy',
        value: sortLabels[filters.sortBy],
        label: 'Sorted By'
      });
    }
    
    setActiveFilters(newActiveFilters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      applicationRange: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    setActiveFilters([]);
  };

  const removeFilter = (filterType) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: filterType === 'sortBy' ? 'createdAt' : '',
      ...(filterType === 'sortBy' ? { sortOrder: 'desc' } : {})
    }));
    
    setActiveFilters(prev => prev.filter(filter => filter.type !== filterType));
  };

  const applyFiltersAndSearch = (userList) => {
    let filteredUsers = [...userList];

    // Apply search filter
    if (searchTerm) {
      filteredUsers = filteredUsers.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status) {
      filteredUsers = filteredUsers.filter(user => {
        if (filters.status === 'active') return user.status === 'Active';
        if (filters.status === 'suspended') return user.status === 'Suspended';
        return true;
      });
    }

    // Apply application range filter
    if (filters.applicationRange) {
      filteredUsers = filteredUsers.filter(user => {
        switch (filters.applicationRange) {
          case 'none':
            return user.totalApplications === 0;
          case 'low':
            return user.totalApplications > 0 && user.totalApplications <= 5;
          case 'medium':
            return user.totalApplications > 5 && user.totalApplications <= 15;
          case 'high':
            return user.totalApplications > 15;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filteredUsers.sort((a, b) => {
      let compareValue = 0;
      switch (filters.sortBy) {
        case 'name':
          compareValue = a.name.localeCompare(b.name);
          break;
        case 'applications':
          compareValue = a.totalApplications - b.totalApplications;
          break;
        case 'createdAt':
        default:
          compareValue = new Date(a.createdAt) - new Date(b.createdAt);
          break;
      }
      return filters.sortOrder === 'asc' ? compareValue : -compareValue;
    });

    return filteredUsers;
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      const isActive = currentStatus === 'Active' ? false : true;
      const token = Cookies.get('admintoken');
      
      const response = await axios.patch(
        `https://auriter-backen.onrender.com/api/admin/users/${userId}/status`,
        { isActive },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, status: isActive ? 'Active' : 'Suspended' } : user
        ));
        toast.success(`User ${isActive ? 'activated' : 'suspended'} successfully`);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        Cookies.remove('admintoken');
        navigate('/admin/login');
        return;
      }
      toast.error(error.response?.data?.message || 'Error updating user status');
    }
  };

  const viewUserResume = async (userId) => {
    try {
      const token = Cookies.get('admintoken');
      
      const response = await axios.get(`https://auriter-backen.onrender.com/api/admin/users/${userId}/resume`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (!response.data.success) {
        throw new Error(response.data.message || 'Resume not found');
      }
      
      const profile = response.data.profile;
      
      if (profile && profile.resumePath) {
        if (profile.resumePath.startsWith('/uploads/')) {
          window.open(`https://auriter-backen.onrender.com${profile.resumePath}`, '_blank');
        } else if (profile.resumePath.startsWith('http')) {
          window.open(profile.resumePath, '_blank');
        } else {
          toast.info('Resume content available but not in previewable format');
        }
      } else {
        throw new Error('Resume path not found');
      }
    } catch (error) {
      console.error('Error fetching user resume:', error);
      toast.error(error.response?.data?.message || 'Error fetching resume');
    }
  };

  const handleEditUser = (user) => {
    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
    setShowEditUserModal(true);
  };

  const handleDeleteUser = (user) => {
    setCurrentUser({
      id: user.id,
      name: user.name
    });
    setShowDeleteConfirmModal(true);
  };

  const saveUserEdit = async () => {
    try {
      const token = Cookies.get('admintoken');
      
      const response = await axios.put(
        `https://auriter-backen.onrender.com/api/admin/users/${currentUser.id}`,
        {
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setUsers(users.map(user => 
          user.id === currentUser.id ? { 
            ...user, 
            name: currentUser.name,
            email: currentUser.email,
            role: currentUser.role
          } : user
        ));
        setShowEditUserModal(false);
        toast.success('User updated successfully');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        Cookies.remove('admintoken');
        navigate('/admin/login');
        return;
      }
      toast.error(error.response?.data?.message || 'Error updating user');
    }
  };

  const confirmDeleteUser = async () => {
    try {
      const token = Cookies.get('admintoken');
      
      const response = await axios.delete(
        `https://auriter-backen.onrender.com/api/admin/users/${currentUser.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setUsers(users.filter(user => user.id !== currentUser.id));
        setShowDeleteConfirmModal(false);
        toast.success('User deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        Cookies.remove('admintoken');
        navigate('/admin/login');
        return;
      }
      toast.error(error.response?.data?.message || 'Error deleting user');
    }
  };

  const handleAddUser = async () => {
    try {
      if (!newUser.name || !newUser.email || !newUser.password) {
        toast.error('Please fill in all required fields');
        return;
      }
      
      const token = Cookies.get('admintoken');
      
      const response = await axios.post(
        'https://auriter-backen.onrender.com/api/admin/users',
        { ...newUser, role: 'user' },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setUsers([...users, {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role,
          status: response.data.user.isActive ? 'Active' : 'Suspended',
          totalApplications: 0,
          activeApplications: 0,
          createdAt: new Date().toISOString()
        }]);
        setNewUser({
          name: '',
          email: '',
          password: '',
          role: 'user'
        });
        setShowAddUserModal(false);
        toast.success('User added successfully');
      }
    } catch (error) {
      console.error('Error adding User:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        Cookies.remove('admintoken');
        navigate('/admin/login');
        return;
      }
      toast.error(error.response?.data?.message || 'Error adding User');
    }
  };
  
  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    
    if (formType === 'add') {
      setNewUser({ ...newUser, [name]: value });
    } else if (formType === 'edit') {
      setCurrentUser({ ...currentUser, [name]: value });
    }
  };

  const filteredUsers = applyFiltersAndSearch(users);

  if (loading) {
    return (
      <div className="max-w-full px-4 sm:px-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-full px-4 sm:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
        <button 
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          onClick={() => setShowAddUserModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Users..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center px-4 py-2 border ${showFilters ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800' : 'border-gray-300 dark:border-gray-600'} rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700`}
        >
          <Filter className={`h-4 w-4 mr-2 ${showFilters ? 'text-red-500' : ''}`} />
          Filter {activeFilters.length > 0 && `(${activeFilters.length})`}
        </button>
      </div>

      {/* Active filters display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map((filter, index) => (
            <div 
              key={index} 
              className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
            >
              <span className="text-gray-500 dark:text-gray-400 mr-1">{filter.label}:</span>
              <span className="text-gray-800 dark:text-gray-200">{filter.value}</span>
              <button 
                onClick={() => removeFilter(filter.type)}
                className="ml-2 text-gray-500 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <button 
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Filter panel */}
      {showFilters && (
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Application Range
              </label>
              <select
                name="applicationRange"
                value={filters.applicationRange}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All Ranges</option>
                <option value="none">No Applications</option>
                <option value="low">1-5 Applications</option>
                <option value="medium">6-15 Applications</option>
                <option value="high">16+ Applications</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sort By
              </label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="createdAt">Join Date</option>
                <option value="name">Name</option>
                <option value="applications">Application Count</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Order
              </label>
              <select
                name="sortOrder"
                value={filters.sortOrder}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Clear
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden w-full">
        {loading ? (
          <div className="p-6 text-center">Loading Users...</div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Applications</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">{user.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{user.totalApplications} total ({user.activeApplications} active)</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'Active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <button 
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-green-600"
                            onClick={() => viewUserResume(user.id)}
                            title="View Resume"
                          >
                            <FileText className="h-4 w-4" />
                          </button>
                          {user.status === 'Active' ? (
                            <button 
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                              onClick={() => handleToggleUserStatus(user.id, user.status)}
                              title="Suspend User"
                            >
                              <X className="h-4 w-4 text-red-600" />
                            </button>
                          ) : (
                            <button 
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                              onClick={() => handleToggleUserStatus(user.id, user.status)}
                              title="Activate User"
                            >
                              <Check className="h-4 w-4 text-green-600" />
                            </button>
                          )}
                          <button 
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            onClick={() => handleEditUser(user)}
                            title="Edit User"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button 
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            onClick={() => handleDeleteUser(user)}
                            title="Delete User"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      No Users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Add New User
            </h2>
            
            <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input 
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={(e) => handleInputChange(e, 'add')}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input 
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={(e) => handleInputChange(e, 'add')}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input 
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={(e) => handleInputChange(e, 'add')}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <button 
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit User Modal */}
      {showEditUserModal && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Edit User
            </h2>
            
            <form onSubmit={(e) => { e.preventDefault(); saveUserEdit(); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input 
                  type="text"
                  name="name"
                  value={currentUser.name}
                  onChange={(e) => handleInputChange(e, 'edit')}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input 
                  type="email"
                  name="email"
                  value={currentUser.email}
                  onChange={(e) => handleInputChange(e, 'edit')}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <button 
                  type="button"
                  onClick={() => setShowEditUserModal(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Confirm Delete
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Are you sure you want to delete {currentUser.name}? This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-2">
              <button 
                type="button"
                onClick={() => setShowDeleteConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={confirmDeleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;