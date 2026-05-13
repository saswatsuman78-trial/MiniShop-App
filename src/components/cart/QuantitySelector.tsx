import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { colors } from '../../theme/color';

interface Props {
  quantity: number;

  onIncrement: () => void;

  onDecrement: () => void;
}

function QuantitySelector({
  quantity,
  onIncrement,
  onDecrement,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onDecrement}
      >
        <Text style={styles.symbol}>
          -
        </Text>
      </TouchableOpacity>

      <Text style={styles.quantity}>
        {quantity}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onIncrement}
      >
        <Text style={styles.symbol}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  button: {
    width: 34,

    height: 34,

    borderRadius: 10,

    backgroundColor:
      colors.border,

    alignItems: 'center',

    justifyContent: 'center',
  },

  symbol: {
    fontSize: 18,

    fontWeight: '700',

    color: colors.text,
  },

  quantity: {
    marginHorizontal: 16,

    fontSize: 16,

    fontWeight: '700',

    color: colors.text,
  },
});
export default React.memo(
  QuantitySelector
);