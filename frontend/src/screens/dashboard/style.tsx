
import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../constants/theme';

export const styles = StyleSheet.create({
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