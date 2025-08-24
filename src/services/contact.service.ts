import { apiService } from './api';
import { API_ENDPOINTS } from '../constants';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
  id?: string;
}

export const contactService = {
  async submitContactForm(data: ContactFormData): Promise<ContactResponse> {
    const response = await apiService.post<ContactResponse>(API_ENDPOINTS.CONTACT.SUBMIT, data);
    return response;
  },

  async getContactInfo(): Promise<{
    email: string;
    phone: string;
    address: string;
    hours: string;
  }> {
    const response = await apiService.get<{
      email: string;
      phone: string;
      address: string;
      hours: string;
    }>(API_ENDPOINTS.CONTACT.INFO);
    return response;
  },

  async getFAQs(): Promise<Array<{
    id: number;
    question: string;
    answer: string;
    category: string;
  }>> {
    const response = await apiService.get<Array<{
      id: number;
      question: string;
      answer: string;
      category: string;
    }>>(API_ENDPOINTS.CONTACT.FAQS);
    return response;
  },
};
