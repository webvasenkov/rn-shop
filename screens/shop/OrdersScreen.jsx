// @ts-nocheck
import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { costRound } from '../../utils/number';
import { setOrders } from '../../store/reducers/orderReducer';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import BodyText from '../../components/UI/BodyText';
import TitleText from '../../components/UI/TitleText';
import Preloader from '../../components/UI/Preloader';
import Refresh from '../../components/UI/Refresh';
import Card from '../../components/UI/Card';

const OrdersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { orders, totalAmount } = useSelector((state) => state.order);
  const orderItem = ({ item }) => (
    <OrderItem amount={item.totalAmount} date={item.readableDate} cartItems={item.items} />
  );

  const loadOrders = useCallback(async () => {
    setError('');
    setIsLoading(true);
    try {
      await dispatch(setOrders());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('willFocus', loadOrders);
    return () => willFocusSub.remove();
  }, [loadOrders]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  if (isLoading) return <Preloader />;
  if (!isLoading && !orders.length)
    return (
      <View style={styles.centredContainer}>
        <Card pad={15}>
          <BodyText>You haven't made an order yet!</BodyText>
        </Card>
      </View>
    );
  if (error) return <Refresh onRefresh={loadOrders} />;

  return (
    <View style={styles.container}>
      <TitleText>Total: $ {costRound(totalAmount)}</TitleText>
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
  centredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
