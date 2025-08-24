import React, { useState } from 'react';
import { Mail, Gift, Truck, Shield, Clock } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const benefits = [
    {
      icon: <Truck size={24} />,
      title: 'Free Shipping',
      description: 'On orders over $50'
    },
    {
      icon: <Shield size={24} />,
      title: 'Secure Payment',
      description: '100% secure transactions'
    },
    {
      icon: <Clock size={24} />,
      title: '24/7 Support',
      description: 'Round the clock assistance'
    },
    {
      icon: <Gift size={24} />,
      title: 'Special Offers',
      description: 'Exclusive deals for subscribers'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="container mx-auto px-4">
        {/* Newsletter Subscription */}
        <div className="text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with Our Latest Offers
            </h2>
            <p className="text-indigo-100 text-lg mb-8">
              Subscribe to our newsletter and be the first to know about new products, special deals, and exclusive discounts!
            </p>

            {isSubscribed ? (
              <div className="bg-green-500 text-white p-4 rounded-lg inline-flex items-center space-x-2">
                <Mail size={20} />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                  >
                    Subscribe Now
                  </button>
                </div>
              </form>
            )}

            <p className="text-indigo-200 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center text-white"
            >
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-indigo-100">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;