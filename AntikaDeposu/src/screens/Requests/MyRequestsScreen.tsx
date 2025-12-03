import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getUserRequests, RequestItem } from '../../api/requests';
import { useAuth } from '../../hooks/useAuth';
import { UserScreenProps } from '../../navigation/AppNavigator';

export function MyRequestsScreen({}: UserScreenProps<'MyRequests'>) {
  const { user } = useAuth();
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadRequests = useCallback(
    async (showLoader = true) => {
      if (!user?.id) {
        return;
      }
      if (showLoader) {
        setIsLoading(true);
      }
      try {
        const data = await getUserRequests(user.id);
        setRequests(data);
      } catch (error) {
        console.warn('Failed to load user requests', error);
      } finally {
        if (showLoader) {
          setIsLoading(false);
        }
      }
    },
    [user?.id],
  );

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadRequests(false);
    setIsRefreshing(false);
  }, [loadRequests]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!requests.length) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>Henüz talebiniz bulunmuyor</Text>
        <Text style={styles.emptySubtitle}>
          Home ekranından yeni bir talep oluşturabilirsiniz.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={requests}
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
          <Text style={styles.cardDate}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
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
  cardImage: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginTop: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#475569',
    marginTop: 4,
  },
  cardDate: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 8,
  },
});

