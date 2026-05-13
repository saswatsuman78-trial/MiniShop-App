import React from 'react';

import {
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
  images: string[];
}

export default function ImageCarousel({
  images,
}: Props) {
  return (
    <FlatList
      data={images}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) =>
        index.toString()
      }
      renderItem={({ item }) => (
        <Image
          source={{ uri: item }}
          style={styles.image}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width,

    height: 320,

    resizeMode: 'cover',
  },
});