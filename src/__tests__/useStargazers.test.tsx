import { renderHook, waitFor } from '@testing-library/react-native';
import { useStargazerList } from '../screens/List/hooks';

jest.mock('../api', () => ({
  fetchStargazers: () => [{ id: 1 }, { id: 2 }],
  fetchRepository: () => ({ id: 123 }),
}));

describe('useStargazers custom hook', () => {
  const owner = 'facebook';
  const repository = 'react';
  const page = 1;

  it('should set repo data if response has an id', async () => {
    const { result } = renderHook(() =>
      useStargazerList({ owner, repository, page }),
    );

    await waitFor(() => expect(result.current.repo?.id).toEqual(123));
  });
});
