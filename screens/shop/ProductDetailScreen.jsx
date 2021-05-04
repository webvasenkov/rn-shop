import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import TitleText from '../../components/text/TitleText';
import BodyText from '../../components/text/BodyText';
import OverlayImage from '../../components/OverlayImage';
import IconButton from '../../components/IconButton';

const ProductDetailScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.all);
  const productId = navigation.getParam('productId');
  const { title, imageUrl, description, price } = products.find(({ id }) => id === productId);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <OverlayImage source={{ uri: imageUrl }} overlayStyle={styles.overlay}>
          <TitleText style={styles.text}>{title}</TitleText>
          <TitleText style={[styles.text, styles.price]}>$ {price}</TitleText>
        </OverlayImage>
      </View>
      <View style={styles.descriptionContainer}>
        <BodyText>{description}</BodyText>
        <IconButton
          onPress={() => navigation.navigate('Cart')}
          dataIcon={{ name: 'cart-outline' }}
          style={styles.button}
        >
          Add To Cart
        </IconButton>
      </View>
    </View>
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
