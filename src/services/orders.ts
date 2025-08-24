import { apiService } from './api';
import { API_ENDPOINTS } from '../constants';
import { Product } from './products';

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentMethod: 'COD' | 'STRIPE' | 'UPI' | 'NET_BANKING';
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  notes?: string;
  items: OrderItem[];
  address: {
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutData {
  addressId: string;
  paymentMethod: 'COD' | 'STRIPE' | 'UPI' | 'NET_BANKING';
  notes?: string;
}

export interface CreateOrderData {
  addressId: string;
  paymentMethod: 'COD' | 'STRIPE' | 'UPI' | 'NET_BANKING';
  paymentIntentId?: string;
  notes?: string;
}

class OrderService {
  // Initiate checkout
  async initiateCheckout(data: CheckoutData): Promise<{ 
    success: boolean; 
    data: { 
      order: Order; 
      paymentIntent?: { clientSecret: string; paymentIntentId: string } 
    }; 
    message: string 
  }> {
    return await apiService.post<{ 
      success: boolean; 
      data: { 
        order: Order; 
        paymentIntent?: { clientSecret: string; paymentIntentId: string } 
      }; 
      message: string 
    }>(API_ENDPOINTS.ORDERS.CHECKOUT, data);
  }

  // Create order
  async createOrder(data: CreateOrderData): Promise<{ success: boolean; data: Order; message: string }> {
    return await apiService.post<{ success: boolean; data: Order; message: string }>(
      API_ENDPOINTS.ORDERS.CREATE,
      data
    );
  }

  // Get user orders
  async getOrders(page = 1, limit = 10): Promise<{
    success: boolean;
    data: Order[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
    message: string;
  }> {
    return await apiService.get<{
      success: boolean;
      data: Order[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        hasNext: boolean;
        hasPrev: boolean;
      };
      message: string;
    }>(`${API_ENDPOINTS.ORDERS.LIST}?page=${page}&limit=${limit}`);
  }

  // Get single order
  async getOrder(orderId: string): Promise<{ success: boolean; data: Order; message: string }> {
    return await apiService.get<{ success: boolean; data: Order; message: string }>(
      `/orders/${orderId}`
    );
  }

  // Cancel order
  async cancelOrder(orderId: string): Promise<{ success: boolean; message: string }> {
    return await apiService.post<{ success: boolean; message: string }>(
      `${API_ENDPOINTS.ORDERS.CANCEL}/${orderId}/cancel`
    );
  }
}

export const orderService = new OrderService();
