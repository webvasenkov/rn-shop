import React from 'react';
import { View, StyleSheet } from 'react-native';
import TitleText from '../UI/TitleText';
import BodyText from '../UI/BodyText';

const CartItem = ({ title, quantity, sum }) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <TitleText numberOfLines={1}>{title}</TitleText>
        <BodyText>$ {sum}</BodyText>
      </View>
      <TitleText>{quantity}</TitleText>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
  },
  info: {
    width: '60%',
  },
});
