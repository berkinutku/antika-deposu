import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthScreenProps } from '../../navigation/AppNavigator';
import { useAuth } from '../../hooks/useAuth';

export function AdminLoginScreen({
  navigation,
}: AuthScreenProps<'AdminLogin'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signOut, isAuthenticating } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Eksik Bilgi', 'Lütfen email ve şifrenizi giriniz.');
      return;
    }

    try {
      const user = await signIn({ email, password });
      if (user.role !== 'admin') {
        Alert.alert('Yetkisiz', 'Admin paneline erişim için yetkiniz bulunmuyor.');
        await signOut();
      }
    } catch (error) {
      console.warn('Admin login failed', error);
      Alert.alert('Hata', 'Giriş yapılamadı. Bilgilerinizi kontrol edin.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Admin Girişi</Text>

        <TextInput
          style={styles.input}
          placeholder="Admin Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Şifre"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, isAuthenticating && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isAuthenticating}
        >
          <Text style={styles.buttonText}>
            {isAuthenticating ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>Kullanıcı girişi için tıklayın</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  linkText: {
    color: '#1d4ed8',
    fontSize: 14,
  },
});

