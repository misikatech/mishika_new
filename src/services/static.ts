import { apiService } from './api';
import { API_ENDPOINTS } from '../constants';

export interface StaticContent {
  title: string;
  content: string;
  lastUpdated: string;
}

class StaticService {
  // Get about page content
  async getAbout(): Promise<{ success: boolean; data: StaticContent; message: string }> {
    return await apiService.get<{ success: boolean; data: StaticContent; message: string }>(
      API_ENDPOINTS.STATIC.ABOUT
    );
  }

  // Get services content
  async getServices(): Promise<{ success: boolean; data: StaticContent; message: string }> {
    return await apiService.get<{ success: boolean; data: StaticContent; message: string }>(
      API_ENDPOINTS.STATIC.SERVICES
    );
  }

  // Get privacy policy
  async getPrivacyPolicy(): Promise<{ success: boolean; data: StaticContent; message: string }> {
    return await apiService.get<{ success: boolean; data: StaticContent; message: string }>(
      API_ENDPOINTS.STATIC.PRIVACY
    );
  }

  // Get terms of service
  async getTermsOfService(): Promise<{ success: boolean; data: StaticContent; message: string }> {
    return await apiService.get<{ success: boolean; data: StaticContent; message: string }>(
      API_ENDPOINTS.STATIC.TERMS
    );
  }

  // Get shipping policy
  async getShippingPolicy(): Promise<{ success: boolean; data: StaticContent; message: string }> {
    return await apiService.get<{ success: boolean; data: StaticContent; message: string }>(
      API_ENDPOINTS.STATIC.SHIPPING
    );
  }
}

export const staticService = new StaticService();