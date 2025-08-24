import { apiService } from './api';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  productCount?: number;
}

export interface CategoryFilters {
  isActive?: boolean;
  search?: string;
}

class CategoryService {
  async getCategories(filters?: CategoryFilters) {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }
    const url = `/categories${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiService.get(url);
  }

  async createCategory(categoryData: {
    name: string;
    description?: string;
    image?: string;
    isActive: boolean;
  }) {
    return await apiService.post('/categories', categoryData);
  }

  async updateCategory(id: string, categoryData: {
    name?: string;
    description?: string;
    image?: string;
    isActive?: boolean;
  }) {
    return await apiService.put(`/categories/${id}`, categoryData);
  }

  async deleteCategory(id: string) {
    return await apiService.delete(`/categories/${id}`);
  }

  async getCategoryBySlug(slug: string) {
    return await apiService.get(`/categories/slug/${slug}`);
  }
}

export const categoryService = new CategoryService();
