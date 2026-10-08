const API_BASE_URL = 'https://rickandmortyapi.com/api';

const emptyCollection = () => ({
  info: { count: 0, pages: 0, next: null, prev: null },
  results: [],
});

const buildQuery = (params) =>
  Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

const fetchCollection = async (resource, params, fetchImpl = fetch) => {
  const query = buildQuery(params);
  const response = await fetchImpl(
    `${API_BASE_URL}/${resource}${query ? `?${query}` : ''}`,
  );

  if (response.status === 404) {
    return emptyCollection();
  }

  if (!response.ok) {
    throw new Error(`Rick and Morty API request failed (${response.status})`);
  }

  return response.json();
};

export const fetchCharacters = ({ name = '', page = 1 } = {}, fetchImpl) =>
  fetchCollection('character', { name: name.trim(), page }, fetchImpl);

export const fetchEpisodes = ({ name = '', page = 1 } = {}, fetchImpl) =>
  fetchCollection('episode', { name: name.trim(), page }, fetchImpl);

export const getNextPage = (nextUrl) => {
  if (!nextUrl) {
    return null;
  }

  const match = nextUrl.match(/[?&]page=(\d+)/);
  return match ? Number(match[1]) : null;
};
