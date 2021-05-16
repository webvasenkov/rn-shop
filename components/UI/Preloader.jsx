import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { color } from '../../utils/styleGuide';

const Preloader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={color.accent} />
    </View>
  );
};

export default Preloader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
