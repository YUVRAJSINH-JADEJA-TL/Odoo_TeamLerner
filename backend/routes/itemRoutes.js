const express = require('express');
const router = express.Router();
const {
  createItem,
  getAllItems,
  getItemById,
  deleteItem
} = require('../controllers/itemController');

const auth = require('../middleware/authMiddleware');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });
const { redeemItemWithPoints } = require('../controllers/itemController');
const adminOnly = require('../middleware/adminMiddleware');
const { approveItemRequest, rejectItemRequest } = require('../controllers/itemController');

// Admin-only endpoints
router.patch('/:id/approve', auth, adminOnly, approveItemRequest);
router.patch('/:id/reject', auth, adminOnly, rejectItemRequest);


// Routes
router.get('/', getAllItems);
router.get('/:id', getItemById);
router.delete('/:id', auth, deleteItem);
router.post('/:id/redeem', auth, redeemItemWithPoints);

// Upload images to Cloudinary + create item
router.post('/', auth, upload.array('images'), createItem);

module.exports = router;
