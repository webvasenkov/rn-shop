import React from 'react';
import { View, StyleSheet } from 'react-native';
import { color } from '../../utils/styleGuide';

const Card = ({ children, style, pad, ...restProps }) => (
  <View style={[style, styles.card, { padding: pad }]} {...restProps}>
    {children}
  </View>
);

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 7.5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: color.accent,
    shadowRadius: 3.25,
    shadowOpacity: 0.15,
    elevation: 3,
  },
});
