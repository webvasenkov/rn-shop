import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/styles';

const TitleText = ({ children, style, ...restProps }) => {
  return (
    <Text style={[styles.text, style]} {...restProps}>
      {children}
    </Text>
  );
};

export default TitleText;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: 'montserrat-bold',
    color: COLORS.accent,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
