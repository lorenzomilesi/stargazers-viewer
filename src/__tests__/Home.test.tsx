import {
  fireEvent,
  render,
  screen,
  userEvent,
} from '@testing-library/react-native';
import React from 'react';
import { Home } from '../screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from '../navigation/AppNavigator';
import { Routes } from '../navigation/types';

const ownerExample = 'facebook';
const repositoryExample = 'react';

describe('Home screen', () => {
  test('page renders correctly', async () => {
    const component = (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    render(component);

    const { getByPlaceholderText } = render(
      <Home navigation={{} as any} route={{} as any} />,
    );
    expect(getByPlaceholderText('owner')).toBeDefined();
    expect(getByPlaceholderText('repository')).toBeDefined();
  });

  test('navigates to List screen with correct params when search button is pressed', async () => {
    const navigateMock = jest.fn();
    const { getByTestId, getByPlaceholderText } = render(
      <Home navigation={{ navigate: navigateMock } as any} route={{} as any} />,
    );

    const user = userEvent.setup();
    const searchButton = getByTestId('search-button');

    const input1 = getByPlaceholderText('owner');
    const input2 = getByPlaceholderText('repository');

    await user.press(input1);
    await user.type(input1, ownerExample);
    await user.press(input2);
    await user.type(input2, repositoryExample);

    fireEvent.press(searchButton);

    expect(navigateMock).toHaveBeenCalledWith(Routes.List, {
      owner: ownerExample,
      repository: repositoryExample,
    });
  });
});
