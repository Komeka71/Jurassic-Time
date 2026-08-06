const express = require("express");

const router = express.Router();

const UserStats = require("../models/UserStats");
const QuizAttempt = require("../models/QuizAttempt");


/*
========================================
SERVER SHOP CATALOGUE
========================================

The backend owns prices and categories.

NEVER trust item price sent by frontend.
*/

const SHOP_ITEMS = {
    "explorer-hat": {
        price: 80,
        category: "gear"
    },

    "fossil-brush": {
        price: 100,
        category: "gear"
    },

    "dino-backpack": {
        price: 180,
        category: "gear"
    },

    "leaf-hat": {
        price: 120,
        category: "dino"
    },

    "winter-scarf": {
        price: 160,
        category: "dino"
    },

    "volcano-cape": {
        price: 240,
        category: "dino"
    },

    "meteor-glasses": {
        price: 300,
        category: "dino"
    },

    "amber-fragment": {
        price: 200,
        category: "relic"
    },

    "ancient-egg": {
        price: 350,
        category: "relic"
    },

    "ice-crystal": {
        price: 220,
        category: "relic"
    },

    "meteor-shard": {
        price: 400,
        category: "relic"
    },

    "golden-fossil": {
        price: 500,
        category: "relic"
    }
};


/*
========================================
HELPER — CREATE / NORMALISE USER STATS
========================================
*/

const getOrCreateUserStats = async (username) => {

    let stats = await UserStats.findOne({
        username
    });


    /*
    ========================================
    CREATE NEW PLAYER
    ========================================
    */

    if (!stats) {

        stats = await UserStats.create({
            username,

            quizzesPlayed: 0,
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
                effects: true
            }
        });


        return stats;
    }


    /*
    ========================================
    NORMALISE OLD PLAYER DOCUMENTS
    ========================================
    */

    let changed = false;


    if (stats.xp === undefined) {

        stats.xp = 0;

        changed = true;

    }


    if (stats.level === undefined) {

        stats.level = 1;

        changed = true;

    }


    if (stats.coins === undefined) {

        stats.coins = 0;

        changed = true;

    }


    if (stats.dailyStreak === undefined) {

        stats.dailyStreak = 0;

        changed = true;

    }


    if (stats.longestStreak === undefined) {

        stats.longestStreak = 0;

        changed = true;

    }


    if (stats.lastPlayedDate === undefined) {

        stats.lastPlayedDate = null;

        changed = true;

    }


    if (!Array.isArray(stats.discoveredDinosaurs)) {

        stats.discoveredDinosaurs = [];

        changed = true;

    }


    if (!Array.isArray(stats.purchasedItems)) {

        stats.purchasedItems = [];

        changed = true;

    }


    if (!stats.equippedItems) {

        stats.equippedItems = new Map();

        changed = true;

    }


    if (!stats.soundPreferences) {

        stats.soundPreferences = {
            music: true,
            effects: true
        };

        changed = true;

    }


    if (
        stats.soundPreferences.music === undefined
    ) {

        stats.soundPreferences.music = true;

        changed = true;

    }


    if (
        stats.soundPreferences.effects === undefined
    ) {

        stats.soundPreferences.effects = true;

        changed = true;

    }


    /*
    ========================================
    SAVE MIGRATED PLAYER
    ========================================
    */

    if (changed) {

        await stats.save();

    }


    return stats;
};


/*
========================================
GET USER STATS + QUIZ HISTORY
========================================

GET /api/user/:username
*/

router.get(
    "/:username",

    async (req, res) => {

        try {

            const username =
                req.params.username;


            const stats =
                await getOrCreateUserStats(
                    username
                );


            const history = await QuizAttempt
                .find({
                    username
                })
                .sort({
                    createdAt: -1
                });


            res.json({
                stats,
                history
            });

        }

        catch (err) {

            console.error(
                "GET USER ERROR:",
                err
            );


            res.status(500).json({
                message: err.message
            });

        }

    }
);


/*
========================================
BUY SHOP ITEM
========================================

POST /api/user/:username/shop/buy

Body:

{
    "itemId": "explorer-hat"
}
*/

router.post(
    "/:username/shop/buy",

    async (req, res) => {

        try {

            const username =
                req.params.username;


            const {
                itemId
            } = req.body;


            /*
            ========================================
            VALIDATE ITEM ID
            ========================================
            */

            if (
                !itemId ||
                typeof itemId !== "string"
            ) {

                return res.status(400).json({
                    message:
                        "A valid itemId is required"
                });

            }


            /*
            ========================================
            FIND SERVER ITEM
            ========================================
            */

            const shopItem =
                SHOP_ITEMS[itemId];


            if (!shopItem) {

                return res.status(404).json({
                    message:
                        "Shop item not found"
                });

            }


            /*
            ========================================
            GET PLAYER
            ========================================
            */

            const stats =
                await getOrCreateUserStats(
                    username
                );


            /*
            ========================================
            ALREADY PURCHASED
            ========================================
            */

            if (
                stats.purchasedItems.includes(
                    itemId
                )
            ) {

                return res.status(409).json({
                    message:
                        "Item already purchased",

                    stats
                });

            }


            /*
            ========================================
            COIN CHECK
            ========================================
            */

            if (
                stats.coins < shopItem.price
            ) {

                return res.status(400).json({

                    message:
                        "Not enough fossil coins",

                    required:
                        shopItem.price,

                    coins:
                        stats.coins,

                    missing:
                        shopItem.price -
                        stats.coins

                });

            }


            /*
            ========================================
            COMPLETE PURCHASE
            ========================================
            */

            stats.coins -= shopItem.price;


            stats.purchasedItems.push(
                itemId
            );


            await stats.save();


            /*
            ========================================
            RESPONSE
            ========================================
            */

            res.status(201).json({

                message:
                    "Item purchased successfully",

                purchased: true,

                itemId,

                price:
                    shopItem.price,

                stats

            });

        }

        catch (err) {

            console.error(
                "BUY SHOP ITEM ERROR:",
                err
            );


            res.status(500).json({
                message: err.message
            });

        }

    }
);


