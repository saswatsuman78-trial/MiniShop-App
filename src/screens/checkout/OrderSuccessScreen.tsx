import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { RootStackParamList } from '../../types/navigation';

import PrimaryButton from '../../components/common/PrimaryButton';

import { colors } from '../../theme/color';

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    'OrderSuccess'
  >;

export default function OrderSuccessScreen({
  navigation,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>
        🎉
      </Text>

      <Text style={styles.title}>
        Order Placed Successfully
      </Text>

      <Text style={styles.description}>
        Thank you for shopping with
        MiniShop.
      </Text>

      <PrimaryButton
        title="Continue Shopping"
        onPress={() =>
          navigation.popToTop()
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor:
      colors.background,

    justifyContent: 'center',

    padding: 24,
  },

  emoji: {
    fontSize: 72,

    textAlign: 'center',

    marginBottom: 24,
  },

  title: {
    fontSize: 28,

    fontWeight: '700',

    color: colors.text,

    textAlign: 'center',
  },

  description: {
    marginTop: 12,

    marginBottom: 32,

    color: colors.textSecondary,

    textAlign: 'center',

    lineHeight: 24,
  },
});