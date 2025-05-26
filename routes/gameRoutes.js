import express from 'express';
import Game from '../models/Game.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Save a game (protected)
router.post('/save', protect, async (req, res) => {
  try {
    const game = new Game({
      ...req.body,
      userId: req.user._id,
    });
    await game.save();
    res.json({ message: 'Game saved.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leaderboard - public or protected depending on your choice
router.get('/leaderboard', async (req, res) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 }).limit(10);
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard.' });
  }
});

export default router;
