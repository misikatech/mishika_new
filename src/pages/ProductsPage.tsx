import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {ProductCard} from '../components/product/ProductCard';
import { Product } from '../types'; // Use Product from types instead of services
import {  Grid, List, Package } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCategoriesWithProductCount } from '../hooks/useCategories';
// import { LoadingSpinner } from '../components/ui/LoadingSpinner';

interface Category {
  id: string;
  name: string;
  slug?: string;
  productCount?: number;
  count?: number;
}

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'rating' | 'createdAt'>('name');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch categories with product count
  const { data: categoriesResponse } = useCategoriesWithProductCount();

  // Fetch products with filters - this will now show real data from admin panel
  const { data: productsResponse, isLoading: productsLoading, error: productsError } = useProducts({
    category: selectedCategory || undefined,
    page: currentPage,
    limit: 12,
    sortBy: sortBy === 'price-low' || sortBy === 'price-high' ? 'price' : sortBy === 'rating' ? 'createdAt' : sortBy,
    sortOrder: sortBy === 'price-high' ? 'desc' : 'asc',
  });

  // Handle different response structures and transform to match Product interface
  const products: Product[] = (() => {
    let rawProducts: any[] = [];
    
    if (Array.isArray(productsResponse?.data)) {
      rawProducts = productsResponse.data;
    } else if (Array.isArray((productsResponse?.data as any)?.products)) {
      rawProducts = (productsResponse?.data as any).products;
    }
    
    // Transform API products to match Product interface
    return rawProducts.map((apiProduct: any) => ({
      ...apiProduct,
      originalPrice: apiProduct.price,
      tags: apiProduct.tags || [],
      rating: apiProduct.rating || 0,
      reviewCount: apiProduct.reviewCount || 0,
    }));
  })();

  const categories: Category[] = Array.isArray(categoriesResponse?.data)
    ? categoriesResponse.data
    : Array.isArray(categoriesResponse?.data?.categories)
      ? categoriesResponse.data.categories
      : [];

  // const pagination = productsResponse?.pagination;

  // Products are already filtered by the API based on selectedCategory
  const filteredProducts = products;

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1); // Reset to first page when changing category
    if (categorySlug) {
      setSearchParams({ category: categorySlug });
    } else {
      setSearchParams({});
    }
  };

  // Update selected category when URL params change
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || '';
    setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  return (
    <>
      <Helmet>
        <title>
          {selectedCategory
            ? `${categories.find((c: Category) => ('slug' in c ? c.slug : c.id) === selectedCategory)?.name || 'Products'} - Mishika`
            : 'All Products - Mishika'
          }
        </title>
        <meta
          name="description"
          content={selectedCategory
            ? `Browse our ${categories.find((c: Category) => ('slug' in c ? c.slug : c.id) === selectedCategory)?.name || 'products'} collection`
            : 'Browse all products in our online store'
          }
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange('')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    !selectedCategory ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  All Products
                </button>
                {categories.map((category: Category) => {
                  const categorySlug = ('slug' in category ? category.slug : category.id) || '';
                  const productCount = ('productCount' in category ? category.productCount : category.count) || 0;
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(categorySlug)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex justify-between ${
                        selectedCategory === categorySlug ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="flex items-center">
                        <Package className="w-4 h-4 mr-2" />
                        {category.name}
                      </span>
                      <span className="text-sm text-gray-500">({productCount})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {selectedCategory
                    ? categories.find((c: Category) => ('slug' in c ? c.slug : c.id) === selectedCategory)?.name || 'Products'
                    : 'All Products'
                  }
                </h1>
                <p className="text-gray-600">{filteredProducts.length} products found</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
                
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {productsLoading ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : productsError ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Unable to load products</h3>
                <p className="text-gray-500 mb-4">There was an error loading products. Please try again later.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">
                  {selectedCategory
                    ? `No products found in this category. Try browsing other categories.`
                    : 'No products available at the moment.'
                  }
                </p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductsPage;
