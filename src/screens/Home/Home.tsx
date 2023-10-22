import React, { useCallback } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { TextInput } from '../../components/TextInput';
import { Routes } from '../../navigation/types';
import { COLORS } from '../../values/colors';
import { HomeProps } from './types';

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [owner, setOwner] = React.useState<string>('');
  const [repository, setRepository] = React.useState<string>('');

  const onSearchPress = useCallback(() => {
    navigation.navigate(Routes.List, { owner, repository });
  }, [owner, repository, navigation]);

  const disabled = !owner || !repository;
  return (
    <View style={styles.container}>
      <Image
        style={{ height: 100, width: 100, marginBottom: 100 }}
        source={require('../../../assets/gh_logo.png')}
      />
      <TextInput
        value={owner}
        placeholder="owner"
        autoCapitalize="none"
        onChangeText={setOwner}
      />
      <TextInput
        value={repository}
        placeholder="repository"
        autoCapitalize="none"
        onChangeText={setRepository}
      />
      <Pressable
        testID="search-button"
        disabled={disabled}
        onPress={onSearchPress}
        style={{
          marginTop: 20,
          borderRadius: 10,
          backgroundColor: disabled ? COLORS.GRAY : COLORS.BRAND,
          paddingHorizontal: 32,
          paddingVertical: 12,
        }}>
        <Text style={{ color: COLORS.WHITE }}>SEARCH</Text>
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
    backgroundColor: COLORS.WHITE,
  },
});
