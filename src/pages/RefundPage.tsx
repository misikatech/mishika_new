import React from 'react';
import { Helmet } from 'react-helmet-async';

const RefundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Refund Policy - Misika</title>
        <meta name="description" content="Refund policy for Misika." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>
        <p className="text-gray-600">Refund policy page coming soon...</p>
      </div>
    </>
  );
};

export default RefundPage; 