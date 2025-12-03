import { useState } from 'react';
import {
  ActionSheetIOS,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { UserScreenProps } from '../../navigation/AppNavigator';
import { createRequest } from '../../api/requests';

export function RequestFormScreen({
  navigation,
}: UserScreenProps<'RequestForm'>) {
  const [marka, setMarka] = useState('');
  const [model, setModel] = useState('');
  const [parcaAdi, setParcaAdi] = useState('');
  const [aciklama, setAciklama] = useState('');
  const [image, setImage] = useState<{
    uri: string;
    type: string;
    fileName: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImagePicker = (result: ImagePickerResponse) => {
    if (result.didCancel) {
      return;
    }

    if (result.errorCode) {
      Alert.alert('Hata', 'Fotoğraf seçilirken bir hata oluştu.');
      return;
    }

    const asset = result.assets?.[0];
    if (asset?.uri && asset.type) {
      setImage({
        uri: asset.uri,
        type: asset.type,
        fileName: asset.fileName ?? `image-${Date.now()}.jpg`,
      });
    }
  };

  const handleChooseImage = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['İptal', 'Kamera', 'Galeri'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            // Kamera
            launchCamera(
              {
                mediaType: 'photo',
                quality: 0.8,
                saveToPhotos: false,
              },
              handleImagePicker,
            );
          } else if (buttonIndex === 2) {
            // Galeri
            launchImageLibrary(
              {
                mediaType: 'photo',
                quality: 0.8,
              },
              handleImagePicker,
            );
          }
        },
      );
    } else {
      // Android için Alert
      Alert.alert(
        'Fotoğraf Seç',
        'Fotoğrafı nereden seçmek istersiniz?',
        [
          { text: 'İptal', style: 'cancel' },
          {
            text: 'Kamera',
            onPress: () => {
              launchCamera(
                {
                  mediaType: 'photo',
                  quality: 0.8,
                  saveToPhotos: false,
                },
                handleImagePicker,
              );
            },
          },
          {
            text: 'Galeri',
            onPress: () => {
              launchImageLibrary(
                {
                  mediaType: 'photo',
                  quality: 0.8,
                },
                handleImagePicker,
              );
            },
          },
        ],
        { cancelable: true },
      );
    }
  };

  const handleSubmit = async () => {
    if (!marka || !model || !parcaAdi || !aciklama) {
      Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doldurunuz.');
      return;
    }

    setIsSubmitting(true);

    try {
      await createRequest({
        marka,
        model,
        parcaAdi,
        aciklama,
        image: image
          ? {
              uri: image.uri,
              type: image.type,
              name: image.fileName,
            }
          : undefined,
      });

      Alert.alert('Başarılı', 'Talebiniz kaydedildi.', [
        {
          text: 'Tamam',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.warn('Create request failed', error);
      Alert.alert('Hata', 'Talep oluşturulurken bir problem oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Marka</Text>
          <TextInput
            style={styles.input}
            value={marka}
            onChangeText={setMarka}
            placeholder="Örn: Mercedes"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Model</Text>
          <TextInput
            style={styles.input}
            value={model}
            onChangeText={setModel}
            placeholder="Örn: 300SL"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Parça Adı</Text>
          <TextInput
            style={styles.input}
            value={parcaAdi}
            onChangeText={setParcaAdi}
            placeholder="Örn: Karbüratör"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Açıklama</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={aciklama}
            onChangeText={setAciklama}
            placeholder="Parça hakkında detaylı bilgi giriniz."
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.imageButton} onPress={handleChooseImage}>
          <Text style={styles.imageButtonText}>
            {image ? 'Fotoğrafı Değiştir' : 'Fotoğraf Ekle'}
          </Text>
        </TouchableOpacity>

        {image?.uri ? (
          <Image source={{ uri: image.uri }} style={styles.previewImage} />
        ) : null}

        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>İptal</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#0f172a',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  imageButton: {
    backgroundColor: '#1d4ed8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

