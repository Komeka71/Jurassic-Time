const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const {
  sendEmail,
  otpEmailTemplate,
  welcomeEmailTemplate,
} = require("../utils/email");

const {
  generateOtp,
  OTP_TTL_MS,
} = require("../utils/otp");

// @route POST /api/auth/signup
const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Username, email, and password are all required.");
    }

    if (password.length < 8) {
      res.status(400);
      throw new Error("Password must be at least 8 characters.");
    }

    const existing = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existing) {
      res.status(400);
      throw new Error(
        existing.email === email
          ? "An account with that email already exists."
          : "That username is taken."
      );
    }

    const otp = generateOtp();

    const user = await User.create({
      username,
      email,
      password,
      authProvider: "local",
      isVerified: false,
      otp: {
        code: otp,
        expiresAt: new Date(Date.now() + OTP_TTL_MS),
      },
    });

    await sendEmail({
      to: user.email,
      subject: "Your Paleora verification code",
      html: otpEmailTemplate(otp, user.username),
    });

    res.status(201).json({
      message: "Account created. Check your email for a verification code.",
      userId: user._id,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

// @route POST /api/auth/verify-otp
const verifyOtp = async (req, res, next) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      res.status(400);
      throw new Error("Missing verification code.");
    }

    const user = await User.findById(userId).select(
      "+otp.code +otp.expiresAt"
    );

    if (!user) {
      res.status(404);
      throw new Error("Account not found.");
    }

    if (user.isVerified) {
      res.status(400);
      throw new Error("This account is already verified.");
    }

    if (!user.otp?.code || user.otp.code !== otp) {
      res.status(400);
      throw new Error("That code is incorrect.");
    }

    if (user.otp.expiresAt < new Date()) {
      res.status(400);
      throw new Error("That code has expired. Request a new one.");
    }

    user.isVerified = true;
    user.otp = {
      code: null,
      expiresAt: null,
    };

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Welcome to Paleora 🦖",
      html: welcomeEmailTemplate(user.username),
    });

    generateToken(res, user._id);

    res.status(200).json({
      ...user.toPublicJSON(),
      justVerified: true,
    });
  } catch (error) {
    next(error);
  }
};

// @route POST /api/auth/resend-otp
const resendOtp = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("Account not found.");
    }

    if (user.isVerified) {
      res.status(400);
      throw new Error("This account is already verified.");
    }

    const otp = generateOtp();

    user.otp = {
      code: otp,
      expiresAt: new Date(Date.now() + OTP_TTL_MS),
    };

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Your new Paleora verification code",
      html: otpEmailTemplate(otp, user.username),
    });

    res.status(200).json({
      message: "A new code was sent to your email.",
    });
  } catch (error) {
    next(error);
  }
};

// @route POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required.");
    }

    const user = await User.findOne({ email }).select("+password");

    if (
      !user ||
      user.authProvider !== "local" ||
      !(await user.matchPassword(password))
    ) {
      res.status(401);
      throw new Error("Invalid email or password.");
    }

    if (!user.isVerified) {
      res.status(403);

      return res.json({
        message: "Please verify your email before logging in.",
        needsVerification: true,
        userId: user._id,
        email: user.email,
      });
    }

    generateToken(res, user._id);

    res.status(200).json(user.toPublicJSON());
  } catch (error) {
    next(error);
  }
};

// @route POST /api/auth/logout
const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Logged out.",
  });
};

// @route GET /api/auth/me
const getMe = async (req, res) => {
  res.status(200).json(req.user.toPublicJSON());
};

module.exports = {
  signup,
  verifyOtp,
  resendOtp,
  login,
  logout,
  getMe,
};