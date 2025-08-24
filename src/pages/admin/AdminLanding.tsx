import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Store, 
  // Inventory,
  TrendingUp,
  DollarSign 
} from 'lucide-react';

const AdminLanding: React.FC = () => {
  const adminModules = [
    {
      title: 'Dashboard',
      description: 'Overview of your store performance',
      icon: BarChart3,
      link: '/admin/dashboard',
      color: 'bg-blue-500'
    },
    {
      title: 'Product Management',
      description: 'Manage your product catalog',
      icon: Package,
      link: '/admin/products',
      color: 'bg-green-500'
    },
    {
      title: 'Category Management',
      description: 'Manage product categories',
      icon: Package,
      link: '/admin/categories',
      color: 'bg-blue-500'
    },
    {
      title: 'Inventory',
      description: 'Track stock levels and inventory',
      icon: Store,
      link: '/admin/inventory',
      color: 'bg-yellow-500'
    },
    {
      title: 'Order Management',
      description: 'Process and track orders',
      icon: ShoppingCart,
      link: '/admin/orders',
      color: 'bg-purple-500'
    },
    {
      title: 'User Management',
      description: 'Manage customers and users',
      icon: Users,
      link: '/admin/users',
      color: 'bg-red-500'
    },
    {
      title: 'Vendor Management',
      description: 'Manage vendors and suppliers',
      icon: Store,
      link: '/admin/vendors',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Panel</h1>
          <p className="text-xl text-gray-600">Manage your e-commerce store</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminModules.map((module) => (
            <Link
              key={module.title}
              to={module.link}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 group"
            >
              <div className={`${module.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <module.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h3>
              <p className="text-gray-600">{module.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminLanding;
