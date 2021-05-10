import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/reducers/cartReducer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import IconButton from '../../components/UI/IconButton';

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.all);
  const dispatch = useDispatch();
  const handleSelectItem = (id, title) => {
    navigation.navigate('ProductDetail', { productId: id, productTitle: title });
  };
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };
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