/*
========================================
EQUIP SHOP ITEM
========================================

PATCH /api/user/:username/shop/equip

Body:

{
    "itemId": "explorer-hat"
}
*/

router.patch(
    "/:username/shop/equip",

    async (req, res) => {

        try {

            const username =
                req.params.username;


            const {
                itemId
            } = req.body;


            /*
            ========================================
            VALIDATE ITEM ID
            ========================================
            */

            if (
                !itemId ||
                typeof itemId !== "string"
            ) {

                return res.status(400).json({
                    message:
                        "A valid itemId is required"
                });

            }


            /*
            ========================================
            FIND SERVER ITEM
            ========================================
            */

            const shopItem =
                SHOP_ITEMS[itemId];


            if (!shopItem) {

                return res.status(404).json({
                    message:
                        "Shop item not found"
                });

            }


            /*
            ========================================
            GET PLAYER
            ========================================
            */

            const stats =
                await getOrCreateUserStats(
                    username
                );


            /*
            ========================================
            OWNERSHIP CHECK
            ========================================
            */

            if (
                !stats.purchasedItems.includes(
                    itemId
                )
            ) {

                return res.status(403).json({
                    message:
                        "Purchase item before equipping it"
                });

            }


            /*
            ========================================
            EQUIP ITEM
            ========================================
            */

            stats.equippedItems.set(
                shopItem.category,
                itemId
            );


            await stats.save();


            /*
            ========================================
            RESPONSE
            ========================================
            */

            res.json({

                message:
                    "Item equipped successfully",

                equipped: true,

                itemId,

                category:
                    shopItem.category,

                stats

            });

        }

        catch (err) {

            console.error(
                "EQUIP SHOP ITEM ERROR:",
                err
            );


            res.status(500).json({
                message: err.message
            });

        }

    }
);


/*
========================================
DISCOVER DINOSAUR
========================================

POST /api/user/:username/discover

Body:

{
    "dinosaurId": "triceratops"
}
*/

router.post(
    "/:username/discover",

    async (req, res) => {

        try {

            const username =
                req.params.username;


            const {
                dinosaurId
            } = req.body;


            /*
            ========================================
            VALIDATE DINOSAUR ID
            ========================================
            */

            if (
                !dinosaurId ||
                typeof dinosaurId !== "string"
            ) {

                return res.status(400).json({
                    message:
                        "A valid dinosaurId is required"
                });

            }


            /*
            ========================================
            GET PLAYER
            ========================================
            */

            const stats =
                await getOrCreateUserStats(
                    username
                );


            /*
            ========================================
            CHECK EXISTING DISCOVERY
            ========================================
            */

            const alreadyDiscovered =
                stats.discoveredDinosaurs.includes(
                    dinosaurId
                );


            if (alreadyDiscovered) {

                return res.json({

                    message:
                        "Dinosaur already discovered",

                    discovered: false,

                    stats

                });

            }


            /*
            ========================================
            ADD DINOSAUR
            ========================================
            */

            stats.discoveredDinosaurs.push(
                dinosaurId
            );


            await stats.save();


            res.status(201).json({

                message:
                    "Dinosaur discovered successfully",

                discovered: true,

                dinosaurId,

                stats

            });

        }

        catch (err) {

            console.error(
                "DISCOVER DINOSAUR ERROR:",
                err
            );


            res.status(500).json({
                message: err.message
            });

        }

    }
);


/*
========================================
UPDATE SOUND PREFERENCES
========================================

PATCH /api/user/:username/sound
*/

router.patch(
    "/:username/sound",

    async (req, res) => {

        try {

            const username =
                req.params.username;


            const {
                music,
                effects
            } = req.body;


            const stats =
                await getOrCreateUserStats(
                    username
                );


            /*
            ========================================
            UPDATE MUSIC
            ========================================
            */

            if (
                typeof music === "boolean"
            ) {

                stats.soundPreferences.music =
                    music;

            }


            /*
            ========================================
            UPDATE EFFECTS
            ========================================
            */

            if (
                typeof effects === "boolean"
            ) {

                stats.soundPreferences.effects =
                    effects;

            }


            await stats.save();


            res.json({

                message:
                    "Sound preferences updated",

                soundPreferences:
                    stats.soundPreferences

            });

        }

        catch (err) {

            console.error(
                "UPDATE SOUND ERROR:",
                err
            );


            res.status(500).json({
                message: err.message
            });

        }

    }
);


module.exports = router;