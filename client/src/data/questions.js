const express = require("express");
const router = express.Router();

const Question = require("../models/Question");

router.get("/", async (req, res) => {
  try {
    const {
      level,
      difficulty,
      topic,
      limit,
    } = req.query;

    const filter = {};

    // Level
    if (level) {
      filter.level = Number(level);
    }

    // Difficulty
    if (difficulty && difficulty !== "Mixed") {
      filter.difficulty = difficulty.toLowerCase();
    }

    // Topic
    if (topic && topic !== "Mixed") {
      filter.topic = topic.toLowerCase();
    }

    let query = Question.find(filter);

    if (limit) {
      query = query.limit(Number(limit));
    }

    const questions = await query;

    res.json(questions);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;