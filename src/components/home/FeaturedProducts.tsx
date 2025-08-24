import React from 'react';
import { useQuery } from '@tanstack/react-query';
// import { Link } from 'react-router-dom';
// import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '../ui/Button';
import { ProductCard } from '../product/ProductCard';
import { productService } from '../../services/products';
import { QUERY_KEYS, ROUTES } from '../../constants';
import { Product } from '../../types';

export const FeaturedProducts: React.FC = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.LIST({ featured: true, limit: 8 }),
    queryFn: () => productService.getProducts({ featured: true, limit: 8 }),
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index: number) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                <div className="h-6 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !products?.items?.length) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.items.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.href = ROUTES.PRODUCTS}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};