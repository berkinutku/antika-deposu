const User = require('../models/User');
const { createToken } = require('../utils/token');
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('../utils/email');

function formatUser(user) {
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

async function findAndValidateUser(email, password) {
  if (!email || !password) {
    const error = new Error('Email ve sifre gerekli.');
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('Email veya sifre hatali.');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error('Email veya sifre hatali.');
    error.statusCode = 401;
    throw error;
  }

  return user;
}

exports.signup = async (req, res, next) => {
  try {
    const { email, password, role, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email ve sifre gerekli.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Bu email ile kayitli kullanici mevcut.' });
    }

    const user = new User({
      email,
      password,
      name,
      role: role === 'admin' ? 'admin' : 'user',
    });

    await user.save();

    const token = createToken({ id: user._id, role: user.role });

    return res.status(201).json({
      token,
      user: formatUser(user),
    });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findAndValidateUser(email, password);

    const token = createToken({ id: user._id, role: user.role });

    return res.json({
      token,
      user: formatUser(user),
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return next(error);
  }
};

exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findAndValidateUser(email, password);

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin yetkisi gerekli.' });
    }

    const token = createToken({ id: user._id, role: user.role });

    return res.json({
      token,
      user: formatUser(user),
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email gerekli.' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // Güvenlik için: Kullanıcı yoksa bile başarılı mesajı döndür
    if (!user) {
      return res.json({
        message: 'Eğer bu email ile kayıtlı bir hesap varsa, parola sıfırlama linki gönderildi.',
      });
    }

    // Reset token oluştur
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 saat

    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(resetTokenExpiry);
    await user.save();

    // Email gönder
    try {
      await sendPasswordResetEmail(user.email, resetToken);
    } catch (emailError) {
      console.error('Email gönderme hatası:', emailError);
      // Email gönderilemese bile token oluşturuldu, kullanıcıya bilgi ver
    }

    return res.json({
      message: 'Eğer bu email ile kayıtlı bir hesap varsa, parola sıfırlama linki gönderildi.',
    });
  } catch (error) {
    return next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: 'Token ve yeni şifre gerekli.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Şifre en az 6 karakter olmalıdır.' });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: 'Geçersiz veya süresi dolmuş parola sıfırlama linki.',
      });
    }

    // Yeni şifreyi ayarla (pre-save hook otomatik hash'leyecek)
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return res.json({
      message: 'Parolanız başarıyla sıfırlandı.',
    });
  } catch (error) {
    return next(error);
  }
};
