import React from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { COLORS } from '../../constants/styles';
import TitleText from '../UI/TitleText';
import IconButton from '../UI/IconButton';
import OverlayImage from '../UI/OverlayImage';

const ProductItem = ({ title, imageUrl, price, onMore, onAddToCart }) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.shadowContainer}>
      <View>
        <TouchableCmp onPress={onMore} useForeground>
          <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
              <OverlayImage source={{ uri: imageUrl }} overlayStyle={styles.overlay}>
                <TitleText style={styles.text}>{title}</TitleText>
                <TitleText style={[styles.text, styles.price]}>$ {price}</TitleText>
              </OverlayImage>
            </View>
            <View style={styles.buttonsContainer}>
              <IconButton onPress={onAddToCart} dataIcon={{ name: 'cart-outline' }}>
                Add To Cart
              </IconButton>
              <IconButton onPress={onMore} dataIcon={{ name: 'eye-outline' }} isGhost>
                More
              </IconButton>
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  shadowContainer: {
    height: 300,
    margin: 15,
    backgroundColor: 'transparent',
    borderRadius: 7.5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: COLORS.accent,
    shadowRadius: 3.25,
    shadowOpacity: 0.15,
    elevation: 3,
    overflow: 'hidden',
  },
  cardContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 7.5,
  },
  imageContainer: {
    height: '75%',
    width: '100%',
    overflow: 'hidden',
  },
  overlay: {
    justifyContent: 'space-between',
    padding: 15,
  },
  text: {
    color: COLORS.primary,
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
