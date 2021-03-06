// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, addProduct, updateProduct } from '../../store/reducers/productsReducer';
import { useControlForm } from '../../hooks/useControlForm';
import Input from '../../components/UI/Input';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Card from '../../components/UI/Card';
import Preloader from '../../components/UI/Preloader';

const EditProductScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const productId = navigation.getParam('productId');
  const editProduct = useSelector((state) => state.products.user.find((product) => product.id === productId));
  const initialState = {
    inputValues: {
      title: editProduct?.title ?? '',
      description: editProduct?.description ?? '',
      imageUrl: editProduct?.imageUrl ?? '',
      price: '',
    },
    inputValidities: {
      title: !!editProduct,
      description: !!editProduct,
      imageUrl: !!editProduct,
      price: !!editProduct,
    },
    formIsValid: !!editProduct,
  };
  const [formState, onInputChange] = useControlForm(initialState);
  const { inputValues, formIsValid } = formState;

  useEffect(() => {
    if (error) Alert.alert('An occurred error', error, [{ text: 'Okay' }]);
  }, [error]);

  const handleSubmit = useCallback(async () => {
    if (!formIsValid) {
      Alert.alert('Something went wrong!', 'Please check errors in form', [{ text: 'Okay' }]);
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      if (editProduct) {
        await dispatch(updateProduct(productId, inputValues.title, inputValues.imageUrl, inputValues.description));
      } else {
        await dispatch(
          addProduct(inputValues.title, inputValues.imageUrl, inputValues.description, +inputValues.price)
        );
      }
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, productId, formState]);

  useEffect(() => {
    navigation.setParams({ submit: handleSubmit });
  }, [handleSubmit]);

  if (isLoading) return <Preloader />;

  return (
    <KeyboardAvoidingView style={styles.container} behavior='height' keyboardVerticalOffset={100}>
      <ScrollView>
        <Card style={styles.form}>
          <Input
            id='title'
            label='Title'
            placeholder='Enter title...'
            wrongText='Please check your title'
            onInputChange={onInputChange}
            initialValue={initialState.inputValues.title}
            initialValidate={initialState.inputValidities.title}
            required
          />
          <Input
            id='description'
            label='Description'
            placeholder='Enter description...'
            wrongText='Please check your description'
            onInputChange={onInputChange}
            initialValue={initialState.inputValues.description}
            initialValidate={initialState.inputValidities.description}
            multiline
            numberOfLines={3}
            textAlignVertical='top'
            required
          />
          <Input
            id='imageUrl'
            label='Image URL'
            placeholder='Enter image url...'
            wrongText='Please check your image url'
            onInputChange={onInputChange}
            initialValue={initialState.inputValues.imageUrl}
            initialValidate={initialState.inputValidities.imageUrl}
            required
          />
          {!editProduct && (
            <Input
              id='price'
              label='Price'
              placeholder='Enter price...'
              wrongText='Please check your price'
              required
              onInputChange={onInputChange}
              initialValue={initialState.inputValues.price}
              initialValidate={initialState.inputValidities.price}
              keyboardType='decimal-pad'
              required
              min={0.5}
            />
          )}
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
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
  container: {
    flex: 1,
  },
  form: {
    margin: 15,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
});
