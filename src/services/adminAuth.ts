import { apiService } from './api';
import { STORAGE_KEYS } from '../constants';
import { storage } from '../utils';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: 'ADMIN';
  isVerified: boolean;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminLoginData {
  email: string;
  password: string;
}

export interface AdminRegisterData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface AdminAuthResponse {
  user: AdminUser;
  accessToken: string;
  refreshToken: string;
}

class AdminAuthService {
  async login(loginData: AdminLoginData): Promise<AdminAuthResponse> {
    try {
      const response = await apiService.post<any>('/admin-auth/login', loginData);
      
      if (response.success) {
        const { user, accessToken, refreshToken } = response.data;
        
        // Additional check: ensure this is an admin user
        if (user.role !== 'ADMIN') {
          throw new Error('Regular users cannot access admin panel');
        }
        
        // Store tokens and user data
        storage.set(STORAGE_KEYS.AUTH_TOKEN, accessToken);
        storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        storage.set(STORAGE_KEYS.USER_DATA, user);

        return { user, accessToken, refreshToken };
      }

      throw new Error(response.message || 'Admin login failed');
    } catch (error: any) {
      console.error('Admin login error:', error);
      throw new Error(error.response?.data?.message || error.message || 'Admin login failed');
    }
  }

  async register(registerData: AdminRegisterData): Promise<AdminAuthResponse> {
    try {
      const response = await apiService.post<any>('/admin-auth/register', registerData);
      
      if (response.success) {
        // Don't store tokens - just return success
        // Admin will need to login separately
        return {
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken
        };
      }

      throw new Error(response.message || 'Admin registration failed');
    } catch (error: any) {
      console.error('Admin registration error:', error);
      throw new Error(error.response?.data?.message || error.message || 'Admin registration failed');
    }
  }

  async getProfile(): Promise<AdminUser> {
    try {
      const response = await apiService.get<any>('/admin-auth/profile');
      
      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || 'Failed to fetch admin profile');
    } catch (error: any) {
      console.error('Get admin profile error:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch admin profile');
    }
  }

  async updateProfile(profileData: Partial<AdminUser>): Promise<AdminUser> {
    try {
      const response = await apiService.put<any>('/admin-auth/profile', profileData);
      
      if (response.success) {
        // Update stored user data
        storage.set(STORAGE_KEYS.USER_DATA, response.data);
        return response.data;
      }

      throw new Error(response.message || 'Failed to update admin profile');
    } catch (error: any) {
      console.error('Update admin profile error:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to update admin profile');
    }
  }

  logout(): void {
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
    storage.remove(STORAGE_KEYS.USER_DATA);
  }
}

export const adminAuthService = new AdminAuthService();
