import { StackNavigationOptions, createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Home } from '../screens/Home';
import { List } from '../screens/List';
import { COLORS } from '../values/colors';
import { Routes, StackParamList } from './types';

const { Screen, Navigator } = createStackNavigator<StackParamList>();

const homeOptions = {
  headerShown: false,
};

const listOptions: StackNavigationOptions = {
  title: 'Stargazers',
  headerStyle: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 0,
  },
  headerBackTitleVisible: false,
  headerTintColor: COLORS.BRAND,
  headerShadowVisible: false,
};

export const AppNavigator = () => {
  return (
    <Navigator>
      <Screen name={Routes.Home} component={Home} options={homeOptions} />
      <Screen name={Routes.List} component={List} options={listOptions} />
    </Navigator>
  );
};
