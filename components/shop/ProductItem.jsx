import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles';
import TitleText from '../text/TitleText';
import IconButton from '../IconButton';
import OverlayImage from '../OverlayImage';

const ProductItem = ({ title, imageUrl, price, onMore, onAddToCart }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <OverlayImage source={{ uri: imageUrl }} overlayStyle={styles.overlay}>
          <TitleText style={styles.text}>{title}</TitleText>
          <TitleText style={[styles.text, styles.price]}>$ {price}</TitleText>
        </OverlayImage>
      </View>
      <View style={styles.buttonsContainer}>
        <IconButton onPress={onAddToCart} dataIcon={{ name: 'cart-outline' }} isGhost>
          Add To Cart
        </IconButton>
        <IconButton onPress={onMore} dataIcon={{ name: 'eye-outline' }}>
          More
        </IconButton>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    height: 300,
    margin: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: COLORS.accent,
    overflow: 'hidden',
  },
  imageContainer: {
    height: '75%',
    width: '100%',
  },
  overlay: {
    justifyContent: 'space-between',
    padding: 15,
  },
  text: {
    color: '#fff',
  },
  price: {
    alignSelf: 'flex-end',
    fontSize: 21,
  },
  buttonsContainer: {
    height: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
});
