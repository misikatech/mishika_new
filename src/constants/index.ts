// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  CART_ITEMS: 'cart_items',
  CART_DATA: 'cart_data',
  WISHLIST_ITEMS: 'wishlist_items',
  THEME: 'theme',
} as const;

// Categories for CategoryGrid aas
export const CATEGORIES = [
  { id: '1', name: 'Bags', slug: 'bags', icon: '�' },
  { id: '2', name: 'Grocery', slug: 'grocery', icon: '�' },
  { id: '3', name: 'Textile Homes', slug: 'home-textile', icon: '🏠' },
  { id: '4', name: 'Garments', slug: 'garments', icon: '👕' },
  // { id: '5', name: 'Electronics', slug: 'electronics', icon: '�' },
  // { id: '6', name: 'Beauty', slug: 'beauty', icon: '💄' },
  // { id: '7', name: 'Sports', slug: 'sports', icon: '⚽' },
  // { id: '8', name: 'Books', slug: 'books', icon: '�' },
] as const;

// Contact Information
export const CONTACT_INFO = {
  ADDRESS: '123 Main Street, City, State 12345',
  PHONE: '+1 (555) 123-4567',
  EMAIL: 'contact@misika.com',
  WORKING_HOURS: 'Mon-Fri: 9AM-6PM',
} as const;

// Social Links
export const SOCIAL_LINKS = {
  FACEBOOK: { name: 'Facebook', url: 'https://facebook.com/misika', icon: 'facebook' },
  TWITTER: { name: 'Twitter', url: 'https://twitter.com/misika', icon: 'twitter' },
  INSTAGRAM: { name: 'Instagram', url: 'https://instagram.com/misika', icon: 'instagram' },
  LINKEDIN: { name: 'LinkedIn', url: 'https://linkedin.com/company/misika', icon: 'linkedin' },
} as const;

// Also keep the array version for iteration
export const SOCIAL_LINKS_ARRAY = [
  { name: 'Facebook', url: 'https://facebook.com/misika', icon: 'facebook' },
  { name: 'Twitter', url: 'https://twitter.com/misika', icon: 'twitter' },
  { name: 'Instagram', url: 'https://instagram.com/misika', icon: 'instagram' },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/misika', icon: 'linkedin' },
] as const;

// Sort Options
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popularity', label: 'Most Popular' },
] as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // Order endpoints
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
    CHECKOUT: '/orders/checkout',
    CANCEL: (id: string) => `/orders/${id}/cancel`,
  },
  
  // Other endpoints...
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: string) => `/products/${id}`,
    SEARCH: '/products/search',
  },
  
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: (itemId: string) => `/cart/update/${itemId}`,
    REMOVE: (itemId: string) => `/cart/remove/${itemId}`,
    CLEAR: '/cart/clear',
  },
  
  USER: {
    PROFILE: '/user/profile',
    WISHLIST: '/user/wishlist',
    ORDERS: '/user/orders',
  },
  
  CATEGORIES: {
    LIST: '/categories',
    CREATE: '/categories',
    UPDATE: '/categories',
    DELETE: '/categories',
    BY_SLUG: (slug: string) => `/categories/slug/${slug}`,
  },
  
  PAYMENT: {
    CREATE_INTENT: '/payment/create-intent',
    CONFIRM: '/payment/confirm',
  },
  
  PAYMENTS: {
    CREATE_INTENT: '/payments/create-intent',
    CONFIRM: '/payments/confirm',
    VERIFY: '/payments/verify',
  },
  
  ADDRESSES: {
    LIST: '/addresses',
    CREATE: '/addresses',
    UPDATE: '/addresses',
    DELETE: '/addresses',
    SET_DEFAULT: '/addresses',
  },
  
  CONTACT: {
    SUBMIT: '/contact',
    INFO: '/contact/info',
    FAQS: '/contact/faqs',
  },
  
  HOME: {
    BANNERS: '/home/banners',
    CATEGORIES: '/home/categories',
    FEATURED: '/home/featured',
    OFFERS: '/home/offers',
  },
  
  STATIC: {
    PAGES: '/static/pages',
    CONTENT: '/static/content',
    ABOUT: '/static/about',
    SERVICES: '/static/services',
  },
  
  WISHLIST: {
    LIST: '/user/wishlist',
    ADD: '/user/wishlist',
    REMOVE: '/user/wishlist',
    CLEAR: '/user/wishlist',
  },
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  CART: '/cart',
  WISHLIST: '/wishlist',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  ORDERS: '/orders',
  CONTACT: '/contact',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
} as const;

