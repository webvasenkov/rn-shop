import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import * as Font from 'expo-font';
import ShopNavigator from './navigation/ShopNavigator';
import AppLoading from 'expo-app-loading';

const fetchFont = () =>
  Font.loadAsync({
    'montserrat-light': require('./assets/fonts/Montserrat-Light.ttf'),
    'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });

const App = () => {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) return <AppLoading startAsync={fetchFont} onFinish={() => setIsReady(true)} onError={console.warn} />;

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
};

export default App;
