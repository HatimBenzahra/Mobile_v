import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { RootStackParamList, LoginCredentials, AuthResult, User } from '../../types';
import { colors, spacing, radius, shadows, typography } from '../../constants/theme';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const MOCK_USERS: User[] = [
  { id: '1', email: 'commercial@test.com', nom: 'Dupont', prenom: 'Jean', role: 'commercial' },
  { id: '2', email: 'manager@test.com', nom: 'Martin', prenom: 'Sophie', role: 'manager' },
];

const VALID_PASSWORD = '123456';

function mockLogin(credentials: LoginCredentials): AuthResult {
  const user = MOCK_USERS.find((u) => u.email === credentials.email);
  if (!user) return { success: false, error: 'Utilisateur non trouvé' };
  if (credentials.password !== VALID_PASSWORD) return { success: false, error: 'Mot de passe incorrect' };
  return { success: true, user };
}

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Champs requis', 'Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const result = mockLogin({ email: email.trim(), password });
    setIsLoading(false);

    if (result.success) {
      navigation.replace('Dashboard');
    } else {
      Alert.alert('Erreur', result.error || 'Une erreur est survenue');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>P</Text>
            </View>
            <Text style={styles.title}>Propection Terrain</Text>
            <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email */}
            <View style={styles.fieldGroup}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                editable={!isLoading}
              />
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.inputPassword}
                  placeholder="Mot de passe"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  editable={!isLoading}
                />
                <Pressable
                  style={styles.toggleButton}
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={8}
                >
                  <Text style={styles.toggleText}>{showPassword ? 'Masquer' : 'Afficher'}</Text>
                </Pressable>
              </View>
            </View>

            {/* Submit */}
            <Pressable
              style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.submitButtonPressed,
                isLoading && styles.submitButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: radius.xl,
    backgroundColor: colors.brand,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: -1,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySmall,
  },

  // Form
  form: {},
  fieldGroup: {
    marginBottom: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.white,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.white,
  },
  inputPassword: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textPrimary,
  },
  toggleButton: {
    paddingHorizontal: spacing.md,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.brand,
  },

  // Submit
  submitButton: {
    backgroundColor: colors.brand,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: spacing.sm,
    ...shadows.sm,
  },
  submitButtonPressed: {
    backgroundColor: colors.brandDark,
  },
  submitButtonDisabled: {
    backgroundColor: colors.mediumGray,
  },
  submitButtonText: {
    ...typography.button,
    color: colors.white,
  },
});
