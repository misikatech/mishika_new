import React, { useState } from 'react';
import { Filter, Grid, List, Star, ShoppingCart } from 'lucide-react';

interface CategoryPageProps {
  category: string;
  onProductClick: (product: any) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, onProductClick }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Mock products based on category
  const getProductsForCategory = (category: string) => {
    const baseProducts = {
      'Grocery': [
        { id: 1, name: 'Organic Basmati Rice 5kg', price: 12.99, rating: 4.8, reviews: 234, brand: 'Organic Valley', image: 'https://images.pexels.com/photos/33239/pruce-hungary-food-kitchen.jpg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
        { id: 2, name: 'Premium Olive Oil 500ml', price: 15.99, rating: 4.6, reviews: 156, brand: 'Mediterranean', image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
        { id: 3, name: 'Whole Wheat Flour 2kg', price: 8.99, rating: 4.5, reviews: 189, brand: 'Harvest', image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
        { id: 4, name: 'Fresh Almonds 1kg', price: 22.99, rating: 4.9, reviews: 98, brand: 'Nature\'s Best', image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }
      ],
      'Garments': [
        { id: 1, name: 'Cotton Casual Shirt', price: 29.99, rating: 4.6, reviews: 156, brand: 'StyleCraft', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
        { id: 2, name: 'Denim Jeans', price: 45.99, rating: 4.7, reviews: 203, brand: 'Urban Fit', image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
        { id: 3, name: 'Summer Dress', price: 39.99, rating: 4.8, reviews: 127, brand: 'Elegance', image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
        { id: 4, name: 'Wool Sweater', price: 55.99, rating: 4.5, reviews: 89, brand: 'Cozy Wear', image: 'https://images.pexels.com/photos/4210863/pexels-photo-4210863.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }
      ],
      'Bags': [
        { id: 1, name: 'Leather Laptop Backpack', price: 79.99, rating: 4.7, reviews: 312, brand: 'TechCarry', image: 'https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
        { id: 2, name: 'Designer Handbag', price: 125.99, rating: 4.9, reviews: 156, brand: 'LuxStyle', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
        { id: 3, name: 'Travel Duffel Bag', price: 65.99, rating: 4.6, reviews: 89, brand: 'Wanderlust', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
        { id: 4, name: 'School Backpack', price: 35.99, rating: 4.4, reviews: 234, brand: 'StudyPack', image: 'https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }
      ],
      'Home Textile': [
        { id: 1, name: 'Premium Cotton Bedsheet Set', price: 45.99, rating: 4.9, reviews: 89, brand: 'ComfortZone', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
        { id: 2, name: 'Blackout Curtains', price: 35.99, rating: 4.6, reviews: 67, brand: 'HomeDecor', image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
        { id: 3, name: 'Throw Pillow Set', price: 25.99, rating: 4.7, reviews: 123, brand: 'CozyHome', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
        { id: 4, name: 'Bath Towel Set', price: 29.99, rating: 4.8, reviews: 156, brand: 'SoftTouch', image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }
      ]
    };
    return baseProducts[category as keyof typeof baseProducts] || [];
  };

  const products = getProductsForCategory(category);
  const brands = [...new Set(products.map(p => p.brand))];

  const ProductCard = ({ product, isListView }: { product: any; isListView: boolean }) => (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
        isListView ? 'flex items-center p-4' : 'overflow-hidden'
      }`}
      onClick={() => onProductClick(product)}
    >
      <img
        src={product.image}
        alt={product.name}
        className={`object-cover ${
          isListView ? 'w-24 h-24 rounded-lg mr-4' : 'w-full h-48'
        }`}
      />
      <div className={`${isListView ? 'flex-1' : 'p-4'}`}>
        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
        <div className="flex items-center mb-2">
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
        <div className={`flex ${isListView ? 'justify-between' : 'flex-col'} items-${isListView ? 'center' : 'start'}`}>
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          <button className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors ${isListView ? '' : 'mt-2 w-full'}`}>
            <ShoppingCart size={16} className="inline mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{category}</h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <p className="text-gray-600">Showing {products.length} products</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                >
                  <List size={20} />
                </button>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="popularity">Sort by Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter size={20} className="mr-2" />
                Filters
              </h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Brands</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBrands([...selectedBrands, brand]);
                          } else {
                            setSelectedBrands(selectedBrands.filter(b => b !== brand));
                          }
                        }}
                        className="mr-2"
                      />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="font-medium mb-2">Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm">& above</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isListView={viewMode === 'list'} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;