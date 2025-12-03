import { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { UserScreenProps } from '../../navigation/AppNavigator';
import { useAuth } from '../../hooks/useAuth';

export function HomeScreen({ navigation }: UserScreenProps<'Home'>) {
  const { user, signOut } = useAuth();

  const greeting = useMemo(() => {
    if (!user?.email) {
      return 'Hoş geldiniz';
    }
    const name = user.email.split('@')[0];
    return `Merhaba, ${name}`;
  }, [user?.email]);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.warn('Logout failed', error);
      Alert.alert('Hata', 'Çıkış işlemi başarısız.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Antika Deposu</Text>
      <Text style={styles.subtitle}>{greeting}</Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('RequestForm')}
      >
        <Text style={styles.buttonText}>Talep Et</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('MyRequests')}
      >
        <Text style={styles.secondaryButtonText}>Taleplerim</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#475569',
  },
  primaryButton: {
    backgroundColor: '#1d4ed8',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1d4ed8',
    marginBottom: 24,
  },
  secondaryButtonText: {
    color: '#1d4ed8',
    fontSize: 18,
    fontWeight: '600',
  },
  logoutButton: {
    alignItems: 'center',
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '500',
  },
});

