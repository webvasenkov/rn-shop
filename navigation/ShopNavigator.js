import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { COLORS } from '../constants/styles';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';

const ShopNavigator = createStackNavigator(
  {
    Products: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: {
      headerTintColor: Platform.OS === 'android' ? COLORS.primary : COLORS.accent,
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? COLORS.accent : COLORS.primary,
      },
    },
  }
);

export default createAppContainer(ShopNavigator);
