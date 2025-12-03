# APK Build - Şimdi Yap

## 🚀 Seçenek 1: GitHub Actions ile Build (En Kolay - 10 Dakika)

### Adımlar:

1. **Kodu GitHub'a Push Edin:**
   ```powershell
   git add .
   git commit -m "Build APK for BrowserStack"
   git push origin main
   ```

2. **GitHub'da Workflow'u Tetikleyin:**
   - https://github.com/YOUR_USERNAME/YOUR_REPO adresine gidin
   - "Actions" sekmesine tıklayın
   - "Build Android App" workflow'unu seçin
   - Sağ üstte "Run workflow" butonuna tıklayın
   - "Run workflow" butonuna tekrar tıklayın

3. **Build'i Bekleyin:**
   - Build başlayacak (yeşil işaret göreceksiniz)
   - 10-15 dakika sürebilir
   - İlerlemeyi izleyebilirsiniz

4. **APK'yı İndirin:**
   - Build tamamlandığında (yeşil ✅ işareti)
   - Workflow'a tıklayın
   - Sayfanın altında "Artifacts" bölümüne gidin
   - `android-apk-build` veya `android-aab-build` indirin

**APK hazır!** BrowserStack'e yükleyebilirsiniz.

---

## 🛠️ Seçenek 2: Local Build (Java + Android SDK Gerekli)

Eğer bilgisayarınızda build etmek istiyorsanız:

### Gereksinimler:
- ❌ Java JDK 17 (şu an kurulu değil)
- ❌ Android SDK (şu an kurulu değil)
- ⏱️ Kurulum süresi: 30-60 dakika

### Hızlı Kurulum:

1. **Java JDK 17 İndir:**
   - https://adoptium.net/temurin/releases/?version=17
   - Windows x64 MSI indirin ve kurun

2. **Android Studio İndir:**
   - https://developer.android.com/studio
   - Kurun ve SDK'yı yükleyin

3. **Build Komutu:**
   ```powershell
   cd AntikaDeposu\android
   .\gradlew.bat assembleRelease
   ```

Detaylı kurulum için: `BUILD_APK_LOCALLY.md`

---

## 💡 Öneri

**GitHub Actions kullanın!** Çok daha hızlı ve kolay. Local build sadece:
- İnternet bağlantısı yoksa
- Sürekli build yapmanız gerekiyorsa
- Özel ayarlar yapıyorsanız

---

## ⚡ Hemen Başla

1. ✅ GitHub repository'niz var mı?
   - **Evet**: Yukarıdaki "Seçenek 1" adımlarını takip edin
   - **Hayır**: Önce repository oluşturun

2. ✅ Kod push edildi mi?
   - Workflow otomatik çalışacak

3. ✅ APK indirildi mi?
   - BrowserStack'e yükleyin!

**Sorun mu var?** `BROWSERSTACK_TESTING_GUIDE.md` dosyasına bakın.

