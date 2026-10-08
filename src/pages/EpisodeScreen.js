import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { fetchEpisodes, getNextPage } from '../api/rickAndMortyApi';
import SearchBar from '../components/SearchBar';
import { LoadingState, MessageState } from '../components/ScreenState';
import { colors } from '../theme';

export default function EpisodeScreen() {
  const [query, setQuery] = useState('');
  const [episodes, setEpisodes] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEpisodes = useCallback(async ({ page = 1, append = false } = {}) => {
    setLoading(true);
    setError(null);

    try {
      const payload = await fetchEpisodes({ name: query, page });
      setEpisodes((current) =>
        append ? [...current, ...payload.results] : payload.results,
      );
      setNextPage(getNextPage(payload.info.next));
    } catch (requestError) {
      setError(requestError.message);
      if (!append) {
        setEpisodes([]);
      }
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    loadEpisodes();
  }, []);

  const header = (
    <View>
      <Text style={styles.title}>Episode Guide</Text>
      <Text style={styles.subtitle}>
        Browse episode codes, titles, release dates, and character counts.
      </Text>
      <SearchBar
        disabled={loading}
        onChangeText={setQuery}
        onSubmit={() => loadEpisodes()}
        placeholder="Search an episode"
        value={query}
      />
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={episodes}
      keyExtractor={(item) => String(item.id)}
      ListEmptyComponent={
        loading ? (
          <LoadingState label="Loading episodes..." />
        ) : (
          <MessageState
            actionLabel="Try again"
            message={error ?? 'No episode matches this search.'}
            onAction={() => loadEpisodes()}
            title={error ? 'Unable to load episodes' : 'No episodes found'}
          />
        )
      }
      ListFooterComponent={
        nextPage ? (
          <Pressable
            disabled={loading}
            onPress={() => loadEpisodes({ page: nextPage, append: true })}
            style={styles.loadMore}
          >
            <Text style={styles.loadMoreText}>
              {loading ? 'Loading...' : 'Load more episodes'}
            </Text>
          </Pressable>
        ) : null
      }
      ListHeaderComponent={header}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.codePill}>
            <Text style={styles.code}>{item.episode}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>{item.air_date}</Text>
            <Text style={styles.meta}>{item.characters.length} characters</Text>
          </View>
        </View>
      )}
      style={styles.screen}
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  list: {
    padding: 18,
    paddingBottom: 36,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
    marginTop: 8,
  },
  subtitle: {
    color: colors.muted,
    lineHeight: 22,
    marginBottom: 18,
    marginTop: 8,
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 12,
    padding: 14,
  },
  codePill: {
    backgroundColor: colors.cyan,
    borderRadius: 10,
    marginRight: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  code: {
    color: colors.background,
    fontWeight: '900',
  },
  cardContent: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 5,
  },
  meta: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 2,
  },
  loadMore: {
    alignItems: 'center',
    borderColor: colors.portal,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  loadMoreText: {
    color: colors.portal,
    fontWeight: '800',
  },
});
