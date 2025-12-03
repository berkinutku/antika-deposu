# Parola Sıfırlama Özelliği Kurulumu

Parola sıfırlama özelliği başarıyla eklendi! Bu dokümantasyon, özelliğin nasıl çalıştığını ve nasıl yapılandırılacağını açıklar.

## ✅ Eklenen Özellikler

### Backend
- ✅ User modeline `resetToken` ve `resetTokenExpiry` alanları eklendi
- ✅ `forgot-password` endpoint'i eklendi
- ✅ `reset-password` endpoint'i eklendi
- ✅ Email gönderme utility'si eklendi (nodemailer)
- ✅ Token tabanlı güvenli parola sıfırlama

### Frontend
- ✅ "Parolamı Unuttum" ekranı eklendi
- ✅ "Yeni Parola Belirle" ekranı eklendi
- ✅ Login ekranına "Parolamı Unuttum" linki eklendi
- ✅ Navigation'a yeni ekranlar eklendi
- ✅ API fonksiyonları eklendi

## 📧 Email Yapılandırması

### Geliştirme Modu (Development)

Email ayarları yapılmazsa, sistem development modunda çalışır ve email'ler console'a yazdırılır:

```bash
# Backend çalıştığında console'da göreceksiniz:
=== EMAIL (Development Mode) ===
To: user@example.com
Subject: Antika Deposu - Parola Sıfırlama
...
```

### Production Modu

Email göndermek için `.env` dosyasına email ayarlarını ekleyin:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@antikadeposu.com
FRONTEND_URL=https://your-app.com
```

### Gmail Kullanımı

Gmail için App Password kullanmanız gerekir:

1. Google Hesabınıza gidin
2. Güvenlik → 2 Adımlı Doğrulama'yı etkinleştirin
3. App Passwords'a gidin
4. Yeni bir app password oluşturun
5. Bu password'ü `EMAIL_PASS` olarak kullanın

**Örnek .env:**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop  # Gmail App Password
EMAIL_FROM=noreply@antikadeposu.com
```

### Diğer Email Servisleri

#### SendGrid
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```

#### Mailgun
```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=your-mailgun-username
EMAIL_PASS=your-mailgun-password
```

#### Outlook/Office 365
```env
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

## 🔄 Kullanım Akışı

### 1. Kullanıcı Parolayı Unuttu

1. Login ekranında "Parolamı Unuttum" linkine tıklar
2. Email adresini girer
3. "Parola Sıfırlama Linki Gönder" butonuna tıklar

### 2. Email Gönderilir

- Backend bir reset token oluşturur (1 saat geçerli)
- Email gönderilir (veya development modunda console'a yazdırılır)
- Email'de token gösterilir

### 3. Kullanıcı Parolayı Sıfırlar

1. Email'deki token'ı kopyalar
2. Uygulamada "Parolamı Unuttum" ekranına gider
3. Token'ı girer
4. Yeni parolasını belirler
5. Parolayı sıfırlar

## 🔒 Güvenlik Özellikleri

- ✅ Token'lar 1 saat geçerlidir
- ✅ Her token sadece bir kez kullanılabilir
- ✅ Token kullanıldıktan sonra silinir
- ✅ Email'de olmayan kullanıcılar için de başarılı mesajı gösterilir (güvenlik)
- ✅ Şifreler bcrypt ile hash'lenir

## 📱 Mobil Uygulama Kullanımı

### Token Girişi

Email'deki token'ı kopyalayıp uygulamaya yapıştırabilirsiniz:

1. Email'i açın
2. Token'ı kopyalayın
3. Uygulamada "Parolamı Unuttum" → "Yeni Parola Belirle" ekranına gidin
4. Token'ı yapıştırın
5. Yeni parolanızı girin

## 🧪 Test Etme

### Development Modunda Test

1. Backend'i çalıştırın (email ayarları olmadan)
2. "Parolamı Unuttum" ekranından email girin
3. Console'da email içeriğini görün
4. Token'ı kopyalayın
5. "Yeni Parola Belirle" ekranında token'ı kullanın

### Production Modunda Test

1. `.env` dosyasına email ayarlarını ekleyin
2. Backend'i yeniden başlatın
3. "Parolamı Unuttum" ekranından email girin
4. Email kutunuzu kontrol edin
5. Token'ı kullanarak parolayı sıfırlayın

## 📝 API Endpoints

### POST /api/auth/forgot-password
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Eğer bu email ile kayıtlı bir hesap varsa, parola sıfırlama linki gönderildi."
}
```

### POST /api/auth/reset-password
```json
{
  "token": "reset-token-here",
  "password": "new-password"
}
```

**Response:**
```json
{
  "message": "Parolanız başarıyla sıfırlandı."
}
```

## ⚠️ Önemli Notlar

1. **Email Ayarları**: Production'da mutlaka email ayarlarını yapın
2. **Token Süresi**: Token'lar 1 saat geçerlidir, süresi dolduğunda yeni token isteyin
3. **Güvenlik**: Email ayarlarını `.env` dosyasında saklayın, asla commit etmeyin
4. **Frontend URL**: `FRONTEND_URL` environment variable'ını production URL'inizle güncelleyin

## 🐛 Sorun Giderme

### Email Gönderilmiyor

1. `.env` dosyasını kontrol edin
2. Email servis sağlayıcınızın ayarlarını kontrol edin
3. Firewall/port engellemelerini kontrol edin
4. Gmail kullanıyorsanız App Password kullandığınızdan emin olun

### Token Geçersiz Hatası

1. Token'ın 1 saat içinde kullanıldığından emin olun
2. Token'ın daha önce kullanılmadığından emin olun
3. Token'ı doğru kopyaladığınızdan emin olun (boşluk olmamalı)

### Backend Hatası

1. MongoDB bağlantısını kontrol edin
2. Backend loglarını kontrol edin
3. `nodemailer` paketinin yüklü olduğundan emin olun: `npm install`

## 📦 Gerekli Paketler

Backend'de yeni paket eklendi:
- `nodemailer` - Email gönderme için

Yüklemek için:
```bash
cd backend
npm install
```

## ✅ Tamamlandı!

Parola sıfırlama özelliği artık kullanıma hazır! 🎉


