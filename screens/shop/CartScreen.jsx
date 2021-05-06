import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import TitleText from '../../components/UI/TitleText';
import IconButton from '../../components/UI/IconButton';

const CartScreen = () => {
  const cartState = useSelector((state) => state.cart);
  const cartItems = Object.keys(cartState.items).map((key) => ({ key, ...cartState.items[key] }));

  console.log(cartItems);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.totalContainer}>
          <TitleText>Total: $ {cartState.totalAmount}</TitleText>
          <IconButton dataIcon={{ name: 'wallet-outline' }}>Order now</IconButton>
        </View>
        <View style={styles.cartContainer}>
          {cartItems.map((item) => (
            <CartItem title={item.titleProduct} quantity={item.quantity} sum={item.sum} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    padding: 15,
  },
  cartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 7.5,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
