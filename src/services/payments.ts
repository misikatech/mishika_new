import { apiService } from './api';
import { API_ENDPOINTS } from '../constants';

export interface PaymentIntent {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
}

export interface CreatePaymentIntentData {
  amount: number;
  currency?: string;
  orderId: string;
}

export interface VerifyPaymentData {
  paymentIntentId: string;
  paymentMethod: 'STRIPE' | 'UPI' | 'NET_BANKING' | 'COD';
  transactionId?: string;
}

class PaymentService {
  // Create Stripe payment intent
  async createPaymentIntent(data: CreatePaymentIntentData): Promise<{ 
    success: boolean; 
    data: PaymentIntent; 
    message: string 
  }> {
    return await apiService.post<{ 
      success: boolean; 
      data: PaymentIntent; 
      message: string 
    }>(API_ENDPOINTS.PAYMENTS.CREATE_INTENT, data);
  }

  // Verify payment
  async verifyPayment(data: VerifyPaymentData): Promise<{ 
    success: boolean; 
    data: { verified: boolean; transactionId: string; amount: number }; 
    message: string 
  }> {
    return await apiService.post<{ 
      success: boolean; 
      data: { verified: boolean; transactionId: string; amount: number }; 
      message: string 
    }>(API_ENDPOINTS.PAYMENTS.VERIFY, data);
  }
}

export const paymentService = new PaymentService();