import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { List } from '../screens/List';
import { Routes, StackParamList } from './types';

const { Screen, Navigator } = createStackNavigator<StackParamList>();

const homeOptions = {
  headerShown: false,
};

const listOptions = {
  title: 'Stargazers',
  headerStyle: {
    backgroundColor: '#CCECEF',
  },
  headerBackTitleVisible: false,
};

export const AppNavigator = () => {
  return (
    <Navigator>
      <Screen name={Routes.Home} component={Home} options={homeOptions} />
      <Screen name={Routes.List} component={List} options={listOptions} />
    </Navigator>
  );
};
