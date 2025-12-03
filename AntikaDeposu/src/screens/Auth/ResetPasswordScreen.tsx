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
import { resetPassword } from '../../api/auth';

export function ResetPasswordScreen({
  navigation,
  route,
}: AuthScreenProps<'ResetPassword'>) {
  const [token, setToken] = useState(route.params?.token || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doldurunuz.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor.');
      return;
    }

    if (!token) {
      Alert.alert('Hata', 'Geçersiz parola sıfırlama linki.');
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(token, password);
      Alert.alert('Başarılı', 'Parolanız başarıyla sıfırlandı.', [
        {
          text: 'Tamam',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error: any) {
      console.warn('Reset password failed', error);
      Alert.alert(
        'Hata',
        error?.response?.data?.message ||
          'Parola sıfırlama işlemi başarısız oldu. Linkin süresi dolmuş olabilir.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Yeni Parola Belirle</Text>

        <Text style={styles.description}>
          Email'inizdeki parola sıfırlama token'ını girin ve yeni parolanızı belirleyin.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Parola Sıfırlama Token'ı"
          value={token}
          onChangeText={setToken}
          editable={!isLoading}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Yeni Şifre"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!isLoading}
        />

        <TextInput
          style={styles.input}
          placeholder="Yeni Şifreyi Onayla"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          editable={!isLoading && !!token}
        />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleResetPassword}
          disabled={isLoading || !token.trim()}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Sıfırlanıyor...' : 'Parolayı Sıfırla'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>Giriş Sayfasına Dön</Text>
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
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1d4ed8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
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
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#1d4ed8',
    fontSize: 14,
  },
});

