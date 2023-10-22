import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { COLORS } from '../../values/colors';

/**
 * A card component that wraps its children in a rounded rectangle with a light gray background color.
 * @param children The children to be wrapped by the card component.
 */

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
