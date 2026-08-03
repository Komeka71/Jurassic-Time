const express = require("express");

const router = express.Router();

const QuizAttempt = require("../models/QuizAttempt");
const UserStats = require("../models/UserStats");


/*
========================================
QUIZ REWARD CONFIG
========================================
*/

const XP_PER_CORRECT = 15;

const COINS_PER_CORRECT = 10;


/*
========================================
CALCULATE PLAYER LEVEL
========================================

Level 1 = 0 XP
Level 2 = 100 XP
Level 3 = 200 XP
Level 4 = 300 XP

Simple for now and easy to balance later.
*/

const calculateLevel = (xp) => {
    return Math.floor(xp / 100) + 1;
};


/*
========================================
NORMALISE QUIZ SCORE
========================================

Supports both:

score: 8
totalQuestions: 10

AND:

score: 80
totalQuestions: 10

This protects the backend while the
frontend quiz system is being polished.
*/

const calculateCorrectAnswers = (
    score,
    totalQuestions,
    correctAnswers
) => {

    /*
    ========================================
    BEST SOURCE — EXPLICIT CORRECT ANSWERS
    ========================================
    */

    if (
        Number.isFinite(correctAnswers) &&
        correctAnswers >= 0
    ) {

        return Math.min(
            Math.round(correctAnswers),
            totalQuestions
        );

    }


    /*
    ========================================
    SCORE LOOKS LIKE RAW CORRECT COUNT
    ========================================
    */

    if (score <= totalQuestions) {

        return Math.max(
            0,
            Math.round(score)
        );

    }


    /*
    ========================================
    SCORE LOOKS LIKE PERCENTAGE
    ========================================
    */

    return Math.max(
        0,
        Math.min(
            totalQuestions,
            Math.round(
                (score / 100) *
                totalQuestions
            )
        )
    );

};


/*
========================================
SUBMIT QUIZ
========================================

POST /api/quiz/submit
*/

router.post("/submit", async (req, res) => {

    try {

        const {
            username,
            score,
            totalQuestions,
            timeTaken,
            correctAnswers,
        } = req.body;


        /*
        ========================================
        VALIDATION
        ========================================
        */

        if (
            !username ||
            typeof username !== "string"
        ) {

            return res.status(400).json({
                message:
                    "A valid username is required",
            });

        }


        if (
            !Number.isFinite(score) ||
            !Number.isFinite(totalQuestions) ||
            totalQuestions <= 0
        ) {

            return res.status(400).json({
                message:
                    "Valid score and totalQuestions are required",
            });

        }


        /*
        ========================================
        CALCULATE CORRECT ANSWERS
        ========================================
        */

        const finalCorrectAnswers =
            calculateCorrectAnswers(
                score,
                totalQuestions,
                correctAnswers
            );


        /*
        ========================================
        CALCULATE QUIZ REWARDS
        ========================================
        */

        const xpEarned =
            finalCorrectAnswers *
            XP_PER_CORRECT;


        const coinsEarned =
            finalCorrectAnswers *
            COINS_PER_CORRECT;


        /*
        ========================================
        SAVE QUIZ ATTEMPT
        ========================================
        */

        const attempt =
            await QuizAttempt.create({

                username,

                score,

                totalQuestions,

                timeTaken,

                correctAnswers:
                    finalCorrectAnswers,

                xpEarned,

                coinsEarned,

            });


        /*
        ========================================
        FIND PLAYER STATS
        ========================================
        */

        let stats =
            await UserStats.findOne({
                username,
            });


        /*
        ========================================
        CREATE NEW PLAYER
        ========================================
        */

        if (!stats) {

            stats =
                await UserStats.create({

                    username,

                    quizzesPlayed: 0,

                    totalScore: 0,

                    highestScore: 0,

                    xp: 0,

                    level: 1,

                    coins: 0,

                    dailyStreak: 0,

                    longestStreak: 0,

                    lastPlayedDate: null,

                    discoveredDinosaurs: [],

                    purchasedItems: [],

                    equippedItems: {},

                    soundPreferences: {
                        music: true,
                        effects: true,
                    },

                });

        }


        /*
        ========================================
        NORMALISE OLD PLAYER DOCUMENT
        ========================================
        */

        stats.quizzesPlayed =
            stats.quizzesPlayed || 0;


        stats.totalScore =
            stats.totalScore || 0;


        stats.highestScore =
            stats.highestScore || 0;


        stats.xp =
            stats.xp || 0;


        stats.level =
            stats.level || 1;


        stats.coins =
            stats.coins || 0;


        /*
        ========================================
        UPDATE QUIZ STATS
        ========================================
        */

        stats.quizzesPlayed += 1;


        stats.totalScore += score;


        if (
            score > stats.highestScore
        ) {

            stats.highestScore = score;

        }


        /*
        ========================================
        ADD REAL MONGODB REWARDS
        ========================================
        */

        stats.xp += xpEarned;


        stats.coins += coinsEarned;


        /*
        ========================================
        UPDATE LEVEL
        ========================================
        */

        stats.level =
            calculateLevel(stats.xp);


        /*
        ========================================
        SAVE PLAYER
        ========================================
        */

        await stats.save();


        /*
        ========================================
        SUCCESS RESPONSE
        ========================================
        */

        res.status(201).json({

            message:
                "Quiz submitted successfully!",

            rewards: {

                correctAnswers:
                    finalCorrectAnswers,

                xpEarned,

                coinsEarned,

            },

            attempt,

            stats,

        });

    }

    catch (err) {

        console.error(
            "SUBMIT QUIZ ERROR:",
            err
        );


        res.status(500).json({

            message:
                err.message,

        });

    }

});


module.exports = router;