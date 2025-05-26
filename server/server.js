import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRoutes from '../routes/authRoutes.js';
import gameRoutes from '../routes/gameRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
