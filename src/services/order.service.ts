import { apiService } from './api';
import { API_ENDPOINTS } from '../constants';
import { Order, CheckoutForm, ApiResponse, PaginatedResponse } from '../types';

class OrderService {
  async createOrder(orderData: CheckoutForm): Promise<ApiResponse<Order>> {
    const response = await apiService.post<ApiResponse<Order>>(
      API_ENDPOINTS.ORDERS.CREATE,
      orderData
    );
    return response;
  }

  async getOrders(page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<Order>>> {
    const response = await apiService.get<ApiResponse<PaginatedResponse<Order>>>(
      `${API_ENDPOINTS.ORDERS.LIST}?page=${page}&limit=${limit}`
    );
    return response;
  }

  async getOrder(orderId: string): Promise<ApiResponse<Order>> {
    const response = await apiService.get<ApiResponse<Order>>(
      `/orders/${orderId}`
    );
    return response;
  }

  async cancelOrder(orderId: string): Promise<ApiResponse<void>> {
    const response = await apiService.post<ApiResponse<void>>(
      API_ENDPOINTS.ORDERS.CANCEL(orderId)
    );
    return response;
  }
}

export const orderService = new OrderService();
