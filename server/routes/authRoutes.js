const express = require("express");

const {
  signup,
  login,
  logout,
  getMe,
  verifyOtp,
  resendOtp,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", login);
// router.post("/google", googleLogin);
router.post("/logout", logout);
router.get("/me", protect, getMe);

module.exports = router;