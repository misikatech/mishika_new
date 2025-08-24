import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { useCategories } from '../../hooks/useCategories';
import { useProducts } from '../../hooks/useProducts';
import { ROUTES } from '../../constants';
import { formatPrice } from '../../utils';
import { Product } from '../../types';

interface CategoryProductsProps {
  categoryId: string;
  categoryName: string;
  categorySlug: string;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({ categoryId, categoryName, categorySlug }) => {
  const { data: productsResponse, isLoading } = useProducts({
    category: categorySlug,
    limit: 2,
    sortBy: 'created_at',
    sortOrder: 'desc'
  });

  const products: Product[] = (() => {
    let rawProducts: any[] = [];
    
    if (Array.isArray(productsResponse?.data)) {
      rawProducts = productsResponse.data;
    } else if (Array.isArray((productsResponse?.data as any)?.products)) {
      rawProducts = (productsResponse?.data as any).products;
    }
    
    return rawProducts.map((apiProduct: any) => ({
      ...apiProduct,
      originalPrice: apiProduct.price,
      tags: apiProduct.tags || [],
      rating: apiProduct.rating || 0,
      reviewCount: apiProduct.reviewCount || 0,
    }));
  })();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">{categoryName}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">{categoryName}</h3>
        <Link 
          to={`${ROUTES.PRODUCTS}?category=${categorySlug}`}
          className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View All
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            to={ROUTES.PRODUCT_DETAIL(product.id)}
            className="group bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            <div className="aspect-square overflow-hidden bg-gray-100">
              <img
                src={product.images?.[0] || '/placeholder-image.jpg'}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="p-4">
              <h4 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h4>
              
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < Math.floor(product.rating || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">
                  ({product.reviewCount || 0})
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(product.salePrice || product.price)}
                </span>
                {product.salePrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const PopularByCategory: React.FC = () => {
  const { data: categoriesResponse, isLoading: categoriesLoading } = useCategories({ isActive: true });

  const categories = Array.isArray(categoriesResponse?.data)
    ? categoriesResponse?.data
    : [];

  if (categoriesLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular in Each Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the most loved products from every category
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map((j) => (
                    <div key={j} className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular in Each Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most loved products from every category
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category) => {
            const categorySlug = 'slug' in category ? category.slug : category.id;
            return (
              <CategoryProducts
                key={category.id}
                categoryId={category.id}
                categoryName={category.name}
                categorySlug={categorySlug || ''}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
