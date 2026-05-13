import React from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { colors } from '../../theme/color';

interface Props {
  title: string;

  onPress: () => void;

  loading?: boolean;

  disabled?: boolean;
}

function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,

        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={colors.card} />
      ) : (
        <Text style={styles.text}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,

    paddingVertical: 14,

    borderRadius: 12,

    alignItems: 'center',

    justifyContent: 'center',
  },

  disabled: {
    opacity: 0.5,
  },

  text: {
    color: colors.card,

    fontWeight: '700',

    fontSize: 16,
  },
});

export default React.memo(
  PrimaryButton
);