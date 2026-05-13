import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { colors } from '../../theme/color';

interface Props {
  title: string;

  description?: string;
}

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      {description && (
        <Text style={styles.description}>
          {description}
        </Text>
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

    color: colors.text,
  },

  description: {
    marginTop: 8,

    textAlign: 'center',

    color: colors.textSecondary,
  },
});