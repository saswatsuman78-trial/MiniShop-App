import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import HomeScreen from '../screens/home/HomeScreen';

import ProductDetailScreen from '../screens/product/ProductDetailScreen';

import CartScreen from '../screens/cart/CartScreen';

import CheckoutScreen from '../screens/checkout/CheckoutScreen';

import OrderSuccessScreen from '../screens/checkout/OrderSuccessScreen';

import WishlistScreen from '../screens/wishlist/WishlistScreen';

import { RootStackParamList } from '../types/navigation';

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,

        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'MiniShop',
        }}
      />

      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          title: 'Product Details',
        }}
      />

      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Your Cart',
        }}
      />

      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          title: 'Checkout',
        }}
      />

      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccessScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
      name="Wishlist"
      component={WishlistScreen}
      />
    </Stack.Navigator>
  );
}