import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { User, ROLE_LABELS } from '../../types';
import { colors, spacing } from '../../constants/theme';
import { statisticsService, UserStats } from '../../services/statistics';

interface CarteStatProps {
  titre: string;
  valeur: number;
  couleur: string;
}

function CarteStat({ titre, valeur, couleur }: CarteStatProps) {
  return (
    <Card style={styles.carteStat}>
      <Card.Content style={styles.carteStatContenu}>
        <Text variant="headlineMedium" style={[styles.statValeur, { color: couleur }]}>
          {valeur}
        </Text>
        <Text variant="bodySmall" style={styles.statLabel}>
          {titre}
        </Text>
      </Card.Content>
    </Card>
  );
}

interface TableauDeBordProps {
  user: User;
}

export default function DashboardScreen({ user }: TableauDeBordProps) {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    chargerStats();
  }, []);

  const chargerStats = async () => {
    setChargement(true);
    const statsUtilisateur = await statisticsService.getMyStats(user.id);
    setStats(statsUtilisateur);
    setChargement(false);
  };

  return (
    <SafeAreaView style={styles.conteneur} edges={['top']}>
      <StatusBar style="dark" />

      <View style={styles.entete}>
        <View>
          <Text variant="titleLarge" style={styles.enteteTitre}>
            {ROLE_LABELS[user.role]}
          </Text>
          <Text variant="bodySmall" style={styles.enteteSousTitre}>
            {user.email}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContenu}>
        <Text variant="titleMedium" style={styles.titreSectionTitle}>
          Mes Statistiques
        </Text>

        {chargement ? (
          <ActivityIndicator size="large" color={colors.brand} style={styles.loader} />
        ) : stats ? (
          <View style={styles.grilleStats}>
            <CarteStat
              titre="Contrats Signés"
              valeur={stats.contratsSignes}
              couleur={colors.success}
            />
            <CarteStat
              titre="Refus"
              valeur={stats.refus}
              couleur={colors.error}
            />
            <CarteStat
              titre="Portes Toquées"
              valeur={stats.portesToquees}
              couleur={colors.brand}
            />
            <CarteStat
              titre="Immeubles Prospectés"
              valeur={stats.immeublesProspectes}
              couleur={colors.info}
            />
            <CarteStat
              titre="RDV Pris"
              valeur={stats.rendezVousPris}
              couleur={colors.warning}
            />
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: colors.bgSecondary,
  },
  entete: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.bgPrimary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  enteteTitre: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  enteteSousTitre: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContenu: {
    padding: spacing.lg,
  },
  titreSectionTitle: {
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  loader: {
    marginTop: spacing.xl,
  },
  grilleStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  carteStat: {
    width: '47%',
    backgroundColor: colors.bgPrimary,
    marginBottom: spacing.sm,
  },
  carteStatContenu: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  statValeur: {
    fontWeight: '700',
  },
  statLabel: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});
