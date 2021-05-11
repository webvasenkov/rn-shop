import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../../store/reducers/productsReducer';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Card from '../../components/UI/Card';
import BodyText from '../../components/UI/BodyText';

const EditProductScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const productId = navigation.getParam('productId');
  const editProduct = useSelector((state) => state.products.user.find((product) => product.id === productId));
  const [title, setTitle] = useState(editProduct?.title ?? '');
  const [description, setDescription] = useState(editProduct?.description ?? '');
  const [imageUrl, setImageUrl] = useState(editProduct?.imageUrl ?? '');
  const [price, setPrice] = useState('');

  const handleSubmit = useCallback(() => {
    if (editProduct) {
      dispatch(updateProduct(productId, title, imageUrl, description));
    } else {
      dispatch(addProduct(title, imageUrl, description, price));
    }
    navigation.goBack();
  }, [dispatch, productId, title, imageUrl, description, price]);

  useEffect(() => {
    navigation.setParams({ submit: handleSubmit });
  }, [handleSubmit]);

  return (
    <Card style={styles.form}>
      <View style={styles.field}>
        <BodyText>Title</BodyText>
        <TextInput style={styles.input} value={title} onChangeText={(text) => setTitle(text)} />
      </View>
      <View style={styles.field}>
        <BodyText>Description</BodyText>
        <TextInput style={styles.input} value={description} onChangeText={(text) => setDescription(text)} />
      </View>
      <View style={styles.field}>
        <BodyText>Image URL</BodyText>
        <TextInput style={styles.input} value={imageUrl} onChangeText={(text) => setImageUrl(text)} />
      </View>
      {!editProduct && (
        <View style={styles.field}>
          <BodyText>Price</BodyText>
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            value={price}
            onChangeText={(text) => setPrice(text)}
          />
        </View>
      )}
    </Card>
  );
};

EditProductScreen.navigationOptions = ({ navigation }) => {
  const onSubmit = navigation.getParam('submit');
  return {
    headerTitle: navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Save' iconName='checkmark-outline' onPress={onSubmit} />
      </HeaderButtons>
    ),
  };
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 15,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  field: {
    marginBottom: 15,
  },
  input: {
    marginTop: 7.5,
    borderBottomWidth: 1,
    borderColor: COLORS.accent,
  },
});
