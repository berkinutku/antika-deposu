# GitHub'a Push Etme - Kısa Rehber

## 🚀 3 Adımda GitHub'a Push

### Adım 1: Git Repository Oluştur (İlk Kez İse)

```powershell
# Ana proje klasörüne git
cd C:\Users\berki\AntikaDeposu

# Git'i başlat
git init

# Tüm dosyaları ekle
git add .

# İlk commit yap
git commit -m "Initial commit - Version 1.0.0"
```

### Adım 2: GitHub'da Repository Oluştur

1. **GitHub'a git:** https://github.com
2. **Yeni repository oluştur:**
   - Sağ üstteki "+" → "New repository"
   - Repository adı girin (örn: `antika-deposu`)
   - **Public** seçin (ücretsiz sınırsız build için)
   - "Create repository" butonuna tıklayın

### Adım 3: Push Et

```powershell
# GitHub repository URL'ini ekle (YOUR_USERNAME ve YOUR_REPO'yu değiştirin)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Branch adını main yap
git branch -M main

# Push et
git push -u origin main
```

**GitHub kullanıcı adı/şifre isteyecek** - Giriş yapın.

---

## ✅ Zaten Git Repository Var İse

Sadece bu komutları çalıştırın:

```powershell
cd C:\Users\berki\AntikaDeposu
git add .
git commit -m "Build APK for BrowserStack"
git push
```

---

## 🔑 GitHub Kimlik Doğrulama

### Seçenek 1: Personal Access Token (Önerilen)

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token" → "repo" seçeneğini işaretleyin
3. Token'ı kopyalayın
4. Push yaparken şifre yerine bu token'ı kullanın

### Seçenek 2: GitHub Desktop (Kolay)

1. **GitHub Desktop İndir:** https://desktop.github.com
2. Kurun ve GitHub hesabınızla giriş yapın
3. "File" → "Add local repository"
4. `C:\Users\berki\AntikaDeposu` klasörünü seçin
5. "Publish repository" butonuna tıklayın

---

## ⚡ Hızlı Komutlar (Kopyala-Yapıştır)

### İlk Kez İse:

```powershell
cd C:\Users\berki\AntikaDeposu
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### Sonraki Push'lar İçin:

```powershell
cd C:\Users\berki\AntikaDeposu
git add .
git commit -m "Update code"
git push
```

---

## 🎯 Push Sonrası

1. ✅ GitHub repository'nize gidin
2. ✅ "Actions" sekmesine tıklayın
3. ✅ "Build Android App" workflow'u otomatik çalışacak
4. ✅ 10-15 dakika sonra APK hazır!

---

## ❓ Sorun Yaşarsanız

**"Repository not found" hatası:**
- Repository URL'ini kontrol edin
- GitHub'da repository oluşturduğunuzdan emin olun

**"Authentication failed" hatası:**
- Personal Access Token kullanın (şifre yerine)
- Veya GitHub Desktop kullanın

**"Branch not found" hatası:**
- `git branch -M main` komutunu çalıştırın

---

## 📋 Özet

```powershell
# 1. Git başlat (ilk kez)
git init
git add .
git commit -m "Initial commit"

# 2. GitHub'a bağla
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main

# 3. Push et
git push -u origin main
```

**Sonrasında sadece:**
```powershell
git add .
git commit -m "Mesaj"
git push
```

Hazır! 🎉

