import express from 'express';
import protect from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Get wallet balance (protected)
router.get('/wallet', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
