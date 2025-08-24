import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, Package } from 'lucide-react';

const Inventory: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const inventoryStats = [
    { title: 'Total Products', value: '1,234', change: '+12%', icon: Package, color: 'blue' },
    { title: 'Low Stock Items', value: '23', change: '+5%', icon: AlertTriangle, color: 'red' },
    { title: 'Out of Stock', value: '8', change: '-2%', icon: TrendingDown, color: 'orange' },
    { title: 'Total Value', value: '₹12,45,678', change: '+18%', icon: TrendingUp, color: 'green' },
  ];

  const lowStockItems = [
    { id: 1, name: 'iPhone 15 Pro', currentStock: 5, minStock: 10, category: 'Electronics' },
    { id: 2, name: 'Nike Air Max', currentStock: 3, minStock: 15, category: 'Sports' },
    { id: 3, name: 'Samsung TV', currentStock: 2, minStock: 8, category: 'Electronics' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Inventory Management</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {inventoryStats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Low Stock Alert</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Category</th>
                  <th className="text-left py-2">Current Stock</th>
                  <th className="text-left py-2">Min Stock</th>
                  <th className="text-left py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3">{item.name}</td>
                    <td className="py-3">{item.category}</td>
                    <td className="py-3">
                      <span className="text-red-600 font-medium">{item.currentStock}</span>
                    </td>
                    <td className="py-3">{item.minStock}</td>
                    <td className="py-3">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                        Restock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;