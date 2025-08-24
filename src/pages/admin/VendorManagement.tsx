import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Mail, Phone } from 'lucide-react';

const VendorManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const vendors = [
    { 
      id: 1, 
      name: 'TechSupply Co.', 
      email: 'contact@techsupply.com', 
      phone: '+91 98765 43210',
      category: 'Electronics',
      products: 45,
      status: 'active',
      joinDate: '2023-01-15'
    },
    { 
      id: 2, 
      name: 'Fashion Hub', 
      email: 'info@fashionhub.com', 
      phone: '+91 87654 32109',
      category: 'Fashion',
      products: 78,
      status: 'active',
      joinDate: '2023-03-22'
    },
    { 
      id: 3, 
      name: 'Sports World', 
      email: 'sales@sportsworld.com', 
      phone: '+91 76543 21098',
      category: 'Sports',
      products: 32,
      status: 'pending',
      joinDate: '2023-11-10'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Vendor
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search vendors..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Vendor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  vendor.status === 'active' ? 'bg-green-100 text-green-800' : 
                  vendor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {vendor.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {vendor.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {vendor.phone}
                </div>
                <div className="text-sm text-gray-600">
                  Category: <span className="font-medium">{vendor.category}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Products: <span className="font-medium">{vendor.products}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Joined: {vendor.joinDate}</span>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-900">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorManagement;