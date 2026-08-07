// server/routes/admin.routes.js
const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getDashboardStats,
  getDiscoveriesForReview,
  approveDiscovery,
  rejectDiscovery,
} = require("../controllers/adminController");

router.use(protect, adminOnly);

router.get("/stats", getDashboardStats);
router.get("/discoveries", getDiscoveriesForReview);
router.patch("/discoveries/:id/approve", approveDiscovery);
router.patch("/discoveries/:id/reject", rejectDiscovery);

module.exports = router;