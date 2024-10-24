import { apiClient } from "@/lib/api-client";

export const getAllProducts = async (params ) => {
  
  const response = await apiClient.get(`/products`, { params });
  console.log(response.data); // Log the response data
  return response.data.products || [];
}
