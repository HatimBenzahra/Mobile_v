import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Avatar, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { colors, spacing } from '../../constants/theme';
import { RootStackParamList, User, ROLE_LABELS } from '../../types';
import { authService } from '../../services/auth';

type ProfilNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ProfilScreenProps {
  utilisateur: User;
}

export default function ProfilScreen({ utilisateur }: ProfilScreenProps) {
  const navigation = useNavigation<ProfilNavigationProp>();

  const gererDeconnexion = async () => {
    await authService.logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const obtenirInitiales = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.conteneur}>
      <View style={styles.entete}>
        <Text variant="headlineSmall" style={styles.titre}>
          Mon Profil
        </Text>
      </View>

      <View style={styles.contenu}>
        <Card style={styles.carteProfil}>
          <Card.Content style={styles.contenuProfil}>
            <Avatar.Text
              size={80}
              label={obtenirInitiales(utilisateur.email)}
              style={styles.avatar}
            />
            <Text variant="titleLarge" style={styles.email}>
              {utilisateur.email}
            </Text>
            <View style={styles.badgeRole}>
              <Text variant="labelMedium" style={styles.texteRole}>
                {ROLE_LABELS[utilisateur.role]}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={gererDeconnexion}
          style={styles.boutonDeconnexion}
          buttonColor={colors.error}
          icon="logout"
        >
          Se déconnecter
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: colors.bgSecondary,
  },
  entete: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.bgPrimary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  titre: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  contenu: {
    flex: 1,
    padding: spacing.lg,
  },
  carteProfil: {
    backgroundColor: colors.bgPrimary,
    marginBottom: spacing.xl,
  },
  contenuProfil: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatar: {
    backgroundColor: colors.brand,
    marginBottom: spacing.md,
  },
  email: {
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  badgeRole: {
    backgroundColor: colors.brand + '15',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  texteRole: {
    color: colors.brand,
    fontWeight: '600',
  },
  boutonDeconnexion: {
    marginTop: 'auto',
    marginBottom: spacing.lg,
  },
});
