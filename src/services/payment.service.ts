import { apiService } from './api';
import { API_ENDPOINTS } from '../constants';

interface PaymentIntentData {
  amount: number;
  currency?: string;
  orderId: string;
}

interface PaymentIntent {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
}

interface PaymentConfirmation {
  success: boolean;
  paymentId: string;
  status: string;
  amount: number;
}

export const paymentService = {
  async createPaymentIntent(data: PaymentIntentData): Promise<PaymentIntent> {
    const response = await apiService.post<PaymentIntent>(API_ENDPOINTS.PAYMENT.CREATE_INTENT, data);
    return response;
  },

  async confirmPayment(paymentIntentId: string, paymentMethodId: string): Promise<PaymentConfirmation> {
    const response = await apiService.post<PaymentConfirmation>(API_ENDPOINTS.PAYMENT.CONFIRM, {
      paymentIntentId,
      paymentMethodId,
    });
    return response;
  },

  async processUPIPayment(data: { orderId: string; amount: number; upiId: string }): Promise<PaymentConfirmation> {
    const response = await apiService.post<PaymentConfirmation>('/payment/upi', data);
    return response;
  },

  async processNetBankingPayment(data: { orderId: string; amount: number; bankCode: string }): Promise<PaymentConfirmation> {
    const response = await apiService.post<PaymentConfirmation>('/payment/netbanking', data);
    return response;
  },

  async processWalletPayment(data: { orderId: string; amount: number; walletType: string }): Promise<PaymentConfirmation> {
    const response = await apiService.post<PaymentConfirmation>('/payment/wallet', data);
    return response;
  },

  async getPaymentStatus(paymentId: string): Promise<PaymentConfirmation> {
    const response = await apiService.get<PaymentConfirmation>(`/payment/status/${paymentId}`);
    return response;
  },
};
