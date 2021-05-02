import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles';

const BodyText = ({ children, style, ...restProps }) => {
  return (
    <Text style={[styles.text, style]} {...restProps}>
      {children}
    </Text>
  );
};

export default BodyText;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: 'montserrat-light',
    color: COLORS.accent,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
