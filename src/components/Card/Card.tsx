import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { COLORS } from '../../values/colors';

export const Card: React.FC<ViewProps> = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 16,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
});
