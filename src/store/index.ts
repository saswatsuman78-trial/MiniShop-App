import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import {
  persistReducer,
  persistStore,
} from 'redux-persist';

import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import wishlistReducer from './slices/wishlistSlice';
import filterReducer from './slices/filterSlice';

const persistConfig = {
  key: 'root',

  storage: AsyncStorage,

  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  wishlist: wishlistReducer,
  filters: filterReducer,
});

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch = typeof store.dispatch;