const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
  {
    socketId: { type: String, required: true },
    playerCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", GameSchema);
module.exports = Game;
