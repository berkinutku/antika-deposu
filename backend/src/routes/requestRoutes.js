const express = require('express');
const authMiddleware = require('../middleware/auth');
const authorizeRole = require('../middleware/authorizeRole');
const requestController = require('../controllers/requestController');
const { upload } = require('../utils/upload');

const router = express.Router();

router.post(
  '/create',
  authMiddleware,
  upload.single('image'),
  requestController.createRequest,
);

router.get(
  '/user/:id',
  authMiddleware,
  requestController.getUserRequests,
);

router.get(
  '/all',
  authMiddleware,
  authorizeRole('admin'),
  requestController.getAllRequests,
);

module.exports = router;

