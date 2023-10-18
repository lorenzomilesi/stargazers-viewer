import React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import { TextInputProps } from './types';

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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});