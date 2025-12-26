import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { CarteStat } from './Carte_stats';
import { User, ROLE_LABELS } from '../../types';
import { colors, spacing } from '../../constants/theme';
import { statisticsService, UserStats } from '../../services/statistics';
import { styles } from './style';

interface TableauDeBordProps {
  user: User;
}
//le Dashboard prends en paramètre un utilisateur ==> Commercial/Manager
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
