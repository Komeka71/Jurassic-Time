const express = require("express");
const router = express.Router();

const Question = require("../models/Question");

router.get("/", async (req, res) => {
  try {
    const {
      level,
      difficulty,
      topic,
      limit = 10,
    } = req.query;

    const filter = {};

    if (level) {
      filter.level = Number(level);
    }

    if (
      difficulty &&
      difficulty !== "all"
    ) {
      filter.difficulty = difficulty;
    }

   if (topic && topic !== "all" && topic !== "mixed") {
  filter.topic = topic;
}

    const questions = await Question.aggregate([
      {
        $match: filter,
      },
      {
        $sample: {
          size: Number(limit),
        },
      },
    ]);

    res.json(questions);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load questions",
    });
  }
});

module.exports = router;