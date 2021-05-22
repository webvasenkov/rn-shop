import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/reducers/cartReducer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { setProducts } from '../../store/reducers/productsReducer';
import BodyText from '../../components/UI/BodyText';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import IconButton from '../../components/UI/IconButton';
import Preloader from '../../components/UI/Preloader';
import Refresh from '../../components/UI/Refresh';

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.all);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    console.log('RUN FETCH PRODUCTS');
    setError('');
    setIsRefreshing(true);
    try {
      await dispatch(setProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('willFocus', loadProducts);
    return () => willFocusSub.remove();
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => setIsLoading(false));
  }, [loadProducts]);

  const handleSelectItem = (id, title) => {
    navigation.navigate('ProductDetail', { productId: id, productTitle: title });
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  if (isLoading) return <Preloader />;

  if (error) return <Refresh onRefresh={loadProducts} />;

  if (!isLoading && !products.length) {
    return (
      <View style={styles.centredContainer}>
        <BodyText>Products list is empty, maybe you can add something!</BodyText>
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

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      keyExtractor={(item) => item.id}
      data={products}
      renderItem={productItem}
    />
  );
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'All Products',
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
});
