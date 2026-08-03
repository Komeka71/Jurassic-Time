/*
========================================
LEVEL SYSTEM
========================================

Every 500 XP = 1 level.

Level 1 : 0 XP
Level 2 : 500 XP
Level 3 : 1000 XP
...
*/

function calculateLevel(totalXP) {
    return Math.floor(totalXP / 500) + 1;
}

function xpForCurrentLevel(level) {
    return (level - 1) * 500;
}

function xpForNextLevel(level) {
    return level * 500;
}

function progressToNextLevel(totalXP) {

    const level = calculateLevel(totalXP);

    const current = xpForCurrentLevel(level);

    const next = xpForNextLevel(level);

    return {
        level,

        currentXP: totalXP,

        currentLevelXP: current,

        nextLevelXP: next,

        xpRemaining: next - totalXP,

        progress:
            ((totalXP - current) /
                (next - current)) * 100,
    };
}

module.exports = {
    calculateLevel,
    progressToNextLevel,
};