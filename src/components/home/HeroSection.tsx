import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingBag, Package, Home, Shirt } from 'lucide-react';
import { Button } from '../ui/Button';
import { BannerSlide } from '../../types';
import { useProducts } from '../../hooks/useProducts';
import { ROUTES } from '../../constants';

const heroSlides: BannerSlide[] = [
  {
    id: '1',
    title: 'Premium Bags Collection',
    subtitle: 'Style Meets Functionality',
    description: 'Discover our exclusive range of bags for every occasion - from elegant handbags to durable backpacks',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80',
    ctaText: 'Shop Bags',
    ctaLink: '/products?category=bags',
    isActive: true,
    order: 1,
  },
  {
    id: '2',
    title: 'Fresh Grocery Delivered',
    subtitle: 'Farm to Your Table',
    description: 'Get the freshest groceries delivered to your doorstep. Quality ingredients for your healthy lifestyle',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80',
    ctaText: 'Shop Grocery',
    ctaLink: '/products?category=grocery',
    isActive: true,
    order: 2,
  },
  {
    id: '3',
    title: 'Luxurious Home Textiles',
    subtitle: 'Transform Your Space',
    description: 'Premium bedding, curtains, and home decor to create your perfect sanctuary',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80',
    ctaText: 'Shop Home Textiles',
    ctaLink: '/products?category=home-textile',
    isActive: true,
    order: 3,
  },
  {
    id: '4',
    title: 'Fashion Forward Garments',
    subtitle: 'Express Your Style',
    description: 'Trendy clothing for every season. From casual wear to formal attire, find your perfect fit',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80',
    ctaText: 'Shop Garments',
    ctaLink: '/products?category=garments',
    isActive: true,
    order: 4,
  },
];

// Category icons mapping
const categoryIcons = {
  'bags': ShoppingBag,
  'grocery': Package,
  'home-textile': Home,
  'garments': Shirt,
};

// Get icon for category
const getCategoryIcon = (ctaLink: string) => {
  const category = ctaLink.split('category=')[1];
  const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || ShoppingBag;
  return IconComponent;
};

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const activeSlides = heroSlides.filter((slide: BannerSlide) => slide.isActive)
    .sort((a: BannerSlide, b: BannerSlide) => a.order - b.order);

  // Get current category slug from the current slide
  const currentSlideData = activeSlides[currentSlide];
  const currentCategorySlug = currentSlideData?.ctaLink?.split('category=')[1] || '';

  // Fetch products for the current category to show count
  const { data: categoryProducts } = useProducts({
    category: currentCategorySlug,
    limit: 1 // Just to get the count
  });

  const nextSlide = (): void => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev: number) => (prev + 1) % activeSlides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const prevSlide = (): void => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev: number) => (prev - 1 + activeSlides.length) % activeSlides.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const goToSlide = (index: number): void => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return;

    const interval = setInterval(nextSlide, 6000); // Increased to 6 seconds
    return () => clearInterval(interval);
  }, [isAutoPlaying, isTransitioning, activeSlides.length]);

  const handleMouseEnter = (): void => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = (): void => {
    setIsAutoPlaying(true);
  };

  if (activeSlides.length === 0) {
    return null;
  }

  const IconComponent = getCategoryIcon(currentSlideData.ctaLink || '');

  // Navigation handlers
  const handleCategoryClick = () => {
    navigate(`${ROUTES.PRODUCTS}?category=${currentCategorySlug}`);
  };

  const handleViewAllProducts = () => {
    navigate(ROUTES.PRODUCTS);
  };

  return (
    <section
      className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Images with Smooth Transitions */}
      <div className="absolute inset-0">
        {activeSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet={slide.mobileImage || slide.image}
              />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </picture>
          </div>
        ))}
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      {/* Enhanced Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-5xl mx-auto">
          <div
            key={currentSlide}
            className="animate-fade-in-up opacity-0 animate-delay-200"
            style={{
              animation: 'fadeInUp 1s ease-out 0.2s forwards'
            }}
          >
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/30">
              <IconComponent className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wide">
                {currentSlideData.ctaText?.replace('Shop ', '')}
              </span>
            </div>

            {/* Main Title with Gradient */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-white to-gray-200 bg-clip-text text-transparent drop-shadow-2xl">
                {currentSlideData.title}
              </span>
            </h1>

            {/* Subtitle with Enhanced Styling */}
            <p className="text-xl md:text-2xl lg:text-3xl mb-4 font-light text-orange-200 drop-shadow-lg tracking-wide">
              {currentSlideData.subtitle}
            </p>

            {/* Description with Better Typography */}
            <p className="text-base md:text-lg lg:text-xl mb-10 text-gray-100 drop-shadow-md max-w-3xl mx-auto leading-relaxed font-light">
              {currentSlideData.description}
            </p>

            {/* Enhanced CTA Button */}
            {currentSlideData.ctaText && currentSlideData.ctaLink && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-10 py-4 rounded-full shadow-2xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 border-0 backdrop-blur-sm"
                  leftIcon={<IconComponent className="w-5 h-5" />}
                  onClick={handleCategoryClick}
                >
                  {currentSlideData.ctaText}
                  {categoryProducts?.pagination?.totalItems && (
                    <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                      {categoryProducts.pagination.totalItems} items
                    </span>
                  )}
                </Button>

                {/* Secondary Action */}
                <button
                  className="text-white/90 hover:text-white font-medium underline underline-offset-4 decoration-2 decoration-orange-400 hover:decoration-orange-300 transition-all duration-300"
                  onClick={handleViewAllProducts}
                >
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Arrows */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 border border-white/30 hover:border-white/50 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group-hover:opacity-100 opacity-70"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 border border-white/30 hover:border-white/50 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group-hover:opacity-100 opacity-70"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      )}

      {/* Enhanced Dots Indicator */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            {activeSlides.map((slide, index: number) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`relative transition-all duration-300 disabled:cursor-not-allowed group ${
                  index === currentSlide
                    ? 'w-8 h-3'
                    : 'w-3 h-3 hover:w-4'
                }`}
                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              >
                <div className={`w-full h-full rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white shadow-lg'
                    : 'bg-white/50 hover:bg-white/75'
                }`} />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  {slide.title}
                </div>
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute -bottom-1 left-0 w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-300 ease-linear"
              style={{
                width: `${((currentSlide + 1) / activeSlides.length) * 100}%`
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};
