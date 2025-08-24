import { apiService } from './api';
import { API_ENDPOINTS } from '../constants';

export interface WishlistItem {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    salePrice?: number;
    images: string[];
    category: {
      id: string;
      name: string;
      slug: string;
    };
  };
  createdAt: string;
}

class WishlistService {
  // Get wishlist
  async getWishlist(): Promise<{ success: boolean; data: WishlistItem[]; message: string }> {
    return await apiService.get<{ success: boolean; data: WishlistItem[]; message: string }>(
      API_ENDPOINTS.WISHLIST.LIST
    );
  }

  // Add to wishlist
  async addToWishlist(productId: string): Promise<{ success: boolean; data: WishlistItem; message: string }> {
    return await apiService.post<{ success: boolean; data: WishlistItem; message: string }>(
      `${API_ENDPOINTS.WISHLIST.ADD}/${productId}`,
      {}
    );
  }

  // Remove from wishlist
  async removeFromWishlist(productId: string): Promise<{ success: boolean; message: string }> {
    return await apiService.delete<{ success: boolean; message: string }>(
      `${API_ENDPOINTS.WISHLIST.REMOVE}/${productId}`
    );
  }

  // Clear wishlist
  async clearWishlist(): Promise<{ success: boolean; message: string }> {
    return await apiService.delete<{ success: boolean; message: string }>(
      API_ENDPOINTS.WISHLIST.CLEAR
    );
  }
}

export const wishlistService = new WishlistService();
