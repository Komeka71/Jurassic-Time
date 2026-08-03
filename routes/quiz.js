const express = require("express");
const router = express.Router();

const QuizAttempt = require("../models/QuizAttempt");
const UserStats = require("../models/UserStats");

// Submit Quiz
router.post("/submit", async (req, res) => {
    try {
        const { username, score, totalQuestions, timeTaken } = req.body;

        // Save quiz attempt
        const attempt = await QuizAttempt.create({
            username,
            score,
            totalQuestions,
            timeTaken
        });

        // Find user stats
        let stats = await UserStats.findOne({ username });

        if (!stats) {
            // First quiz by this user
            stats = await UserStats.create({
                username,
                quizzesPlayed: 1,
                totalScore: score,
                highestScore: score
            });
        } else {
            // Update existing stats
            stats.quizzesPlayed += 1;
            stats.totalScore += score;

            if (score > stats.highestScore) {
                stats.highestScore = score;
            }

            await stats.save();
        }

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