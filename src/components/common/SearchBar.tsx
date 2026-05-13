import React from 'react';

import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

import { colors } from '../../theme/color';

interface Props {
  value: string;

  onChangeText: (
    text: string
  ) => void;

  placeholder?: string;
}

function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search products...',
}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={
          onChangeText
        }
        placeholder={placeholder}
        placeholderTextColor={
          colors.textSecondary
        }
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,

    marginTop: 16,

    marginBottom: 8,
  },

  input: {
    backgroundColor:
      colors.card,

    borderRadius: 14,

    paddingHorizontal: 16,

    paddingVertical: 14,

    borderWidth: 1,

    borderColor:
      colors.border,

    color: colors.text,
  },
});
export default React.memo(
  SearchBar
);