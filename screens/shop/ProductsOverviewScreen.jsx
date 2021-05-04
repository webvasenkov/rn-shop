import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.all);
  const productItem = ({ item }) => (
    <ProductItem
      title={item.title}
      imageUrl={item.imageUrl}
      price={item.price}
      onMore={() =>
        navigation.navigate({ routeName: 'ProductDetail', params: { productId: item.id, productTitle: item.title } })
      }
      onAddToCart={() => navigation.navigate({ routeName: 'Cart' })}
    />
  );

  return <FlatList keyExtractor={(item) => item.id} data={products} renderItem={productItem} />;
};

export default ProductsOverviewScreen;
