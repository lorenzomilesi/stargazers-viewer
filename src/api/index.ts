import { Repository, Stargazer } from '../screens/List/types';
import { PER_PAGE } from '../values/constants';

const commonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

/**
 * Fetches stargazers from the GitHub API
 *
 * @param owner | owner of the repository.
 * @param repository | repository name.
 * @param page | optional page number.
 * @returns A Promise that resolves to the fetched stargazers.
 * @throws An error if the fetch fails.
 */
export const fetchStargazers = async (
  owner: string,
  repository: string,
  page?: number,
) =>
  fetch(
    `https://api.github.com/repos/${owner}/${repository}/stargazers?page=${
      page || 1
    }&per_page=${PER_PAGE}`,
    {
      headers: commonHeaders,
      method: 'GET',
    },
  )
    .then(response => {
      return response.json() as Promise<Stargazer[]>;
    })
    .catch(error => {
      throw new Error(error);
    });

/**
 * Fetches a repository from the GitHub API.
 *
 * @param owner | The owner of the repository.
 * @param repository | The name of the repository.
 * @returns A Promise that resolves to the fetched repository.
 * @throws An error if the fetch fails.
 */
export const fetchRepository = async (owner: string, repository: string) =>
  fetch(`https://api.github.com/repos/${owner}/${repository}`, {
    headers: commonHeaders,
    method: 'GET',
  })
    .then(response => {
      return response.json() as Promise<Repository>;
    })
    .catch(error => {
      throw new Error(error);
    });
