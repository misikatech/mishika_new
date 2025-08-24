import { apiService } from './api';
import { API_ENDPOINTS } from '../constants';

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  type: 'HOME' | 'WORK' | 'OTHER';
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressData {
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  type: 'HOME' | 'WORK' | 'OTHER';
  isDefault?: boolean;
}

export interface UpdateAddressData extends Partial<CreateAddressData> {}

class AddressService {
  // Get all addresses
  async getAddresses(): Promise<{ success: boolean; data: Address[]; message: string }> {
    return await apiService.get<{ success: boolean; data: Address[]; message: string }>(
      API_ENDPOINTS.ADDRESSES.LIST
    );
  }

  // Create address
  async createAddress(data: CreateAddressData): Promise<{ success: boolean; data: Address; message: string }> {
    return await apiService.post<{ success: boolean; data: Address; message: string }>(
      API_ENDPOINTS.ADDRESSES.CREATE,
      data
    );
  }

  // Update address
  async updateAddress(addressId: string, data: UpdateAddressData): Promise<{ success: boolean; data: Address; message: string }> {
    return await apiService.put<{ success: boolean; data: Address; message: string }>(
      `${API_ENDPOINTS.ADDRESSES.UPDATE}/${addressId}`,
      data
    );
  }

  // Delete address
  async deleteAddress(addressId: string): Promise<{ success: boolean; message: string }> {
    return await apiService.delete<{ success: boolean; message: string }>(
      `${API_ENDPOINTS.ADDRESSES.DELETE}/${addressId}`
    );
  }

  // Set default address
  async setDefaultAddress(addressId: string): Promise<{ success: boolean; data: Address; message: string }> {
    return await apiService.post<{ success: boolean; data: Address; message: string }>(
      `${API_ENDPOINTS.ADDRESSES.SET_DEFAULT}/${addressId}/default`
    );
  }
}

export const addressService = new AddressService();