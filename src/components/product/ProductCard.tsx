import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Product } from '../../types/product';

import { colors } from '../../theme/color';

interface Props {
  product: Product;

  onPress: () => void;
}
function ProductCard({
  product,
  onPress,
}: Props) {
  const discountedPrice =
    product.price -
    (product.price *
      product.discountPercentage) /
      100;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.container}
      onPress={onPress}
    >
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text
          numberOfLines={2}
          style={styles.title}
        >
          {product.title}
        </Text>

        <Text style={styles.category}>
          {product.category}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            $
            {discountedPrice.toFixed(2)}
          </Text>

          <Text style={styles.oldPrice}>
            ${product.price}
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            -
            {product.discountPercentage.toFixed(
              0
            )}
            %
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    margin: 8,

    backgroundColor: colors.card,

    borderRadius: 16,

    overflow: 'hidden',

    elevation: 3,
  },

  image: {
    width: '100%',

    height: 160,

    resizeMode: 'cover',
  },

  content: {
    padding: 12,
  },

  title: {
    fontSize: 15,

    fontWeight: '700',

    color: colors.text,
  },

  category: {
    marginTop: 4,

    color: colors.textSecondary,

    textTransform: 'capitalize',

    fontSize: 12,
  },

  priceContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 8,
  },

  price: {
    fontSize: 16,

    fontWeight: '700',

    color: colors.primary,
  },

  oldPrice: {
    marginLeft: 8,

    textDecorationLine: 'line-through',

    color: colors.textSecondary,
  },

  badge: {
    marginTop: 10,

    alignSelf: 'flex-start',

    backgroundColor: colors.danger,

    paddingHorizontal: 8,

    paddingVertical: 4,

    borderRadius: 8,
  },

  badgeText: {
    color: colors.card,

    fontWeight: '700',

    fontSize: 12,
  },
});
export default React.memo(ProductCard);