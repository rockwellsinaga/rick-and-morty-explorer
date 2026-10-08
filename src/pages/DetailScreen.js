import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';

const DetailRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value || 'Unknown'}</Text>
  </View>
);

export default function DetailScreen({ route }) {
  const { character } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.summary}>
        {character.status} · {character.species}
        {character.type ? ` · ${character.type}` : ''}
      </Text>

      <View style={styles.panel}>
        <DetailRow label="Gender" value={character.gender} />
        <DetailRow label="Origin" value={character.origin?.name} />
        <DetailRow label="Last location" value={character.location?.name} />
        <DetailRow
          label="Episode appearances"
          value={String(character.episode?.length ?? 0)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
  },
  content: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  image: {
    aspectRatio: 1,
    borderColor: colors.portal,
    borderRadius: 24,
    borderWidth: 3,
    maxWidth: 420,
    width: '100%',
  },
  name: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
    marginTop: 20,
    textAlign: 'center',
  },
  summary: {
    color: colors.portal,
    fontSize: 16,
    marginTop: 6,
    textAlign: 'center',
  },
  panel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 22,
    maxWidth: 560,
    padding: 18,
    width: '100%',
  },
  row: {
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 12,
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  value: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
});
