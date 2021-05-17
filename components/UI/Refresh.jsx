import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card';
import BodyText from './BodyText';
import IconButton from './IconButton';

const Refresh = ({ titleText, buttonText, onRefresh }) => {
  return (
    <View style={styles.container}>
      <Card pad={15} style={styles.card}>
        <BodyText>{titleText ?? 'Something went wrong!'}</BodyText>
        <IconButton dataIcon={{ name: 'refresh' }} onPress={onRefresh} style={styles.btn}>
          {buttonText ?? 'Try Again!'}
        </IconButton>
      </Card>
    </View>
  );
};

export default Refresh;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
  },
  btn: {
    marginTop: 7.5,
  },
});
