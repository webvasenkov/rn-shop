import React from 'react';
import { View, StyleSheet } from 'react-native';
import BodyText from '../../components/text/BodyText';

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <BodyText>Cart Screen!</BodyText>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
