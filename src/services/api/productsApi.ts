import { apiClient } from './client';

import { Product } from '../../types/product';

export const productsApi = {
  getProducts: async (): Promise<Product[]> => {
    const response =
      await apiClient.get<Product[]>(
        '/products?limit=30'
      );

    return response.data;
  },

  getProductById: async (
    id: number
  ): Promise<Product> => {
    const response =
      await apiClient.get<Product>(
        `/products/${id}`
      );

    return response.data;
  },

  searchProducts: async (
    query: string
  ): Promise<Product[]> => {
    const response =
      await apiClient.get<Product[]>(
        `/products/search?q=${query}`
      );

    return response.data;
  },
};