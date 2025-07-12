const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminMiddleware');
const {
  getAllItems,
  deleteItemByAdmin
} = require('../controllers/adminController');

// Admin dashboard APIs
router.get('/items', auth, adminOnly, getAllItems); // ?status=pending
router.delete('/items/:id', auth, adminOnly, deleteItemByAdmin);

module.exports = router;
