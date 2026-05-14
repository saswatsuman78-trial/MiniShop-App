import React, {
  useEffect,
  useCallback,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import Toast from 'react-native-toast-message';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { RootStackParamList } from '../../types/navigation';

import {
  useAppDispatch,
  useAppSelector,
} from '../../hooks/redux';

import {
  fetchProductById,
} from '../../store/slices/productsSlice';

import {
  addToCart,
} from '../../store/slices/cartSlice';

import LoadingView from '../../components/common/LoadingView';

import ErrorView from '../../components/common/ErrorView';

import PrimaryButton from '../../components/common/PrimaryButton';

import ImageCarousel from '../../components/product/ImageCarousel';

import { colors } from '../../theme/color';

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    'ProductDetail'
  >;

export default function ProductDetailScreen({
  route,
}: Props) {
  const { productId } = route.params;

  const dispatch = useAppDispatch();

  const {
    selectedProduct,
    loading,
    error,
  } = useAppSelector(
    state => state.products
  );

  const cartItems = useAppSelector(
    state => state.cart.items
  );

  useEffect(() => {
    dispatch(
      fetchProductById(productId)
    );
  }, [dispatch, productId]);

  const discountedPrice =
    selectedProduct
      ? selectedProduct.price -
        (selectedProduct.price *
          selectedProduct.discountPercentage) /
          100
      : 0;

  const isAlreadyInCart =
    selectedProduct
      ? cartItems.some(
          item =>
            item.id ===
            selectedProduct.id
        )
      : false;

  const handleAddToCart =
    useCallback(() => {
      if (!selectedProduct) return;

      dispatch(
        addToCart({
          id: selectedProduct.id,

          title:
            selectedProduct.title,

          thumbnail:
            selectedProduct.thumbnail,

          price:
            selectedProduct.price,

          discountedPrice,
        })
      );

      Toast.show({
        type: 'success',

        text1: 'Added to Cart',

        text2:
          selectedProduct.title,
      });
    }, [
      dispatch,
      selectedProduct,
      discountedPrice,
    ]);

  if (loading || !selectedProduct) {
    return (
      <LoadingView message="Loading product..." />
    );
  }

  if (error) {
    return (
      <ErrorView
        message={error}
        onRetry={() =>
          dispatch(
            fetchProductById(
              productId
            )
          )
        }
      />
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={
        false
      }
    >
      <ImageCarousel
        images={
          selectedProduct.images &&
          selectedProduct.images.length >
            0
            ? selectedProduct.images
            : [
                selectedProduct.thumbnail,
              ]
        }
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {selectedProduct.title}
        </Text>

        <Text style={styles.brand}>
          {selectedProduct.brand}
        </Text>

        <View
          style={
            styles.priceContainer
          }
        >
          <Text style={styles.price}>
            $
            {discountedPrice.toFixed(
              2
            )}
          </Text>

          <Text
            style={styles.oldPrice}
          >
            $
            {selectedProduct.price.toFixed(
              2
            )}
          </Text>
        </View>

        <Text style={styles.rating}>
          ⭐{' '}
          {
            selectedProduct.rating
          }
        </Text>

        <Text style={styles.stock}>
          {selectedProduct.stock >
          0
            ? `In Stock (${selectedProduct.stock})`
            : 'Out of Stock'}
        </Text>

        <Text
          style={
            styles.description
          }
        >
          {
            selectedProduct.description
          }
        </Text>

        <Text
          style={styles.shipping}
        >
          {
            selectedProduct.shippingInformation
          }
        </Text>

        {selectedProduct.tags &&
  selectedProduct.tags.length >
    0 && (
    <View
      style={
        styles.tagsContainer
      }
    >
      {selectedProduct.tags.map(
        tag => (
          <View
            key={tag}
            style={styles.tag}
          >
            <Text
              style={
                styles.tagText
              }
            >
              {tag}
            </Text>
          </View>
        )
      )}
    </View>
)}

        {selectedProduct.reviews &&
  selectedProduct.reviews
    .length > 0 && (
    <View
      style={
        styles.reviewSection
      }
    >
      <Text
        style={
          styles.reviewTitle
        }
      >
        Reviews
      </Text>

      {selectedProduct.reviews
        .slice(0, 2)
        .map(review => (
          <View
            key={
              review.reviewerEmail
            }
            style={
              styles.reviewCard
            }
          >
            <Text
              style={
                styles.reviewName
              }
            >
              {
                review.reviewerName
              }
            </Text>

            <Text
              style={
                styles.reviewComment
              }
            >
              {
                review.comment
              }
            </Text>
          </View>
        ))}
    </View>
)}

        <PrimaryButton
          title={
            isAlreadyInCart
              ? 'Added To Cart'
              : 'Add To Cart'
          }
          disabled={
            isAlreadyInCart
          }
          onPress={
            handleAddToCart
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor:
      colors.background,
  },

  content: {
    padding: 16,

    paddingBottom: 32,
  },

  title: {
    fontSize: 26,

    fontWeight: '700',

    color: colors.text,
  },

  brand: {
    marginTop: 6,

    color:
      colors.textSecondary,

    fontSize: 14,
  },

  priceContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 14,
  },

  price: {
    fontSize: 28,

    fontWeight: '700',

    color: colors.primary,
  },

  oldPrice: {
    marginLeft: 12,

    textDecorationLine:
      'line-through',

    color:
      colors.textSecondary,

    fontSize: 16,
  },

  rating: {
    marginTop: 12,

    fontWeight: '600',

    color: colors.warning,
  },

  stock: {
    marginTop: 8,

    color: colors.success,

    fontWeight: '600',
  },

  description: {
    marginTop: 18,

    lineHeight: 24,

    color: colors.text,
  },

  shipping: {
    marginTop: 14,

    color:
      colors.textSecondary,
  },

  tagsContainer: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    marginTop: 18,
  },

  tag: {
    backgroundColor:
      colors.border,

    paddingHorizontal: 10,

    paddingVertical: 6,

    borderRadius: 10,

    marginRight: 8,

    marginBottom: 8,
  },

  tagText: {
    color: colors.text,

    fontWeight: '500',
  },

  reviewSection: {
    marginTop: 28,

    marginBottom: 24,
  },

  reviewTitle: {
    fontSize: 20,

    fontWeight: '700',

    marginBottom: 14,

    color: colors.text,
  },

  reviewCard: {
    backgroundColor:
      colors.card,

    borderRadius: 14,

    padding: 14,

    marginBottom: 12,

    elevation: 1,
  },

  reviewName: {
    fontWeight: '700',

    marginBottom: 6,

    color: colors.text,
  },

  reviewComment: {
    color:
      colors.textSecondary,

    lineHeight: 22,
  },
});