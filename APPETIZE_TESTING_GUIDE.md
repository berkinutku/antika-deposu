# Appetize.io Testing Guide - Step by Step

Bu rehber, uygulamanızı Appetize.io'da test etmek için gereken tüm adımları içerir.

## 📋 Ön Gereksinimler

- ✅ GitHub hesabı (ücretsiz)
- ✅ Appetize.io hesabı (ücretsiz - 100 dakika/ay)
- ✅ Backend'iniz çalışıyor ve erişilebilir olmalı

---

## 🚀 Adım 1: Kodu GitHub'a Push Edin

### 1.1. Git Repository Oluşturun (Eğer yoksa)

```bash
# Proje klasöründe
git init
git add .
git commit -m "Initial commit with iOS build workflow"
```

### 1.2. GitHub'da Repository Oluşturun

1. https://github.com adresine gidin
2. "New repository" butonuna tıklayın
3. Repository adını girin (örn: `antika-deposu`)
4. **Public** olarak ayarlayın (ücretsiz sınırsız GitHub Actions için)
5. "Create repository" butonuna tıklayın

### 1.3. Kodu Push Edin

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

**Önemli**: Repository'yi **public** yapın! Public repo'lar için GitHub Actions sınırsız ücretsizdir.

---

## 🔨 Adım 2: GitHub Actions ile iOS Build

### 2.1. Workflow'u Tetikleyin

Kod push edildikten sonra GitHub Actions otomatik olarak çalışmaya başlar. Alternatif olarak manuel tetikleyebilirsiniz:

1. GitHub repository'nize gidin
2. "Actions" sekmesine tıklayın
3. "Build iOS App" workflow'unu seçin
4. Sağ üstteki "Run workflow" butonuna tıklayın
5. "Run workflow" butonuna tekrar tıklayın

### 2.2. Build İşlemini İzleyin

1. "Actions" sekmesinde workflow'un çalıştığını göreceksiniz
2. İşlemin tamamlanmasını bekleyin (yaklaşık 5-10 dakika)
3. Yeşil tik işareti göründüğünde build başarılı demektir

### 2.3. Build Artifact'ını İndirin

1. Başarılı workflow'a tıklayın
2. Sayfanın altına inin
3. "Artifacts" bölümünde `ios-app-build` göreceksiniz
4. `ios-app-build` üzerine tıklayın
5. Zip dosyası indirilecek

### 2.4. .app Dosyasını Çıkarın

1. İndirilen `ios-app-build.zip` dosyasını açın
2. İçinden `AntikaDeposu.app.zip` dosyasını bulun
3. Bu dosyayı da açın
4. `AntikaDeposu.app` klasörünü bulun (bu aslında bir dosya, klasör gibi görünür)

**Not**: macOS'ta `.app` dosyası bir paket olarak görünür. Windows'ta bir klasör gibi görünebilir, bu normaldir.

---

## 🌐 Adım 3: Backend'i Erişilebilir Yapın

Appetize.io cloud simulator'da çalıştığı için backend'iniz internet üzerinden erişilebilir olmalı.

### Seçenek 1: ngrok (Hızlı Test İçin - Önerilen)

```bash
# Terminal 1: Backend'i başlatın
cd backend
npm run dev

# Terminal 2: ngrok'u başlatın
ngrok http 4000
```

ngrok size bir URL verecek (örn: `https://abc123.ngrok.io`)

**API URL'ini Güncelleyin:**
`AntikaDeposu/src/api/client.ts` dosyasını açın ve güncelleyin:

```typescript
const API_BASE_URL = 'https://abc123.ngrok.io/api';
```

**Önemli**: ngrok URL'i her başlatışta değişir. Her test öncesi güncellemeniz gerekir.

### Seçenek 2: Backend'i Deploy Edin (Kalıcı Çözüm)

Backend'inizi Render, Railway veya Heroku'ya deploy edin:

**Render (Ücretsiz):**
1. https://render.com adresine gidin
2. "New Web Service" oluşturun
3. GitHub repository'nizi bağlayın
4. Build command: `cd backend && npm install`
5. Start command: `cd backend && npm start`
6. Environment variables ekleyin (MONGODB_URI, JWT_SECRET)

Deploy edildikten sonra API URL'ini güncelleyin:
```typescript
const API_BASE_URL = 'https://your-app.onrender.com/api';
```

---

## 📱 Adım 4: Appetize.io'ya Yükleyin

### 4.1. Appetize.io Hesabı Oluşturun

1. https://appetize.io adresine gidin
2. "Sign Up" butonuna tıklayın
3. Ücretsiz hesap oluşturun (100 dakika/ay ücretsiz)

### 4.2. Uygulamayı Yükleyin

1. Appetize.io dashboard'una gidin
2. "Upload" veya "New App" butonuna tıklayın
3. "Choose File" butonuna tıklayın
4. `AntikaDeposu.app` dosyasını seçin (veya zip dosyasını)
5. "Upload" butonuna tıklayın

### 4.3. Yükleme İşlemini Bekleyin

- Yükleme genellikle 1-2 dakika sürer
- İşlem tamamlandığında bildirim alacaksınız

### 4.4. Cihaz Seçin

