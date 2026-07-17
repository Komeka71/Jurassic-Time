require("dotenv").config();

const mongoose = require("mongoose");
const Question = require("./models/Question");

const level1 = require("./seed/level1");
const level2 = require("./seed/level2");
const level3 = require("./seed/level3");
const level4 = require("./seed/level4");
const level5 = require("./seed/level5");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    await Question.deleteMany({});

    await Question.insertMany([
      ...level1,
      ...level2,
      ...level3,
      ...level4,
      ...level5,
    ]);

    console.log("🎉 All Questions Seeded!");
    process.exit();
  })
  .catch((err) => console.log(err));