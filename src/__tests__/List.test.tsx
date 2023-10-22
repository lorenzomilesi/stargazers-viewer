import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { useStargazerList } from '../screens/List/hooks';
import { List } from '../screens/List';

jest.mock('../screens/List/hooks', () => ({
  useStargazerList: jest.fn(),
}));

describe('List screen', () => {
  const mockRoute = {
    params: {
      owner: 'facebook',
      repository: 'react',
    },
  };

  const navigateMock = {
    setOptions: jest.fn(),
  };

  it('should render a list of stargazers', async () => {
    const mockData = [
      {
        id: 1,
        login: 'user1',
        avatar_url: 'https://example.com',
        html_url: 'https://example.com',
      },
      {
        id: 2,
        login: 'user2',
        avatar_url: 'https://example.com',
        html_url: 'https://example.com',
      },
    ];

    const mockUseStargazerList = useStargazerList as jest.MockedFunction<
      typeof useStargazerList
    >;

    mockUseStargazerList.mockReturnValue({
      data: mockData,
      isLoadingRepo: false,
      isLoadingList: false,
      repo: {
        id: 123,
        stargazers_count: 2,
        owner: mockData[0],
        name: 'react',
        description:
          'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
      },
      repoError: undefined,
      listError: undefined,
    });

    const { getByText } = render(
      <List route={mockRoute as any} navigation={navigateMock as any} />,
    );
    await waitFor(() => {
      expect(getByText('user1')).toBeDefined();
      expect(getByText('user2')).toBeDefined();
    });
  });

  it('should show a loading indicator while loading data', async () => {
    const mockUseStargazerList = useStargazerList as jest.MockedFunction<
      typeof useStargazerList
    >;
    mockUseStargazerList.mockReturnValue({
      data: [],
      isLoadingRepo: true,
      isLoadingList: true,
      repo: undefined,
      repoError: undefined,
      listError: undefined,
    });

    const { getByTestId } = render(
      <List route={mockRoute as any} navigation={navigateMock as any} />,
    );
    await waitFor(() => {
      expect(getByTestId('loading-indicator')).toBeDefined();
    });
  });

  it('should show an error message if there is an error fetching data', async () => {
    const mockUseStargazerList = useStargazerList as jest.MockedFunction<
      typeof useStargazerList
    >;
    mockUseStargazerList.mockReturnValue({
      data: [],
      isLoadingRepo: false,
      isLoadingList: false,
      repo: undefined,
      repoError: 'Error fetching repository',
      listError: 'Error fetching stargazers list',
    });

    const { getByText } = render(
      <List route={mockRoute as any} navigation={navigateMock as any} />,
    );
    await waitFor(() => {
      expect(getByText('Error fetching stargazers list')).toBeDefined();
    });
  });
});
