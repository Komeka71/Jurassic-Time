console.log("✅ authRoutes loaded");
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

router.post("/signup", (req, res, next) => {
  console.log("✅ Signup route hit");
  next();
}, signup);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", login);
// router.post("/google", googleLogin);
router.post("/logout", logout);
router.get("/me", protect, getMe);

module.exports = router;