const mongoose = require("mongoose");

const UserStatsSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  quizzesPlayed: {
    type: Number,
    default: 0,
  },
  highestScore: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("UserStats", UserStatsSchema);