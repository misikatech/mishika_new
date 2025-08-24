import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Enhanced3DProductCard } from '../product/Enhanced3DProductCard';
import { Button } from '../ui/Button';
import { productService } from '../../services/products';
import { QUERY_KEYS, ROUTES } from '../../constants';
import { Product } from '../../types';

export const TodaysDeals: React.FC = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.LIST({ featured: true, limit: 4 }),
    queryFn: () => productService.getProducts({ featured: true, limit: 4 }),
  });

  // Mock data for demonstration
  const mockDeals = [
    {
      id: '1',
      name: 'Organic Basmati Rice 5kg',
      price: 299,
      originalPrice: 399,
      images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop'],
      category: { id: '1', name: 'Grocery', slug: 'grocery' },
      rating: 4.8,
      reviewCount: 234,
      sku: 'RICE-001',
      stock: 50,
      isActive: true,
      tags: ['organic'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Wireless Bluetooth Headphones',
      price: 1299,
      originalPrice: 1999,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'],
      category: { id: '2', name: 'Electronics', slug: 'electronics' },
      rating: 4.6,
      reviewCount: 156,
      sku: 'HEAD-001',
      stock: 25,
      isActive: true,
      tags: ['wireless'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Premium Cotton Bedsheet Set',
      price: 899,
      originalPrice: 1299,
      images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop'],
      category: { id: '3', name: 'Home Textile', slug: 'home-textile' },
      rating: 4.9,
      reviewCount: 89,
      sku: 'BED-001',
      stock: 15,
      isActive: true,
      tags: ['cotton'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Leather Laptop Backpack',
      price: 1599,
      originalPrice: 2199,
      images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop'],
      category: { id: '4', name: 'Bags', slug: 'bags' },
      rating: 4.7,
      reviewCount: 312,
      sku: 'BAG-001',
      stock: 8,
      isActive: true,
      tags: ['leather'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ] as Product[];

  const dealsData = products?.items || mockDeals;
  const badges = ['Best Seller', 'New Arrival', 'Hot Deal', 'Limited Time'];
  const badgeColors: ('orange' | 'red' | 'green' | 'blue')[] = ['orange', 'red', 'green', 'blue'];

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Today's Special Deals
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index: number) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-2xl mb-4" />
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

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Today's Special Deals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these amazing limited-time offers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {dealsData.slice(0, 4).map((product: Product, index: number) => (
            <Enhanced3DProductCard 
              key={product.id} 
              product={product}
              showBadge={true}
              badgeText={badges[index]}
              badgeColor={badgeColors[index]}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            onClick={() => window.location.href = ROUTES.PRODUCTS}
          >
            View All Deals
          </Button>
        </div>
      </div>
    </section>
  );
};