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
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/adminController");

// Every route below requires: logged in AND role === "admin"
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

// Quiz questions
router.get("/questions", getQuestions);
router.post("/questions", createQuestion);
router.patch("/questions/:id", updateQuestion);
router.delete("/questions/:id", deleteQuestion);

// Activity logs
router.get("/logs", getActivityLogs);

module.exports = router;