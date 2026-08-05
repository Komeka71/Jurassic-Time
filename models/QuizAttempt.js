// const mongoose = require("mongoose");

// const QuizAttemptSchema = new mongoose.Schema({
//   username: String,
//   score: Number,
//   totalQuestions: Number,
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("QuizAttempt", QuizAttemptSchema);


const mongoose = require("mongoose");

const QuizAttemptSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    score: {
      type: Number,
      required: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    timeTaken: {
      type: Number,
      default: 0,
    },

    topic: {
      type: String,
      default: "",
    },

    difficulty: {
      type: String,
      default: "",
    },

    xpEarned: {
      type: Number,
      default: 0,
    },

    coinsEarned: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QuizAttempt", QuizAttemptSchema);