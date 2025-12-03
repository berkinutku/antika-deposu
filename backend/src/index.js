require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { connectDatabase, disconnectDatabase } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  '/uploads',
  express.static(path.join(__dirname, '..', 'uploads')),
);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

async function gracefulShutdown(reason) {
  console.log(`\nShutting down server (${reason})...`);
  await disconnectDatabase();
  process.exit(0);
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2'));

