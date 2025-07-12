const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
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

module.exports = router;
