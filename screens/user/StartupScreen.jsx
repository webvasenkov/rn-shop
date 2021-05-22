import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authAC } from '../../store/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Preloader from '../../components/UI/Preloader';

const StartupScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const storageData = JSON.parse(await AsyncStorage.getItem('authData'));
      if (!storageData) {
        navigation.navigate('Auth');
        return;
      }

      const { expiresDate, token, userId } = storageData;
      if (+new Date(expiresDate) >= Date.now() || !token || !userId) {
        navigation.navigate('Auth');
        return;
      }

      dispatch(authAC(userId, token));
      navigation.navigate('Shop');
    };

    tryLogin();
  }, []);

  return <Preloader />;
};

export default StartupScreen;
