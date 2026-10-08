import {
  fetchCharacters,
  fetchEpisodes,
  getNextPage,
} from '../rickAndMortyApi';

const jsonResponse = (body, overrides = {}) => ({
  ok: true,
  status: 200,
  json: jest.fn().mockResolvedValue(body),
  ...overrides,
});

describe('Rick and Morty API client', () => {
  test('encodes character search text and page number', async () => {
    const fetchMock = jest.fn().mockResolvedValue(
      jsonResponse({
        info: { next: null },
        results: [{ id: 1, name: 'Rick Sanchez' }],
      }),
    );

    const result = await fetchCharacters(
      { name: 'Rick Sanchez', page: 2 },
      fetchMock,
    );

    expect(fetchMock).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character?name=Rick%20Sanchez&page=2',
    );
    expect(result.results).toHaveLength(1);
  });

  test('returns an empty collection for a 404 search result', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValue(jsonResponse({}, { ok: false, status: 404 }));

    const result = await fetchEpisodes({ name: 'missing' }, fetchMock);

    expect(result.results).toEqual([]);
    expect(result.info.count).toBe(0);
  });

  test('throws a useful error for another failed response', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValue(jsonResponse({}, { ok: false, status: 503 }));

    await expect(fetchCharacters({}, fetchMock)).rejects.toThrow(
      'Rick and Morty API request failed (503)',
    );
  });

  test('extracts the next page from an API link', () => {
    expect(
      getNextPage('https://rickandmortyapi.com/api/character?page=3'),
    ).toBe(3);
    expect(getNextPage(null)).toBeNull();
  });
});
