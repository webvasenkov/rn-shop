// @ts-nocheck
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { costRound } from '../../utils/number';
import TitleText from '../UI/TitleText';

const CartItem = ({ title, quantity, sum, onRemove, deletable }) => {
  const sumQuantity = `$ ${costRound(sum)} / ${quantity}`;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <TitleText numberOfLines={1} style={styles.title}>
          {title}
        </TitleText>
        <TitleText>{sumQuantity}</TitleText>
      </View>
      {deletable && <Ionicons style={styles.btnRemove} name='close-circle-outline' size={26} onPress={onRemove} />}
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    textTransform: 'uppercase',
  },
  btnRemove: {
    marginLeft: 30,
  },
});
