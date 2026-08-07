// server/routes/admin.routes.js
const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { getDashboardStats } = require("../controllers/adminController");

// Every route below requires: logged in AND role === "admin"
router.use(protect, adminOnly);

router.get("/stats", getDashboardStats);

module.exports = router;