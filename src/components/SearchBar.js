import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '../theme';

export default function SearchBar({
  value,
  onChangeText,
  onSubmit,
  placeholder,
  disabled = false,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        accessibilityLabel={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!disabled}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        returnKeyType="search"
        style={styles.input}
        value={value}
      />
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={onSubmit}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          disabled && styles.buttonDisabled,
        ]}
      >
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    minHeight: 48,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    color: colors.text,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.portal,
    borderRadius: 12,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 18,
  },
  buttonPressed: {
    backgroundColor: colors.portalDark,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.background,
    fontWeight: '800',
  },
});
