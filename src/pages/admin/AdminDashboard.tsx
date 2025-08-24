import React from 'react';
import { Helmet } from 'react-helmet-async';

const AdminDashboard: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Misika</title>
        <meta name="description" content="Admin dashboard for Misika." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <p className="text-gray-600">Admin dashboard coming soon...</p>
      </div>
    </>
  );
};

export default AdminDashboard; 