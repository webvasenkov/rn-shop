import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/reducers/cartReducer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { setProducts } from '../../store/reducers/productsReducer';
import Card from '../../components/UI/Card';
import BodyText from '../../components/UI/BodyText';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import IconButton from '../../components/UI/IconButton';
import Preloader from '../../components/UI/Preloader';

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.all);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError('');
    setIsLoading(true);
    try {
      await dispatch(setProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('willFocus', loadProducts);
    return () => willFocusSub.remove();
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSelectItem = (id, title) => {
    navigation.navigate('ProductDetail', { productId: id, productTitle: title });
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  if (isLoading) return <Preloader />;

  if (!isLoading && !products.length) {
    return (
      <View style={styles.centredContainer}>
        <Card pad={15}>
          <BodyText>Products list is empty, maybe you can add something!</BodyText>
        </Card>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centredContainer}>
        <Card style={styles.errorCard} pad={15}>
          <BodyText>Something went wrong!</BodyText>
          <IconButton style={styles.tryBtn} dataIcon={{ name: 'refresh' }} onPress={loadProducts}>
            Try Again!
          </IconButton>
        </Card>
      </View>
    );
  }

  const productItem = ({ item }) => (
    <ProductItem
      title={item.title}
      imageUrl={item.imageUrl}
      price={item.price}
      onSelect={() => handleSelectItem(item.id, item.title)}
    >
      <IconButton onPress={() => handleAddToCart(item)} dataIcon={{ name: 'cart-outline' }}>
        Add To Cart
      </IconButton>
      <IconButton onPress={() => handleSelectItem(item.id, item.title)} dataIcon={{ name: 'eye-outline' }} isGhost>
        More
      </IconButton>
    </ProductItem>
  );

  return <FlatList keyExtractor={(item) => item.id} data={products} renderItem={productItem} />;
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item title='Menu' iconName='menu-outline' onPress={navigation.toggleDrawer} />
    </HeaderButtons>
  ),
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item title='Cart' iconName='cart-outline' onPress={() => navigation.navigate('Cart')} />
    </HeaderButtons>
  ),
});

export default ProductsOverviewScreen;

const styles = StyleSheet.create({
  centredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorCard: {
    alignItems: 'center',
  },
  tryBtn: {
    marginTop: 7.5,
  },
});
