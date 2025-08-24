import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Grid, 
  List, 
  Heart, 
  Eye, 
  Star, 
  ChevronDown,
  Search,
  X,
  SlidersHorizontal
} from 'lucide-react';
import { ROUTES, CATEGORIES, SORT_OPTIONS, PAGINATION } from '../constants';
import { cn, formatCurrency, calculateDiscountPercentage } from '../utils';

const ProductListingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock products data
  const products = [
    {
      id: 1,
      name: "Organic Basmati Rice 5kg",
      price: 299,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
      category: "grocery",
      rating: 4.5,
      reviews: 128,
      inStock: true,
      isWishlisted: false,
      discount: 25,
      tags: ["organic", "best-seller"]
    },
    {
      id: 2,
      name: "Wireless Bluetooth Headphones",
      price: 1299,
      originalPrice: 1999,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "electronics",
      rating: 4.8,
      reviews: 256,
      inStock: true,
      isWishlisted: true,
      discount: 35,
      tags: ["wireless", "trending"]
    },
    {
      id: 3,
      name: "Premium Cotton T-Shirt",
      price: 599,
      originalPrice: 899,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      category: "garments",
      rating: 4.3,
      reviews: 89,
      inStock: true,
      isWishlisted: false,
      discount: 33,
      tags: ["cotton", "premium"]
    },
    {
      id: 4,
      name: "Smart Fitness Watch",
      price: 2499,
      originalPrice: 3499,
      image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop",
      category: "electronics",
      rating: 4.7,
      reviews: 342,
      inStock: false,
      isWishlisted: false,
      discount: 29,
      tags: ["smart", "fitness"]
    },
    {
      id: 5,
      name: "Leather Crossbody Bag",
      price: 899,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
      category: "bags",
      rating: 4.6,
      reviews: 156,
      inStock: true,
      isWishlisted: true,
      discount: 31,
      tags: ["leather", "stylish"]
    },
    {
      id: 6,
      name: "Organic Honey 500g",
      price: 199,
      originalPrice: 299,
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
      category: "grocery",
      rating: 4.4,
      reviews: 78,
      inStock: true,
      isWishlisted: false,
      discount: 33,
      tags: ["organic", "natural"]
    },
    {
      id: 7,
      name: "Running Shoes",
      price: 1499,
      originalPrice: 1999,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      category: "sports",
      rating: 4.9,
      reviews: 423,
      inStock: true,
      isWishlisted: false,
      discount: 25,
      tags: ["running", "comfortable"]
    },
    {
      id: 8,
      name: "Cotton Bed Sheets",
      price: 799,
      originalPrice: 999,
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop",
      category: "home-textile",
      rating: 4.2,
      reviews: 67,
      inStock: true,
      isWishlisted: false,
      discount: 20,
      tags: ["cotton", "bedding"]
    }
  ];

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(Math.floor(product.rating));
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesPrice && matchesRating && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popularity':
        return b.reviews - a.reviews;
      default:
        return b.id - a.id; // newest first
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / PAGINATION.DEFAULT_PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGINATION.DEFAULT_PAGE_SIZE;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + PAGINATION.DEFAULT_PAGE_SIZE);

  const handleWishlistToggle = (productId: number) => {
    // TODO: Implement wishlist functionality
    console.log('Toggle wishlist for product:', productId);
  };

  const handleQuickView = (productId: number) => {
    // TODO: Implement quick view functionality
    console.log('Quick view for product:', productId);
  };

  const handleAddToCart = (productId: number) => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', productId);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 10000]);
    setSelectedRatings([]);
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <>
      <Helmet>
        <title>Products - Misika</title>
        <meta name="description" content="Browse our wide selection of products at Misika. Find the best deals on groceries, electronics, garments, and more." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
            <p className="text-gray-600">
              Showing {paginatedProducts.length} of {sortedProducts.length} products
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-4 md:mt-0 relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.slug}
                        checked={selectedCategory === category.slug}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">₹{priceRange[0]}</span>
                    <span className="text-sm text-gray-600">₹{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* Ratings */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Ratings</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRatings([...selectedRatings, rating]);
                          } else {
                            setSelectedRatings(selectedRatings.filter(r => r !== rating));
                          }
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="flex items-center ml-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            )}
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-600">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "p-2 rounded",
                      viewMode === 'grid' ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"
                    )}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      "p-2 rounded",
                      viewMode === 'list' ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"
                    )}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden bg-white rounded-lg shadow-md p-4 mb-6"
                >
                  {/* Mobile filter content - simplified version */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Category</h3>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      >
                        <option value="">All Categories</option>
                        {CATEGORIES.map((category) => (
                          <option key={category.id} value={category.slug}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Sort By</h3>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      >
                        {SORT_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Products Grid */}
            <div className={cn(
              "grid gap-6",
              viewMode === 'grid' 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            )}>
              <AnimatePresence>
                {paginatedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow",
                      viewMode === 'list' && "flex"
                    )}
                  >
                    {/* Product Image */}
                    <div className={cn(
                      "relative",
                      viewMode === 'grid' ? "h-48" : "w-48 h-48"
                    )}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Discount Badge */}
                      {product.discount > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          -{product.discount}%
                        </div>
                      )}

                      {/* Stock Badge */}
                      {!product.inStock && (
                        <div className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          Out of Stock
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 flex flex-col space-y-2">
                        <button
                          onClick={() => handleWishlistToggle(product.id)}
                          className={cn(
                            "p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors",
                            product.isWishlisted && "text-red-500"
                          )}
                        >
                          <Heart className={cn("h-4 w-4", product.isWishlisted && "fill-current")} />
                        </button>
                        <button
                          onClick={() => handleQuickView(product.id)}
                          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className={cn("p-4", viewMode === 'list' && "flex-1")}>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-gray-600 text-sm ml-2">
                          ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-lg font-bold text-blue-600">
                            {formatCurrency(product.price)}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-gray-500 line-through ml-2">
                              {formatCurrency(product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product.id)}
                        disabled={!product.inStock}
                        className={cn(
                          "w-full py-2 px-4 rounded-lg font-medium transition-colors",
                          product.inStock
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        )}
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-8">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={cn(
                          "px-3 py-2 border rounded-lg",
                          currentPage === page
                            ? "bg-blue-600 text-white border-blue-600"
                            : "border-gray-300 hover:bg-gray-50"
                        )}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListingPage; 