import { useCallback, useEffect, useState } from 'react';
import { fetchRepository, fetchStargazers } from '../../api';
import { Repository, Stargazer } from './types';

const PER_PAGE = 30;

export const useStargazerList = ({
  owner,
  repository,
  page,
}: {
  owner: string;
  repository: string;
  page: number;
}) => {
  const [isLoadingRepo, setIsLoadingRepo] = useState(true);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [repo, setRepo] = useState<Repository>();
  const [data, setData] = useState<Stargazer[]>([]);
  const [repoError, setRepoError] = useState<string | undefined>();
  const [listError, setListError] = useState<string | undefined>();

  const getStargazers = useCallback(async () => {
    if (!repo || repo.stargazers_count > page * PER_PAGE) {
      try {
        if (page > 1) {
          setIsLoadingList(true);
        }
        const response = await fetchStargazers(owner, repository, page);
        if (Array.isArray(response)) {
          setData([...data, ...response]);
        }
      } catch (error) {
        setListError('There was an error fetching the stargazers.');
        console.error(error);
      } finally {
        setIsLoadingList(false);
      }
    }
  }, [owner, repository, page]);

  const getRepo = useCallback(async () => {
    try {
      const response = await fetchRepository(owner, repository);
      if (response?.id) {
        setRepo(response);
      }
    } catch (error) {
      setRepoError('There was an error fetching the repository.');
      console.error(error);
    } finally {
      setIsLoadingRepo(false);
    }
  }, [owner, repository]);

  useEffect(() => {
    getRepo();
  }, []);

  useEffect(() => {
    getStargazers();
  }, [page]);

  return {
    isLoadingRepo,
    isLoadingList,
    repo,
    data,
    repoError,
    listError,
  };
};
