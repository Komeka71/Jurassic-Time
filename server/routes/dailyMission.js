


// new
const express = require("express");
const router = express.Router();

const UserStats = require("../models/UserStats");
const DailyMission = require("../models/DailyMission");

const {
    calculateLevel,
} = require("../utils/levelSystem");

/*
========================================
GET TODAY'S MISSIONS
GET /api/daily/:username
========================================
*/

router.get("/:username", async (req, res) => {
    try {
        const { username } = req.params;

        const today = new Date().toISOString().split("T")[0];

        let daily = await DailyMission.findOne({
            username,
            date: today,
        });

        if (!daily) {
            daily = await DailyMission.create({
                username,
                date: today,
                missions: [
                    {
                        title: "Complete 1 Expedition",
                        description: "Finish any expedition.",
                        goal: 1,
                        rewardXP: 50,
                        rewardCoins: 20,
                    },
                    {
                        title: "Answer 10 Questions",
                        description: "Answer 10 questions.",
                        goal: 10,
                        rewardXP: 100,
                        rewardCoins: 40,
                    },
                    {
                        title: "Earn 100 XP",
                        description: "Collect 100 XP.",
                        goal: 100,
                        rewardXP: 150,
                        rewardCoins: 60,
                    },
                ],
            });
        }

        let user = await UserStats.findOne({
            username,
        });

        if (!user) {
            user = await UserStats.create({
                username,
            });
        }

        res.json({
    missions: daily.missions,

    streak: {
        current: user.dailyStreak,
        longest: user.longestStreak,
    },

    player: {
        xp: user.xp,
        coins: user.coins,
        level: user.level,
    },
});
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Failed to load daily missions",
        });
    }
});

/*
========================================
UPDATE PROGRESS
PATCH /api/daily/:username/progress
========================================
*/

router.patch("/:username/progress", async (req, res) => {
    try {
        const { username } = req.params;

        const {
            expeditions = 0,
            questions = 0,
            xp = 0,
        } = req.body;

        const today = new Date().toISOString().split("T")[0];

        const daily = await DailyMission.findOne({
            username,
            date: today,
        });

        if (!daily) {
            return res.status(404).json({
                message: "Daily missions not found",
            });
        }

        daily.missions.forEach((mission) => {
            if (mission.title === "Complete 1 Expedition") {
                mission.progress += expeditions;
            }

            if (mission.title === "Answer 10 Questions") {
                mission.progress += questions;
            }

            if (mission.title === "Earn 100 XP") {
                mission.progress += xp;
            }

            if (mission.progress >= mission.goal) {
                mission.completed = true;
            }
        });

        await daily.save();

        // res.json(daily);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Failed to update progress",
        });
    }
});

/*
========================================
CLAIM REWARD
PATCH /api/daily/:username/claim
========================================
*/

router.patch("/:username/claim", async (req, res) => {
    try {
        const { username } = req.params;
        const { title } = req.body;

        const today = new Date().toISOString().split("T")[0];

        const daily = await DailyMission.findOne({
            username,
            date: today,
        });

        if (!daily) {
            return res.status(404).json({
                message: "Daily mission not found",
            });
        }

        const mission = daily.missions.find(
            (m) => m.title === title
        );

        if (!mission) {
            return res.status(404).json({
                message: "Mission not found",
            });
        }

        if (!mission.completed) {
            return res.status(400).json({
                message: "Mission not completed",
            });
        }

        if (mission.claimed) {
            return res.status(400).json({
                message: "Already claimed",
            });
        }

        mission.claimed = true;

        let user = await UserStats.findOne({
            username,
        });

        if (!user) {
            user = await UserStats.create({
                username,
            });
        }

        // Continue in Part 2...

        /*
        ========================================
        GIVE PLAYER REWARDS
        ========================================
        */

        user.xp += mission.rewardXP;
        user.coins += mission.rewardCoins;

        user.level = calculateLevel(user.xp);

        /*
        ========================================
        CHECK IF ALL MISSIONS ARE CLAIMED
        ========================================
        */

        const allClaimed = daily.missions.every(
            (m) => m.claimed
        );

        if (allClaimed) {
            const todayDate = new Date();

            const todayOnly = new Date(
                todayDate.getFullYear(),
                todayDate.getMonth(),
                todayDate.getDate()
            );

            if (!user.lastPlayedDate) {
                /*
                First streak
                */

                user.dailyStreak = 1;
            } else {
                const last = new Date(
                    user.lastPlayedDate
                );

                const lastOnly = new Date(
                    last.getFullYear(),
                    last.getMonth(),
                    last.getDate()
                );

                const diff = Math.floor(
                    (todayOnly - lastOnly) /
                        (1000 * 60 * 60 * 24)
                );

                /*
                Already completed today
                */

                if (diff === 0) {
                    // Do nothing
                }

                /*
                Yesterday
                */

                else if (diff === 1) {
                    user.dailyStreak++;
                }

                /*
                Missed one or more days
                */

                else {
                    user.dailyStreak = 1;
                }
            }

            user.lastPlayedDate = todayDate;

            user.longestStreak = Math.max(
                user.longestStreak,
                user.dailyStreak
            );
        }

        /*
        ========================================
        SAVE CHANGES
        ========================================
        */

        await user.save();
        await daily.save();

        /*
        ========================================
        RESPONSE
        ========================================
        */

        res.json({
            success: true,

            rewardXP: mission.rewardXP,

            rewardCoins: mission.rewardCoins,

            totalXP: user.xp,

            totalCoins: user.coins,

            level: user.level,

            streak: user.dailyStreak,

            mission: mission.title,
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Claim failed",
        });
    }
});

module.exports = router;