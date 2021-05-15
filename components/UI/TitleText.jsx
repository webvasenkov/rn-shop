import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { color } from '../../utils/styleGuide';

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
    color: color.accent,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
