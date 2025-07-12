const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  images: [String],
  category: String,
  type: String,
  size: String,
  condition: String,
  tags: [String],
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['available', 'pending', 'swapped'], default: 'available' },
  createdAt: { type: Date, default: Date.now },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  isRedeemed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Item', itemSchema);
