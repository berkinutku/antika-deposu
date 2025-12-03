function errorHandler(err, req, res, next) {
  console.error('Unhandled error:', err);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  const message = err.message || 'Sunucuda bir hata olustu.';

  return res.status(status).json({
    message,
  });
}

module.exports = errorHandler;
