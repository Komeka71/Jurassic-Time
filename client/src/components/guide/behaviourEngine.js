/*
==========================================
LOOPING STATES
These can stay forever until another
event happens.
==========================================
*/

export const loopStates = [
  "idle",
  "sleep",
  "standing",
];

/*
==========================================
ONE-TIME ACTIONS
These finish once then choose
another behaviour.
==========================================
*/

export const actionStates = [
  "wave",
  "lookingAround",
  "walkingRight",
  "thinking",
  "pointingRight",
  "eating",
  "roar",
  "happy",
  "happyJumps",
  "loveHappy",
  "celebrate",
  "angry",
  "sad",
  "shushing",
  "camp",
  "wakeup",
];

/*
==========================================
Weighted idle behaviours

Higher weight = more common
==========================================
*/

const idleBehaviourPool = [
  { mood: "idle", weight: 32 },

  { mood: "lookingAround", weight: 18 },

  { mood: "standing", weight: 14 },

  { mood: "thinking", weight: 10 },

  { mood: "walkingRight", weight: 8 },

  { mood: "wave", weight: 7 },

  { mood: "eating", weight: 6 },

  { mood: "pointingRight", weight: 3 },

  { mood: "camp", weight: 1 },

  { mood: "roar", weight: 1 },
];

/*
==========================================
Weighted random picker

No repeated switch statement.
==========================================
*/

export function getRandomIdleBehaviour() {
  const total = idleBehaviourPool.reduce(
    (sum, item) => sum + item.weight,
    0
  );

  let random = Math.random() * total;

  for (const item of idleBehaviourPool) {
    random -= item.weight;

    if (random <= 0) {
      return item.mood;
    }
  }

  return "idle";
}

/*
==========================================
Random click reactions

Clicking the dinosaur should never
feel predictable.
==========================================
*/
const clickPool = [
  { mood: "happy", weight: 35 },

  { mood: "wave", weight: 18 },

  { mood: "loveHappy", weight: 12 },

  { mood: "happyJumps", weight: 10 },

  { mood: "lookingAround", weight: 8 },

  { mood: "standing", weight: 7 },

  { mood: "thinking", weight: 5 },

  { mood: "pointingRight", weight: 3 },

  { mood: "eating", weight: 2 },
];

export function getRandomClickReaction() {
  const total = clickPool.reduce(
    (sum, item) => sum + item.weight,
    0
  );

  let random = Math.random() * total;

  for (const item of clickPool) {
    random -= item.weight;

    if (random <= 0) {
      return item.mood;
    }
  }

  return "happy";
}