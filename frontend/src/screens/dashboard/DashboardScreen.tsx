import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { RootStackParamList, ROLE_LABELS } from '../../types';
import { colors, spacing, radius } from '../../constants/theme';
import { authService } from '../../services/auth';
import { statisticsService, UserStats } from '../../services/statistics';

type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
type DashboardScreenRouteProp = RouteProp<RootStackParamList, 'Dashboard'>;

interface StatCardProps {
  title: string;
  value: number;
  color: string;
}

function StatCard({ title, value, color }: StatCardProps) {
  return (
    <Card style={styles.statCard}>
      <Card.Content style={styles.statCardContent}>
        <Text variant="headlineMedium" style={[styles.statValue, { color }]}>
          {value}
        </Text>
        <Text variant="bodySmall" style={styles.statLabel}>
          {title}
        </Text>
      </Card.Content>
    </Card>
  );
}

export default function DashboardScreen() {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const route = useRoute<DashboardScreenRouteProp>();
  const { user } = route.params;

  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    const userStats = await statisticsService.getMyStats(user.id);
    setStats(userStats);
    setLoading(false);
  };

  const handleLogout = async () => {
    await authService.logout();
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <View>
          <Text variant="titleLarge" style={styles.headerTitle}>
            {ROLE_LABELS[user.role]}
          </Text>
          <Text variant="bodySmall" style={styles.headerSubtitle}>
            {user.email}
          </Text>
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

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Mes Statistiques
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color={colors.brand} style={styles.loader} />
        ) : stats ? (
          <View style={styles.statsGrid}>
            <StatCard
              title="Contrats Signés"
              value={stats.contratsSignes}
              color={colors.success}
            />
            <StatCard
              title="Refus"
              value={stats.refus}
              color={colors.error}
            />
            <StatCard
              title="Portes Toquées"
              value={stats.portesToquees}
              color={colors.brand}
            />
            <StatCard
              title="Immeubles Prospectés"
              value={stats.immeublesProspectes}
              color={colors.info}
            />
            <StatCard
              title="RDV Pris"
              value={stats.rendezVousPris}
              color={colors.warning}
            />
          </View>
        ) : null}
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  loader: {
    marginTop: spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  statCard: {
    width: '47%',
    backgroundColor: colors.bgPrimary,
    marginBottom: spacing.sm,
  },
  statCardContent: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  statValue: {
    fontWeight: '700',
  },
  statLabel: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});
