import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../constants/theme';

export default function HistoriqueScreen() {
  return (
    <SafeAreaView style={styles.conteneur}>
      <View style={styles.entete}>
        <Text variant="headlineSmall" style={styles.titre}>
          Mon Historique
        </Text>
      </View>
      <View style={styles.contenu}>
        <Text variant="bodyLarge" style={styles.textePlaceholder}>
          Historique des prospections à venir
        </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  textePlaceholder: {
    color: colors.textSecondary,
  },
});
