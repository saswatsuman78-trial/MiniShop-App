import React, {
  useMemo,
  useState,
} from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { RootStackParamList } from '../../types/navigation';

import {
  useAppDispatch,
  useAppSelector,
} from '../../hooks/redux';

import Toast from 'react-native-toast-message';

import {
  clearCart,
} from '../../store/slices/cartSlice';

import PrimaryButton from '../../components/common/PrimaryButton';

import { colors } from '../../theme/color';

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    'Checkout'
  >;

export default function CheckoutScreen({
  navigation,
}: Props) {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(
    state => state.cart.items
  );

  const [name, setName] =
    useState('');

  const [address, setAddress] =
    useState('');

  const [phone, setPhone] =
    useState('');

  const [errors, setErrors] =
    useState({
      name: '',
      address: '',
      phone: '',
    });

  const total = useMemo(() => {
    return cartItems.reduce(
      (sum, item) =>
        sum +
        item.discountedPrice *
          item.quantity,
      0
    );
  }, [cartItems]);

  const validate = () => {
    const newErrors = {
      name: '',
      address: '',
      phone: '',
    };

    let valid = true;

    if (!name.trim()) {
      newErrors.name =
        'Name is required';

      valid = false;
    }

    if (!address.trim()) {
      newErrors.address =
        'Address is required';

      valid = false;
    }

    if (!phone.trim()) {
      newErrors.phone =
        'Phone number is required';

      valid = false;
    }

    if (
      phone.trim().length < 10
    ) {
      newErrors.phone =
        'Invalid phone number';

      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;

    dispatch(clearCart());

    Toast.show({
    type: 'success',

    text1: 'Order Placed',

    text2:
        'Your order was successful',
    });
    navigation.replace(
      'OrderSuccess'
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.contentContainer
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>
          Delivery Details
        </Text>

        <View style={styles.section}>
          <Text style={styles.label}>
            Full Name
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="John Doe"
            style={styles.input}
          />

          {!!errors.name && (
            <Text style={styles.error}>
              {errors.name}
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Address
          </Text>

          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            multiline
            style={[
              styles.input,
              styles.multilineInput,
            ]}
          />

          {!!errors.address && (
            <Text style={styles.error}>
              {errors.address}
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>
            Phone Number
          </Text>

          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="9876543210"
            style={styles.input}
          />

          {!!errors.phone && (
            <Text style={styles.error}>
              {errors.phone}
            </Text>
          )}
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>
            Order Summary
          </Text>

          <Text style={styles.summaryText}>
            Items: {cartItems.length}
          </Text>

          <Text style={styles.summaryTotal}>
            Total: $
            {total.toFixed(2)}
          </Text>
        </View>

        <PrimaryButton
          title="Place Order"
          onPress={handlePlaceOrder}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  container: {
    flex: 1,

    backgroundColor:
      colors.background,
  },

  contentContainer: {
    padding: 16,

    paddingBottom: 40,
  },

  heading: {
    fontSize: 28,

    fontWeight: '700',

    color: colors.text,

    marginBottom: 24,
  },

  section: {
    marginBottom: 20,
  },

  label: {
    marginBottom: 8,

    fontWeight: '600',

    color: colors.text,
  },

  input: {
    backgroundColor:
      colors.card,

    borderRadius: 12,

    borderWidth: 1,

    borderColor:
      colors.border,

    paddingHorizontal: 16,

    paddingVertical: 14,

    color: colors.text,
  },

  multilineInput: {
    minHeight: 100,

    textAlignVertical: 'top',
  },

  error: {
    marginTop: 6,

    color: colors.danger,

    fontSize: 12,
  },

  summaryCard: {
    backgroundColor:
      colors.card,

    borderRadius: 16,

    padding: 20,

    marginBottom: 24,
  },

  summaryTitle: {
    fontSize: 18,

    fontWeight: '700',

    color: colors.text,

    marginBottom: 12,
  },

  summaryText: {
    color: colors.textSecondary,

    marginBottom: 8,
  },

  summaryTotal: {
    fontSize: 22,

    fontWeight: '700',

    color: colors.primary,
  },
});