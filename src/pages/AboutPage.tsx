import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Award, Globe, Heart, Truck, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../constants';

export const AboutPage: React.FC = () => {
  const stats = [
    { label: 'Happy Customers', value: '50,000+', icon: <Users className="w-8 h-8" /> },
    { label: 'Products Sold', value: '1M+', icon: <Award className="w-8 h-8" /> },
    { label: 'Countries Served', value: '25+', icon: <Globe className="w-8 h-8" /> },
    { label: 'Years of Excellence', value: '10+', icon: <Heart className="w-8 h-8" /> },
  ];

  const features = [
    {
      icon: <Truck className="w-12 h-12 text-blue-600" />,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to your doorstep with real-time tracking.',
    },
    {
      icon: <Shield className="w-12 h-12 text-green-600" />,
      title: 'Secure Shopping',
      description: 'Your data and payments are protected with industry-leading security.',
    },
    {
      icon: <Heart className="w-12 h-12 text-red-600" />,
      title: 'Customer First',
      description: 'Dedicated support team ready to help you with any questions or concerns.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '/images/team/sarah.jpg',
      bio: 'Passionate about creating exceptional shopping experiences.',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '/images/team/michael.jpg',
      bio: 'Leading our technology vision and innovation initiatives.',
    },
    {
      name: 'Emily Davis',
      role: 'Head of Design',
      image: '/images/team/emily.jpg',
      bio: 'Crafting beautiful and intuitive user experiences.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Misika</title>
        <meta name="description" content="Learn about Misika's mission, values, and the team behind your favorite shopping destination." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Misika</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              We're on a mission to make online shopping delightful, accessible, and sustainable for everyone.
            </p>
            <Button size="lg" variant="secondary">
              <a href="#story">Learn Our Story</a>
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4 text-blue-600">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section id="story" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Founded in 2014, Misika started as a small dream to revolutionize online shopping. 
                    We believed that buying products online should be as enjoyable and trustworthy as 
                    shopping with your favorite local store.
                  </p>
                  <p>
                    Today, we've grown into a global platform serving millions of customers worldwide, 
                    but our core values remain the same: quality products, exceptional service, and 
                    genuine care for our community.
                  </p>
                  <p>
                    Every product we offer is carefully curated, every feature we build is designed 
                    with you in mind, and every interaction we have is an opportunity to exceed your expectations.
                  </p>
                </div>
              </div>
              <div>
                <img
                  src="/images/about/story.jpg"
                  alt="Our Story"
                  className="rounded-lg shadow-lg w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission & Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're driven by a simple mission: to make shopping online better for everyone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg p-8 text-center shadow-sm">
                  <div className="flex justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The passionate people behind Misika who work every day to make your experience better.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = '/images/placeholder-avatar.jpg';
                    }}
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Shopping?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join millions of satisfied customers and discover why Misika is the preferred choice for online shopping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                <a href={ROUTES.PRODUCTS}>Browse Products</a>
              </Button>
              <Button size="lg" variant="outline">
                <a href={ROUTES.CONTACT}>Contact Us</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}; 
