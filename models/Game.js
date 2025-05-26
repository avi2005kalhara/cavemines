import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  playerName: { type: String, default: "Guest" },
  bet: Number,
  multiplier: Number,
  winAmount: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Game", GameSchema);
