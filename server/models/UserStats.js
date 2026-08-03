const mongoose = require("mongoose");

/*
========================================
USER STATS SCHEMA
========================================

Stores the player's permanent game progress.

This document is shared by:

- Quiz
- Collection
- Shop
- Leaderboard
- Rewards
- Streak system

========================================
*/

const UserStatsSchema = new mongoose.Schema(
  {
    /*
    ========================================
    USER
    ========================================
    */

    username: {
      type: String,

      required: true,

      unique: true,

      trim: true,
    },

    /*
    ========================================
    QUIZ STATS
    ========================================
    */

    quizzesPlayed: {
      type: Number,

      default: 0,

      min: 0,
    },

    highestScore: {
      type: Number,

      default: 0,

      min: 0,
    },

    /*
    ========================================
    PLAYER PROGRESSION
    ========================================
    */

    xp: {
      type: Number,

      default: 0,

      min: 0,
    },

    level: {
      type: Number,

      default: 1,

      min: 1,
    },

    coins: {
      type: Number,

      default: 0,

      min: 0,
    },

    /*
    ========================================
    STREAK
    ========================================
    */

    dailyStreak: {
      type: Number,

      default: 0,

      min: 0,
    },

    longestStreak: {
      type: Number,

      default: 0,

      min: 0,
    },

    lastPlayedDate: {
      type: Date,

      default: null,
    },

    /*
    ========================================
    DINOSAUR COLLECTION
    ========================================
    */

    discoveredDinosaurs: {
      type: [String],

      default: [],
    },

    /*
    ========================================
    SHOP
    ========================================
    */

    purchasedItems: {
      type: [String],

      default: [],
    },

    equippedItems: {
      type: Map,

      of: String,

      default: {},
    },

    /*
    ========================================
    SOUND PREFERENCES
    ========================================
    */

    soundPreferences: {
      music: {
        type: Boolean,

        default: true,
      },

      effects: {
        type: Boolean,

        default: true,
      },
    },
  },
  {
    /*
    Automatically creates:

    createdAt
    updatedAt
    */

    timestamps: true,
  }
);

/*
========================================
EXPORT MODEL
========================================
*/

module.exports = mongoose.model(
  "UserStats",
  UserStatsSchema
);