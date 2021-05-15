// @ts-nocheck
import React, { useEffect, useCallback, useReducer } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../../store/reducers/productsReducer';
import Input from '../../components/UI/Input';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Card from '../../components/UI/Card';

const FORM_INPUT_UPDATE = 'FORM-INPUT-UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updateValues = { ...state.inputValues, [action.input]: action.value };
    const updateValidities = { ...state.inputValidities, [action.input]: action.isValid };

    let formUpdateIsValid = true;
    for (const key in updateValidities) {
      console.log(key, updateValidities[key]);
      formUpdateIsValid = formUpdateIsValid && updateValidities[key];
    }

    return { inputValues: updateValues, inputValidities: updateValidities, formIsValid: formUpdateIsValid };
  }

  return state;
};

const EditProductScreen = ({ navigation }) => {
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

  const [formState, dispatchFormState] = useReducer(formReducer, initialState);
  const { inputValues, formIsValid } = formState;

  const handleSubmit = useCallback(() => {
    if (!formIsValid) {
      Alert.alert('Something went wrong!', 'Please check errors in form', [{ text: 'Okay' }]);
      return;
    }
    if (editProduct) {
      dispatch(updateProduct(productId, inputValues.title, inputValues.imageUrl, inputValues.description));
    } else {
      dispatch(addProduct(inputValues.title, inputValues.imageUrl, inputValues.description, inputValues.price));
    }
    navigation.goBack();
  }, [dispatch, productId, formState]);

  useEffect(() => {
    navigation.setParams({ submit: handleSubmit });
  }, [handleSubmit]);

  const onInputChange = useCallback(
    (id, text, isValid) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: text,
        isValid,
        input: id,
      });
    },
    [dispatchFormState]
  );

  return (
    <Card style={styles.form}>
      <Input
        id='title'
        label='Title'
        wrongText='Please check your title'
        onInputChange={onInputChange}
        initialValue={initialState.inputValues.title}
        initialValidate={initialState.inputValidities.title}
        required
      />
      <Input
        id='description'
        label='Description'
        wrongText='Please check your description'
        onInputChange={onInputChange}
        initialValue={initialState.inputValues.description}
        initialValidate={initialState.inputValidities.description}
        required
      />
      <Input
        id='imageUrl'
        label='Image URL'
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
          wrongText='Please check your image url'
          required
          onInputChange={onInputChange}
          initialValue={initialState.inputValues.price}
          initialValidate={initialState.inputValidities.price}
          keyboardType='decimal-pad'
          required
        />
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
});
