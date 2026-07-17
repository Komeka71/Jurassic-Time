const express = require("express");

const router = express.Router();

const UserStats = require("../models/UserStats");


/*
========================================
SHOP ITEM CATALOGUE
========================================

IMPORTANT:

The backend owns the real prices.

Never trust item price sent by frontend.
*/

const SHOP_ITEMS = {
    "explorer-hat": {
        name: "Explorer Hat",
        category: "gear",
        price: 80,
        levelRequired: 1
    },

    "fossil-brush": {
        name: "Fossil Brush",
        category: "gear",
        price: 100,
        levelRequired: 1
    },

    "dino-backpack": {
        name: "Dino Backpack",
        category: "gear",
        price: 180,
        levelRequired: 1
    },

    "leaf-hat": {
        name: "Leaf Hat",
        category: "dino",
        price: 120,
        levelRequired: 1
    },

    "winter-scarf": {
        name: "Woolly Scarf",
        category: "dino",
        price: 160,
        levelRequired: 4
    },

    "volcano-cape": {
        name: "Volcano Cape",
        category: "dino",
        price: 240,
        levelRequired: 3
    },

    "meteor-glasses": {
        name: "Meteor Goggles",
        category: "dino",
        price: 300,
        levelRequired: 5
    },

    "amber-fragment": {
        name: "Amber Fragment",
        category: "relic",
        price: 200,
        levelRequired: 2
    },

    "ancient-egg": {
        name: "Ancient Egg",
        category: "relic",
        price: 350,
        levelRequired: 2
    },

    "ice-crystal": {
        name: "Ice Crystal",
        category: "relic",
        price: 220,
        levelRequired: 4
    },

    "meteor-shard": {
        name: "Meteor Shard",
        category: "relic",
        price: 400,
        levelRequired: 5
    },

    "golden-fossil": {
        name: "Golden Fossil",
        category: "relic",
        price: 500,
        levelRequired: 5
    }
};


/*
========================================
HELPER — GET OR CREATE PLAYER
========================================
*/

const getOrCreateUserStats = async (username) => {

    let stats = await UserStats.findOne({
        username
    });


    /*
    ========================================
    CREATE PLAYER
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

    }


    /*
    ========================================
    NORMALISE SHOP FIELDS
    ========================================
    */

    let changed = false;


    if (stats.coins === undefined) {

        stats.coins = 0;

        changed = true;

    }


    if (stats.level === undefined) {

        stats.level = 1;

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


    if (changed) {

        await stats.save();

    }


    return stats;

};


/*
========================================
GET SHOP STATE
========================================

GET /api/user/:username/shop

Returns:

coins
level
purchasedItems
equippedItems
*/

router.get(
    "/:username/shop",

    async (req, res) => {

        try {

            const username =
                req.params.username;


            const stats =
                await getOrCreateUserStats(username);


            res.json({

                coins:
                    stats.coins,

                level:
                    stats.level,

                purchasedItems:
                    stats.purchasedItems,

                equippedItems:
                    stats.equippedItems

            });

        }

        catch (err) {

            console.error(
                "GET SHOP ERROR:",
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
            FIND ITEM IN SERVER CATALOGUE
            ========================================
            */

            const item =
                SHOP_ITEMS[itemId];


            if (!item) {

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
                await getOrCreateUserStats(username);


            /*
            ========================================
            ALREADY PURCHASED
            ========================================
            */

            if (
                stats.purchasedItems.includes(itemId)
            ) {

                return res.status(409).json({

                    message:
                        "Item already purchased",

                    coins:
                        stats.coins,

                    purchasedItems:
                        stats.purchasedItems,

                    equippedItems:
                        stats.equippedItems

                });

            }


            /*
            ========================================
            CHECK PLAYER LEVEL
            ========================================
            */

            if (
                stats.level < item.levelRequired
            ) {

                return res.status(403).json({

                    message:
                        `Level ${item.levelRequired} required`,

                    level:
                        stats.level,

                    levelRequired:
                        item.levelRequired

                });

            }


            /*
            ========================================
            CHECK FOSSIL COINS
            ========================================
            */

            if (
                stats.coins < item.price
            ) {

                return res.status(400).json({

                    message:
                        "Not enough fossil coins",

                    coins:
                        stats.coins,

                    price:
                        item.price,

                    coinsNeeded:
                        item.price - stats.coins

                });

            }


            /*
            ========================================
            COMPLETE PURCHASE
            ========================================
            */

            stats.coins -=
                item.price;


            stats.purchasedItems.push(
                itemId
            );


            await stats.save();


            /*
            ========================================
            PURCHASE RESPONSE
            ========================================
            */

            res.status(201).json({

                message:
                    `${item.name} purchased successfully`,

                purchased: true,

                itemId,

                item,

                coins:
                    stats.coins,

                purchasedItems:
                    stats.purchasedItems,

                equippedItems:
                    stats.equippedItems

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
            VALIDATE ITEM
            ========================================
            */

            const item =
                SHOP_ITEMS[itemId];


            if (!item) {

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
                await getOrCreateUserStats(username);


            /*
            ========================================
            CHECK OWNERSHIP
            ========================================
            */

            if (
                !stats.purchasedItems.includes(itemId)
            ) {

                return res.status(403).json({
                    message:
                        "Purchase this item before equipping it"
                });

            }


            /*
            ========================================
            EQUIP BY CATEGORY
            ========================================

            gear → one equipped gear
            dino → one equipped dino cosmetic
            relic → one equipped relic
            */

            stats.equippedItems.set(
                item.category,
                itemId
            );


            /*
            ========================================
            MARK MAP AS MODIFIED
            ========================================
            */

            stats.markModified(
                "equippedItems"
            );


            await stats.save();


            /*
            ========================================
            EQUIP RESPONSE
            ========================================
            */

            res.json({

                message:
                    `${item.name} equipped successfully`,

                equipped: true,

                itemId,

                category:
                    item.category,

                equippedItems:
                    stats.equippedItems

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


module.exports = router;