import { apiService } from './api';
import { API_ENDPOINTS } from '../constants';
import { Product } from './products';

export interface HeroBanner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
  isActive: boolean;
}

export interface Offer {
  id: number;
  title: string;
  description: string;
  discount?: number;
  minOrderValue?: number;
  validUntil?: string;
  image: string;
  isActive: boolean;
}

class HomeService {
  // Get hero banners
  async getHeroBanners(): Promise<{ success: boolean; data: HeroBanner[]; message: string }> {
    return await apiService.get<{ success: boolean; data: HeroBanner[]; message: string }>(
      API_ENDPOINTS.HOME.BANNERS
    );
  }

  // Get featured products
  async getFeaturedProducts(): Promise<{ success: boolean; data: Product[]; message: string }> {
    return await apiService.get<{ success: boolean; data: Product[]; message: string }>(
      API_ENDPOINTS.HOME.FEATURED
    );
  }

  // Get categories
  async getCategories(): Promise<{ success: boolean; data: Category[]; message: string }> {
    return await apiService.get<{ success: boolean; data: Category[]; message: string }>(
      API_ENDPOINTS.HOME.CATEGORIES
    );
  }

  // Get offers
  async getOffers(): Promise<{ success: boolean; data: Offer[]; message: string }> {
    return await apiService.get<{ success: boolean; data: Offer[]; message: string }>(
      API_ENDPOINTS.HOME.OFFERS
    );
  }
}

export const homeService = new HomeService();