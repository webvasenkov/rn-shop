import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, ScrollView, StyleSheet } from 'react-native';
import TitleText from '../../components/UI/TitleText';
import BodyText from '../../components/UI/BodyText';
import OverlayImage from '../../components/UI/OverlayImage';
import IconButton from '../../components/UI/IconButton';
import { addToCart } from '../../store/reducers/cartReducer';

const ProductDetailScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.all);
  const productId = navigation.getParam('productId');
  const productItem = products.find(({ id }) => id === productId);
  const { title, imageUrl, description, price } = productItem;

  const handleAddToCart = () => {
    dispatch(addToCart(productItem));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <OverlayImage source={{ uri: imageUrl }} overlayStyle={styles.overlay}>
          <TitleText style={styles.text}>{title}</TitleText>
          <TitleText style={[styles.text, styles.price]}>$ {price}</TitleText>
        </OverlayImage>
      </View>
      <View style={styles.descriptionContainer}>
        <BodyText>{description}</BodyText>
        <IconButton onPress={handleAddToCart} dataIcon={{ name: 'cart-outline' }} style={styles.button}>
          Add To Cart
        </IconButton>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;

ProductDetailScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam('productTitle'),
});

const styles = StyleSheet.create({
  imageContainer: {
    height: 300,
  },
  overlay: {
    padding: 15,
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
  },
  price: {
    alignSelf: 'flex-end',
    fontSize: 21,
  },
  descriptionContainer: {
    padding: 15,
  },
  button: {
    marginTop: 30,
    alignSelf: 'center',
  },
});
