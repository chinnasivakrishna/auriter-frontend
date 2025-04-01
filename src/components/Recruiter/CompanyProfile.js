import React, { useState, useEffect } from 'react';
import { Edit2, Save, X, Building, Globe, Users, MapPin, Briefcase, Mail, Phone, Linkedin, Twitter, Facebook } from 'lucide-react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CompanyProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState({
    name: '',
    industry: '',
    size: '',
    location: '',
    website: '',
    description: '',
    position: '',
    contactEmail: '',
    contactPhone: '',
    socialLinks: {
      linkedin: '',
      twitter: '',
      facebook: ''
    }
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  const fetchCompanyProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://auriter-backen.onrender.com/api/company/profile', {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch company profile');
      }
      
      const data = await response.json();
      if (data.success) {
        setCompanyData(prevData => ({
          ...prevData,
          ...data.data
        }));
      }
    } catch (error) {
      setError('Failed to load company profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setCompanyData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setCompanyData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://auriter-backen.onrender.com/api/company/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify(companyData)
      });

      if (!response.ok) {
        throw new Error('Failed to update company profile');
      }

      const data = await response.json();
      if (data.success) {
        setSuccess('Company profile updated successfully');
        setIsEditing(false);
      }
    } catch (error) {
      setError('Failed to update company profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6 bg-gradient-to-r from-purple-600 to-purple-700">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Company Profile</h1>
              <p className="text-purple-100 mt-1">Manage your company information</p>
            </div>
            <div className="flex gap-4">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <X size={20} />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Save size={20} />
                    <span>Save Changes</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <Edit2 size={20} />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
            {success}
          </div>
        )}

        {/* Company Information Form */}
        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Building size={18} />
                  Company Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={companyData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Briefcase size={18} />
                  Industry
                </label>
                <input
                  type="text"
                  name="industry"
                  value={companyData.industry}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50"
                  placeholder="e.g., Technology, Healthcare"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Users size={18} />
                  Company Size
                </label>
                <select
                  name="size"
                  value={companyData.size}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50"
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501+">501+ employees</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin size={18} />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={companyData.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Globe size={18} />
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={companyData.website}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Briefcase size={18} />
                  Your Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={companyData.position}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50"
                  placeholder="e.g., HR Manager"
                />
              </div>
            </div>
          </div>

          {/* Company Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Description
            </label>
            <textarea
              name="description"
              value={companyData.description}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows={4}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50"
              placeholder="Tell us about your company..."
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Mail size={18} />
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={companyData.contactEmail}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50"
                placeholder="contact@company.com"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Phone size={18} />
                Contact Phone
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={companyData.contactPhone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50"
                placeholder="+1 (123) 456-7890"
              />
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Linkedin size={18} />
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="socialLinks.linkedin"
                  value={companyData.socialLinks.linkedin}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50"
                  placeholder="LinkedIn URL"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Twitter size={18} />
                  Twitter
                </label>
                <input
                  type="url"
                  name="socialLinks.twitter"
                  value={companyData.socialLinks.twitter}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50"
                  placeholder="Twitter URL"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Facebook size={18} />
                  Facebook
                </label>
                <input
                  type="url"
                  name="socialLinks.facebook"
                  value={companyData.socialLinks.facebook}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50"
                  placeholder="Facebook URL"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile; 