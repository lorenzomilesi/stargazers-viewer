import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export const List: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image style={{ height: 100, width: 100, marginBottom: 100 }} source={require('../../../assets/gh_logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCECEF',
  },
});
