// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/reducers/cartReducer';
import { addOrder } from '../../store/reducers/orderReducer';
import { costRound } from '../../utils/number';
import CartItem from '../../components/shop/CartItem';
import TitleText from '../../components/UI/TitleText';
import Card from '../../components/UI/Card';
import BodyText from '../../components/UI/BodyText';
import IconButton from '../../components/UI/IconButton';
import Preloader from '../../components/UI/Preloader';

const CartScreen = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { items, totalAmount } = useSelector((state) => state.cart);
  const cartItems = Object.keys(items)
    .map((key) => ({ key, ...items[key] }))
    .sort((a, b) => (a.key < b.key ? -1 : 1));

  const cartItem = ({ item }) => (
    <CartItem
      title={item.titleProduct}
      quantity={item.quantity}
      sum={item.sum}
      onRemove={() => dispatch(removeFromCart(item.key))}
      deletable
    />
  );

  useEffect(() => {
    if (error) Alert.alert('An occurred error', error, [{ text: 'Okay' }]);
  }, [error]);

  const handleCreateOrder = async () => {
    if (cartItems.length) {
      setError('');
      setIsLoading(true);
      try {
        await dispatch(addOrder(totalAmount, cartItems));
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    } else Alert.alert('Cart is empty', 'Please add something to the cart', [{ text: 'Okay' }]);
  };

  if (isLoading) return <Preloader />;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.totalContainer}>
          <TitleText>Total: $ {costRound(totalAmount)}</TitleText>
          <IconButton onPress={handleCreateOrder} dataIcon={{ name: 'wallet-outline' }}>
            Order now
          </IconButton>
        </View>

        {cartItems.length ? (
          <Card style={styles.cartContainer} pad={15}>
            <FlatList keyExtractor={(item) => item.key} data={cartItems} renderItem={cartItem} />
          </Card>
        ) : (
          <BodyText style={styles.textStub}>Cart is empty</BodyText>
        )}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  cartContainer: {
    marginTop: 15,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStub: {
    marginTop: 15,
    textAlign: 'center',
  },
});
