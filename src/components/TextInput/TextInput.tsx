import React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../values/colors';
import { TextInputProps } from './types';

/**
 * A text input component that wraps React Native TextInput component.
 * @param props - TextInputProps object containing props for the TextInput component.
 * @returns A React element representing a TextInput component.
 */

export const TextInput: React.FC<TextInputProps> = ({ ...props }) => {
  return <RNTextInput {...props} style={styles.input} />;
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
});
