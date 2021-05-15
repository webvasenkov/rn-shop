import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { color } from '../../utils/styleGuide';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={18}
      color={Platform.OS === 'android' ? color.primary : color.accent}
    />
  );
};

export default CustomHeaderButton;
