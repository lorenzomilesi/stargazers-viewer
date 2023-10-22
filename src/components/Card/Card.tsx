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
    shadowOpacity: 0.5,
    shadowRadius: 2.62,
    shadowColor: COLORS.DARK_GRAY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
  },
});
