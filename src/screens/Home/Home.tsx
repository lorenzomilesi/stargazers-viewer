import React from 'react';
import { Image, Pressable, StyleSheet, View, Text } from 'react-native';
import { TextInput } from '../../components/TextInput';
import { HomeProps } from './types';
import { Routes } from '../../navigation/types';

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const onSearchPress = () => {
    navigation.navigate(Routes.List, { owner: 'facebook', repository: 'react' });
  };
  return (
    <View style={styles.container}>
      <Image
        style={{ height: 100, width: 100, marginBottom: 100 }}
        source={require('../../../assets/gh_logo.png')}
      />
      <TextInput placeholder="owner" autoCapitalize="none" />
      <TextInput placeholder="repository" autoCapitalize="none" />
      <Pressable onPress={onSearchPress} style={{ marginTop: 20, borderRadius: 10, backgroundColor: '#00A1B0', paddingHorizontal: 32, paddingVertical: 12 }}>
        <Text style={{ color: 'white' }}>SEARCH</Text>
      </Pressable>
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
