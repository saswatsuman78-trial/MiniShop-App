import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import { productsApi } from '../../services/api/productsApi';

import { Product } from '../../types/product';

interface ProductsState {
  products: Product[];

  selectedProduct: Product | null;

  loading: boolean;

  error: string | null;
}

const initialState: ProductsState = {
  products: [],

  selectedProduct: null,

  loading: false,

  error: null,
};

export const fetchProducts =
  createAsyncThunk(
    'products/fetchProducts',

    async (_, thunkAPI) => {
      try {
        const response =
          await productsApi.getProducts();

        return response;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.message ||
            'Failed to fetch products'
        );
      }
    }
  );

export const fetchProductById =
  createAsyncThunk(
    'products/fetchProductById',

    async (
      id: number,
      thunkAPI
    ) => {
      try {
        return await productsApi.getProductById(id);
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.message ||
            'Failed to fetch product'
        );
      }
    }
  );

const productsSlice = createSlice({
  name: 'products',

  initialState,

  reducers: {
    clearSelectedProduct: state => {
      state.selectedProduct = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;

        state.error = null;
      })

        .addCase(
    searchProducts.pending,
    state => {
        state.loading = true;

        state.error = null;
    }
    )

    .addCase(
    searchProducts.fulfilled,
    (state, action) => {
        state.loading = false;

        state.products = action.payload;
    }
    )

    .addCase(
    searchProducts.rejected,
    (state, action) => {
        state.loading = false;

        state.error =
        action.payload as string;
    }
    )

      .addCase(
        fetchProducts.fulfilled,
        (state, action) => {
          state.loading = false;

          state.products = action.payload;
        }
      )

      .addCase(
        fetchProducts.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload as string;
        }
      )

      .addCase(
        fetchProductById.pending,
        state => {
          state.loading = true;

          state.error = null;
        }
      )

      .addCase(
        fetchProductById.fulfilled,
        (state, action) => {
          state.loading = false;

          state.selectedProduct =
            action.payload;
        }
      )

      .addCase(
        fetchProductById.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload as string;
        }
      );
  },
});

export const {
  clearSelectedProduct,
} = productsSlice.actions;

export const searchProducts =
  createAsyncThunk(
    'products/searchProducts',

    async (
      query: string,
      thunkAPI
    ) => {
      try {
        const response =
          await productsApi.searchProducts(
            query
          );

        return response;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.message ||
            'Search failed'
        );
      }
    }
  );

export default productsSlice.reducer;