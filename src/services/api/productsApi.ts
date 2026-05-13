import { apiClient } from './client';

import {
  Product,
  ProductsResponse,
} from '../../types/product';

export const productsApi = {
  getProducts: async (): Promise<ProductsResponse> => {
    const response =
      await apiClient.get<ProductsResponse>(
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
  ): Promise<ProductsResponse> => {
    const response =
      await apiClient.get<ProductsResponse>(
        `/products/search?q=${query}`
      );

    return response.data;
  },
};