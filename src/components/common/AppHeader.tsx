import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { colors } from '../../theme/color';

interface Props {
  title: string;

  rightText?: string;

  onRightPress?: () => void;
}

export default function AppHeader({
  title,
  rightText,
  onRightPress,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      {rightText ? (
        <TouchableOpacity
          style={styles.button}
          onPress={onRightPress}
        >
          <Text style={styles.buttonText}>
            {rightText}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'space-between',

    paddingHorizontal: 16,

    paddingVertical: 12,
  },

  title: {
    fontSize: 28,

    fontWeight: '700',

    color: colors.text,
  },

  button: {
    backgroundColor:
      colors.primary,

    paddingHorizontal: 14,

    paddingVertical: 10,

    borderRadius: 12,
  },

  buttonText: {
    color: colors.card,

    fontWeight: '700',
  },

  placeholder: {
    width: 60,
  },
});