import { apiService } from './api';

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  sku: string;
  stock: number;
  categoryId: string;
  images: string[];
  isFeatured: boolean;
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string;
}

class AdminProductService {
  async createProduct(productData: CreateProductData) {
    return await apiService.post('/products', productData);
  }

  async updateProduct(id: string, productData: Partial<CreateProductData>) {
    return await apiService.put(`/products/${id}`, productData);
  }

  async deleteProduct(id: string) {
    return await apiService.delete(`/products/${id}`);
  }

  async getProducts(filters?: any) {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }
    const url = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiService.get(url);
  }
}

export const adminProductService = new AdminProductService();