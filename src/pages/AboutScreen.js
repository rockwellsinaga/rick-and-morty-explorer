import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';

export default function AboutScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.screen}>
      <Text style={styles.eyebrow}>ABOUT THE PROJECT</Text>
      <Text style={styles.title}>From final assignment to portfolio app</Text>
      <Text style={styles.paragraph}>
        Rick and Morty Explorer began as a final mobile-programming assignment in
        2023. The project has been upgraded to preserve its original idea while
        improving navigation, search, loading states, error handling, pagination,
        accessibility, and maintainability.
      </Text>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Data source</Text>
        <Text style={styles.paragraph}>
          Character and episode data are provided by the community-built Rick and
          Morty API. This learning project is not affiliated with Adult Swim or
          the creators of Rick and Morty.
        </Text>
        <Pressable
          onPress={() => Linking.openURL('https://rickandmortyapi.com/')}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>Visit the API documentation</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => navigation.navigate('Profile')}
        style={styles.profileButton}
      >
        <Text style={styles.profileButtonText}>About the developer</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
  },
  content: {
    padding: 22,
    paddingBottom: 44,
  },
  eyebrow: {
    color: colors.portal,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 39,
    marginBottom: 18,
    marginTop: 8,
  },
  paragraph: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 25,
  },
  panel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 24,
    padding: 18,
  },
  panelTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '800',
    marginBottom: 8,
  },
  linkButton: {
    alignSelf: 'flex-start',
    marginTop: 14,
  },
  linkText: {
    color: colors.cyan,
    fontWeight: '800',
  },
  profileButton: {
    alignItems: 'center',
    backgroundColor: colors.portal,
    borderRadius: 12,
    marginTop: 24,
    padding: 14,
  },
  profileButtonText: {
    color: colors.background,
    fontWeight: '900',
  },
});