// Query Keys
export const QUERY_KEYS = {
  PRODUCTS: {
    ALL: ['products'],
    LIST: (params?: any) => ['products', 'list', params],
    DETAIL: (id: string) => ['products', 'detail', id],
    SEARCH: (query: string) => ['products', 'search', query],
    CATEGORIES: ['products', 'categories'],
    FEATURED: ['products', 'featured'],
  },
  CATEGORIES: {
    ALL: ['categories'],
    LIST: (params?: any) => ['categories', 'list', params],
    DETAIL: (id: string) => ['categories', 'detail', id],
    BY_SLUG: (slug: string) => ['categories', 'slug', slug],
    WITH_PRODUCT_COUNT: ['categories', 'with-product-count'],
  },
  ORDERS: {
    ALL: ['orders'],
    LIST: ['orders', 'list'],
    DETAIL: (id: string) => ['orders', 'detail', id],
  },
  USER: {
    PROFILE: ['user', 'profile'],
  },
  CART: {
    ITEMS: ['cart', 'items'],
  },
  WISHLIST: {
    LIST: ['wishlist', 'items'],

  },
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: false,
  },
  EMAIL: {
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PHONE: {
    REGEX: /^[0-9]{10}$/,
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`,
  PASSWORD_TOO_LONG: `Password must be less than ${VALIDATION_RULES.PASSWORD_MAX_LENGTH} characters`,
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  INVALID_CREDENTIALS: 'Invalid email or password',
  SERVER_ERROR: 'Something went wrong. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  FORBIDDEN: 'Access denied',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Please check your input and try again',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logged out successfully',
  REGISTER_SUCCESS: 'Registration successful!',
  PROFILE_UPDATED: 'Profile updated successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
  EMAIL_SENT: 'Email sent successfully',
  ITEM_ADDED_TO_CART: 'Item added to cart',
  ITEM_REMOVED_FROM_CART: 'Item removed from cart',
  CART_CLEARED: 'Cart cleared',
  ORDER_PLACED: 'Order placed successfully',
  ORDER_CANCELLED: 'Order cancelled successfully',
  ADDRESS_ADDED: 'Address added successfully',
  ADDRESS_UPDATED: 'Address updated successfully',
  ADDRESS_DELETED: 'Address deleted successfully',
  ITEM_ADDED_TO_WISHLIST: 'Item added to wishlist',
  ITEM_REMOVED_FROM_WISHLIST: 'Item removed from wishlist',
  WISHLIST_CLEARED: 'Wishlist cleared',
} as const;

// Order Status Configuration
export const ORDER_STATUS_CONFIG = {
  pending: { label: 'Pending', variant: 'warning' as const },
  confirmed: { label: 'Confirmed', variant: 'info' as const },
  processing: { label: 'Processing', variant: 'info' as const },
  shipped: { label: 'Shipped', variant: 'info' as const },
  delivered: { label: 'Delivered', variant: 'success' as const },
  cancelled: { label: 'Cancelled', variant: 'destructive' as const },
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'Misika',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Your favorite online shopping destination',
  PHONE: '8285016625',
  EMAIL: 'contact@misika.com',
  ADDRESS: 'Sector-62, Nodia, India, 201309',
  CURRENCY: 'INR',
  CURRENCY_SYMBOL: '₹',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
};
