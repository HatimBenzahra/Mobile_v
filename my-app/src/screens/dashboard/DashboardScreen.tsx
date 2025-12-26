import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { RootStackParamList } from '../../types';
import { colors, spacing, radius, shadows, typography } from '../../constants/theme';

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
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>Bienvenue sur ProspectApp</Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.logoutButtonPressed,
          ]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Déconnexion</Text>
        </Pressable>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>✓</Text>
          </View>
          <Text style={styles.cardTitle}>Connexion réussie</Text>
          <Text style={styles.cardDescription}>
            Vous êtes connecté à votre espace de prospection.
            Les fonctionnalités seront bientôt disponibles.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgSecondary,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.bgPrimary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h2,
  },
  headerSubtitle: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
  },
  logoutButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.bgInput,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoutButtonPressed: {
    backgroundColor: colors.lightGray,
  },
  logoutText: {
    ...typography.buttonSmall,
    color: colors.textSecondary,
  },

  // Content
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  card: {
    backgroundColor: colors.bgPrimary,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    alignItems: 'center',
    width: '100%',
    ...shadows.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: radius.full,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  icon: {
    ...typography.h1,
    color: colors.white,
  },
  cardTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
  },
  cardDescription: {
    ...typography.bodySmall,
    textAlign: 'center',
  },
});
