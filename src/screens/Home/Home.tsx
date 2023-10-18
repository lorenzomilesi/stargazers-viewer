import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TextInput } from '../../components/TextInput';

export const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image style={{ height: 100, width: 100, marginBottom: 100 }} source={require('../../../assets/gh_logo.png')} />
      <TextInput placeholder="owner" autoCapitalize='none' />
      <TextInput placeholder="repository" autoCapitalize='none' />
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
    backgroundColor: 'rgba(0, 161, 176, 0.3)',
  },
});
