const express = require("express");
const router = express.Router();

const UserStats = require("../models/UserStats");
const QuizAttempt = require("../models/QuizAttempt");

// GET /api/user/:username
router.get("/:username", async (req, res) => {
    try {
        const username = req.params.username;

        const stats = await UserStats.findOne({ username });

        if (!stats) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const history = await QuizAttempt
            .find({ username })
            .sort({ createdAt: -1 });

        res.json({
            stats,
            history
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;