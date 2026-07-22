import express from "express";
import {
  getOnboardingOptions,
  completeOnboarding,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: the questionnaire options can be shown before login if needed
router.get("/onboarding-options", getOnboardingOptions);

// Everything below requires a logged-in user
router.put("/onboarding", protect, completeOnboarding);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;
