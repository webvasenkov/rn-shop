import React from 'react';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createSwitchNavigator } from 'react-navigation';
import { color } from '../utils/styleGuide';
import { Ionicons } from '@expo/vector-icons';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';

const defaultNavigationOptions = {
  headerTintColor: Platform.OS === 'android' ? color.primary : color.accent,
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? color.accent : color.primary,
  },
  headerTitleStyle: {
    fontFamily: 'montserrat-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'montserrat-light',
  },
};

const ProductsNavigator = createStackNavigator(
  {
    Products: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions,
    navigationOptions: { drawerIcon: ({ tintColor }) => <Ionicons name='cube-outline' size={21} color={tintColor} /> },
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    defaultNavigationOptions,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => <Ionicons name='list-outline' size={21} color={tintColor} />,
    },
  }
);

const UserProductsNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    ProductUserDetail: ProductDetailScreen,
    EditProduct: EditProductScreen,
  },
  {
    defaultNavigationOptions,
    navigationOptions: {
      drawerLabel: 'User Products',
      drawerIcon: ({ tintColor }) => <Ionicons name='person-circle-outline' size={21} color={tintColor} />,
    },
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    UserProducts: UserProductsNavigator,
  },
  {
    contentOptions: {
      activeTintColor: color.accent,
    },
    hideStatusBar: true,
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  { defaultNavigationOptions }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
