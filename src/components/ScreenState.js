import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme';

export function LoadingState({ label = 'Loading...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.portal} size="large" />
      <Text style={styles.message}>{label}</Text>
    </View>
  );
}

export function MessageState({ title, message, actionLabel, onAction }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {onAction ? (
        <Pressable onPress={onAction} style={styles.button}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 220,
    padding: 24,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    color: colors.muted,
    lineHeight: 22,
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.portal,
    borderRadius: 10,
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  buttonText: {
    color: colors.background,
    fontWeight: '800',
  },
});
