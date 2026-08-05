/**
 * PATCH for server/models/UserStats.js -- add this field to the schema:
 */

expeditionLevels: {
  type: [
    {
      number: Number,
      name: String,
      status: {
        type: String,
        enum: ["completed", "current", "locked"],
        default: "locked",
      },
    },
  ],
  default: [], // populated lazily -- see getOrCreateUserStats patch below
},

/**
 * PATCH for the getOrCreateUserStats() helper in server/routes/user.js
 * (the one that creates a fresh UserStats doc for a new player) -- seed
 * expeditionLevels the same way your quiz Levels are structured elsewhere
 * (5 levels, matching the `level` field range used by dinosaurUnlockLevels
 * in collection.js). Adjust NUM_LEVELS / names to match your real level list.
 */

const NUM_LEVELS = 5;

function buildExpeditionLevels(currentLevel = 1) {
  return Array.from({ length: NUM_LEVELS }, (_, i) => {
    const number = i + 1;
    return {
      number,
      name: `Level ${number}`,
      status:
        number < currentLevel ? "completed" :
        number === currentLevel ? "current" :
        "locked",
    };
  });
}

// When creating a new UserStats doc:
//   expeditionLevels: buildExpeditionLevels(1),
//
// And whenever stats.level changes (e.g. after a quiz submit or mission
// claim bumps XP past a threshold), recompute it:
//   stats.expeditionLevels = buildExpeditionLevels(stats.level);