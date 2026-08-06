/*
========================================
PLAYER PROGRESSION
========================================
*/
const XP_TABLE = [
  0,      // Level 1
  500,    // Level 2
  1000,   // Level 3
  1500,   // Level 4
  2000,   // Level 5
];
/*
========================================
CALCULATE LEVEL
========================================
*/

function getLevelFromXP(xp) {
  let level = 1;

  for (let i = 0; i < XP_TABLE.length; i++) {
    if (xp >= XP_TABLE[i]) {
      level = i + 1;
    }
  }

  return level;
}

/*
========================================
BUILD EXPEDITION LEVELS
========================================
*/

function buildExpeditionLevels(currentLevel) {
  return XP_TABLE.map((_, index) => ({
    number: index + 1,
    name: `Level ${index + 1}`,
    status:
      index + 1 < currentLevel
        ? "completed"
        : index + 1 === currentLevel
        ? "current"
        : "locked",
  }));
}

module.exports = {
  XP_TABLE,
  getLevelFromXP,
  buildExpeditionLevels,
};