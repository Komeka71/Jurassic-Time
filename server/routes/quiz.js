// const express = require("express");
// const router = express.Router();



// // skip
// // const QuizAttempt = require("../models/QuizAttempt");
// // const UserStats = require("../models/UserStats");

// // /**
// //  * REPLACES your current routes/quiz.js POST /submit handler.
// //  *
// //  * Changes from your version:
// //  * - Actually stores topic/difficulty/timeTaken (your route received these
// //  *   in req.body already but never wrote them to QuizAttempt).
// //  * - Computes xpEarned/coinsEarned server-side (your frontend never sent
// //  *   these) using the same "correctAnswers * 20" XP rate your daily-mission
// //  *   progress PATCH already assumes elsewhere in Quiz.jsx, plus a simple
// //  *   coins-per-correct-answer rate. Adjust XP_PER_CORRECT / COINS_PER_CORRECT
// //  *   below if your real reward balance differs.
// //  * - Updates UserStats (xp, coins, quizzesPlayed, highestScore) in the same
// //  *   request instead of leaving that to a separate call, so the numbers in
// //  *   the Profile dashboard and the reward the player just saw always match.
// //  */

// // const XP_PER_CORRECT = 20;
// // const COINS_PER_CORRECT = 10;

// // router.post("/submit", async (req, res) => {
// //   try {
// //     const {
// //       username,
// //       topic,
// //       difficulty,
// //       score,           // accuracy % as sent by your frontend
// //       totalQuestions,
// //       correctAnswers,
// //       timeTaken,
// //     } = req.body;

// //     const xpEarned = (correctAnswers || 0) * XP_PER_CORRECT;
// //     const coinsEarned = (correctAnswers || 0) * COINS_PER_CORRECT;

// //     const attempt = await QuizAttempt.create({
// //       username,
// //       topic,
// //       difficulty,
// //       score,
// //       totalQuestions,
// //       correctAnswers,
// //       xpEarned,
// //       coinsEarned,
// //       timeTaken,
// //     });

// //     let stats = await UserStats.findOne({ username });
// //     if (!stats) {
// //       stats = await UserStats.create({ username });
// //     }

// //     stats.quizzesPlayed += 1;
// //     stats.highestScore = Math.max(stats.highestScore || 0, score || 0);
// //     stats.xp = (stats.xp || 0) + xpEarned;
// //     stats.coins = (stats.coins || 0) + coinsEarned;

// //     // Keep your existing level formula if you have one (utils/levelSystem);
// //     // falling back to a simple 250-xp-per-level curve if not.
// //     stats.level = Math.max(1, Math.floor((stats.xp || 0) / 250) + 1);

// //     await stats.save();

// //     res.json({
// //       message: "Quiz submitted successfully!",
// //       attempt,
// //       stats,
// //       xpEarned,
// //       coinsEarned,
// //     });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // skip



// const QuizAttempt = require("../models/QuizAttempt");
// const UserStats = require("../models/UserStats");

// const { protect } = require("../middleware/authMiddleware");

// const {
//   getLevelFromXP,
//   buildExpeditionLevels,
// } = require("../utils/playerProgress");

// router.post("/submit", protect, async (req, res) => {
//   try {
//     const {
//       score,
//       totalQuestions,
//       timeTaken,
//       topic,
//       difficulty,
//     } = req.body;

//     const username = req.user.username;

//     const xpEarned = score * 10;
//     const coinsEarned = score * 5;
// module.exports = router;




const express = require("express");
const router = express.Router();

const QuizAttempt = require("../models/QuizAttempt");
const UserStats = require("../models/UserStats");

const { protect } = require("../middleware/authMiddleware");

const {
  getLevelFromXP,
  buildExpeditionLevels,
} = require("../utils/playerProgress");

/*
========================================
SUBMIT QUIZ
========================================
*/

router.post("/submit", protect, async (req, res) => {
  try {
    const {
      score,
      totalQuestions,
      timeTaken,
      topic,
      difficulty,
    } = req.body;

    const username = req.user.username;

    // Reward calculation
    const xpEarned = Math.round(score * 10);
    const coinsEarned = Math.round(score * 5);

    /*
    ========================================
    SAVE QUIZ ATTEMPT
    ========================================
    */

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

    /*
    ========================================
    GET / CREATE USER STATS
    ========================================
    */

    let stats = await UserStats.findOne({ username });

    if (!stats) {
      stats = new UserStats({
        username,
      });
    }

    /*
    ========================================
    UPDATE STATS
    ========================================
    */

    stats.quizzesPlayed += 1;

    if (score > stats.highestScore) {
      stats.highestScore = score;
    }

    stats.xp += xpEarned;
    stats.coins += coinsEarned;

    stats.level = getLevelFromXP(stats.xp);

    stats.expeditionLevels = buildExpeditionLevels(
      stats.level
    );

    /*
    ========================================
    DAILY STREAK
    ========================================
    */

    const today = new Date();

    if (!stats.lastPlayedDate) {
      stats.dailyStreak = 1;
      stats.longestStreak = 1;
    } else {
      const previous = new Date(stats.lastPlayedDate);

      previous.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      const diff =
        (today - previous) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        stats.dailyStreak += 1;
      } else if (diff > 1) {
        stats.dailyStreak = 1;
      }

      if (
        stats.dailyStreak >
        stats.longestStreak
      ) {
        stats.longestStreak =
          stats.dailyStreak;
      }
    }

    stats.lastPlayedDate = new Date();

    await stats.save();

    /*
    ========================================
    RESPONSE
    ========================================
    */

    res.status(200).json({
      success: true,
      message: "Quiz submitted successfully.",
      xpEarned,
      coinsEarned,
      stats,
      attempt,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to submit quiz.",
      error: err.message,
    });
  }
});

module.exports = router;