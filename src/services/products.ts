import { apiService } from './api';
import { API_ENDPOINTS } from '../constants';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  sku: string;
  stock: number;
  images: string[];
  isFeatured: boolean;
  isActive: boolean;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  message: string;
}

class ProductService {
  // Get all products with filters
  async getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    const url = `${API_ENDPOINTS.PRODUCTS.LIST}?${queryParams.toString()}`;
    return await apiService.get<ProductsResponse>(url);
  }

  // Get single product
  async getProduct(id: string): Promise<{ success: boolean; data: Product; message: string }> {
    return await apiService.get<{ success: boolean; data: Product; message: string }>(
      `${API_ENDPOINTS.PRODUCTS.LIST}/${id}`
    );
  }

  // Get featured products
  async getFeaturedProducts(): Promise<{ success: boolean; data: Product[]; message: string }> {
    return await apiService.get<{ success: boolean; data: Product[]; message: string }>(
      API_ENDPOINTS.PRODUCTS.FEATURED
    );
  }

  // Search products
  async searchProducts(query: string): Promise<ProductsResponse> {
    return await apiService.get<ProductsResponse>(
      `${API_ENDPOINTS.PRODUCTS.SEARCH}?q=${encodeURIComponent(query)}`
    );
  }
}

export const productService = new ProductService();
