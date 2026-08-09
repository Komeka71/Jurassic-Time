const express = require("express");
const router = express.Router();

const UserStats = require("../models/UserStats");

/*
==================================================
GET LEADERBOARD
==================================================

Returns all players sorted by XP (highest first).

Only the fields needed for the leaderboard
are returned.
*/

router.get("/", async (req, res) => {
  try {
    const players = await UserStats.find(
      {},
      {
        _id: 0,
        username: 1,
        xp: 1,
        level: 1,
        coins: 1,
        highestScore: 1,
      }
    ).sort({
      xp: -1,
      highestScore: -1,
    });

    res.status(200).json(players);
  } catch (error) {
    console.error("Leaderboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load leaderboard.",
    });
  }
});

module.exports = router;