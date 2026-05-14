import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

export type SortOption =
  | 'price_asc'
  | 'price_desc'
  | 'rating';

interface FilterState {
  selectedCategories: string[];

  minPrice: number;

  maxPrice: number;

  minRating: number;

  inStockOnly: boolean;

  sortBy: SortOption;
}

const initialState: FilterState = {
  selectedCategories: [],

  minPrice: 0,

  maxPrice: 5000,

  minRating: 0,

  inStockOnly: false,

  sortBy: 'rating',
};

const filterSlice = createSlice({
  name: 'filters',

  initialState,

  reducers: {
    toggleCategory: (
      state,
      action: PayloadAction<string>
    ) => {
      const exists =
        state.selectedCategories.includes(
          action.payload
        );

      if (exists) {
        state.selectedCategories =
          state.selectedCategories.filter(
            category =>
              category !== action.payload
          );
      } else {
        state.selectedCategories.push(
          action.payload
        );
      }
    },

    setMinPrice: (
      state,
      action: PayloadAction<number>
    ) => {
      state.minPrice = action.payload;
    },

    setMaxPrice: (
      state,
      action: PayloadAction<number>
    ) => {
      state.maxPrice = action.payload;
    },

    setMinRating: (
      state,
      action: PayloadAction<number>
    ) => {
      state.minRating = action.payload;
    },

    toggleInStockOnly: state => {
      state.inStockOnly =
        !state.inStockOnly;
    },

    setSortBy: (
      state,
      action: PayloadAction<SortOption>
    ) => {
      state.sortBy = action.payload;
    },

    clearFilters: state => {
      state.selectedCategories = [];

      state.minPrice = 0;

      state.maxPrice = 5000;

      state.minRating = 0;

      state.inStockOnly = false;

      state.sortBy = 'rating';
    },
  },
});

export const {
  toggleCategory,
  setMinPrice,
  setMaxPrice,
  setMinRating,
  toggleInStockOnly,
  setSortBy,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;