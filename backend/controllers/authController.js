// //import { OAuth2Client } from "google-auth-library";
// import User from "../models/User.js";
// import generateToken from "../utils/generateToken.js";
// import { sendEmail, otpEmailTemplate, welcomeEmailTemplate } from "../utils/email.js";
// import { generateOtp, OTP_TTL_MS } from "../utils/otp.js";

// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // @route POST /api/auth/signup
// // Creates the account as UNVERIFIED and emails an OTP. Does not log the
// // user in yet — that only happens after /verify-otp succeeds.
// export const signup = async (req, res, next) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       res.status(400);
//       throw new Error("Username, email, and password are all required.");
//     }
//     if (password.length < 8) {
//       res.status(400);
//       throw new Error("Password must be at least 8 characters.");
//     }

//     const existing = await User.findOne({ $or: [{ email }, { username }] });
//     if (existing) {
//       res.status(400);
//       throw new Error(
//         existing.email === email ? "An account with that email already exists." : "That username is taken."
//       );
//     }

//     const otp = generateOtp();
//     const user = await User.create({
//       username,
//       email,
//       password,
//       authProvider: "local",
//       isVerified: false,
//       otp: { code: otp, expiresAt: new Date(Date.now() + OTP_TTL_MS) },
//     });

//     await sendEmail({
//       to: user.email,
//       subject: "Your Jurassic Time verification code",
//       html: otpEmailTemplate(otp, user.username),
//     });

//     // Not logged in yet — frontend routes to the OTP screen using this id + email
//     res.status(201).json({
//       message: "Account created. Check your email for a verification code.",
//       userId: user._id,
//       email: user.email,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // @route POST /api/auth/verify-otp
// // Confirms the code, marks the account verified, sends a welcome email,
// // and logs the user in (sets the session cookie).
// export const verifyOtp = async (req, res, next) => {
//   try {
//     const { userId, otp } = req.body;
//     if (!userId || !otp) {
//       res.status(400);
//       throw new Error("Missing verification code.");
//     }

//     const user = await User.findById(userId).select("+otp.code +otp.expiresAt");
//     if (!user) {
//       res.status(404);
//       throw new Error("Account not found.");
//     }
//     if (user.isVerified) {
//       res.status(400);
//       throw new Error("This account is already verified.");
//     }
//     if (!user.otp?.code || user.otp.code !== otp) {
//       res.status(400);
//       throw new Error("That code is incorrect.");
//     }
//     if (user.otp.expiresAt < new Date()) {
//       res.status(400);
//       throw new Error("That code has expired. Request a new one.");
//     }

//     user.isVerified = true;
//     user.otp = { code: null, expiresAt: null };
//     await user.save();

//     await sendEmail({
//       to: user.email,
//       subject: "Welcome to Jurassic Time 🦖",
//       html: welcomeEmailTemplate(user.username),
//     });

//     generateToken(res, user._id);
//     res.status(200).json({ ...user.toPublicJSON(), justVerified: true });
//   } catch (error) {
//     next(error);
//   }
// };

// // @route POST /api/auth/resend-otp
// export const resendOtp = async (req, res, next) => {
//   try {
//     const { userId } = req.body;
//     const user = await User.findById(userId);
//     if (!user) {
//       res.status(404);
//       throw new Error("Account not found.");
//     }
//     if (user.isVerified) {
//       res.status(400);
//       throw new Error("This account is already verified.");
//     }

//     const otp = generateOtp();
//     user.otp = { code: otp, expiresAt: new Date(Date.now() + OTP_TTL_MS) };
//     await user.save();

//     await sendEmail({
//       to: user.email,
//       subject: "Your new Jurassic Time verification code",
//       html: otpEmailTemplate(otp, user.username),
//     });

//     res.status(200).json({ message: "A new code was sent to your email." });
//   } catch (error) {
//     next(error);
//   }
// };

// // @route POST /api/auth/login
// export const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       res.status(400);
//       throw new Error("Email and password are required.");
//     }

//     const user = await User.findOne({ email }).select("+password");

//     if (!user || user.authProvider !== "local" || !(await user.matchPassword(password))) {
//       res.status(401);
//       throw new Error(
//         user && user.authProvider === "google"
//           ? "This email is linked to a Google account. Use 'Continue with Google' to log in."
//           : "Invalid email or password."
//       );
//     }

//     if (!user.isVerified) {
//       res.status(403);
//       return res.json({
//         message: "Please verify your email before logging in.",
//         needsVerification: true,
//         userId: user._id,
//         email: user.email,
//       });
//     }

//     generateToken(res, user._id);
//     res.status(200).json(user.toPublicJSON());
//   } catch (error) {
//     next(error);
//   }
// };

