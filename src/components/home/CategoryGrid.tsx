import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';
import { CATEGORIES, ROUTES } from '../../constants';
import { useCategories } from '../../hooks/useCategories';
import { Category } from '../../services/categories';

interface CategoryCardProps {
  category: Category | typeof CATEGORIES[number];
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  // Handle both API categories and fallback categories
  const isApiCategory = 'id' in category && typeof category.id === 'string' && category.id.length > 10;
  const categorySlug = isApiCategory ? (category as Category).slug : (category as typeof CATEGORIES[number]).slug;
  const categoryName = category.name;
  const categoryIcon = isApiCategory ? <Package className="w-8 h-8" /> : (category as typeof CATEGORIES[number]).icon;
  const productCount = isApiCategory ? (category as Category).productCount : undefined;

  return (
    <Link
      to={`${ROUTES.PRODUCTS}?category=${categorySlug}`}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="aspect-square p-6 flex flex-col items-center justify-center text-center">
        <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {categoryIcon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {categoryName}
        </h3>
        {productCount !== undefined && (
          <p className="text-sm text-gray-500 mb-2">
            {productCount} products
          </p>
        )}
        <div className="flex items-center text-sm text-blue-600 group-hover:text-blue-700">
          <span>Shop Now</span>
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
};

export const CategoryGrid: React.FC = () => {
  const { data: categoriesResponse, isLoading, error } = useCategories({ isActive: true });

  // Use API categories if available, otherwise fallback to static categories
  const categories = categoriesResponse?.data || CATEGORIES;

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our wide range of products across different categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="aspect-square bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse">
                <div className="p-6 flex flex-col items-center justify-center text-center h-full">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="w-16 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of products across different categories
          </p>
          {error && (
            <p className="text-sm text-orange-600 mt-2">
              Using offline categories (API unavailable)
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};
