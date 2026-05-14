import React from 'react';

import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { RootStackParamList } from '../../types/navigation';

import ProductCard from '../../components/product/ProductCard';

import EmptyState from '../../components/common/EmptyState';

import AppHeader from '../../components/common/AppHeader';

import {
  useAppSelector,
} from '../../hooks/redux';

import { colors } from '../../theme/color';

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    'Wishlist'
  >;

export default function WishlistScreen({
  navigation,
}: Props) {
  const wishlistItems =
    useAppSelector(
      state => state.wishlist.items
    );

  return (
    <SafeAreaView
      style={styles.container}
    >
      <AppHeader title="Wishlist" />

      {!wishlistItems.length ? (
        <EmptyState
          title="Wishlist Empty"
          description="Products you save will appear here."
        />
      ) : (
        <FlatList
          data={wishlistItems}
          keyExtractor={item =>
            item.id.toString()
          }
          numColumns={2}
          contentContainerStyle={
            styles.listContent
          }
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
  },
});