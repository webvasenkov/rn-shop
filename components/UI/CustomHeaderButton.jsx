import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/styles';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={18}
      color={Platform.OS === 'android' ? COLORS.primary : COLORS.accent}
    />
  );
};

export default CustomHeaderButton;
