// server/routes/admin.routes.js

const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getDiscoveriesForReview,
  approveDiscovery,
  rejectDiscovery,
  getUsers,
  updateUserRole,
  updateUserStatus,
  getActivityLogs,
} = require("../controllers/adminController");

// All admin routes require authentication + admin role
router.use(protect, adminOnly);

// Dashboard
router.get("/stats", getDashboardStats);

// Discoveries
router.get("/discoveries", getDiscoveriesForReview);
router.patch("/discoveries/:id/approve", approveDiscovery);
router.patch("/discoveries/:id/reject", rejectDiscovery);

// Users
router.get("/users", getUsers);
router.patch("/users/:id/role", updateUserRole);
router.patch("/users/:id/status", updateUserStatus);

// Activity Logs
router.get("/logs", getActivityLogs);

module.exports = router;