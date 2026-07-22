import express from "express";
import { signup, login, logout, getMe, verifyOtp, resendOtp } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", login);
//router.post("/google", googleLogin);
router.post("/logout", logout);
router.get("/me", protect, getMe);

export default router;
