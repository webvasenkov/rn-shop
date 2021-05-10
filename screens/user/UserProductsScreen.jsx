import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../../store/reducers/productsReducer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import IconButton from '../../components/UI/IconButton';
import ProductItem from '../../components/shop/ProductItem';

const UserProductsScreen = () => {
  const dispatch = useDispatch();
  const userProducts = useSelector((state) => state.products.user);
  const handleDeleteProduct = (id) => dispatch(deleteProduct(id));
  const productItem = ({ item }) => (
    <ProductItem title={item.title} imageUrl={item.imageUrl} price={item.price}>
      <IconButton dataIcon={{ name: 'cog-outline' }} onPress={() => {}}>
        Edit
      </IconButton>
      <IconButton dataIcon={{ name: 'trash-outline' }} onPress={() => handleDeleteProduct(item.id)} isGhost>
        Delete
      </IconButton>
    </ProductItem>
  );
  return <FlatList keyExtractor={(item) => item.id} data={userProducts} renderItem={productItem} />;
};

UserProductsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'User Products',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item title='Menu' iconName='menu-outline' onPress={navigation.toggleDrawer} />
    </HeaderButtons>
  ),
});

export default UserProductsScreen;
