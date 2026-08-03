const PLAYER_KEY = "jurassic_player_progress";

const defaultPlayer = {
  coins: 0,
  xp: 0,
  level: 1,

  dailyStreak: 0,
  questionStreak: 0,
  bestQuestionStreak: 0,

  lastPlayedDate: null,

  purchasedItems: [],

 equippedItems: {
  gear: null,
  dino: null,
  relic: null,
},
};

/*
========================================
GET PLAYER
========================================
*/

export function getPlayerProgress() {
  try {
    const savedPlayer = localStorage.getItem(PLAYER_KEY);

    if (!savedPlayer) {
      return {
        ...defaultPlayer,
      };
    }

    return {
      ...defaultPlayer,
      ...JSON.parse(savedPlayer),
    };
  } catch (error) {
    console.error(
      "Failed to load player progress:",
      error
    );

    return {
      ...defaultPlayer,
    };
  }
}

/*
========================================
SAVE PLAYER
========================================
*/

export function savePlayerProgress(player) {
  try {
    localStorage.setItem(
      PLAYER_KEY,
      JSON.stringify(player)
    );
  } catch (error) {
    console.error(
      "Failed to save player progress:",
      error
    );
  }
}

/*
========================================
DAILY STREAK
========================================
*/

export function updateDailyStreak(player) {
  const today = new Date();

  const todayString = getLocalDateString(today);

  /*
  ========================================
  ALREADY PLAYED TODAY
  ========================================
  */

  if (player.lastPlayedDate === todayString) {
    return player;
  }

  /*
  ========================================
  FIRST EVER PLAY
  ========================================
  */

  if (!player.lastPlayedDate) {
    return {
      ...player,

      dailyStreak: 1,

      lastPlayedDate: todayString,
    };
  }

  /*
  ========================================
  GET YESTERDAY
  ========================================
  */

  const yesterday = new Date();

  yesterday.setDate(
    yesterday.getDate() - 1
  );

  const yesterdayString =
    getLocalDateString(yesterday);

  /*
  ========================================
  PLAYED YESTERDAY
  ========================================
  */

  if (
    player.lastPlayedDate === yesterdayString
  ) {
    return {
      ...player,

      dailyStreak:
        player.dailyStreak + 1,

      lastPlayedDate: todayString,
    };
  }

  /*
  ========================================
  STREAK BROKEN
  ========================================
  */

  return {
    ...player,

    dailyStreak: 1,

    lastPlayedDate: todayString,
  };
}

/*
========================================
LOCAL DATE
========================================
*/

function getLocalDateString(date) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/*
========================================
PLAYER RANK
========================================
*/

export function getPlayerRank(xp) {
  if (xp >= 5000) {
    return "Legend";
  }

  if (xp >= 2500) {
    return "Diamond";
  }

  if (xp >= 1000) {
    return "Gold";
  }

  if (xp >= 500) {
    return "Silver";
  }

  return "Bronze";
}

/*
========================================
RESET PLAYER
DEVELOPMENT ONLY
========================================
*/

/*
========================================
COMPLETE LEVEL
========================================
*/

export function completeLevel(player, completedLevel) {
  const nextLevel = Math.min(
    completedLevel + 1,
    5
  );

  return {
    ...player,

    level: Math.max(
      player.level || 1,
      nextLevel
    ),
  };
}

/*
========================================
GET UNLOCKED LEVEL
========================================
*/

export function getUnlockedLevel() {
  const player = getPlayerProgress();

  return player.level || 1;
}
export function resetPlayerProgress() {
  localStorage.removeItem(PLAYER_KEY);
}