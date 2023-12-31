import React, { useCallback } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { TextInput } from '../../components/TextInput';
import { Routes } from '../../navigation/types';
import { COLORS } from '../../values/colors';
import { HomeProps } from './types';

/**
 * Renders the home screen of the app.
 * It containes a form to search for a GitHub repository.
 * @param navigation - The navigation prop used to navigate between screens.
 * @returns The home screen component.
 */

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
        style={[styles.pressable, !disabled ? styles.pressableEnabled : {}]}>
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
  pressable: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: COLORS.GRAY,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  pressableEnabled: {
    shadowOpacity: 0.5,
    shadowRadius: 2.62,
    shadowColor: COLORS.DARK_GRAY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
    backgroundColor: COLORS.BRAND,
  },
});
