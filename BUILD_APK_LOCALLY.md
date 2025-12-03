# Local APK Build Rehberi (Windows)

Eğer bilgisayarınızda APK build etmek istiyorsanız, önce gerekli araçları kurmanız gerekiyor.

## ❌ Şu An Durumunuz

- ✅ Gradle wrapper mevcut
- ❌ Java kurulu değil
- ❌ Android SDK ayarlı değil

## ✅ Local Build İçin Gerekli Araçlar

### 1. Java JDK 17 Kurulumu

1. **Java JDK 17 İndirin:**
   - Oracle JDK: https://www.oracle.com/java/technologies/downloads/#java17
   - Veya OpenJDK: https://adoptium.net/temurin/releases/?version=17

2. **Kurulum:**
   - İndirilen installer'ı çalıştırın
   - Kurulum sırasında "Add to PATH" seçeneğini işaretleyin

3. **Kontrol:**
   ```powershell
   java -version
   ```
   Çıktıda Java 17 görünmeli.

### 2. Android Studio Kurulumu (Android SDK İçin)

1. **Android Studio İndirin:**
   - https://developer.android.com/studio

2. **Kurulum:**
   - Installer'ı çalıştırın
   - "Standard" kurulum seçeneğini seçin
   - Android SDK'yı yükleyin

3. **ANDROID_HOME Ayarlayın:**
   
   **Otomatik (Android Studio ile):**
   - Android Studio açılırken SDK yolunu gösterir
   - Genellikle: `C:\Users\[KullanıcıAdı]\AppData\Local\Android\Sdk`

   **Manuel Ayarlama:**
   ```powershell
   # PowerShell'de (Administrator olarak)
   [Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Users\berki\AppData\Local\Android\Sdk", "User")
   [Environment]::SetEnvironmentVariable("Path", $env:Path + ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\tools", "User")
   ```

4. **Kontrol:**
   ```powershell
   $env:ANDROID_HOME
   echo $env:ANDROID_HOME
   ```

### 3. Node.js Kurulumu (Zaten var olabilir)

```powershell
node --version
```

Yoksa: https://nodejs.org

## 🚀 APK Build Etme

Kurulumlar tamamlandıktan sonra:

### Adım 1: Dependencies Kur
```powershell
cd AntikaDeposu
npm install
```

### Adım 2: APK Build Et
```powershell
cd android
.\gradlew.bat assembleRelease
```

### Adım 3: APK Dosyasını Bul
```
AntikaDeposu\android\app\build\outputs\apk\release\app-release.apk
```

## ⚡ Alternatif: GitHub Actions Kullan (Daha Kolay!)

Local kurulum uzun sürebilir. **En kolay yol GitHub Actions kullanmak:**

1. Kodu GitHub'a push edin
2. GitHub Actions otomatik olarak APK build eder
3. İndirip kullanın

**Avantajları:**
- ✅ Java/Android SDK kurulumu gerekmez
- ✅ 10-15 dakikada hazır
- ✅ Ücretsiz (public repo için)
- ✅ Her push'ta otomatik build

## 📋 Hızlı Karşılaştırma

| Yöntem | Süre | Kurulum | Zorluk |
|--------|------|---------|--------|
| **GitHub Actions** | 10-15 dk | Yok | ⭐ Kolay |
| **Local Build** | 1-2 saat | Gerekli | ⭐⭐ Orta |

## 🎯 Öneri

**GitHub Actions kullanın!** Çok daha hızlı ve kolay. Local build sadece şu durumlarda gerekli:
- İnternet bağlantısı yok
- Her build'de test etmek istiyorsunuz
- Özel build ayarları yapıyorsunuz

## ❓ Yardım

Sorun yaşarsanız:
- GitHub Actions loglarını kontrol edin
- `BROWSERSTACK_TESTING_GUIDE.md` dosyasına bakın
- Java ve Android SDK kurulumlarını kontrol edin

