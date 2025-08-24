import { apiService } from './api';
import { API_ENDPOINTS } from '../constants';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

class ContactService {
  // Submit contact form
  async submitContact(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    return await apiService.post<{ success: boolean; message: string }>(
      API_ENDPOINTS.CONTACT.SUBMIT,
      data
    );
  }
}

export const contactService = new ContactService();