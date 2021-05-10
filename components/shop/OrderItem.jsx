import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { costRound } from '../../util/number';
import CartItem from '../shop/CartItem';
import Card from '../UI/Card';
import TitleText from '../UI/TitleText';
import IconButton from '../UI/IconButton';

const OrderItem = ({ amount, date, cartItems }) => {
  const [toggleMore, setToggleMore] = useState(false);
  const handleShowMore = () => setToggleMore((prevToggle) => !prevToggle);

  return (
    <Card style={styles.container} pad={15}>
      <View style={styles.header}>
        <TitleText>Total: $ {costRound(amount)}</TitleText>
        <TitleText>{date}</TitleText>
      </View>
      <IconButton
        onPress={handleShowMore}
        style={styles.btnMore}
        dataIcon={{ name: toggleMore ? 'chevron-up-outline' : 'chevron-down-outline' }}
        isGhost={toggleMore}
      >
        {toggleMore ? 'Hide More' : 'Show More'}
      </IconButton>
      {toggleMore &&
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.key} title={cartItem.titleProduct} quantity={cartItem.quantity} sum={cartItem.sum} />
        ))}
    </Card>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  btnMore: {
    marginTop: 15,
    alignSelf: 'flex-end',
  },
});
