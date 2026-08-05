const mongoose = require("mongoose");

/**
 * REPLACES your current models/QuizAttempt.js.
 * Adds the fields your quiz submit route already receives (topic,
 * difficulty, timeTaken) plus xpEarned/coinsEarned, which weren't being
 * captured anywhere. Existing documents are unaffected -- missing fields
 * just come back undefined/default on old rows.
 */
const QuizAttemptSchema = new mongoose.Schema({
  username: String,

  topic: { type: String, default: "all" },
  difficulty: { type: String, default: "easy" },

  score: Number,           // NOTE: your frontend actually sends accuracy % here, not a raw score
  totalQuestions: Number,
  correctAnswers: Number,

  xpEarned: { type: Number, default: 0 },
  coinsEarned: { type: Number, default: 0 },
  timeTaken: Number,       // seconds

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("QuizAttempt", QuizAttemptSchema);
