import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { getAllRequests, RequestItem } from '../../api/requests';
import { useAuth } from '../../hooks/useAuth';
import { AdminScreenProps } from '../../navigation/AppNavigator';

export function AdminHomeScreen({
  navigation,
}: AdminScreenProps<'AdminHome'>) {
  const { signOut } = useAuth();
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedMarka, setSelectedMarka] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');

  const loadRequests = useCallback(async (showLoader = true) => {
    if (showLoader) {
      setIsLoading(true);
    }
    try {
      const data = await getAllRequests();
      setRequests(data);
    } catch (error: any) {
      console.warn('Failed to load all requests', error);
      if (error?.response?.status === 401) {
        await signOut();
      }
    } finally {
      if (showLoader) {
        setIsLoading(false);
      }
    }
  }, [signOut]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text style={styles.logoutButton} onPress={signOut}>
          Çıkış
        </Text>
      ),
    });
  }, [navigation, signOut]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadRequests(false);
    setIsRefreshing(false);
  }, [loadRequests]);

  // Extract unique brands and models for filters
  const uniqueMarkas = useMemo(() => {
    const markas = new Set(requests.map((r) => r.marka).filter(Boolean));
    return Array.from(markas).sort();
  }, [requests]);

  const uniqueModels = useMemo(() => {
    const models = new Set(requests.map((r) => r.model).filter(Boolean));
    return Array.from(models).sort();
  }, [requests]);

  // Filter requests based on search and filters
  const filteredRequests = useMemo(() => {
    return requests.filter((item) => {
      // Search text filter (searches in marka, model, parcaAdi, aciklama)
      if (searchText.trim()) {
        const searchLower = searchText.toLowerCase();
        const matchesSearch =
          item.marka.toLowerCase().includes(searchLower) ||
          item.model.toLowerCase().includes(searchLower) ||
          item.parcaAdi.toLowerCase().includes(searchLower) ||
          (item.aciklama && item.aciklama.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Marka filter
      if (selectedMarka && item.marka !== selectedMarka) {
        return false;
      }

      // Model filter
      if (selectedModel && item.model !== selectedModel) {
        return false;
      }

      return true;
    });
  }, [requests, searchText, selectedMarka, selectedModel]);

  const clearFilters = () => {
    setSearchText('');
    setSelectedMarka('');
    setSelectedModel('');
  };

  const hasActiveFilters = searchText.trim() || selectedMarka || selectedModel;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search and Filter Button */}
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => setShowFilters(true)}
        >
          <Text style={styles.searchButtonText}>🔍 Ara ve Filtrele</Text>
          {hasActiveFilters && <View style={styles.filterBadge} />}
        </TouchableOpacity>
        {hasActiveFilters && (
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.clearButtonText}>Temizle</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ara ve Filtrele</Text>
              <TouchableOpacity
                onPress={() => setShowFilters(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {/* Search Input */}
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Ara</Text>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Marka, model, parça adı veya açıklama..."
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholderTextColor="#94a3b8"
                />
              </View>

              {/* Marka Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Marka</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.filterChips}
                >
                  <TouchableOpacity
                    style={[
                      styles.filterChip,
                      !selectedMarka && styles.filterChipActive,
                    ]}
                    onPress={() => setSelectedMarka('')}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        !selectedMarka && styles.filterChipTextActive,
                      ]}
                    >
                      Tümü
                    </Text>
                  </TouchableOpacity>
                  {uniqueMarkas.map((marka) => (
                    <TouchableOpacity
                      key={marka}
                      style={[
                        styles.filterChip,
                        selectedMarka === marka && styles.filterChipActive,
                      ]}
                      onPress={() =>
                        setSelectedMarka(selectedMarka === marka ? '' : marka)
                      }
                    >
                      <Text
                        style={[
                          styles.filterChipText,
                          selectedMarka === marka && styles.filterChipTextActive,
                        ]}
                      >
                        {marka}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Model Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Model</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.filterChips}
                >
                  <TouchableOpacity
                    style={[
                      styles.filterChip,
                      !selectedModel && styles.filterChipActive,
                    ]}
                    onPress={() => setSelectedModel('')}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        !selectedModel && styles.filterChipTextActive,
                      ]}
                    >
                      Tümü
                    </Text>
                  </TouchableOpacity>
                  {uniqueModels.map((model) => (
                    <TouchableOpacity
                      key={model}
                      style={[
                        styles.filterChip,
                        selectedModel === model && styles.filterChipActive,
                      ]}
                      onPress={() =>
                        setSelectedModel(selectedModel === model ? '' : model)
                      }
                    >
                      <Text
                        style={[
                          styles.filterChipText,
                          selectedModel === model && styles.filterChipTextActive,
                        ]}
                      >
                        {model}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.applyButtonText}>Uygula</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Results Count */}
      {hasActiveFilters && (
        <View style={styles.resultsInfo}>
          <Text style={styles.resultsText}>
            {filteredRequests.length} sonuç bulundu
          </Text>
        </View>
      )}

      {/* Requests List */}
      <FlatList
        contentContainerStyle={styles.list}
        data={filteredRequests}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              {item.marka} {item.model}
            </Text>
            <Text style={styles.cardSubtitle}>{item.parcaAdi}</Text>
            {item.imageUrl ? (
              <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
            ) : null}
            <Text style={styles.cardDescription}>{item.aciklama}</Text>
            <Text style={styles.cardFooter}>
              Kullanıcı: {item.userId} • {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>
              {hasActiveFilters
                ? 'Filtrelere uygun talep bulunamadı.'
                : 'Henüz talep bulunmuyor.'}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  searchButton: {
    flex: 1,
    backgroundColor: '#1d4ed8',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  filterBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fbbf24',
    position: 'absolute',
    top: 8,
    right: 8,
  },
  clearButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
  },
  clearButtonText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '600',
  },
  resultsInfo: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f1f5f9',
  },
  resultsText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  list: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#1d4ed8',
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    color: '#475569',
    marginTop: 4,
  },
  cardImage: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginTop: 8,
  },
  cardFooter: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 64,
  },
  emptyTitle: {
    fontSize: 16,
    color: '#64748b',
  },
  logoutButton: {
    color: '#ef4444',
    fontWeight: '600',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#64748b',
  },
  modalBody: {
    padding: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  filterChips: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  filterChipActive: {
    backgroundColor: '#1d4ed8',
    borderColor: '#1d4ed8',
  },
  filterChipText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  applyButton: {
    backgroundColor: '#1d4ed8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

