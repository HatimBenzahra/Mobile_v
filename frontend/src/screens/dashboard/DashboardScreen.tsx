import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { RootStackParamList } from '../../types';
import { colors, spacing, radius } from '../../constants/theme';

type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

export default function DashboardScreen() {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  const handleLogout = () => {
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text variant="titleLarge" style={styles.headerTitle}>Dashboard</Text>
          <Text variant="bodySmall" style={styles.headerSubtitle}>Bienvenue sur ProspectApp</Text>
        </View>
        <Button
          mode="outlined"
          onPress={handleLogout}
          textColor={colors.textSecondary}
          style={styles.logoutButton}
        >
          Déconnexion
        </Button>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>✓</Text>
            </View>
            <Text variant="titleMedium" style={styles.cardTitle}>Connexion réussie</Text>
            <Text variant="bodySmall" style={styles.cardDescription}>
              Vous êtes connecté à votre espace de prospection.
              Les fonctionnalités seront bientôt disponibles.
            </Text>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.bgPrimary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  logoutButton: {
    borderColor: colors.border,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  card: {
    width: '100%',
    backgroundColor: colors.bgPrimary,
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  icon: {
    fontSize: 24,
    color: colors.white,
    fontWeight: '700',
  },
  cardTitle: {
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  cardDescription: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
