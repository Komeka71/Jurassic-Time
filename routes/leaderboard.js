const express = require("express");
const router = express.Router();

const UserStats = require("../models/UserStats");

// GET Leaderboard
router.get("/", async (req, res) => {
    try {
        const leaderboard = await UserStats
            .find()
            .sort({ highestScore: -1, quizzesPlayed: -1 })
            .limit(10);

        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;