const mongoose = require("mongoose");

const QuizAttemptSchema = new mongoose.Schema({
  username: String,
  score: Number,
  totalQuestions: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("QuizAttempt", QuizAttemptSchema);