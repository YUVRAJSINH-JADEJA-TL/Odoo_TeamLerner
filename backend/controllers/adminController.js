const Item = require('../models/Item');

// Get all items (admin view with optional filter)
exports.getAllItems = async (req, res) => {
  try {
    const { status } = req.query; // e.g., ?status=pending

    const query = status ? { status } : {};
    const items = await Item.find(query)
      .populate('uploader', 'name email')
      .populate('requestedBy', 'name email');

    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Remove inappropriate/spam item
exports.deleteItemByAdmin = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    res.json({ msg: 'Item deleted by admin' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
