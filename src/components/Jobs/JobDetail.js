import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, BriefcaseIcon, ArrowLeft, Upload, 
  Building2, Clock, DollarSign, FileText, X, Calendar, 
  CheckCircle, Award, Target, Wand2 
} from 'lucide-react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const JobDetail = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    additionalNotes: '',
    resume: null
  });
  const [submitting, setSubmitting] = useState(false);
  const [applicationError, setApplicationError] = useState('');
  const [generatingCoverLetter, setGeneratingCoverLetter] = useState(false);
  const [generatingAdditionalNotes, setGeneratingAdditionalNotes] = useState(false);
  const [submissionStage, setSubmissionStage] = useState('idle'); // idle, analyzing, uploading, processing, saving, complete
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.pathname.split('/').pop();

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await fetch(`https://auriter-backen.onrender.com/api/jobs/${jobId}`, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch job details');
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [jobId]);

  const generateContent = async (type) => {
    if (!job) {
      console.error('No job data available');
      return;
    }
  
    try {
      console.log('Generating content:', type);
      console.log('Job Data:', JSON.stringify(job, null, 2));
  
      const setGenerating = type === 'coverLetter' 
        ? setGeneratingCoverLetter 
        : setGeneratingAdditionalNotes;
      
      setGenerating(true);
  
      // Prepare data for sending
      const requestData = {
        jobTitle: job.title,
        company: job.company,
        skills: job.skills || [],
        requirements: job.requirements || [],
        type: 'coverLetter' // or 'additionalNotes'
      };
      
      const response = await fetch(`https://auriter-backen.onrender.com/api/applications/generate-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify(requestData)
      });
  
      console.log('Response Status:', response.status);
      
      const responseData = await response.json();
      console.log('Response Data:', responseData);
  
      if (!response.ok) {
        throw new Error(responseData.message || `Failed to generate ${type}`);
      }
      
      setApplicationData(prev => ({
        ...prev,
        [type]: responseData.generatedText
      }));
    } catch (err) {
      console.error('Full Error:', err);
      setApplicationError(`Error generating ${type}: ${err.message}`);
    } finally {
      const setGenerating = type === 'coverLetter' 
        ? setGeneratingCoverLetter 
        : setGeneratingAdditionalNotes;
      setGenerating(false);
    }
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setApplicationError('');
    setSubmissionStage('idle');

    // Validation checks
    if (!applicationData.resume) {
      setApplicationError('Please upload a resume');
      setSubmitting(false);
      return;
    }

    if (!applicationData.coverLetter.trim()) {
      setApplicationError('Please provide a cover letter');
      setSubmitting(false);
      return;
    }

    try {
      // Start the submission process
      setSubmissionStage('analyzing');
      
      // Simulate or wait for resume analysis (you can add a real API call here)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Move to the uploading stage
      setSubmissionStage('uploading');
      await new Promise(resolve => setTimeout(resolve, 1000));

      const formData = new FormData();
      formData.append('resume', applicationData.resume);
      formData.append('coverLetter', applicationData.coverLetter);
      formData.append('additionalNotes', applicationData.additionalNotes);

      // Move to the processing stage before making the API call
      setSubmissionStage('processing');
      
      const response = await fetch(`https://auriter-backen.onrender.com/api/applications/${jobId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }

      // Set to saving stage
      setSubmissionStage('saving');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Complete the submission
      setSubmissionStage('complete');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Success
      setShowApplicationForm(false);
      alert('Application submitted successfully!');
      navigate('/jobs');
    } catch (err) {
      setApplicationError(err.message);
      setSubmissionStage('idle');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setApplicationData(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  const removeResume = () => {
    setApplicationData(prev => ({
      ...prev,
      resume: null
    }));
  };

  const toggleApplicationForm = () => {
    setShowApplicationForm(prev => !prev);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent shadow-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl shadow-xl">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-bold text-red-800">Error Loading Job Details</h3>
              <p className="mt-1 text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/jobs')}
          className="group flex items-center text-gray-600 hover:text-purple-600 mb-8 transition-all duration-300 hover:transform hover:translate-x-[-5px]"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span className="font-medium">Back to Jobs</span>
        </button>

        {job && (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Job Details Column */}
            <div className="md:col-span-2 space-y-8">
              {/* Job Header Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="text-white">
                      <h1 className="text-3xl font-bold">{job.title}</h1>
                      <div className="flex items-center mt-3">
                        <Building2 size={20} className="mr-2" />
                        <p className="text-xl text-purple-100">{job.company}</p>
                      </div>
                    </div>
                    <span className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white text-purple-700">
                      {job.type}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Job Overview Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-purple-50 p-4 rounded-xl">
                    {[
                      { icon: MapPin, label: 'Location', value: job.location },
                      { icon: BriefcaseIcon, label: 'Experience', value: `${job.experience.min}-${job.experience.max} years` },
                      { icon: Calendar, label: 'Application Deadline', value: new Date(job.applicationDeadline).toLocaleDateString() }
                    ].map(({ icon: Icon, label, value }, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
                        <Icon size={24} className="text-purple-600" />
                        <div>
                          <p className="text-xs text-gray-500">{label}</p>
                          <p className="font-medium text-gray-900">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Salary Information */}
                  <div className="mt-6 bg-green-50 p-4 rounded-xl flex items-center space-x-4">
                    <DollarSign size={24} className="text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Salary Range</p>
                      <p className="text-lg font-bold text-green-800">
                        {job.salary.currency} {job.salary.min} - {job.salary.max} per year
                      </p>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="mt-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
                    <div className="text-gray-600 leading-relaxed">
                      {job.description}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mt-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Requirements and Responsibilities */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Requirements */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Target size={24} className="mr-2 text-purple-600" />
                      Job Requirements
                    </h2>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle size={18} className="mr-2 mt-1 text-green-500" />
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Award size={24} className="mr-2 text-purple-600" />
                      Job Responsibilities
                    </h2>
                    <ul className="space-y-2">
                      {job.responsibilities.map((resp, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle size={18} className="mr-2 mt-1 text-green-500" />
                          <span className="text-gray-700">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign size={24} className="mr-2 text-purple-600" />
                  Benefits
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center bg-blue-50 p-3 rounded-lg">
                      <CheckCircle size={20} className="mr-2 text-blue-500" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Application Column */}
            <div className="md:col-span-1 space-y-6">
              {/* Recruiter Info Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recruiter Contact</h3>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {job.recruiter.name}</p>
                  <p><strong>Email:</strong> {job.recruiter.email}</p>
                </div>
              </div>

              {/* Application Form */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                {!showApplicationForm ? (
                  <button
                    onClick={toggleApplicationForm}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl font-medium hover:from-purple-700 hover:to-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Apply for this position
                  </button>
                ) : (
                  <form onSubmit={handleApplicationSubmit} className="space-y-6">
                    {/* Progress Bar - Only visible during submission */}
                    {submitting && (
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                            style={{ 
                              width: submissionStage === 'analyzing' ? '20%' : 
                                     submissionStage === 'uploading' ? '40%' : 
                                     submissionStage === 'processing' ? '60%' : 
                                     submissionStage === 'saving' ? '80%' : 
                                     submissionStage === 'complete' ? '100%' : '10%' 
                            }}
                          ></div>
                        </div>
                        <p className="text-sm text-center text-gray-600 mt-2">
                          {submissionStage === 'analyzing' && 'Step 1/5: Analyzing resume...'}
                          {submissionStage === 'uploading' && 'Step 2/5: Uploading resume...'}
                          {submissionStage === 'processing' && 'Step 3/5: Processing application...'}
                          {submissionStage === 'saving' && 'Step 4/5: Saving application...'}
                          {submissionStage === 'complete' && 'Step 5/5: Application submitted!'}
                          {submissionStage === 'idle' && 'Preparing submission...'}
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Resume Upload
                      </label>
                      {!applicationData.resume ? (
                        <div className="flex items-center justify-center w-full">
                          <label className="w-full flex flex-col items-center px-4 py-6 bg-purple-50 text-purple-600 rounded-xl shadow-sm border-2 border-purple-200 border-dashed cursor-pointer hover:border-purple-400 hover:bg-purple-100 transition-all duration-200">
                            <Upload size={24} />
                            <span className="mt-2 text-sm text-center">
                              Click to upload your resume
                            </span>
                            <input
                              type="file"
                              className="hidden"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileChange}
                              required
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between bg-purple-50 p-3 rounded-xl">
                          <div className="flex items-center space-x-2">
                            <FileText size={24} className="text-purple-600" />
                            <span className="text-sm truncate max-w-[200px]">
                              {applicationData.resume.name}
                            </span>
                          </div>
                          <button 
                            type="button"
                            onClick={removeResume}
                            className="text-red-500 hover:bg-red-50 p-1 rounded-full"
                            disabled={submitting}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cover Letter
                        <button
                          type="button"
                          onClick={() => generateContent('coverLetter')}
                          disabled={generatingCoverLetter || submitting}
                          className="ml-2 inline-flex items-center text-purple-600 hover:text-purple-800 text-sm"
                        >
                          <Wand2 size={16} className="mr-1" />
                          {generatingCoverLetter ? 'Generating...' : 'Generate'}
                        </button>
                      </label>
                      <textarea
                        value={applicationData.coverLetter}
                        onChange={(e) => setApplicationData(prev => ({
                          ...prev,
                          coverLetter: e.target.value
                        }))}
                        rows={4}
                        disabled={submitting}
                        className="w-full rounded-xl border-purple-200 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200 disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="Write your cover letter here..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Additional Notes
                        <button
                          type="button"
                          onClick={() => generateContent('additionalNotes')}
                          disabled={generatingAdditionalNotes || submitting}
                          className="ml-2 inline-flex items-center text-purple-600 hover:text-purple-800 text-sm"
                        >
                          <Wand2 size={16} className="mr-1" />
                          {generatingAdditionalNotes ? 'Generating...' : 'Generate'}
                        </button>
                      </label>
                      <textarea
                        value={applicationData.additionalNotes}
                        onChange={(e) => setApplicationData(prev => ({
                          ...prev,
                          additionalNotes: e.target.value
                        }))}
                        rows={3}
                        disabled={submitting}
                        className="w-full rounded-xl border-purple-200 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200 disabled:bg-gray-100 disabled:text-gray-500"
                        placeholder="Any additional information you'd like to share..."
                      />
                    </div>

                    {applicationError && (
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                        <p className="text-sm text-red-700">{applicationError}</p>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={toggleApplicationForm}
                        disabled={submitting}
                        className="flex-1 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className={`flex-1 py-3 ${
                          submitting 
                            ? 'bg-purple-400 cursor-wait' 
                            : 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 transform hover:scale-[1.02]'
                        } text-white rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70`}
                      >
                        {submitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {submissionStage === 'analyzing' && 'Analyzing resume...'}
                            {submissionStage === 'uploading' && 'Uploading resume...'}
                            {submissionStage === 'processing' && 'Processing application...'}
                            {submissionStage === 'saving' && 'Saving application...'}
                            {submissionStage === 'complete' && 'Application submitted!'}
                            {submissionStage === 'idle' && 'Submitting...'}
                          </span>
                        ) : (
                          'Submit Application'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;