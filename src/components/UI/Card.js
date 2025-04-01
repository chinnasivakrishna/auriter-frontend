import React from 'react';

export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h2 className={`text-2xl font-semibold ${className}`}>
    {children}
  </h2>
);

export const CardDescription = ({ children, className = "" }) => (
  <p className={`text-gray-500 mt-1 ${className}`}>
    {children}
  </p>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 border-t border-gray-100 ${className}`}>
    {children}
  </div>
);