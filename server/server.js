// require("dotenv").config();
// require("./utils/dailyMissionReset");
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const adminRoutes = require("./routes/admin.routes");
// const authRoutes = require("./routes/authRoutes");
// const authUserRoutes = require("./routes/userRoutes");

// const {
//   notFound,
//   errorHandler,
// } = require("./middleware/errorMiddleware");
// const dailyMissionRoutes = require("./routes/dailyMission");
// /*
// ========================================
// ROUTES
// ========================================
// */
// const leaderboardRoutes =
//   require("./routes/leaderboard");
// const quizRoutes = require("./routes/quiz");

// const questionRoutes = require(
//   "./routes/questions"
// );
// const discoveryRoutes = require("./routes/discoveries");
// // const leaderboardRoutes = require(
// //   "./routes/leaderboard"
// // );

// const userRoutes = require("./routes/user");

// const shopRoutes = require("./routes/shop");

// const collectionRoutes = require(
//   "./routes/collection"
// );
// const chatRoutes = require("./routes/chat");
// const path = require("path");
// /*
// ========================================
// APP
// ========================================
// */

// const app = express();
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });
// /*
// ========================================
// MIDDLEWARE
// ========================================
// */
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   "/uploads",
//   express.static(path.join(__dirname, "uploads"))
// );
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use("/api/daily", dailyMissionRoutes);
// app.use(
//   "/api/leaderboard",
//   leaderboardRoutes
// );
// /*
// ========================================
// API ROUTES
// ========================================
// */

// /*
// ----------------------------------------
// QUIZ
// ----------------------------------------
// */

// app.use("/api/quiz", quizRoutes);

// /*
// ----------------------------------------
// QUESTIONS
// ----------------------------------------
// */

// app.use(
//   "/api/questions",
//   questionRoutes
// );

// /*
// ----------------------------------------
// LEADERBOARD
// ----------------------------------------
// */

// // app.use(
// //   "/api/leaderboard",
// //   leaderboardRoutes
// // );
// app.use("/api/chat", (req, res, next) => {
//   console.log("🔥 /api/chat reached");
//   next();
// });

// app.use("/api/chat", chatRoutes);
// /*
// ========================================
// AUTH
// ========================================
// */

// app.use("/api/auth", authRoutes);
// app.use("/api/users", authUserRoutes);
// /*
// ----------------------------------------
// USER
// ----------------------------------------
// */

// app.use("/api/user", userRoutes);
// app.use("/api/admin", adminRoutes);
// /*
// ----------------------------------------
// SHOP
// ----------------------------------------

// shop.js contains:

// GET   /:username/shop
// POST  /:username/shop/buy
// PATCH /:username/shop/equip

// Final routes:

// GET
// /api/user/:username/shop

// POST
// /api/user/:username/shop/buy

// PATCH
// /api/user/:username/shop/equip

// ----------------------------------------
// */

// app.use("/api/user", shopRoutes);

// /*
// ----------------------------------------
// COLLECTION
// ----------------------------------------

// collection.js contains:

// POST /:username/discover

// Final route:

// POST
// /api/collection/:username/discover

// ----------------------------------------
// */

// app.use(
//   "/api/collection",
//   collectionRoutes
// );
// /*********************************
// DISCOVERIES
// *********************************/

// app.use("/api/discoveries", discoveryRoutes);
// /*
// ========================================
// HOME ROUTE
// ========================================
// */

// app.get("/", (req, res) => {
//   res.send(
//     "🦖 Paleora backend is running!"
//   );
// });
// /*
// ========================================
// ERROR HANDLING
// ========================================
// */

// app.use(notFound);
// app.use(errorHandler);
// /*
// ========================================
// PORT
// ========================================
// */

// const PORT = process.env.PORT || 3000;

// /*
// ========================================
// MONGODB CONNECTION
// ========================================
// */

// mongoose
//   .connect(process.env.MONGO_URI)

//   .then(() => {
//     console.log(
//       "✅ MongoDB Connected"
//     );

//     console.log(
//       "Ready State:",
//       mongoose.connection.readyState
//     );

//     console.log(
//       "Database:",
//       mongoose.connection.name
//     );

//     /*
//     ========================================
//     START SERVER
//     ========================================
//     */

//     app.listen(PORT, () => {
//       console.log(
//         `🚀 Server running on port ${PORT}`
//       );

//       console.log(
//         "🦖 Paleora API ready!"
//       );
//     });
//   })

//   .catch((err) => {
//     console.error(
//       "❌ MongoDB Connection Error"
//     );

//     console.error(err);

//     process.exit(1);
//   });









require("dotenv").config();
require("./utils/dailyMissionReset");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const adminRoutes = require("./routes/admin.routes");
const authRoutes = require("./routes/authRoutes");
const authUserRoutes = require("./routes/userRoutes");
const userRoutes = require("./routes/user");
const quizRoutes = require("./routes/quiz");
const questionRoutes = require("./routes/questions");
const leaderboardRoutes = require("./routes/leaderboard");
const discoveryRoutes = require("./routes/discoveries");
const dailyMissionRoutes = require("./routes/dailyMission");
const collectionRoutes = require("./routes/collection");
const shopRoutes = require("./routes/shop");
const chatRoutes = require("./routes/chat");

const {
  notFound,
  errorHandler,
} = require("./middleware/errorMiddleware");

const app = express();

// Debug logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
const allowedOrigins = [
  "http://localhost:5173",
  "https://paleora-ten.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

// Matches Vercel preview deployments
const vercelPreviewRegex =
  /^https:\/\/paleora-[a-z0-9]+-komeka71s-projects\.vercel\.app$/;

app.use(
  cors({
    origin(origin, callback) {
      // Allow Postman/curl
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        vercelPreviewRegex.test(origin)
      ) {
        return callback(null, true);
      }

      console.log("❌ Blocked by CORS:", origin);
      return callback(
        new Error("Not allowed by CORS: " + origin)
      );
    },
    credentials: true,
  })
);

app.use("/api/daily", dailyMissionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/daily", dailyMissionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/questions", questionRoutes);

app.use("/api/chat", (req, res, next) => {
  console.log("🔥 /api/chat reached");
  next();
});
app.use("/api/chat", chatRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/users", authUserRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user", shopRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/collection", collectionRoutes);
app.use("/api/discoveries", discoveryRoutes);

// Home
app.get("/", (req, res) => {
  res.send("🦖 Paleora backend is running!");
});

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("Ready State:", mongoose.connection.readyState);
    console.log("Database:", mongoose.connection.name);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log("🦖 Paleora API ready!");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error");
    console.error(err);
    process.exit(1);
  });