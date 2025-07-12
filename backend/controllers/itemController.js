const Item = require('../models/Item');
const User = require('../models/User');

// @desc Add a new item
exports.createItem = async (req, res) => {
    try {
      const imageUrls = req.files.map(file => file.path); // Cloudinary URLs
  
      const item = await Item.create({
        ...req.body,
        images: imageUrls,
        uploader: req.user.id
      });
  
      res.status(201).json(item);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };
  

// @desc Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('uploader', 'name email');
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc Get item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('uploader', 'name email');
    if (!item) return res.status(404).json({ msg: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// @desc Delete item by ID
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    // Optional: Allow only uploader or admin to delete
    if (item.uploader.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    await item.deleteOne();
    res.json({ msg: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Swap Request via Points
exports.redeemItemWithPoints = async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      const user = req.user;
  
      if (!item) return res.status(404).json({ msg: 'Item not found' });
      if (item.uploader.toString() === user.id)
        return res.status(403).json({ msg: 'You cannot redeem your own item' });
      if (item.status !== 'available')
        return res.status(400).json({ msg: 'Item is not available' });
  
      // Set cost (you can customize this)
      const cost = 10;
  
      // Fetch full user doc to update points
      const fullUser = await User.findById(user.id);
      if (fullUser.points < cost)
        return res.status(400).json({ msg: 'Not enough points' });
  
      // Deduct points & mark item
      fullUser.points -= cost;
      item.status = 'pending';
      item.requestedBy = user.id;
      item.isRedeemed = true;
  
      await fullUser.save();
      await item.save();
  
      res.status(200).json({ msg: 'Item redeemed via points', item });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };
  


// APPROVE SWAP/REDEMPTION
exports.approveItemRequest = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item || item.status !== 'pending') {
      return res.status(400).json({ msg: 'Invalid or already processed item' });
    }

    item.status = 'swapped';
    await item.save();

    res.status(200).json({ msg: 'Swap approved. Item marked as swapped.', item });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// REJECT SWAP/REDEMPTION
exports.rejectItemRequest = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('requestedBy');
    if (!item || item.status !== 'pending') {
      return res.status(400).json({ msg: 'Invalid or already processed item' });
    }

    // Refund points if it was a redemption
    if (item.isRedeemed && item.requestedBy) {
      const user = await User.findById(item.requestedBy._id);
      user.points += 10; // Refund same as deduction
      await user.save();
    }

    item.status = 'available';
    item.requestedBy = null;
    item.isRedeemed = false;
    await item.save();

    res.status(200).json({ msg: 'Swap rejected. Item is available again.', item });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


exports.getMyUploads = async (req, res) => {
  try {
    const items = await Item.find({ uploader: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const items = await Item.find({ requestedBy: req.user.id });
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


exports.getMySwapHistory = async (req, res) => {
  try {
    const items = await Item.find({
      requestedBy: req.user.id,
      status: 'swapped'
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};



exports.getMyPoints = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('points');
    res.json({ points: user.points });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
