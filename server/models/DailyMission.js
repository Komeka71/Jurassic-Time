const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  missions: [
    {
      title: String,
      description: String,

      goal: Number,
      progress: {
        type: Number,
        default: 0,
      },

      rewardXP: Number,
      rewardCoins: Number,

      completed: {
        type: Boolean,
        default: false,
      },

      claimed: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model(
  "DailyMission",
  missionSchema
);