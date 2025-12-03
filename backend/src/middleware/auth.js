const { verifyToken } = require('../utils/token');
const User = require('../models/User');

async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Yetkisiz erisim.' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Kullanici bulunamadi.' });
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token dogrulanamadi.' });
  }
}

module.exports = authMiddleware;
