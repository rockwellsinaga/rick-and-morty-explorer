import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { fetchCharacters, getNextPage } from '../api/rickAndMortyApi';
import CharacterCard from '../components/CharacterCard';
import SearchBar from '../components/SearchBar';
import { LoadingState, MessageState } from '../components/ScreenState';
import { colors } from '../theme';

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [characters, setCharacters] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const loadCharacters = useCallback(async ({ page = 1, append = false } = {}) => {
    append ? setLoadingMore(true) : setLoading(true);
    setError(null);

    try {
      const payload = await fetchCharacters({ name: query, page });
      setCharacters((current) =>
        append ? [...current, ...payload.results] : payload.results,
      );
      setNextPage(getNextPage(payload.info.next));
    } catch (requestError) {
      setError(requestError.message);
      if (!append) {
        setCharacters([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [query]);

  useEffect(() => {
    loadCharacters();
  }, []);

  const header = (
    <View>
      <Text style={styles.eyebrow}>INTERDIMENSIONAL DATABASE</Text>
      <Text style={styles.title}>Character Explorer</Text>
      <Text style={styles.subtitle}>
        Search characters, inspect their status, and explore where they were last seen.
      </Text>
      <SearchBar
        disabled={loading}
        onChangeText={setQuery}
        onSubmit={() => loadCharacters()}
        placeholder="Search a character"
        value={query}
      />
    </View>
  );

  if (loading && characters.length === 0) {
    return (
      <View style={styles.screen}>
        {header}
        <LoadingState label="Opening the portal..." />
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={characters}
      keyExtractor={(item) => String(item.id)}
      ListEmptyComponent={
        <MessageState
          actionLabel="Try again"
          message={error ?? 'No character matches this search.'}
          onAction={() => loadCharacters()}
          title={error ? 'The portal is unstable' : 'No characters found'}
        />
      }
      ListFooterComponent={
        nextPage ? (
          <Pressable
            disabled={loadingMore}
            onPress={() => loadCharacters({ page: nextPage, append: true })}
            style={styles.loadMore}
          >
            <Text style={styles.loadMoreText}>
              {loadingMore ? 'Loading...' : 'Load more characters'}
            </Text>
          </Pressable>
        ) : null
      }
      ListHeaderComponent={header}
      renderItem={({ item }) => (
        <CharacterCard
          character={item}
          onPress={() => navigation.navigate('CharacterDetail', { character: item })}
        />
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
  eyebrow: {
    color: colors.portal,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 8,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '900',
    marginTop: 6,
  },
  subtitle: {
    color: colors.muted,
    lineHeight: 22,
    marginBottom: 18,
    marginTop: 8,
  },
  loadMore: {
    alignItems: 'center',
    borderColor: colors.portal,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 4,
    padding: 14,
  },
  loadMoreText: {
    color: colors.portal,
    fontWeight: '800',
  },
});
