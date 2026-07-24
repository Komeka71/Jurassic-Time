const express = require("express");

const {
  getOnboardingOptions,
  completeOnboarding,
  getProfile,
  updateProfile,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public: questionnaire options
router.get("/onboarding-options", getOnboardingOptions);

// Protected routes
router.put("/onboarding", protect, completeOnboarding);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;