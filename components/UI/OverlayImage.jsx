import React from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';

const OverlayImage = ({ children, style, overlayStyle, ...restProps }) => {
  return (
    <ImageBackground {...restProps} style={[styles.image, style]}>
      <View style={[styles.overlay, overlayStyle]}>{children}</View>
    </ImageBackground>
  );
};

export default OverlayImage;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
