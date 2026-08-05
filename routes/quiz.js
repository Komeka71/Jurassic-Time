const express = require("express");
const router = express.Router();

const QuizAttempt = require("../models/QuizAttempt");
const UserStats = require("../models/UserStats");
const { protect } = require("../middleware/authMiddleware");
const {
  getLevelFromXP,
  buildExpeditionLevels,
} = require("../utils/playerProgress");
// Submit Quiz
router.post("/submit", protect, async (req, res) => {
        try {
const {
  score,
  totalQuestions,
  timeTaken,
  topic,
  difficulty,
} = req.body;

const username = req.user?.username;
// Guest users should not save progress
// if (!username) {
//   return res.status(200).json({
//     guest: true,
//     message: "Guest mode - progress not saved.",
//   });
// }
        // Save quiz attempt
       const xpEarned = score * 10;
const coinsEarned = score * 5;

const attempt = await QuizAttempt.create({
    username,
    score,
    totalQuestions,
    timeTaken,
    topic,
    difficulty,
    xpEarned,
    coinsEarned,
});
        // Find user stats
        // XP & Coins earned for this quiz
// const xpEarned = score * 10;
// const coinsEarned = score * 5;

// Find or create user stats
let stats = await UserStats.findOne({ username });

if (!stats) {
  stats = new UserStats({
    username,
  });
}

// Update quiz stats
stats.quizzesPlayed += 1;

if (score > stats.highestScore) {
  stats.highestScore = score;
}

// Update progression
stats.xp += xpEarned;
stats.coins += coinsEarned;

// Calculate level from XP
stats.level = getLevelFromXP(stats.xp);

// Update expedition unlocks
stats.expeditionLevels = buildExpeditionLevels(stats.level);

await stats.save();

        res.json({
            message: "Quiz submitted successfully!",
            attempt,
            stats
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;