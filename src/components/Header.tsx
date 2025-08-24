import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search, Heart, LogOut, ChevronDown, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ROUTES, CATEGORIES } from '../constants';
import { Button } from './ui/Button';
import { useCategories } from '../hooks/useCategories';

interface Category {
  id: string;
  name: string;
  slug?: string;
  icon?: string | React.ReactNode;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  // Debug log to check auth state
  console.log('Header - Auth state:', { user, isAuthenticated });

  // Fetch categories from API
  const { data: categoriesResponse } = useCategories({ isActive: true });
  const categories: Category[] = Array.isArray((categoriesResponse as any)?.data) 
    ? (categoriesResponse as any).data 
    : CATEGORIES;

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 shadow-sm border-b border-gray-200">
      {/* Top info bar */}
      <div className="bg-indigo-600 text-white text-sm text-center py-1">
        Free shipping on orders over $50 | 24/7 Customer Support
      </div>

      {/* Main header */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4 h-[65px]">
          {/* Logo and Tagline */}
          <div className="flex items-center space-x-3">
            <Link to={ROUTES.HOME} className="text-2xl font-bold text-indigo-600">
              Mishika.co
            </Link>
            {/* <span className="text-gray-700 font-medium hidden sm:inline ">All Under One Roof</span> */}
          </div>

          {/* Search Bar */}
          {/* <div className="w-full md:max-w-xl">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div> */}
          <div className="w-full md:max-w-xl relative">
  <input
    type="text"
    placeholder="Search for products..."
    className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
  />
  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-indigo-600">
    <Search className="w-5 h-5" />
  </button>
</div>


          {/* Cart and User */}
          <div className="flex items-center space-x-4">
            {/* <button className="p-2 text-gray-600 hover:text-indigo-600 transition-colors">
              <Search className="w-5 h-5" />
            </button> */}

            {isAuthenticated && (
              <Link to={ROUTES.WISHLIST} className="p-2 text-gray-600 hover:text-indigo-600 transition-colors">
                <Heart className="w-5 h-5" />
              </Link>
            )}

            <Link to={ROUTES.CART} className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-indigo-600 transition-colors">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{user?.username}</span>
                </button>
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link
                      to={ROUTES.PROFILE}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to={ROUTES.ORDERS}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 inline mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center ">
                {/* <Link to={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Sign Up
                  </Button>
                </Link> */}
                <Link to={ROUTES.LOGIN}>
  <button className="text-md font-semibold text-gray-800 hover:text-indigo-600 hover:underline underline-offset-2 py-2 rounded-md transition-colors">
    Sign In
  </button>
</Link>

              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sub-navigation */}
      <nav className="bg-gray-50 border-t border-gray-200 hidden md:flex">
        <div className="container mx-auto px-4 py-2 flex items-center space-x-8 text-sm font-medium text-gray-700 h-[50px]">
          <Link to={ROUTES.HOME} className="hover:text-indigo-600 text-[18px]">Home</Link>

          {/* Categories dropdown */}
          {/* <div
            className="relative group"
            onMouseEnter={() => setIsCategoryOpen(true)}
            onMouseLeave={() => setIsCategoryOpen(false)}
          >
            <button className="flex items-center space-x-1 hover:text-indigo-600">
              <span>Categories</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isCategoryOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Shop by Category</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map((category) => (
                      <Link
                        key={category.id}
                        to={`${ROUTES.PRODUCTS}?category=${category.slug}`}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{category.name}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div> */}

<div
  className="relative"
  onMouseEnter={() => setIsCategoryOpen(true)}
  onMouseLeave={() => setIsCategoryOpen(false)}
>
  <button className="flex items-center space-x-1 hover:text-indigo-600 text-[18px] px-2 py-2">
    <span>Categories</span>
    <ChevronDown className="w-4 h-4" />
  </button>

  {isCategoryOpen && (
    <div className="absolute top-3/4 left-0 mt-2 w-[320px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200 ease-in-out">
      <div className="grid grid-cols-1 gap-1 p-2">
        {categories.map((category: Category) => {
          const categorySlug = 'slug' in category ? category.slug : category.id;
          return (
            <Link
              key={category.id}
              to={`${ROUTES.PRODUCTS}?category=${categorySlug}`}
              className="flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Package className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 font-medium text-[16px]">{category.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  )}
</div>

          <Link to="#" className="hover:text-indigo-600 text-[18px]">Offers</Link>
          <Link to="/contact" className="hover:text-indigo-600 text-[18px]">Contact</Link>
          {/* <Link to="#" className="hover:text-indigo-600 text-[18px]">Business Policy</Link> */}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 py-4">
          <nav className="flex flex-col space-y-4 px-4">
            <Link to={ROUTES.HOME} className="text-gray-700 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category: Category) => {
                  const categorySlug = 'slug' in category ? category.slug : category.id;
                  const categoryIcon = 'icon' in category ? category.icon : <Package className="w-5 h-5" />;
                  return (
                    <Link
                      key={category.id}
                      to={`${ROUTES.PRODUCTS}?category=${categorySlug}`}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-xl">{categoryIcon}</span>
                      <span className="text-sm">{category.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {isAuthenticated ? (
              <>
                <Link to={ROUTES.PROFILE} className="text-gray-700 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                <Link to={ROUTES.ORDERS} className="text-gray-700 hover:text-indigo-600" onClick={() => setIsMenuOpen(false)}>Orders</Link>
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-left text-gray-700 hover:text-indigo-600">
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Link to={ROUTES.LOGIN} onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Sign In</Button>
                </Link>
                <Link to={ROUTES.REGISTER} onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
