const Request = require('../models/Request');

exports.createRequest = async (req, res, next) => {
  try {
    const { marka, model, parcaAdi, aciklama } = req.body;

    if (!marka || !model || !parcaAdi) {
      return res.status(400).json({ message: 'Marka, model ve parca adi gerekli.' });
    }

    const imageUrl = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : undefined;

    const request = await Request.create({
      userId: req.user.id,
      marka,
      model,
      parcaAdi,
      aciklama,
      imageUrl,
    });

    return res.status(201).json({ request });
  } catch (error) {
    return next(error);
  }
};

exports.getUserRequests = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.role !== 'admin' && req.user.id !== id) {
      return res.status(403).json({ message: 'Yalnizca kendi taleplerinizi gorebilirsiniz.' });
    }

    const requests = await Request.find({ userId: id }).sort({ createdAt: -1 });
    return res.json({ requests });
  } catch (error) {
    return next(error);
  }
};

exports.getAllRequests = async (_req, res, next) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    return res.json({ requests });
  } catch (error) {
    return next(error);
  }
};
