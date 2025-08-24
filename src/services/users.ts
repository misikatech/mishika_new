import { apiService } from './api';
import { API_ENDPOINTS } from '../constants';
import { User } from './auth';

export interface UpdateProfileData {
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface DashboardStats {
  totalOrders: number;
  cartItems: number;
  wishlistItems: number;
  recentOrders: any[];
}

class UserService {
  // Get user profile
  async getProfile(): Promise<{ success: boolean; data: User; message: string }> {
    return await apiService.get<{ success: boolean; data: User; message: string }>(
      API_ENDPOINTS.USER.PROFILE
    );
  }

  // Update user profile
  async updateProfile(data: UpdateProfileData): Promise<{ success: boolean; data: User; message: string }> {
    return await apiService.put<{ success: boolean; data: User; message: string }>(
      API_ENDPOINTS.USER.UPDATE_PROFILE,
      data
    );
  }

  // Change password
  async changePassword(data: ChangePasswordData): Promise<{ success: boolean; message: string }> {
    return await apiService.put<{ success: boolean; message: string }>(
      API_ENDPOINTS.USER.CHANGE_PASSWORD,
      data
    );
  }

  // Get dashboard stats
  async getDashboard(): Promise<{ success: boolean; data: DashboardStats; message: string }> {
    return await apiService.get<{ success: boolean; data: DashboardStats; message: string }>(
      API_ENDPOINTS.USER.DASHBOARD
    );
  }
}

export const userService = new UserService();