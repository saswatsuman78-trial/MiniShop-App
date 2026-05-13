import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';

import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

import {
  RefreshControl,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { RootStackParamList } from '../../types/navigation';

import ProductCard from '../../components/product/ProductCard';

import LoadingView from '../../components/common/LoadingView';

import ErrorView from '../../components/common/ErrorView';

import EmptyState from '../../components/common/EmptyState';

import SearchBar from '../../components/common/SearchBar';

import AppHeader from '../../components/common/AppHeader';

import {
  useAppDispatch,
  useAppSelector,
} from '../../hooks/redux';

import {
  fetchProducts,
  searchProducts,
} from '../../store/slices/productsSlice';

import { colors } from '../../theme/color';

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    'Home'
  >;

export default function HomeScreen({
  navigation,
}: Props) {
  const dispatch = useAppDispatch();

  const {
    products,
    loading,
    error,
  } = useAppSelector(
    state => state.products
  );

  const cartItems = useAppSelector(
    state => state.cart.items
  );

  const [refreshing, setRefreshing] =
  useState(false);

  const [searchQuery, setSearchQuery] =
    useState('');

    const onRefresh = useCallback(
    async () => {
      setRefreshing(true);

      await dispatch(
        fetchProducts()
      );

      setRefreshing(false);
    },
    [dispatch]
  );

  const handleCartPress =
  useCallback(() => {
    navigation.navigate('Cart');
  }, [navigation]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const delayDebounce =
      setTimeout(() => {
        if (
          searchQuery.trim().length > 0
        ) {
          dispatch(
            searchProducts(
              searchQuery
            )
          );
        } else {
          dispatch(fetchProducts());
        }
      }, 500);

    return () =>
      clearTimeout(
        delayDebounce
      );
  }, [dispatch, searchQuery]);

  if (loading && !products.length) {
    return (
      <LoadingView message="Fetching products..." />
    );
  }

  if (error && !products.length) {
    return (
      <ErrorView
        message={error}
        onRetry={() =>
          dispatch(fetchProducts())
        }
      />
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <AppHeader
        title="MiniShop"
        rightText={`Cart (${cartItems.length})`}
        onRightPress={handleCartPress}
        />

      <SearchBar
        value={searchQuery}
        onChangeText={
          setSearchQuery
        }
      />

      {!products.length &&
      !loading ? (
        <EmptyState
          title="No Products Found"
          description="Try searching something else."
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={item =>
            item.id.toString()
          }
          numColumns={2}
          showsVerticalScrollIndicator={
            false
          }
          refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.primary}
            />
            }
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={
            styles.listContent
          }
          initialNumToRender={8}
          windowSize={5}
          removeClippedSubviews
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate(
                  'ProductDetail',
                  {
                    productId:
                      item.id,
                  }
                )
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor:
      colors.background,
  },


  listContent: {
    padding: 8,

    paddingBottom: 24,
  },
});