import { apiClient } from "@/lib/api-client";

export interface FetchProductsParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
  priceRange?: string;
  category?: string;
  inStock?: boolean;
}

export const getAllProducts = async (params: FetchProductsParams) => {
  const response = await apiClient.get(`/products`, { params });
  return response.data;
};

export const getCategoriesApi = async () => {
  const response = await apiClient.get(`/products/categories`);
  return response.data;
};

export const getFeaturedProductsApi = async (limit = 4) => {
  const response = await apiClient.get(`/products/featured`, { params: { limit } });
  return response.data;
};

export const getProductByIdApi = async (id: string) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};
