const express = require("express");
const router = express.Router();

const QuizAttempt = require("../models/QuizAttempt");
const UserStats = require("../models/UserStats");

/**
 * REPLACES your current routes/quiz.js POST /submit handler.
 *
 * Changes from your version:
 * - Actually stores topic/difficulty/timeTaken (your route received these
 *   in req.body already but never wrote them to QuizAttempt).
 * - Computes xpEarned/coinsEarned server-side (your frontend never sent
 *   these) using the same "correctAnswers * 20" XP rate your daily-mission
 *   progress PATCH already assumes elsewhere in Quiz.jsx, plus a simple
 *   coins-per-correct-answer rate. Adjust XP_PER_CORRECT / COINS_PER_CORRECT
 *   below if your real reward balance differs.
 * - Updates UserStats (xp, coins, quizzesPlayed, highestScore) in the same
 *   request instead of leaving that to a separate call, so the numbers in
 *   the Profile dashboard and the reward the player just saw always match.
 */

const XP_PER_CORRECT = 20;
const COINS_PER_CORRECT = 10;

router.post("/submit", async (req, res) => {
  try {
    const {
      username,
      topic,
      difficulty,
      score,           // accuracy % as sent by your frontend
      totalQuestions,
      correctAnswers,
      timeTaken,
    } = req.body;

    const xpEarned = (correctAnswers || 0) * XP_PER_CORRECT;
    const coinsEarned = (correctAnswers || 0) * COINS_PER_CORRECT;

    const attempt = await QuizAttempt.create({
      username,
      topic,
      difficulty,
      score,
      totalQuestions,
      correctAnswers,
      xpEarned,
      coinsEarned,
      timeTaken,
    });

    let stats = await UserStats.findOne({ username });
    if (!stats) {
      stats = await UserStats.create({ username });
    }

    stats.quizzesPlayed += 1;
    stats.highestScore = Math.max(stats.highestScore || 0, score || 0);
    stats.xp = (stats.xp || 0) + xpEarned;
    stats.coins = (stats.coins || 0) + coinsEarned;

    // Keep your existing level formula if you have one (utils/levelSystem);
    // falling back to a simple 250-xp-per-level curve if not.
    stats.level = Math.max(1, Math.floor((stats.xp || 0) / 250) + 1);

    await stats.save();

    res.json({
      message: "Quiz submitted successfully!",
      attempt,
      stats,
      xpEarned,
      coinsEarned,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
