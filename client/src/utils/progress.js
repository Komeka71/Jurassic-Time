export function getUnlockedLevel() {
  return Number(localStorage.getItem("unlockedLevel")) || 1;
}

// export function unlockNextLevel(level) {
//   localStorage.setItem("unlockedLevel", level + 1);
// }

// export function getUnlockedLevel() {
//   return Number(localStorage.getItem("unlockedLevel")) || 1;
// }

export function unlockNextLevel(currentLevel) {
  const unlocked = getUnlockedLevel();

  if (currentLevel >= unlocked) {
    localStorage.setItem(
      "unlockedLevel",
      currentLevel + 1
    );
  }
}