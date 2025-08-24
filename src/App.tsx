import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Layout } from './components/Layout';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ROUTES } from './constants';
import WishlistPage from './pages/WishlistPage';
import AdminRoute from './components/AdminRoute';

// Lazy load pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));
const OrderConfirmationPage = React.lazy(() => import('./pages/OrderConfirmationPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

// Auth pages
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('./pages/auth/ResetPasswordPage'));

// Add these imports
import AdminLanding from './pages/admin/AdminLanding';
import ProductList from './pages/admin/ProductList';
import Inventory from './pages/admin/Inventory';
import VendorManagement from './pages/admin/VendorManagement';
import OrderManagement from './pages/admin/OrderManagement';
import UserManagement from './pages/admin/UserManagement';
import CategoryManagement from './pages/admin/CategoryManagement';
const AdminLoginPage = React.lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminRegisterPage = React.lazy(() => import('./pages/admin/AdminRegisterPage'));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Layout>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path={ROUTES.HOME} element={<HomePage />} />
                  <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path={ROUTES.CONTACT} element={<ContactPage />} />
                  
                  {/* Auth Routes */}
                  <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                  <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                  <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
                  <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
                  
                  {/* Admin Auth Routes */}
                  <Route path="/admin-auth/login" element={<AdminLoginPage />} />
                  <Route path="/admin-auth/register" element={<AdminRegisterPage />} />
                  
                  {/* Protected Routes */}
                  <Route path={ROUTES.CART} element={<CartPage />} />
                  <Route path={ROUTES.WISHLIST} element={<WishlistPage />} />
                  <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
                  <Route path="/orders/:id/confirmation" element={<OrderConfirmationPage />} />
                  <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
                  
                  {/* Admin Routes - Protected */}
                  <Route path="/admin" element={<AdminRoute><AdminLanding /></AdminRoute>} />
                  <Route path="/admin/products" element={<AdminRoute><ProductList /></AdminRoute>} />
                  <Route path="/admin/categories" element={<AdminRoute><CategoryManagement /></AdminRoute>} />
                  <Route path="/admin/inventory" element={<AdminRoute><Inventory /></AdminRoute>} />
                  <Route path="/admin/vendors" element={<AdminRoute><VendorManagement /></AdminRoute>} />
                  <Route path="/admin/orders" element={<AdminRoute><OrderManagement /></AdminRoute>} />
                  <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </Layout>
            
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
