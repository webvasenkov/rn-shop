import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, View, Platform } from 'react-native';

const Touchable = ({ children, ...restProps }) => {
  if (Platform.OS === 'android' && Platform.Version >= 21)
    return (
      <View style={restProps.style}>
        <TouchableNativeFeedback {...restProps}>{children}</TouchableNativeFeedback>
      </View>
    );
  return <TouchableOpacity {...restProps}>{children}</TouchableOpacity>;
};

export default Touchable;
