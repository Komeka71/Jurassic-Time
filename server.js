require("dotenv").config();

const quizRoutes = require("./routes/quiz");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const leaderboardRoutes = require("./routes/leaderboard");
const Question = require("./models/Question");
const QuizAttempt = require("./models/QuizAttempt");
const UserStats = require("./models/UserStats");
const userRoutes = require("./routes/user");
const questionRoutes = require("./routes/questions");

const app = express();

// ===========================
// Middleware
// ===========================
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173", // Local development
//       process.env.CLIENT_URL   // Vercel frontend
//     ],
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g. Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/quiz", quizRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/user", userRoutes);



// ===========================
// Home Route
// ===========================
app.get("/", (req, res) => {
    res.send("Quiz backend is running!");
});

// ===========================
// MongoDB Connection
// ===========================
const PORT = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
        console.log("Ready State:", mongoose.connection.readyState);
        console.log("Database:", mongoose.connection.name);

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error");
        console.error(err);
    });