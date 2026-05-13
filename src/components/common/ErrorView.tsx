import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { colors } from '../../theme/color';

import PrimaryButton from './PrimaryButton';

interface Props {
  message: string;

  onRetry?: () => void;
}

export default function ErrorView({
  message,
  onRetry,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Something went wrong
      </Text>

      <Text style={styles.message}>
        {message}
      </Text>

      {onRetry && (
        <PrimaryButton
          title="Retry"
          onPress={onRetry}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',

    padding: 24,
  },

  title: {
    fontSize: 20,

    fontWeight: '700',

    color: colors.danger,
  },

  message: {
    marginTop: 8,

    marginBottom: 20,

    textAlign: 'center',

    color: colors.textSecondary,
  },
});