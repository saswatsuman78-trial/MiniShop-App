import React from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { RootStackParamList } from '../../types/navigation';

import {
  useAppDispatch,
  useAppSelector,
} from '../../hooks/redux';

import {
  incrementQuantity,
  decrementQuantity,
} from '../../store/slices/cartSlice';

import {
  selectCartItems,
  selectCartTotal,
} from '../../store/selectors/cartSelector';

import EmptyState from '../../components/common/EmptyState';

import PrimaryButton from '../../components/common/PrimaryButton';

import CartItemCard from '../../components/cart/CartItemCard';

import { colors } from '../../theme/color';

import {
  formatPrice,
} from '../../utils/pricing';

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    'Cart'
  >;

export default function CartScreen({
  navigation,
}: Props) {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(
    selectCartItems
  );

  const total = useAppSelector(
    selectCartTotal
  );

  if (!cartItems.length) {
    return (
      <EmptyState
        title="Your Cart is Empty"
        description="Add products to continue shopping."
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item =>
          item.id.toString()
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.listContent
        }
        renderItem={({ item }) => (
          <CartItemCard
            item={item}
            onIncrement={() =>
              dispatch(
                incrementQuantity(
                  item.id
                )
              )
            }
            onDecrement={() =>
              dispatch(
                decrementQuantity(
                  item.id
                )
              )
            }
          />
        )}
      />

      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>
            Total
          </Text>

          <Text style={styles.total}>
            {formatPrice(total)}
          </Text>
        </View>

        <PrimaryButton
          title="Checkout"
          onPress={() =>
            navigation.navigate(
              'Checkout'
            )
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor:
      colors.background,
  },

  listContent: {
    paddingBottom: 140,
  },

  footer: {
    position: 'absolute',

    bottom: 0,

    left: 0,

    right: 0,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'space-between',

    backgroundColor:
      colors.card,

    paddingHorizontal: 20,

    paddingVertical: 16,

    borderTopWidth: 1,

    borderColor:
      colors.border,
  },

  totalLabel: {
    color: colors.textSecondary,

    fontSize: 13,
  },

  total: {
    fontSize: 24,

    fontWeight: '700',

    color: colors.text,
  },
});