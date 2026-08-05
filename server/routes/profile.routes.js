const express = require("express");
const router = express.Router();
const multer = require("multer");

const { protect } = require("../middleware/authMiddleware"); // your real middleware
const profileController = require("../controllers/profile.controller");
const User = require("../models/User");

const upload = multer({ dest: "uploads/avatars/" });

// GET /api/users/dashboard -- aggregated profile page payload
router.get("/dashboard", protect, profileController.getDashboard);

// POST /api/users/avatar -- sets photo.url on the auth User doc
router.post("/avatar", protect, upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    const user = await User.findById(req.user._id);
    user.photo.url = avatarUrl;
    user.photo.verified = false; // matches your existing updateProfile behavior
    await user.save();
    res.json({ avatarUrl });
  } catch (err) {
    console.error("[profile.avatar]", err);
    res.status(500).json({ message: "Failed to update avatar" });
  }
});

module.exports = router;

/**
 * Mount alongside your existing auth user routes in server.js -- you
 * already have:
 *   app.use("/api/users", authUserRoutes);
 * Add this router the same way, e.g. inside routes/userRoutes.js (the
 * authenticated one, NOT the public /api/user UserStats one):
 *
 *   router.get("/dashboard", protect, profileController.getDashboard);
 *   router.post("/avatar", protect, upload.single("avatar"), ...);
 *
 * That gives you GET/POST at /api/users/dashboard and /api/users/avatar
 * without adding a second app.use() mount.
 *
 * NOTE ON NAMING: your codebase has both "/api/user" (public, UserStats by
 * username string) and "/api/users" (protected, auth User) -- this file
 * intentionally targets "/api/users" since the dashboard needs req.user
 * from the JWT cookie, and reads UserStats internally rather than trusting
 * a username in the URL.
 *
 * Editing profile fields (username/bio/etc.) -- you ALREADY have this:
 *   PUT /api/users/profile  (server/controllers/userController.js -> updateProfile)
 * EditProfileModal.jsx now posts there directly instead of a new endpoint.
 *
 * Claiming a daily mission -- you ALREADY have this too:
 *   PATCH /api/daily/:username/claim   Body: { title }
 * It claims by mission TITLE, not an id. DailyMissions.jsx / useProfile.js
 * were updated to call it that way.
 */
