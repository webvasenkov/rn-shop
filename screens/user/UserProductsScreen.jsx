import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, deleteProduct } from '../../store/reducers/productsReducer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import IconButton from '../../components/UI/IconButton';
import ProductItem from '../../components/shop/ProductItem';
import Preloader from '../../components/UI/Preloader';
import BodyText from '../../components/UI/BodyText';

const UserProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProducts = useSelector((state) => state.products.user);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) Alert.alert('An occurred error', error, [{ text: 'Okay' }]);
  }, [error]);

  const handleDeleteItem = (id) => {
    const handlePress = async () => {
      setError('');
      setIsLoading(true);
      try {
        await dispatch(deleteProduct(id));
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    Alert.alert('Are you sure?', 'Delete product permanently', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', style: 'default', onPress: handlePress },
    ]);
  };

  const handleEditItem = (id) => navigation.navigate('EditProduct', { productId: id });
  const handleSelectItem = (id, title) =>
    navigation.navigate('ProductUserDetail', { productId: id, productTitle: title });

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

  if (isLoading) return <Preloader />;

  if (!isLoading && !userProducts.length) {
    return (
      <View style={styles.centredContainer}>
        <BodyText>No products, add something!</BodyText>
      </View>
    );
  }

  return <FlatList keyExtractor={(item) => item.id} data={userProducts} renderItem={productItem} />;
};

UserProductsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'My Products',
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

const styles = StyleSheet.create({
  centredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
