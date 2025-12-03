# ✅ Build Başarılı! - Sonraki Adımlar

## 🎉 iOS Build Tamamlandı!

iOS build başarıyla tamamlandı. Şimdi yapmanız gerekenler:

---

## 📱 iOS Build'i İndirin

### Adım 1: Artifact'ı İndirin

1. **GitHub Actions'a gidin:**
   https://github.com/berkinutku/antika-deposu/actions

2. **Başarılı iOS build'e tıklayın** (yeşil ✅ işareti)

3. **Sayfanın altına inin** → "Artifacts" bölümü

4. **`ios-app-build`** artifact'ını indirin

5. **ZIP dosyasını açın:**
   - `AntikaDeposu.app.zip` dosyasını bulun
   - Bu dosyayı da açın
   - `AntikaDeposu.app` dosyasını bulun

### Adım 2: Appetize.io'ya Yükleyin (iOS Test İçin)

1. **Appetize.io'ya gidin:** https://appetize.io
2. **Sign up / Login** yapın (100 dakika/ay ücretsiz)
3. **"Upload"** butonuna tıklayın
4. **`AntikaDeposu.app`** dosyasını seçin
5. **1-2 dakika bekleyin** (işleme süresi)
6. **"Launch"** → Test edin! 🎉

---

## 🤖 Android APK Build'i Kontrol Edin

Android build'i de kontrol edin:

1. **Actions sekmesinde** "Build Android App" workflow'unu bulun
2. **Başarılı mı kontrol edin** (yeşil ✅)
3. **Eğer başarılıysa:**
   - `android-apk-build` artifact'ını indirin
   - APK dosyasını çıkarın
   - BrowserStack'e yükleyin

---

## 🌐 BrowserStack'e Yükleme (Android APK)

### Adım 1: APK'yı İndirin

1. **GitHub Actions** → "Build Android App" workflow'una gidin
2. **Artifacts** → `android-apk-build` indirin
3. **ZIP'i açın** → APK dosyasını bulun

### Adım 2: BrowserStack'e Yükleyin

1. **BrowserStack'e gidin:** https://www.browserstack.com
2. **Sign up / Login** (100 dakika ücretsiz trial)
3. **"App Live"** → **"Upload"**
4. **APK dosyasını seçin**
5. **Cihaz seçin** → **"Launch"** → Test edin! 🎉

---

## 🔧 Backend Hazırlığı (Önemli!)

BrowserStack ve Appetize.io cloud simulator'lar kullandığı için backend'iniz internet üzerinden erişilebilir olmalı.

### Hızlı Test İçin (ngrok):

```bash
# Terminal 1: Backend'i başlat
cd backend
npm run dev

# Terminal 2: ngrok başlat
ngrok http 4000
# https://abc123.ngrok.io gibi bir URL alacaksınız
```

**API URL'ini güncelleyin:**
`AntikaDeposu/src/api/client.ts` dosyasını açın:
```typescript
const API_BASE_URL = 'https://abc123.ngrok.io/api';  // ngrok URL'iniz
```

**Yeni build oluşturun:**
- Değişikliği commit edin
- Push edin
- GitHub Actions yeni build oluşturacak
- Yeni build'i indirip test edin

### Kalıcı Çözüm (Deploy):

Backend'inizi Render, Railway veya Heroku'ya deploy edin:
- API URL'i kalıcı olur
- Her test öncesi ngrok başlatmanız gerekmez

Detaylar için: `BACKEND_TUNNELING.md`

---

## 📋 Hızlı Kontrol Listesi

### iOS Test (Appetize.io):
- [ ] iOS build artifact'ı indirildi
- [ ] `.app` dosyası çıkarıldı
- [ ] Appetize.io'ya yüklendi
- [ ] Backend hazır (ngrok veya deploy)
- [ ] API URL güncellendi (gerekirse)
- [ ] Test edildi ✅

### Android Test (BrowserStack):
- [ ] Android build başarılı mı kontrol edildi
- [ ] APK artifact'ı indirildi
- [ ] APK dosyası çıkarıldı
- [ ] BrowserStack'e yüklendi
- [ ] Backend hazır (ngrok veya deploy)
- [ ] API URL güncellendi (gerekirse)
- [ ] Test edildi ✅

---

## 🎯 Özet

✅ **iOS Build:** Tamamlandı - Appetize.io'ya yükleyebilirsiniz  
⏳ **Android Build:** Kontrol edin - Başarılıysa BrowserStack'e yükleyin  
🔧 **Backend:** ngrok veya deploy ile hazırlayın  
📱 **Test:** Her iki platformda da test edin!

---

## 🔗 Hızlı Linkler

- **Repository:** https://github.com/berkinutku/antika-deposu
- **Actions:** https://github.com/berkinutku/antika-deposu/actions
- **Appetize.io:** https://appetize.io
- **BrowserStack:** https://www.browserstack.com

---

## 💡 İpuçları

1. **Dakika Tasarrufu:** Sadece yeni build'ler yüklediğinizde dakika harcanır
2. **Backend URL:** Her ngrok başlatışında URL değişir, yeni build gerekir
3. **Build Hızı:** iOS ~10-15 dk, Android ~10-15 dk
4. **Artifact Saklama:** GitHub Actions artifact'ları 7 gün saklanır

**Başarılar! 🚀**

