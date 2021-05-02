import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles';
import TitleText from '../text/TitleText';
import IconButton from '../IconButton';

const ProductItem = ({ title, imageUrl, price, onMore, onAddToCart }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground source={{ uri: imageUrl }} style={styles.image}>
          <View style={styles.overlay}>
            <TitleText style={styles.title}>{title}</TitleText>
            <TitleText style={styles.price}>$ {price}</TitleText>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.buttonsContainer}>
        <IconButton dataIcon={{ name: 'cart-outline' }} isGhost>
          Add To Cart
        </IconButton>
        <IconButton dataIcon={{ name: 'eye-outline' }}>More</IconButton>
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
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
    padding: 15,
  },
  title: {
    alignSelf: 'flex-start',
    color: '#fff',
  },
  price: {
    alignSelf: 'flex-end',
    color: '#fff',
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
