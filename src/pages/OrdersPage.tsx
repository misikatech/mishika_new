import React from 'react';
import { Helmet } from 'react-helmet-async';

const OrdersPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Orders - Misika</title>
        <meta name="description" content="View your orders at Misika." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Orders</h1>
        <p className="text-gray-600">Orders page coming soon...</p>
      </div>
    </>
  );
};

export default OrdersPage; 