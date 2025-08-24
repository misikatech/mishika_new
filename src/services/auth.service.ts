import { apiService } from './api';
import { API_ENDPOINTS } from '../constants';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface AuthResponse {
  success: boolean;
  data: {
    user: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      avatar?: string;
      role: string;
      isEmailVerified: boolean;
    };
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, data);
    return response;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
    return response;
  },

  async logout(): Promise<void> {
    await apiService.post<void>(API_ENDPOINTS.AUTH.LOGOUT);
  },

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const response = await apiService.post<{ accessToken: string }>(API_ENDPOINTS.AUTH.REFRESH, {
      refreshToken,
    });
    return response;
  },

  async updateProfile(data: Partial<RegisterData>): Promise<AuthResponse['data']['user']> {
    const response = await apiService.put<AuthResponse['data']['user']>(API_ENDPOINTS.USER.UPDATE_PROFILE, data);
    return response;
  },

  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<void> {
    await apiService.post<void>(API_ENDPOINTS.USER.CHANGE_PASSWORD, data);
  },

  async forgotPassword(data: { email: string }): Promise<void> {
    await apiService.post<void>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
  },

  async resetPassword(data: { token: string; password: string }): Promise<void> {
    await apiService.post<void>(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
  },
};
