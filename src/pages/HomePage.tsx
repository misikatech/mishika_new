import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from '../components/home/HeroSection';
import { TodaysDeals } from '../components/home/TodaysDeals';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { PopularByCategory } from '../components/home/PopularByCategory';
import { FeaturedProducts } from '../components/home/FeaturedProducts';

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Misika - Your Favorite Online Shopping Destination</title>
        <meta name="description" content="Discover amazing products at great prices. Shop groceries, electronics, garments and more at Misika." />
      </Helmet>

      <HeroSection />
      {/* <TodaysDeals /> */}
      <CategoryGrid />
      <PopularByCategory />
      {/* <FeaturedProducts /> */}
    </>
  );
};

export default HomePage;
