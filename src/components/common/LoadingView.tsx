import React from 'react';

import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';

import { colors } from '../../theme/color';

interface Props {
  message?: string;
}

export default function LoadingView({
  message = 'Loading...',
}: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={colors.primary}
      />

      <Text style={styles.text}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',
  },

  text: {
    marginTop: 12,

    color: colors.textSecondary,

    fontSize: 14,
  },
});