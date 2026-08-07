require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const quizRoutes = require("./routes/quiz");
const leaderboardRoutes = require("./routes/leaderboard");
const questionRoutes = require("./routes/questions");
const userRoutes = require("./routes/user");

const Question = require("./models/Question");
const QuizAttempt = require("./models/QuizAttempt");
const UserStats = require("./models/UserStats");

const app = express();

// ===========================
// Middleware
// ===========================
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

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ===========================
// Routes
// ===========================
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