import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AGE_GROUPS = ["kid", "teen", "adult"];
const PURPOSES = ["learning", "research", "fun", "teaching"];
const INTERESTS = [
  "carnivores",
  "flying reptiles",
  "marine reptiles",
  "fossils/geology",
  "extinction science",
];

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [20, "Username must be at most 20 characters"],
      match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Enter a valid email address"],
    },
    password: {
      type: String,
      // Not required for Google accounts — they never set a local password
      required: function passwordRequired() {
        return this.authProvider === "local";
      },
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // never return password by default
    },

    // "local" = signed up with email/password, "google" = signed in with Google
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    googleId: {
      type: String,
      default: null,
    },

    // Email verification. Google accounts are auto-verified (Google already
    // confirmed the email); local accounts must enter the emailed OTP.
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      code: { type: String, select: false, default: null },
      expiresAt: { type: Date, select: false, default: null },
    },

    // Has this user completed the "Dig Site Briefing" onboarding?
    hasOnboarded: {
      type: Boolean,
      default: false,
    },

    // --- Onboarding preferences ---
    preferences: {
      ageGroup: {
        type: String,
        enum: AGE_GROUPS,
        default: null,
      },
      purpose: {
        type: String,
        enum: PURPOSES,
        default: null,
      },
      interests: {
        type: [String],
        enum: INTERESTS,
        default: [],
      },
    },

    // --- Companion / guide ---
    companion: {
      companionId: { type: String, default: null }, // e.g. "velociraptor", "triceratops"
      name: { type: String, default: null }, // user-given nickname
      gender: { type: String, enum: ["male", "female", null], default: null },
    },

    // --- Profile photo (contributor verification) ---
    photo: {
      url: { type: String, default: null },
      verified: { type: Boolean, default: false }, // set true by an admin, not the user
    },

    // --- Quiz / gamification stats ---
    quizStats: {
      maxScore: { type: Number, default: 0, min: 0 },
      maxStreak: { type: Number, default: 0, min: 0 },
    },

    // Currency spendable in the fossil shop
    points: {
      type: Number,
      default: 0,
      min: 0,
    },

    badges: {
      type: [String],
      default: [],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Hash password before saving, only if it changed
userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function matchPassword(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Shape returned to the client — never leak the password hash
userSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    authProvider: this.authProvider,
    isVerified: this.isVerified,
    hasOnboarded: this.hasOnboarded,
    preferences: this.preferences,
    companion: this.companion,
    photo: this.photo,
    quizStats: this.quizStats,
    points: this.points,
    badges: this.badges,
    role: this.role,
    createdAt: this.createdAt,
  };
};

export const ONBOARDING_OPTIONS = { AGE_GROUPS, PURPOSES, INTERESTS };

const User = mongoose.model("User", userSchema);
export default User;
