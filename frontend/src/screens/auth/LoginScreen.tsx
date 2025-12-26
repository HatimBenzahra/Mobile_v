import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { RootStackParamList } from '../../types';
import { colors, spacing, radius, shadows } from '../../constants/theme';
import { authService } from '../../services/auth';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

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
    console.log('🔐 Tentative de login avec:', email.trim());

    const result = await authService.login(email.trim(), password);
    console.log('📦 Résultat login:', JSON.stringify(result, null, 2));

    setIsLoading(false);

    if (result.success && result.user) {
      console.log('✅ Login réussi, navigation vers Dashboard');
      navigation.replace('Dashboard', { user: result.user });
    } else {
      console.log('❌ Login échoué:', result.error);
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
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>P</Text>
            </View>
            <Text variant="headlineMedium" style={styles.title}>Prospection Terrain</Text>
            <Text variant="bodyMedium" style={styles.subtitle}>Connectez-vous pour continuer</Text>
          </View>

          <View style={styles.form}>
            <TextInput
              label="Email"
              mode="outlined"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              disabled={isLoading}
              style={styles.input}
              outlineColor={colors.border}
              activeOutlineColor={colors.brand}
            />

            <TextInput
              label="Mot de passe"
              mode="outlined"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              disabled={isLoading}
              style={styles.input}
              outlineColor={colors.border}
              activeOutlineColor={colors.brand}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
              style={styles.button}
              contentStyle={styles.buttonContent}
              buttonColor={colors.brand}
            >
              Se connecter
            </Button>
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
  },
  title: {
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textSecondary,
  },
  form: {},
  input: {
    marginBottom: spacing.md,
    backgroundColor: colors.white,
  },
  button: {
    marginTop: spacing.sm,
    borderRadius: radius.md,
  },
  buttonContent: {
    paddingVertical: spacing.xs,
  },
});
