import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/reducers/cartReducer';
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.all);
  const dispatch = useDispatch();
  const productItem = ({ item }) => (
    <ProductItem
      title={item.title}
      imageUrl={item.imageUrl}
      price={item.price}
      onMore={() => navigation.navigate('ProductDetail', { productId: item.id, productTitle: item.title })}
      onAddToCart={() => dispatch(addToCart(item))}
    />
  );

  return <FlatList keyExtractor={(item) => item.id} data={products} renderItem={productItem} />;
};

export default ProductsOverviewScreen;
