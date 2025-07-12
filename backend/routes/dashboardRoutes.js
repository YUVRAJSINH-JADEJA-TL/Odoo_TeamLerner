const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getProfile } = require('../controllers/authController');

const {
  getMyUploads,
  getMyRequests,
  getMySwapHistory,
  getMyPoints
} = require('../controllers/itemController');

router.get('/uploads', auth, getMyUploads);
router.get('/requests', auth, getMyRequests);
router.get('/history', auth, getMySwapHistory);
router.get('/points', auth, getMyPoints);
router.get('/me', auth, getProfile); // GET /api/auth/me

module.exports = router;
