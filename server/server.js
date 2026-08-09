require("dotenv").config();
require("./utils/dailyMissionReset");
const { env } = require("./config/env");
const timelineV1Routes = require("./routes/v1/index.js");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

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

// NEW: Timeline v1 API
const timelineV1Routes = require("./routes/v1/index.js");
const openapiSpec = require("./docs/openapi.js");

const {
  notFound,
  errorHandler,
} = require("./middleware/errorMiddleware");

const app = express();

app.set("trust proxy", 1); // NEW — needed for correct req.ip behind a proxy/load balancer

// Debug logger (kept — replace with morgan below if you'd rather standardize; both can coexist for now)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(helmet());        // NEW — test thoroughly, can affect CORS/CSP-sensitive frontend requests
app.use(compression());   // NEW
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev")); // NEW

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
  ...env.corsOrigins,
].filter(Boolean);

const vercelPreviewRegex =
  /^https:\/\/paleora-[a-z0-9]+-komeka71s-projects\.vercel\.app$/;

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || vercelPreviewRegex.test(origin)) {
        return callback(null, true);
      }
      console.log("❌ Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
  })
);

// NEW — health check, independent of any feature route
app.get("/health", (req, res) => {
  const DB_STATE_LABELS = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };
  res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV || "development",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: DB_STATE_LABELS[mongoose.connection.readyState] ?? "unknown",
  });
});

// NEW — Timeline API docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));
app.get("/api/docs.json", (req, res) => res.status(200).json(openapiSpec));

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

// NEW — Timeline feature routes, versioned
app.use("/api/v1", timelineV1Routes);

app.get("/", (req, res) => {
  res.send("🦖 Paleora backend is running!");
});

app.use("/api/discoveries", discoveryRoutes);
app.use("/api/v1", timelineV1Routes);

app.use(notFound);
app.use(errorHandler);

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