import React from 'react';

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  useAppDispatch,
  useAppSelector,
} from '../../hooks/redux';

import {
  toggleCategory,
  setSortBy,
  toggleInStockOnly,
  clearFilters,
} from '../../store/slices/filterSlice';

import { colors } from '../../theme/color';

interface Props {
  visible: boolean;

  onClose: () => void;
}

const categories = [
  'beauty',
  'fragrances',
  'furniture',
  'groceries',
];

export default function FilterModal({
  visible,
  onClose,
}: Props) {
  const dispatch = useAppDispatch();

  const filters = useAppSelector(
    state => state.filters
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>
              Filters
            </Text>

            <Text style={styles.section}>
              Categories
            </Text>

            <View style={styles.chips}>
              {categories.map(
                category => {
                  const selected =
                    filters.selectedCategories.includes(
                      category
                    );

                  return (
                    <TouchableOpacity
                      key={category}
                      style={[
                        styles.chip,
                        selected &&
                          styles.selectedChip,
                      ]}
                      onPress={() =>
                        dispatch(
                          toggleCategory(
                            category
                          )
                        )
                      }
                    >
                      <Text
                        style={[
                          styles.chipText,
                          selected && {
                            color: '#fff',
                          },
                        ]}
                      >
                        {category}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              )}
            </View>

            <Text style={styles.section}>
              Sort By
            </Text>

            {[
            {
                label:
                'Price Low to High',
                value:
                'price_asc',
            },

            {
                label:
                'Price High to Low',
                value:
                'price_desc',
            },

            {
                label:
                'Top Rated',
                value:
                'rating',
            },
            ].map(option => {
            const selected =
                filters.sortBy ===
                option.value;

            return (
                <TouchableOpacity
                key={option.value}
                style={[
                    styles.option,
                    selected &&
                    styles.selectedOption,
                ]}
                onPress={() =>
                    dispatch(
                    setSortBy(
                        option.value as any
                    )
                    )
                }
                >
                <Text
                    style={{
                    color: selected
                        ? '#fff'
                        : colors.text,

                    fontWeight: selected
                        ? '700'
                        : '400',
                    }}
                >
                    {option.label}

                    {selected
                    ? ' ✓'
                    : ''}
                </Text>
                </TouchableOpacity>
            );
            })}

            <TouchableOpacity
              style={styles.stockButton}
              onPress={() =>
                dispatch(
                  toggleInStockOnly()
                )
              }
            >
              <Text
                style={{
                  color: '#fff',
                }}
              >
                {filters.inStockOnly
                  ? 'In Stock Only ✓'
                  : 'Show All'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                    dispatch(
                    clearFilters()
                    );

                    onClose();
                }}
            >
              <Text
                style={{
                  color: '#fff',
                }}
              >
                Clear Filters
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text
                style={{
                  color: '#fff',
                }}
              >
                Apply Filters
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    backgroundColor:
      'rgba(0,0,0,0.4)',

    justifyContent: 'flex-end',
  },

  container: {
    backgroundColor:
      colors.background,

    borderTopLeftRadius: 24,

    borderTopRightRadius: 24,

    padding: 20,

    maxHeight: '80%',
  },

  title: {
    fontSize: 24,

    fontWeight: '700',

    marginBottom: 20,
  },

  section: {
    marginTop: 16,

    marginBottom: 10,

    fontWeight: '700',

    fontSize: 16,
  },

  chips: {
    flexDirection: 'row',

    flexWrap: 'wrap',
  },

  chip: {
    paddingHorizontal: 14,

    paddingVertical: 10,

    backgroundColor:
      colors.border,

    borderRadius: 999,

    marginRight: 10,

    marginBottom: 10,
  },

  selectedChip: {
    backgroundColor:
      colors.primary,
  },

  chipText: {
    color: colors.text,
  },

  option: {
    paddingVertical: 14,

    borderBottomWidth: 1,

    borderBottomColor:
      colors.border,
  },

  stockButton: {
    marginTop: 20,

    backgroundColor:
      colors.primary,

    padding: 14,

    borderRadius: 12,

    alignItems: 'center',
  },

  clearButton: {
    marginTop: 14,

    backgroundColor:
      colors.danger,

    padding: 14,

    borderRadius: 12,

    alignItems: 'center',
  },

  closeButton: {
    marginTop: 14,

    backgroundColor:
      colors.success,

    padding: 14,

    borderRadius: 12,

    alignItems: 'center',
  },
  selectedOption: {
  backgroundColor:
    colors.primary,

  borderRadius: 12,

  paddingHorizontal: 12,
},
});