1. Yüklenen uygulamaya tıklayın
2. Cihaz seçeneklerinden birini seçin:
   - iPhone 14 Pro (önerilen)
   - iPhone 13
   - iPad Pro
   - vb.

### 4.5. Test Edin!

1. "Launch" butonuna tıklayın
2. iOS simulator tarayıcıda açılacak
3. Uygulamanızı test edebilirsiniz!

---

## 🎮 Appetize.io Özellikleri

### Ücretsiz Özellikler:
- ✅ 100 dakika/ay test süresi
- ✅ Birden fazla cihaz seçeneği
- ✅ Ekran kaydı (screen recording)
- ✅ Console logları
- ✅ Touch gestures (dokunma, kaydırma, vb.)
- ✅ Klavye girişi

### Kullanım İpuçları:
- **Dakika Tasarrufu**: Sadece yeni build'ler yüklediğinizde dakika harcanır
- **Ekran Kaydı**: Test sırasında ekran kaydı alabilirsiniz
- **Console Logs**: Hata ayıklama için console loglarını görüntüleyin
- **Cihaz Değiştirme**: Farklı cihazlarda test edebilirsiniz

---

## 🔧 Sorun Giderme

### Build Başarısız Olursa

**Hata: "Pod install fails"**
- GitHub Actions loglarını kontrol edin
- `ios/Podfile` dosyasının doğru olduğundan emin olun

**Hata: "Code signing required"**
- Workflow zaten `CODE_SIGNING_ALLOWED=NO` kullanıyor
- Eğer hala hata alıyorsanız, build settings'i kontrol edin

**Hata: "Node version mismatch"**
- Workflow Node 20 kullanıyor
- Farklı bir versiyon gerekiyorsa `.github/workflows/ios-build.yml` dosyasını güncelleyin

### Appetize.io'da Sorunlar

**Uygulama Yüklenmiyor**
- `.app` dosyasının doğru olduğundan emin olun
- Dosya boyutunun 500MB'dan küçük olduğundan emin olun
- Zip dosyası yerine `.app` dosyasını yüklemeyi deneyin

**Uygulama Açılmıyor / Crash Oluyor**
- Console loglarını kontrol edin (Appetize.io'da "Logs" sekmesi)
- Backend bağlantısını kontrol edin (API URL doğru mu?)
- Info.plist izinlerini kontrol edin

**Backend'e Bağlanamıyor**
- ngrok URL'inin doğru olduğundan emin olun
- ngrok'un çalıştığından emin olun
- Backend'in çalıştığından emin olun
- Firewall ayarlarını kontrol edin

### Backend Bağlantı Sorunları

**"Network Error" veya "Connection Failed"**
1. ngrok'un çalıştığını kontrol edin
2. API URL'ini `AntikaDeposu/src/api/client.ts` dosyasında güncelleyin
3. Backend'i yeniden başlatın
4. Yeni bir build oluşturun ve yükleyin

**"CORS Error"**
- Backend'de CORS ayarlarını kontrol edin
- `backend/src/index.js` dosyasında CORS'un doğru yapılandırıldığından emin olun

---

## 📝 Hızlı Kontrol Listesi

Test etmeden önce:

- [ ] Kod GitHub'a push edildi
- [ ] GitHub Actions build'i başarılı
- [ ] `.app` dosyası indirildi ve çıkarıldı
- [ ] Backend çalışıyor ve erişilebilir (ngrok veya deploy)
- [ ] API URL'i güncellendi (`AntikaDeposu/src/api/client.ts`)
- [ ] Yeni build oluşturuldu (API URL değişikliği için)
- [ ] Appetize.io hesabı oluşturuldu
- [ ] Uygulama Appetize.io'ya yüklendi

---

## 🎯 Test Senaryoları

Appetize.io'da test ederken şunları deneyin:

1. **Giriş/Kayıt**
   - Email ile kayıt olma
   - Giriş yapma
   - Parola sıfırlama akışı

2. **Talep Oluşturma**
   - Yeni talep formu
   - Fotoğraf yükleme
   - Form validasyonu

3. **Talepleri Görüntüleme**
   - Kullanıcı talepleri
   - Admin paneli (admin kullanıcı ile)

4. **Arama ve Filtreleme**
   - Admin panelinde arama
   - Marka/Model filtreleme

---

## 💡 İpuçları

1. **Dakika Tasarrufu**: 
   - Sadece önemli değişikliklerden sonra yeni build yükleyin
   - Test sırasında simulator'ı kapatmayı unutmayın (dakika harcamaya devam eder)

2. **Hızlı Test**:
   - ngrok kullanarak hızlı test yapabilirsiniz
   - Production için backend'i deploy edin

3. **Debug**:
   - Console loglarını mutlaka kontrol edin
   - Ekran kaydı alarak sorunları daha iyi anlayabilirsiniz

4. **Cihaz Testi**:
   - Farklı iPhone/iPad modellerinde test edin
   - Farklı iOS versiyonlarında test edin

---

## 🎉 Başarılı!

Artık uygulamanızı Appetize.io'da test edebilirsiniz! Sorularınız için GitHub Issues kullanabilir veya dokümantasyonu kontrol edebilirsiniz.


