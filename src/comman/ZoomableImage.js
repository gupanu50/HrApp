import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ImageViewer} from 'react-native-image-zoom-viewer';

export default function ZoomableImage({imageUrl}) {
  const images = [{url: imageUrl}];
  return (
    <View style={styles.container}>
      <ImageViewer imageUrls={images} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Set your desired background color
  },
});
