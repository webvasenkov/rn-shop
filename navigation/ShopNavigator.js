import React from 'react';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { COLORS } from '../constants/styles';
import { Ionicons } from '@expo/vector-icons';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

const defaultNavigationOptions = {
  headerTintColor: Platform.OS === 'android' ? COLORS.primary : COLORS.accent,
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? COLORS.accent : COLORS.primary,
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
      activeTintColor: COLORS.accent,
    },
    hideStatusBar: true,
  }
);

export default createAppContainer(ShopNavigator);
