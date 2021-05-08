import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles';
import Card from '../UI/Card';
import Touchable from '../UI/Touchable';
import TitleText from '../UI/TitleText';
import IconButton from '../UI/IconButton';
import OverlayImage from '../UI/OverlayImage';

const ProductItem = ({ title, imageUrl, price, onMore, onAddToCart }) => {
  return (
    <Card style={styles.shadowContainer}>
      <Touchable onPress={onMore} useForeground>
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
      </Touchable>
    </Card>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  shadowContainer: {
    height: 300,
    margin: 15,
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
