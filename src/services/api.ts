import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import { API_CONFIG, STORAGE_KEYS } from '../constants';
import { storage } from '../utils';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = storage.get<string>(STORAGE_KEYS.AUTH_TOKEN);
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response.data, // Return only data
      async (error) => {
        console.error('API Error:', error.response?.data); // Debug log
        
        if (error.response?.status === 401) {
          // Only redirect to login if we're on a protected route or if user was previously authenticated
          const currentPath = window.location.pathname;
          const isProtectedRoute = ['/profile', '/cart', '/orders', '/wishlist', '/checkout', '/admin'].some(route =>
            currentPath.startsWith(route)
          );
          const wasAuthenticated = storage.get<string>(STORAGE_KEYS.AUTH_TOKEN);

          // Clear auth data
          storage.remove(STORAGE_KEYS.AUTH_TOKEN);
          storage.remove(STORAGE_KEYS.USER_DATA);

          // Only redirect if on protected route or user was authenticated
          if (isProtectedRoute || wasAuthenticated) {
            if (currentPath.startsWith('/admin')) {
              window.location.href = '/admin-auth/login';
            } else {
              window.location.href = '/login';
            }
          }
        }
        
        if (error.response?.status === 403) {
          console.error('Access forbidden:', error.response.data);
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get(url, config);
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.put(url, data, config);
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.patch(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete(url, config);
  }
}

export const apiService = new ApiService();
