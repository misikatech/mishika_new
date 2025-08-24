import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CategoriesProps {
  onCategoryClick: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategoryClick }) => {
  const categories = [
    {
      id: 1,
      name: 'Grocery',
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
      description: 'Fresh produce, pantry essentials, and daily necessities',
      itemCount: '1000+ items',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 2,
      name: 'Garments',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
      description: 'Fashion for men, women, and kids of all ages',
      itemCount: '2500+ items',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 3,
      name: 'Bags',
      image: 'https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
      description: 'Handbags, backpacks, and travel essentials',
      itemCount: '500+ items',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 4,
      name: 'Home Textile',
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
      description: 'Bedding, curtains, and home decoration items',
      itemCount: '800+ items',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Categories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our wide range of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => onCategoryClick(category.name)}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-80 transition-opacity duration-300`}></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white text-center">
                      <ArrowRight size={32} className="mx-auto mb-2" />
                      <span className="text-lg font-semibold">Shop Now</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-indigo-600">
                      {category.itemCount}
                    </span>
                    <ArrowRight 
                      size={20} 
                      className="text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-300" 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Browse all categories
          </p>
          <button className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;