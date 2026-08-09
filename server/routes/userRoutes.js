const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/avatars/" });

const profileController = require("../controllers/profile.controller");
const {
  getOnboardingOptions,
  completeOnboarding,
  getProfile,
  getStats,
  getQuizStats,
  getInventory,
  getActivity,
  updateProfile,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public: questionnaire options
router.get("/onboarding-options", getOnboardingOptions);

// Protected routes
router.put("/onboarding", protect, completeOnboarding);
router.get("/profile", protect, getProfile);
router.get("/stats", protect, getStats);
router.get("/quiz", protect, getQuizStats);
router.get("/inventory", protect, getInventory);
router.get("/activity", protect, getActivity);
router.put("/profile", protect, updateProfile);
router.get("/dashboard", protect, profileController.getDashboard);

// router.post(
//   "/avatar",
//   protect,
//   upload.single("avatar"),
//   profileController.uploadAvatar
// );
module.exports = router;