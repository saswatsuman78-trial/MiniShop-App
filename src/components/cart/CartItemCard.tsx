import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import { CartItem } from '../../types/cart';

import { colors } from '../../theme/color';

import QuantitySelector from './QuantitySelector';

import {
  formatPrice,
} from '../../utils/pricing';

interface Props {
  item: CartItem;

  onIncrement: () => void;

  onDecrement: () => void;
}

function CartItemCard({
  item,
  onIncrement,
  onDecrement,
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: item.thumbnail,
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text
          numberOfLines={2}
          style={styles.title}
        >
          {item.title}
        </Text>

        <Text style={styles.price}>
          {formatPrice(
            item.discountedPrice
          )}
        </Text>

        <QuantitySelector
          quantity={item.quantity}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    backgroundColor:
      colors.card,

    marginHorizontal: 16,

    marginTop: 16,

    borderRadius: 18,

    padding: 14,

    elevation: 2,
  },

  image: {
    width: 90,

    height: 90,

    borderRadius: 14,
  },

  content: {
    flex: 1,

    marginLeft: 14,

    justifyContent:
      'space-between',
  },

  title: {
    fontSize: 15,

    fontWeight: '700',

    color: colors.text,
  },

  price: {
    marginTop: 6,

    fontSize: 16,

    fontWeight: '700',

    color: colors.primary,
  },
});

export default React.memo(
  CartItemCard
);