// // @route POST /api/auth/google
// // Body: { credential } — the ID token from Google's "Sign in with Google" button.
// // Google has already verified the email, so these accounts are auto-verified
// // and never go through the OTP flow.
// // export const googleLogin = async (req, res, next) => {
// //   try {
// //     const { credential } = req.body;
// //     if (!credential) {
// //       res.status(400);
// //       throw new Error("Missing Google credential.");
// //     }

// //     const ticket = await googleClient.verifyIdToken({
// //       idToken: credential,
// //       audience: process.env.GOOGLE_CLIENT_ID,
// //     });
// //     const payload = ticket.getPayload();
// //     const { sub: googleId, email, name, email_verified: emailVerified } = payload;

// //     if (!emailVerified) {
// //       res.status(400);
// //       throw new Error("That Google account's email isn't verified.");
// //     }

// //     let user = await User.findOne({ $or: [{ googleId }, { email }] });
// //     let justCreated = false;

// //     if (!user) {
// //       // Build a unique username from the Google display name
// //       const base = (name || email.split("@")[0]).replace(/[^a-zA-Z0-9_]/g, "").slice(0, 15) || "explorer";
// //       let username = base;
// //       let suffix = 0;
// //       while (await User.findOne({ username })) {
// //         suffix += 1;
// //         username = `${base}${suffix}`;
// //       }

// //       user = await User.create({
// //         username,
// //         email,
// //         authProvider: "google",
// //         googleId,
// //         isVerified: true,
// //       });
// //       justCreated = true;

// //       await sendEmail({
// //         to: user.email,
// //         subject: "Welcome to Jurassic Time 🦖",
// //         html: welcomeEmailTemplate(user.username),
// //       });
// //     } else if (!user.googleId) {
// //       // Email existed as a local account — link it instead of creating a duplicate
// //       user.googleId = googleId;
// //       user.authProvider = "google";
// //       user.isVerified = true;
// //       await user.save();
// //     }

// //     generateToken(res, user._id);
// //     res.status(200).json({ ...user.toPublicJSON(), justVerified: justCreated });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // @route POST /api/auth/logout
// export const logout = (req, res) => {
//   res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
//   res.status(200).json({ message: "Logged out." });
// };

// // @route GET /api/auth/me
// export const getMe = async (req, res) => {
//   res.status(200).json(req.user.toPublicJSON());
// };


import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { sendEmail, otpEmailTemplate, welcomeEmailTemplate } from "../utils/email.js";
import { generateOtp, OTP_TTL_MS } from "../utils/otp.js";

// @route POST /api/auth/signup
// Creates the account as UNVERIFIED and emails an OTP. Does not log the
// user in yet — that only happens after /verify-otp succeeds.
export const signup = async (req, res, next) => {
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

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      res.status(400);
      throw new Error(
        existing.email === email ? "An account with that email already exists." : "That username is taken."
      );
    }

    const otp = generateOtp();
    const user = await User.create({
      username,
      email,
      password,
      authProvider: "local",
      isVerified: false,
      otp: { code: otp, expiresAt: new Date(Date.now() + OTP_TTL_MS) },
    });

    await sendEmail({
      to: user.email,
      subject: "Your Jurassic Time verification code",
      html: otpEmailTemplate(otp, user.username),
    });

    // Not logged in yet — frontend routes to the OTP screen using this id + email
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
// Confirms the code, marks the account verified, sends a welcome email,
// and logs the user in (sets the session cookie).
export const verifyOtp = async (req, res, next) => {
  try {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
      res.status(400);
      throw new Error("Missing verification code.");
    }

    const user = await User.findById(userId).select("+otp.code +otp.expiresAt");
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
    user.otp = { code: null, expiresAt: null };
    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Welcome to Jurassic Time 🦖",
      html: welcomeEmailTemplate(user.username),
    });

    generateToken(res, user._id);
    res.status(200).json({ ...user.toPublicJSON(), justVerified: true });
  } catch (error) {
    next(error);
  }
};

// @route POST /api/auth/resend-otp
export const resendOtp = async (req, res, next) => {
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
    user.otp = { code: otp, expiresAt: new Date(Date.now() + OTP_TTL_MS) };
    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Your new Jurassic Time verification code",
      html: otpEmailTemplate(otp, user.username),
    });

    res.status(200).json({ message: "A new code was sent to your email." });
  } catch (error) {
    next(error);
  }
};

// @route POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required.");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || user.authProvider !== "local" || !(await user.matchPassword(password))) {
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
export const logout = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out." });
};

// @route GET /api/auth/me
export const getMe = async (req, res) => {
  res.status(200).json(req.user.toPublicJSON());
};