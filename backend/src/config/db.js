const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let memoryServer;

async function connectDatabase() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/antika_deposu';

    if (!process.env.MONGODB_URI) {
      console.warn('[database] MONGODB_URI tanimli degil. Varsayilan olarak mongodb://127.0.0.1:27017/antika_deposu kullanilacak.');
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connection established');
  } catch (error) {
    console.error('MongoDB connection error:', error);

    if (process.env.USE_MEMORY_DB === 'false') {
      process.exit(1);
    }

    console.warn('[database] Yerel MongoDB baglantisi basarisiz. In-memory veritabani baslatiliyor...');

    memoryServer = await MongoMemoryServer.create();
    const memoryUri = memoryServer.getUri();
    await mongoose.connect(memoryUri);
    console.log('[database] In-memory MongoDB baglantisi kuruldu.');
  }
}

async function disconnectDatabase() {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
}

module.exports = { connectDatabase, disconnectDatabase };
