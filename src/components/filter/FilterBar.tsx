import React from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import { colors } from '../../theme/color';

interface Props {
  onPressFilters: () => void;
}

export default function FilterBar({
  onPressFilters,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPressFilters}
      >
        <Text style={styles.text}>
          Filters
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,

    marginBottom: 12,
  },

  button: {
    backgroundColor:
      colors.primary,

    paddingVertical: 12,

    borderRadius: 12,

    alignItems: 'center',
  },

  text: {
    color: '#fff',

    fontWeight: '700',

    fontSize: 15,
  },
});