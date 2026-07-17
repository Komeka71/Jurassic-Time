const express = require("express");

const router = express.Router();

const UserStats = require("../models/UserStats");


/*
========================================
DINOSAUR UNLOCK LEVELS

Backend owns the unlock rules.

The frontend may request a discovery,
but the backend decides whether the
player is actually allowed to unlock it.
========================================
*/

const dinosaurUnlockLevels = {
  velociraptor: 1,
  triceratops: 1,
  stegosaurus: 2,
  brachiosaurus: 3,
  spinosaurus: 4,
  tyrannosaurus: 5,
};


/*
========================================
DISCOVER DINOSAUR

POST /api/collection/:username/discover

Body:

{
  "dinosaurId": "stegosaurus"
}
========================================
*/

router.post(
  "/:username/discover",

  async (req, res) => {

    try {

      const { username } = req.params;

      const { dinosaurId } = req.body;


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
            "A valid dinosaurId is required",
        });

      }


      /*
      ========================================
      CHECK DINOSAUR EXISTS
      ========================================
      */

      const requiredLevel =
        dinosaurUnlockLevels[dinosaurId];


      if (!requiredLevel) {

        return res.status(400).json({
          message:
            "Unknown dinosaur",
        });

      }


      /*
      ========================================
      FIND PLAYER
      ========================================
      */

      const stats = await UserStats.findOne({
        username,
      });


      if (!stats) {

        return res.status(404).json({
          message:
            "User stats not found",
        });

      }


      /*
      ========================================
      CHECK PLAYER LEVEL
      ========================================
      */

      const playerLevel =
        stats.level || 1;


      if (playerLevel < requiredLevel) {

        return res.status(403).json({

          message:
            `Level ${requiredLevel} required`,

          dinosaurId,

          playerLevel,

          requiredLevel,

        });

      }


      /*
      ========================================
      CHECK WHETHER ALREADY DISCOVERED

      This is only used for the response.

      MongoDB $addToSet below provides the
      actual duplicate protection.
      ========================================
      */

      const alreadyDiscovered =
        (
          stats.discoveredDinosaurs || []
        ).includes(dinosaurId);


      /*
      ========================================
      ATOMIC DISCOVERY

      $addToSet behaves like a Set.

      If dinosaurId already exists,
      MongoDB does NOT insert it again.

      This prevents duplicate discoveries
      even if two requests arrive together.
      ========================================
      */

      const updatedStats =
        await UserStats.findOneAndUpdate(

          {
            username,
          },

          {
            $addToSet: {
              discoveredDinosaurs:
                dinosaurId,
            },
          },

          {
            new: true,
          }

        );


      /*
      ========================================
      RESPONSE
      ========================================
      */

      res.status(
        alreadyDiscovered ? 200 : 201
      ).json({

        message: alreadyDiscovered
          ? "Dinosaur already discovered"
          : "Dinosaur discovered successfully!",

        alreadyDiscovered,

        dinosaurId,

        requiredLevel,

        stats: updatedStats,

      });

    }

    catch (error) {

      console.error(
        "DISCOVER DINOSAUR ERROR:",
        error
      );


      res.status(500).json({

        message:
          error.message ||
          "Could not discover dinosaur",

      });

    }

  }
);


module.exports = router;