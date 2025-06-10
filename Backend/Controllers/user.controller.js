const User = require('../models/orders');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
};

// Count all users
const getUsersCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Failed to count Users:', err);
    res.status(500).json({ error: 'Failed to count Users' });
  }
};

module.exports = {
  getAllUsers,
  getUsersCount
};
