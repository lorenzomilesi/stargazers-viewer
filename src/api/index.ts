import { Stargazer, Repository } from '../screens/List/types';

export const fetchStargazers = async (owner: string, repository: string, page?: number) =>
  fetch(`https://api.github.com/repos/${owner}/${repository}/stargazers?page=${page || 1}&per_page=30`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    method: 'GET',
  })
    .then(response => {
      return response.json() as Promise<Stargazer[]>;
    })
    .catch(error => {
      throw new Error(error);
    });

export const fetchRepository = async (owner: string, repository: string) =>
  fetch(`https://api.github.com/repos/${owner}/${repository}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    method: 'GET',
  })
    .then(response => {
      return response.json() as Promise<Repository>;
    })
    .catch(error => {
      throw new Error(error);
    });
