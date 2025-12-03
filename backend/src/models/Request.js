const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    marka: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    parcaAdi: {
      type: String,
      required: true,
      trim: true,
    },
    aciklama: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true },
);

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
