import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../components/ui/toast'; // Assuming you have a toast component

const PhoneCallComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [callStatus, setCallStatus] = useState(null);
  const { toast } = useToast();

  const handlePhoneNumberChange = (e) => {
    // Allow only numbers and limit to 15 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 15);
    setPhoneNumber(value);
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    
    // Format phone number as needed
    const phoneNumberLength = value.length;
    if (phoneNumberLength < 4) return value;
    if (phoneNumberLength < 7) {
      return `${value.slice(0, 3)}-${value.slice(3)}`;
    }
    return `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
  };

  const initiateCall = async (e) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number with at least 10 digits",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await axios.post('/api/initiate-call', {
        phoneNumber: phoneNumber.replace(/\D/g, '') // Strip any formatting
      });
      
      setCallStatus(response.data);
      
      toast({
        title: "Call Initiated",
        description: "The call has been initiated successfully",
        variant: "success"
      });
      
    } catch (error) {
      console.error('Error initiating call:', error);
      
      toast({
        title: "Call Failed",
        description: error.response?.data?.message || "Failed to initiate call, please try again",
        variant: "destructive"
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Start Phone Interview</h2>
      
      <form onSubmit={initiateCall}>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
            value={formatPhoneNumber(phoneNumber)}
            onChange={handlePhoneNumberChange}
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Enter the number you want to call for the interview
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isLoading || phoneNumber.length < 10}
          className={`w-full py-2 px-4 rounded-md text-white font-medium 
            ${isLoading || phoneNumber.length < 10 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isLoading ? 'Initiating Call...' : 'Start Call'}
        </button>
      </form>
      
      {callStatus && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium mb-2">Call Status</h3>
          <p><span className="font-medium">Status:</span> {callStatus.status}</p>
          <p><span className="font-medium">Message:</span> {callStatus.message}</p>
          {callStatus.unique_token && (
            <p><span className="font-medium">Reference ID:</span> {callStatus.unique_token}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PhoneCallComponent;