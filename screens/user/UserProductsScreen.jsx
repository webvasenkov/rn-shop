import React from 'react';
import { FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../../store/reducers/productsReducer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import IconButton from '../../components/UI/IconButton';
import ProductItem from '../../components/shop/ProductItem';

const UserProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProducts = useSelector((state) => state.products.user);

  const handleDeleteItem = (id) => {
    Alert.alert('Are you sure?', 'Delete product permanently', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', style: 'default', onPress: () => dispatch(deleteProduct(id)) },
    ]);
  };

  const handleEditItem = (id) => navigation.navigate('EditProduct', { productId: id });
  const handleSelectItem = (id, title) => navigation.navigate('ProductDetail', { productId: id, productTitle: title });

  const productItem = ({ item }) => (
    <ProductItem
      title={item.title}
      imageUrl={item.imageUrl}
      price={item.price}
      onSelect={() => handleSelectItem(item.id, item.title)}
    >
      <IconButton dataIcon={{ name: 'cog-outline' }} onPress={() => handleEditItem(item.id)}>
        Edit
      </IconButton>
      <IconButton dataIcon={{ name: 'trash-outline' }} onPress={() => handleDeleteItem(item.id)} isGhost>
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
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item title='Add' iconName='add-outline' onPress={() => navigation.navigate('EditProduct')} />
    </HeaderButtons>
  ),
});

export default UserProductsScreen;
