import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { color } from '../../utils/styleGuide';
import BodyText from './BodyText';

const IconButton = ({ children, style, dataIcon, dataText, styleIcon, styleText, isGhost, ...restProps }) => {
  const styleButton = [styles.container, style];
  return (
    <Pressable {...restProps} style={isGhost ? styleButton : [...styleButton, { backgroundColor: color.accent }]}>
      <BodyText {...dataText} style={isGhost ? styleText : [styleText, { color: color.primary }]}>
        {children}
      </BodyText>
      <Ionicons
        {...dataIcon}
        size={16}
        color={isGhost ? color.accent : color.primary}
        style={[styles.icon, styleIcon]}
      />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    borderRadius: 7.5,
    borderColor: color.accent,
    borderWidth: 1,
  },
  icon: {
    marginLeft: 7.5,
  },
});
