require("dotenv").config();
require("./utils/dailyMissionReset");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dailyMissionRoutes = require("./routes/dailyMission");
/*
========================================
ROUTES
========================================
*/
const leaderboardRoutes =
  require("./routes/leaderboard");
const quizRoutes = require("./routes/quiz");

const questionRoutes = require(
  "./routes/questions"
);

// const leaderboardRoutes = require(
//   "./routes/leaderboard"
// );

const userRoutes = require("./routes/user");

const shopRoutes = require("./routes/shop");

const collectionRoutes = require(
  "./routes/collection"
);

/*
========================================
APP
========================================
*/

const app = express();

/*
========================================
MIDDLEWARE
========================================
*/
app.use(express.json());

app.use(cors());
app.use("/api/daily", dailyMissionRoutes);
app.use(
  "/api/leaderboard",
  leaderboardRoutes
);
/*
========================================
API ROUTES
========================================
*/

/*
----------------------------------------
QUIZ
----------------------------------------
*/

app.use("/api/quiz", quizRoutes);

/*
----------------------------------------
QUESTIONS
----------------------------------------
*/

app.use(
  "/api/questions",
  questionRoutes
);

/*
----------------------------------------
LEADERBOARD
----------------------------------------
*/

// app.use(
//   "/api/leaderboard",
//   leaderboardRoutes
// );

/*
----------------------------------------
USER
----------------------------------------
*/

app.use("/api/user", userRoutes);

/*
----------------------------------------
SHOP
----------------------------------------

shop.js contains:

GET   /:username/shop
POST  /:username/shop/buy
PATCH /:username/shop/equip

Final routes:

GET
/api/user/:username/shop

POST
/api/user/:username/shop/buy

PATCH
/api/user/:username/shop/equip

----------------------------------------
*/

app.use("/api/user", shopRoutes);

/*
----------------------------------------
COLLECTION
----------------------------------------

collection.js contains:

POST /:username/discover

Final route:

POST
/api/collection/:username/discover

----------------------------------------
*/

app.use(
  "/api/collection",
  collectionRoutes
);

/*
========================================
HOME ROUTE
========================================
*/

app.get("/", (req, res) => {
  res.send(
    "🦖 Jurassic Time backend is running!"
  );
});

/*
========================================
PORT
========================================
*/

const PORT = process.env.PORT || 3000;

/*
========================================
MONGODB CONNECTION
========================================
*/

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {
    console.log(
      "✅ MongoDB Connected"
    );

    console.log(
      "Ready State:",
      mongoose.connection.readyState
    );

    console.log(
      "Database:",
      mongoose.connection.name
    );

    /*
    ========================================
    START SERVER
    ========================================
    */

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT}`
      );

      console.log(
        "🦖 Jurassic Time API ready!"
      );
    });
  })

  .catch((err) => {
    console.error(
      "❌ MongoDB Connection Error"
    );

    console.error(err);

    process.exit(1);
  });