const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/avatars/" });

const profileController = require("../controllers/profile.controller");
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
router.get("/dashboard", protect, profileController.getDashboard);

// router.post(
//   "/avatar",
//   protect,
//   upload.single("avatar"),
//   profileController.uploadAvatar
// );
module.exports = router;