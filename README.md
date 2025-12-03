# Antika Deposu

Antika Deposu, kullanıcıların antika araç parçaları için taleplerini oluşturabileceği ve takip edebileceği bir React Native mobil uygulamasıdır. Express tabanlı bir backend ile JWT kimlik doğrulama, MongoDB veritabanı, fotoğraf yükleme özelliği ve admin paneli içerir.

## İçerik
- React Native 0.82 mobil uygulaması
- React Navigation ile auth ve protected stack yapısı
- JWT tabanlı Express API
- MongoDB + Mongoose modelleri
- Multer ile fotoğraf yükleme
- Admin paneli ile tüm talepleri görüntüleme

## Kurulum

### 1. Backend
```bash
cd backend
cp .env.example .env
# .env dosyasını düzenleyin (MONGODB_URI, JWT_SECRET)
npm install
npm run dev
```

API varsayılan olarak `http://localhost:4000` üzerinde çalışır. Mobil cihaz/emülatör kullanıyorsanız, `src/api/client.ts` içindeki `API_BASE_URL` değerini makinenizin IP adresiyle güncelleyin.

#### API Endpointleri
- `POST /api/auth/signup` — Kullanıcı kaydı (varsayılan rol: user)
- `POST /api/auth/login` — Giriş
- `POST /api/requests/create` — Kullanıcı talebi oluşturma (Bearer token + multipart)
- `GET /api/requests/user/:id` — Kullanıcının talepleri
- `GET /api/requests/all` — Admin için tüm talepler

### 2. Mobil Uygulama
```bash
cd AntikaDeposu
npm install
npx expo start # Expo kullanıyorsanız
# veya
npx react-native run-android
```

## Doğrulama & Test Önerileri
- **Auth Akışı**: Kayıt olun, token'ın AsyncStorage'a yazıldığını ve oturumun korunduğunu doğrulayın. Yanlış şifre ile girişte hata mesajı gelmeli.
- **Talep Oluşturma**: Zorunlu alanları boş bırakarak validasyon uyarılarını test edin. Fotoğraf seçimi sonrası önizleme ve backend response'unu doğrulayın.
- **Taleplerim**: Yeni talep sonrası listenin güncellendiğini ve pull-to-refresh çalıştığını kontrol edin.
- **Admin Paneli**: Admin kullanıcı ile giriş yaptıktan sonra tüm taleplerin listelendiğini ve çıkış düğmesinin çalıştığını kontrol edin.
- **API Testleri**: Postman/Insomnia ile endpoint'leri JWT başlığı ile test edin. `requests/create` çağrısını form-data ile yaparak dosya yüklemeyi doğrulayın.

## Dağıtım Notları
- Backend'i Render/Railway/AWS gibi platformlara deploy ederken `uploads` klasörünü kalıcı depolama ile eşleyin veya S3 benzeri servislere yükleyin.
- Mobil uygulamada üretim URL'sini `.env` veya config dosyasından okuyacak şekilde yapılandırın.
- Android için `android/app/src/main/AndroidManifest.xml` dosyasında internet ve dosya izinlerinin (`READ_MEDIA_IMAGES` / `READ_EXTERNAL_STORAGE`) tanımlı olduğundan emin olun.
- iOS tarafında `Info.plist` dosyasına `NSPhotoLibraryUsageDescription` ekleyin.

## Katkılar
Pull request'lere ve önerilere açıktır. Sorunları GitHub Issues üzerinden bildirebilirsiniz.

