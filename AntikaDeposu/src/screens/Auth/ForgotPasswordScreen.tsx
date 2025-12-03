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
import { forgotPassword } from '../../api/auth';

export function ForgotPasswordScreen({
  navigation,
}: AuthScreenProps<'ForgotPassword'>) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Eksik Bilgi', 'Lütfen email adresinizi giriniz.');
      return;
    }

    // Basit email validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Geçersiz Email', 'Lütfen geçerli bir email adresi giriniz.');
      return;
    }

    setIsLoading(true);
    try {
      await forgotPassword(email);
      setEmailSent(true);
      Alert.alert(
        'Email Gönderildi',
        'Parola sıfırlama linki email adresinize gönderildi. Lütfen email kutunuzu kontrol edin.',
      );
    } catch (error: any) {
      console.warn('Forgot password failed', error);
      // Güvenlik için her durumda başarılı mesajı göster
      setEmailSent(true);
      Alert.alert(
        'Email Gönderildi',
        'Eğer bu email ile kayıtlı bir hesap varsa, parola sıfırlama linki gönderildi.',
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
        <Text style={styles.title}>Parolamı Unuttum</Text>

        {emailSent ? (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>
              Parola sıfırlama linki email adresinize gönderildi. Lütfen email
              kutunuzu kontrol edin ve linke tıklayarak yeni parolanızı
              belirleyin.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.buttonText}>Giriş Sayfasına Dön</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.description}>
              Email adresinizi girin, size parola sıfırlama linki gönderelim.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              editable={!isLoading}
            />

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleForgotPassword}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Gönderiliyor...' : 'Parola Sıfırlama Linki Gönder'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.linkButton}
            >
              <Text style={styles.linkText}>Giriş Sayfasına Dön</Text>
            </TouchableOpacity>
          </>
        )}
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
  successContainer: {
    alignItems: 'center',
  },
  successText: {
    fontSize: 14,
    color: '#22c55e',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
});


