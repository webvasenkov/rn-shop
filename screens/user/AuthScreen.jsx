import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useControlForm } from '../../hooks/useControlForm';
import { useDispatch } from 'react-redux';
import { auth } from '../../store/reducers/authReducer';
import Preloader from '../../components/UI/Preloader';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import IconButton from '../../components/UI/IconButton';

const AuthScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const initialState = {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  };
  const [formState, onInputChange] = useControlForm(initialState);
  const { inputValues, formIsValid } = formState;

  useEffect(() => {
    if (error) Alert.alert('An occurred error', error, [{ text: 'Okay' }]);
  }, [error]);

  const handleAuth = async (type) => {
    if (!formIsValid) {
      Alert.alert('Something went wrong!', 'Please check errors in form', [{ text: 'Okay' }]);
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await dispatch(auth(inputValues.email, inputValues.password, type));
      navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (isLoading) return <Preloader />;

  return (
    <View style={styles.container}>
      <Card pad={15} style={styles.card}>
        <Input
          id='email'
          label='Email'
          placeholder='Enter email...'
          keyboardType='email-address'
          wrongText='Please check your email'
          email
          required
          initialValue={initialState.inputValues.email}
          onInputChange={onInputChange}
        />
        <Input
          id='password'
          label='Password'
          placeholder='Enter password...'
          autoCapitalize='none'
          wrongText='Please check your password'
          secureTextEntry={true}
          textContentType='password'
          required
          minLength={6}
          initialValue={initialState.inputValues.password}
          onInputChange={onInputChange}
        />
        <View style={styles.buttons}>
          <IconButton onPress={() => handleAuth('signup')} style={styles.signUp} isGhost>
            Sign Up
          </IconButton>
          <IconButton onPress={() => handleAuth('login')}>Login</IconButton>
        </View>
      </Card>
    </View>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authentication',
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  signUp: {
    marginRight: 7.5,
  },
});
