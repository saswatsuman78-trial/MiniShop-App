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

const persistConfig = {
  key: 'root',

  storage: AsyncStorage,

  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  cart: cartReducer,

  products: productsReducer,
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