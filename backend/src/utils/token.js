const jwt = require('jsonwebtoken');

function createToken(payload) {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  if (!process.env.JWT_SECRET) {
    console.warn('[jwt] JWT_SECRET tanimli degil. Gelistirme amaciyla varsayilan "dev-secret" kullanilacak.');
  }

  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

function verifyToken(token) {
  const secret = process.env.JWT_SECRET || 'dev-secret';

  return jwt.verify(token, secret);
}

module.exports = { createToken, verifyToken };
