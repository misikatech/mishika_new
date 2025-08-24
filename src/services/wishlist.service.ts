import { apiService } from './api';
import { API_ENDPOINTS } from '../constants';

interface WishlistItem {
  id: number;
  productId: number;
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    inStock: boolean;
    rating?: number;
  };
  addedAt: string;
}



export const wishlistService = {
  async getWishlist(): Promise<any> {
    try {
      const response = await apiService.get<any>(API_ENDPOINTS.USER.WISHLIST);
      console.log('Wishlist API response:', response);
      return response;
    } catch (error) {
      console.error('Wishlist service error:', error);
      throw error;
    }
  },

  async addToWishlist(productId: string): Promise<any> {
    const response = await apiService.post<any>(`${API_ENDPOINTS.USER.WISHLIST}/${productId}`, {});
    return response;
  },

  async removeFromWishlist(productId: string): Promise<void> {
    await apiService.delete(`${API_ENDPOINTS.USER.WISHLIST}/${productId}`);
  },

  async clearWishlist(): Promise<void> {
    await apiService.delete(API_ENDPOINTS.USER.WISHLIST);
  },
};
