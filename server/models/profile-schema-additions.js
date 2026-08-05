/**
 * This is NOT a full User model — it's the set of fields the Profile page
 * needs. Merge these into your EXISTING User.model.js schema (do not
 * replace your current file with this).
 *
 * Fields you probably already have: username, email, password, createdAt.
 */

const profileFieldsToAddToUserSchema = {
  avatarUrl: { type: String, default: "" },
  bio: { type: String, default: "" },
  favouriteDinosaur: { type: String, default: "" },
  favouriteEra: { type: String, default: "" },
  country: { type: String, default: "" },
  socialLinks: { type: String, default: "" },

  explorerRank: { type: String, default: "Rookie Explorer" },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  xpToNext: { type: Number, default: 1000 },
  coins: { type: Number, default: 0 },
  dailyStreak: { type: Number, default: 0 },
  bestStreak: { type: Number, default: 0 },
  currentBadge: { type: String, default: "New Recruit" },
  isVerified: { type: Boolean, default: false },
  leaderboardRank: { type: Number, default: 0 },
  hoursPlayed: { type: Number, default: 0 },
  lastLogin: { type: Date },

  expeditionLevels: [
    {
      name: String,
      status: { type: String, enum: ["completed", "current", "locked"], default: "locked" },
    },
  ],

  unlockedAchievements: [{ type: "ObjectId", ref: "Achievement" }],
  unlockedDinosaurs: [{ type: "ObjectId", ref: "Dinosaur" }],

  settings: {
    darkMode: { type: Boolean, default: true },
    music: { type: Boolean, default: true },
    soundEffects: { type: Boolean, default: true },
    notifications: { type: Boolean, default: true },
    language: { type: String, default: "English" },
    privacy: { type: String, default: "Public" },
  },
};

module.exports = { profileFieldsToAddToUserSchema };

/**
 * Related standalone collections you'll likely already have some version of.
 * Field names here match what profile.controller.js reads — rename on either
 * side to match your real schema, just keep them in sync.
 *
 * QuizAttempt:  { user, difficulty, topic, accuracy, xpEarned, coinsEarned, timeTaken, createdAt }
 * Achievement:  { name, description }
 * Discovery:    { user, species, era, location, archiveId, verified, date, photoUrl }
 * Dinosaur:     { name, era, rarity, imageUrl }
 * DailyMission: { user, date, title, progress, target, claimed, rewardCoins, rewardXp }
 * Purchase:     { user, itemName, itemType, imageUrl, purchasedDate, quantity }
 */
