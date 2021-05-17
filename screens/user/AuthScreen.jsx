import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import IconButton from '../../components/UI/IconButton';

const AuthScreen = () => {
  return (
    <View style={styles.container}>
      <Card pad={15} style={styles.card}>
        <Input
          id='email'
          label='Email'
          placeholder='Enter email...'
          keyboardType='email-address'
          wrongText='Please check your email'
          required
          initialValue=''
          onInputChange={() => {}}
        />
        <Input
          id='password'
          label='Password'
          placeholder='Enter password...'
          autoCapitalize='none'
          wrongText='Please check your password'
          required
          initialValue=''
          onInputChange={() => {}}
        />
        <View style={styles.buttons}>
          <IconButton style={styles.signUp} isGhost>
            Sign Up
          </IconButton>
          <IconButton>Login</IconButton>
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
