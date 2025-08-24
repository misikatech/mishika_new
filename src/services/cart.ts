import { apiService } from './api';
import { API_ENDPOINTS } from '../constants';
import { Product } from './products';

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  subtotal: number;
  tax: number;
  shipping: number;
}

export interface AddToCartData {
  productId: string;
  quantity: number;
}

export interface UpdateCartData {
  quantity: number;
}

class CartService {
  // Get user cart
  async getCart(): Promise<{ success: boolean; data: Cart; message: string }> {
    return await apiService.get<{ success: boolean; data: Cart; message: string }>(
      API_ENDPOINTS.CART.GET
    );
  }

  // Add item to cart
  async addToCart(data: AddToCartData): Promise<{ success: boolean; data: CartItem; message: string }> {
    return await apiService.post<{ success: boolean; data: CartItem; message: string }>(
      API_ENDPOINTS.CART.ADD,
      data
    );
  }

  // Update cart item
  async updateCartItem(itemId: string, data: UpdateCartData): Promise<{ success: boolean; data: CartItem; message: string }> {
    return await apiService.put<{ success: boolean; data: CartItem; message: string }>(
      `${API_ENDPOINTS.CART.UPDATE}/${itemId}`,
      data
    );
  }

  // Remove item from cart
  async removeFromCart(itemId: string): Promise<{ success: boolean; message: string }> {
    return await apiService.delete<{ success: boolean; message: string }>(
      `${API_ENDPOINTS.CART.REMOVE}/${itemId}`
    );
  }

  // Clear cart
  async clearCart(): Promise<{ success: boolean; message: string }> {
    return await apiService.delete<{ success: boolean; message: string }>(
      API_ENDPOINTS.CART.CLEAR
    );
  }
}

export const cartService = new CartService();