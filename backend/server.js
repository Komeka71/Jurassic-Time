// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// dotenv.config();
// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
// connectDB();

// const app = express();

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true, // required so the browser sends/receives the jwt cookie
//   })
// );
// app.use(express.json());
// app.use(cookieParser());

// app.get("/api/health", (req, res) => res.json({ status: "ok", theme: "Jurassic Time" }));

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// // Other Web Wonders 2026 teammates mount their routes here, e.g.:
// // app.use("/api/species", speciesRoutes);
// // app.use("/api/quiz", quizRoutes);
// // app.use("/api/shop", shopRoutes);

// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Jurassic Time API running on port ${PORT}`));


import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // required so the browser sends/receives the jwt cookie
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => res.json({ status: "ok", theme: "Jurassic Time" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Other Web Wonders 2026 teammates mount their routes here, e.g.:
// app.use("/api/species", speciesRoutes);
// app.use("/api/quiz", quizRoutes);
// app.use("/api/shop", shopRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Jurassic Time API running on port ${PORT}`));