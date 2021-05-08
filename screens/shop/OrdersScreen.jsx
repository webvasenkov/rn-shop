// @ts-nocheck
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import TitleText from '../../components/UI/TitleText';

const OrdersScreen = () => {
  const { orders, totalAmount } = useSelector((state) => state.order);
  const orderItem = ({ item }) => (
    <OrderItem amount={item.totalAmount} date={item.readableDate} cartItems={item.items} />
  );

  return (
    <View style={styles.container}>
      <TitleText>Total: $ {totalAmount}</TitleText>
      <FlatList keyExtractor={(item) => item.id} data={orders} renderItem={orderItem} />
    </View>
  );
};

OrdersScreen.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item title='Menu' iconName='menu-outline' onPress={navigation.toggleDrawer} />
    </HeaderButtons>
  ),
});

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
