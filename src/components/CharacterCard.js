import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';

const statusColor = {
  Alive: colors.portal,
  Dead: colors.danger,
  unknown: colors.muted,
};

export default function CharacterCard({ character, onPress }) {
  return (
    <Pressable
      accessibilityHint="Opens character details"
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.name}>
          {character.name}
        </Text>
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: statusColor[character.status] ?? colors.muted },
            ]}
          />
          <Text style={styles.meta}>
            {character.status} · {character.species}
          </Text>
        </View>
        <Text numberOfLines={1} style={styles.label}>
          Last known location
        </Text>
        <Text numberOfLines={1} style={styles.meta}>
          {character.location?.name ?? 'Unknown'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 14,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.82,
  },
  image: {
    height: 138,
    width: 138,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 14,
  },
  name: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '800',
  },
  statusRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
    marginTop: 7,
  },
  statusDot: {
    borderRadius: 5,
    height: 9,
    marginRight: 7,
    width: 9,
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    marginBottom: 2,
  },
  meta: {
    color: colors.text,
    fontSize: 13,
  },
});
