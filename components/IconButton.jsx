import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/styles';
import BodyText from '../components/text/BodyText';

const IconButton = ({ children, style, dataIcon, dataText, styleIcon, styleText, isGhost }) => {
  const styleButton = [styles.container, style];
  return (
    <Pressable style={isGhost ? styleButton : [...styleButton, { backgroundColor: COLORS.accent }]}>
      <BodyText {...dataText} style={isGhost ? styleText : [styleText, { color: COLORS.primary }]}>
        {children}
      </BodyText>
      <Ionicons
        {...dataIcon}
        size={16}
        color={isGhost ? COLORS.accent : COLORS.primary}
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
    borderColor: COLORS.accent,
    borderWidth: 1,
  },
  icon: {
    marginLeft: 7.5,
  },
});
