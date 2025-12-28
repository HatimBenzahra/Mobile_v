import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, ScrollView, SafeAreaView } from 'react-native';
import { Card, Avatar, FAB, Portal, Dialog, TextInput, Button, Switch, Text, Searchbar, Chip, IconButton } from 'react-native-paper';
import { immeubleService, Immeuble, CreateImmeubleInput } from '../../services/immeubles/immeuble.service';
import { colors, spacing } from '../../constants/theme';

const initialFormData: CreateImmeubleInput = {
  adresse: '',
  latitude: 0,
  longitude: 0,
  nbEtages: 1,
  nbPortesParEtage: 1,
  ascenseurPresent: false,
  digitalCode: '',
  commercialId: 1,
  managerId: 1,
  zoneId: 1,
};

type FilterType = 'all' | 'today' | 'yesterday' | 'this_week' | 'this_month';

// Fonctions utilitaires pour les dates
const isToday = (date: Date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

const isYesterday = (date: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};

const isThisWeek = (date: Date) => {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return date >= startOfWeek;
};

const isThisMonth = (date: Date) => {
  const now = new Date();
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
};

export default function ImmeublesScreen() {
  const [immeubles, setImmeubles] = useState<Immeuble[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<CreateImmeubleInput>(initialFormData);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await immeubleService.getImmeubles();
      setImmeubles(data);
    } catch (error) {
      console.error("Erreur chargement:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredImmeubles = useMemo(() => {
    let result = immeubles;

    // Filtre par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) =>
        item.adresse.toLowerCase().includes(query) ||
        item.digitalCode?.toLowerCase().includes(query)
      );
    }

    // Filtre par date
    if (activeFilter === 'today') {
      result = result.filter((item) => isToday(new Date(item.createdAt)));
    } else if (activeFilter === 'yesterday') {
      result = result.filter((item) => isYesterday(new Date(item.createdAt)));
    } else if (activeFilter === 'this_week') {
      result = result.filter((item) => isThisWeek(new Date(item.createdAt)));
    } else if (activeFilter === 'this_month') {
      result = result.filter((item) => isThisMonth(new Date(item.createdAt)));
    }

    return result;
  }, [immeubles, searchQuery, activeFilter]);

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleAccessPortes = (immeuble: Immeuble) => {
    // TODO: Navigation vers l'écran des portes
    console.log('Accéder aux portes de:', immeuble.id);
  };

  const handleCreate = async () => {
    if (!formData.adresse.trim()) return;

    setSaving(true);
    try {
      await immeubleService.createImmeuble(formData);
      setModalVisible(false);
      resetForm();
      loadData();
    } catch (error) {
      console.error("Erreur création:", error);
    } finally {
      setSaving(false);
    }
  };

  const totalPortes = (item: Immeuble) => item.nbEtages * item.nbPortesParEtage;

  const renderItem = ({ item }: { item: Immeuble }) => (
    <Card style={styles.card} mode="elevated" elevation={1}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Avatar.Icon
            size={48}
            icon="office-building"
            style={styles.avatar}
          />
          <View style={styles.cardHeaderText}>
            <Text variant="titleMedium" style={styles.adresse} numberOfLines={2}>
              {item.adresse}
            </Text>
            {item.digitalCode ? (
              <View style={styles.codeContainer}>
                <Text variant="bodySmall" style={styles.codeLabel}>Code: </Text>
                <Text variant="bodySmall" style={styles.codeValue}>{item.digitalCode}</Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Avatar.Icon size={32} icon="stairs" style={styles.statIcon} />
            <View>
              <Text variant="titleMedium" style={styles.statValue}>{item.nbEtages}</Text>
              <Text variant="bodySmall" style={styles.statLabel}>étages</Text>
            </View>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Avatar.Icon size={32} icon="door" style={styles.statIcon} />
            <View>
              <Text variant="titleMedium" style={styles.statValue}>{item.nbPortesParEtage}</Text>
              <Text variant="bodySmall" style={styles.statLabel}>portes/étage</Text>
            </View>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Avatar.Icon size={32} icon="door-open" style={styles.statIcon} />
            <View>
              <Text variant="titleMedium" style={styles.statValue}>{totalPortes(item)}</Text>
              <Text variant="bodySmall" style={styles.statLabel}>total portes</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.tagsRow}>
            {item.ascenseurPresent && (
              <View style={styles.tag}>
                <Avatar.Icon size={16} icon="elevator" style={styles.tagIcon} />
                <Text variant="bodySmall" style={styles.tagText}>Ascenseur</Text>
              </View>
            )}
          </View>
          <Button
            mode="contained"
            icon="door"
            onPress={() => handleAccessPortes(item)}
            buttonColor={colors.brand}
            compact
            style={styles.accessButton}
          >
            Accéder aux portes
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Rechercher une adresse..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={styles.searchbarInput}
          iconColor={colors.textSecondary}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
          <Chip
            selected={activeFilter === 'all'}
            onPress={() => setActiveFilter('all')}
            style={styles.filterChip}
            selectedColor={colors.brand}
            mode={activeFilter === 'all' ? 'flat' : 'outlined'}
          >
            Tous
          </Chip>
          <Chip
            selected={activeFilter === 'today'}
            onPress={() => setActiveFilter('today')}
            style={styles.filterChip}
            selectedColor={colors.brand}
            mode={activeFilter === 'today' ? 'flat' : 'outlined'}
            icon="calendar-today"
          >
            Aujourd'hui
          </Chip>
          <Chip
            selected={activeFilter === 'yesterday'}
            onPress={() => setActiveFilter('yesterday')}
            style={styles.filterChip}
            selectedColor={colors.brand}
            mode={activeFilter === 'yesterday' ? 'flat' : 'outlined'}
            icon="calendar-minus"
          >
            Hier
          </Chip>
          <Chip
            selected={activeFilter === 'this_week'}
            onPress={() => setActiveFilter('this_week')}
            style={styles.filterChip}
            selectedColor={colors.brand}
            mode={activeFilter === 'this_week' ? 'flat' : 'outlined'}
            icon="calendar-week"
          >
            Cette semaine
          </Chip>
          <Chip
            selected={activeFilter === 'this_month'}
            onPress={() => setActiveFilter('this_month')}
            style={styles.filterChip}
            selectedColor={colors.brand}
            mode={activeFilter === 'this_month' ? 'flat' : 'outlined'}
            icon="calendar-month"
          >
            Ce mois
          </Chip>
        </ScrollView>
      </View>

      <FlatList
        data={filteredImmeubles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Avatar.Icon size={64} icon="office-building-outline" style={styles.emptyIcon} />
              <Text style={styles.emptyText}>
                {searchQuery || activeFilter !== 'all' ? 'Aucun résultat trouvé' : 'Aucun immeuble'}
              </Text>
              <Text style={styles.emptySubtext}>
                {searchQuery || activeFilter !== 'all'
                  ? 'Essayez de modifier vos filtres'
                  : 'Appuyez sur + pour ajouter un immeuble'}
              </Text>
            </View>
          ) : null
        }
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        color={colors.white}
      />

      <Portal>
        <Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)} style={styles.dialog}>
          <Dialog.Title>Ajouter un immeuble</Dialog.Title>
          <Dialog.ScrollArea style={styles.dialogScrollArea}>
            <ScrollView>
              <TextInput
                label="Adresse"
                mode="outlined"
                value={formData.adresse}
                onChangeText={(text) => setFormData({ ...formData, adresse: text })}
                style={styles.input}
                outlineColor={colors.border}
                activeOutlineColor={colors.brand}
                left={<TextInput.Icon icon="map-marker" />}
              />

              <TextInput
                label="Nombre d'étages"
                mode="outlined"
                value={formData.nbEtages.toString()}
                onChangeText={(text) => setFormData({ ...formData, nbEtages: parseInt(text) || 0 })}
                keyboardType="numeric"
                style={styles.input}
                outlineColor={colors.border}
                activeOutlineColor={colors.brand}
                left={<TextInput.Icon icon="stairs" />}
              />

              <TextInput
                label="Portes par étage"
                mode="outlined"
                value={formData.nbPortesParEtage.toString()}
                onChangeText={(text) => setFormData({ ...formData, nbPortesParEtage: parseInt(text) || 0 })}
                keyboardType="numeric"
                style={styles.input}
                outlineColor={colors.border}
                activeOutlineColor={colors.brand}
                left={<TextInput.Icon icon="door" />}
              />

              <TextInput
                label="Code digital (optionnel)"
                mode="outlined"
                value={formData.digitalCode}
                onChangeText={(text) => setFormData({ ...formData, digitalCode: text })}
                style={styles.input}
                outlineColor={colors.border}
                activeOutlineColor={colors.brand}
                left={<TextInput.Icon icon="lock" />}
              />

              <View style={styles.switchRow}>
                <Text>Ascenseur présent</Text>
                <Switch
                  value={formData.ascenseurPresent}
                  onValueChange={(value) => setFormData({ ...formData, ascenseurPresent: value })}
                  color={colors.brand}
                />
              </View>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => setModalVisible(false)}>Annuler</Button>
            <Button
              mode="contained"
              onPress={handleCreate}
              loading={saving}
              disabled={saving || !formData.adresse.trim()}
              buttonColor={colors.brand}
            >
              Créer
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgSecondary,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchbar: {
    backgroundColor: colors.bgSecondary,
    borderRadius: 8,
    elevation: 0,
  },
  searchbarInput: {
    fontSize: 14,
  },
  filtersContainer: {
    marginTop: spacing.sm,
    flexDirection: 'row',
  },
  filterChip: {
    marginRight: spacing.sm,
  },
  listContent: {
    padding: spacing.sm,
  },
  card: {
    marginBottom: spacing.md,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
  cardContent: {
    paddingVertical: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    backgroundColor: colors.brand,
  },
  cardHeaderText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  adresse: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  codeLabel: {
    color: colors.textSecondary,
  },
  codeValue: {
    color: colors.brand,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.bgSecondary,
    borderRadius: 8,
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statIcon: {
    backgroundColor: colors.brand + '20',
    marginRight: spacing.xs,
  },
  statValue: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  statLabel: {
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '15',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    gap: spacing.xs,
  },
  tagIcon: {
    backgroundColor: 'transparent',
  },
  tagText: {
    color: colors.success,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  accessButton: {
    borderRadius: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xxl,
  },
  emptyIcon: {
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  emptyText: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontSize: 16,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
    backgroundColor: colors.brand,
  },
  dialog: {
    backgroundColor: colors.white,
  },
  dialogScrollArea: {
    paddingHorizontal: spacing.md,
    maxHeight: 400,
  },
  input: {
    marginBottom: spacing.md,
    backgroundColor: colors.white,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
});