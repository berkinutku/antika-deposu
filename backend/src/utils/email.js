const nodemailer = require('nodemailer');

// Email transporter oluştur
// Geliştirme için Gmail kullanabilirsiniz veya başka bir SMTP servisi
const createTransporter = () => {
  // Eğer .env'de email ayarları varsa kullan, yoksa console'a yazdır (development)
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Development için console transporter (email göndermez, sadece loglar)
  return {
    sendMail: async (options) => {
      console.log('=== EMAIL (Development Mode) ===');
      console.log('To:', options.to);
      console.log('Subject:', options.subject);
      console.log('Text:', options.text);
      console.log('HTML:', options.html);
      console.log('===============================');
      return { messageId: 'dev-mode' };
    },
  };
};

const transporter = createTransporter();

exports.sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@antikadeposu.com',
    to: email,
    subject: 'Antika Deposu - Parola Sıfırlama',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1d4ed8;">Parola Sıfırlama</h2>
        <p>Merhaba,</p>
        <p>Parolanızı sıfırlamak için aşağıdaki bilgileri kullanın:</p>
        
        <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0 0 8px 0; font-weight: 600; color: #0f172a;">Parola Sıfırlama Token'ı:</p>
          <p style="margin: 0; font-family: monospace; font-size: 14px; color: #1d4ed8; word-break: break-all; background-color: #fff; padding: 12px; border-radius: 4px;">
            ${resetToken}
          </p>
        </div>

        <p style="margin: 20px 0;">
          <strong>Mobil Uygulama için:</strong><br>
          Uygulamada "Parolamı Unuttum" ekranına gidin ve yukarıdaki token'ı girin.
        </p>

        <p style="margin: 20px 0;">
          <strong>Web için (varsa):</strong><br>
          <a href="${resetUrl}" 
             style="background-color: #1d4ed8; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 8px; display: inline-block;">
            Parolamı Sıfırla
          </a>
        </p>

        <p style="margin-top: 30px; color: #94a3b8; font-size: 12px;">
          Bu token 1 saat geçerlidir. Eğer bu isteği siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.
        </p>
      </div>
    `,
    text: `
      Parola Sıfırlama

      Parolanızı sıfırlamak için aşağıdaki token'ı kullanın:

      Token: ${resetToken}

      Mobil uygulamada "Parolamı Unuttum" ekranına gidin ve yukarıdaki token'ı girin.

      Web için: ${resetUrl}

      Bu token 1 saat geçerlidir.
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email gönderme hatası:', error);
    throw error;
  }
};

