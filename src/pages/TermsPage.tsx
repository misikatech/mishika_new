import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Misika</title>
        <meta name="description" content="Terms of service for Misika." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <p className="text-gray-600">Terms of service page coming soon...</p>
      </div>
    </>
  );
};

export default TermsPage; 