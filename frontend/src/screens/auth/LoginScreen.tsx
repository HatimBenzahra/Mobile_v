import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Surface, Portal, Dialog, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { RootStackParamList } from '../../types';
import { colors, spacing } from '../../constants/theme';
import { ErrorMessages } from '../../constants/errors';
import { authService } from '../../services/auth';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [erreurVisible, setErreurVisible] = useState(false);
  const [messageErreur, setMessageErreur] = useState('');

  const afficherErreur = (message: string) => {
    setMessageErreur(message);
    setErreurVisible(true);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      afficherErreur(ErrorMessages.FORM.REQUIRED_FIELDS);
      return;
    }

    setIsLoading(true);

    const result = await authService.login(email.trim(), password);

    setIsLoading(false);

    if (result.success && result.user) {
      navigation.replace('Main', { utilisateur: result.user });
    } else {
      afficherErreur(result.error || ErrorMessages.GENERIC.UNKNOWN);
    }
  };

  return (
    <SafeAreaView style={styles.conteneur}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Surface style={styles.contenu} elevation={0}>
          <Surface style={styles.entete} elevation={0}>
            <Avatar.Text size={72} label="P" style={styles.logo} />
            <Text variant="headlineMedium" style={styles.titre}>
              Prospection Terrain
            </Text>
            <Text variant="bodyMedium" style={styles.sousTitre}>
              Connectez-vous pour continuer
            </Text>
          </Surface>

          <Surface style={styles.formulaire} elevation={0}>
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
              left={<TextInput.Icon icon="email-outline" />}
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
              left={<TextInput.Icon icon="lock-outline" />}
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
              style={styles.bouton}
              contentStyle={styles.boutonContenu}
              buttonColor={colors.brand}
              icon="login"
            >
              Se connecter
            </Button>
          </Surface>
        </Surface>
      </KeyboardAvoidingView>

      <Portal>
        <Dialog visible={erreurVisible} onDismiss={() => setErreurVisible(false)}>
          <Dialog.Icon icon="alert-circle" color={colors.error} />
          <Dialog.Title style={styles.dialogTitre}>Erreur</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{messageErreur}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setErreurVisible(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  keyboardView: {
    flex: 1,
  },
  contenu: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    backgroundColor: colors.bgPrimary,
  },
  entete: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
    backgroundColor: colors.bgPrimary,
  },
  logo: {
    backgroundColor: colors.brand,
    marginBottom: spacing.lg,
  },
  titre: {
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  sousTitre: {
    color: colors.textSecondary,
  },
  formulaire: {
    backgroundColor: colors.bgPrimary,
  },
  input: {
    marginBottom: spacing.md,
    backgroundColor: colors.white,
  },
  bouton: {
    marginTop: spacing.sm,
    borderRadius: 8,
  },
  boutonContenu: {
    paddingVertical: spacing.xs,
  },
  dialogTitre: {
    textAlign: 'center',
  },
});
