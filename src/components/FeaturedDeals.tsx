import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';

interface FeaturedDealsProps {
  onProductClick: (product: any) => void;
}

const FeaturedDeals: React.FC<FeaturedDealsProps> = ({ onProductClick }) => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Organic Basmati Rice 5kg',
      category: 'Grocery',
      price: 12.99,
      originalPrice: 15.99,
      discount: 19,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.pexels.com/photos/33239/pruce-hungary-food-kitchen.jpg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Cotton Casual Shirt',
      category: 'Garments',
      price: 29.99,
      originalPrice: 39.99,
      discount: 25,
      rating: 4.6,
      reviews: 156,
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      badge: 'New Arrival'
    },
    {
      id: 3,
      name: 'Premium Cotton Bedsheet Set',
      category: 'Home Textile',
      price: 45.99,
      originalPrice: 65.99,
      discount: 30,
      rating: 4.9,
      reviews: 89,
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      badge: 'Hot Deal'
    },
    {
      id: 4,
      name: 'Leather Laptop Backpack',
      category: 'Bags',
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      rating: 4.7,
      reviews: 312,
      image: 'https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
      badge: 'Limited Time'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Today's Special Deals
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don't miss out on these amazing offers. Limited time only!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              onClick={() => onProductClick(product)}
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.badge}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                    -{product.discount}%
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="text-sm text-indigo-600 font-medium mb-2">
                  {product.category}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2">
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
            View All Deals
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;