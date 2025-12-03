function authorizeRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: 'Bu islem icin yetkiniz yok.' });
    }

    return next();
  };
}

module.exports = authorizeRole;
