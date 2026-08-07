const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
      required: function () {
        return this.authProvider === "local";
      },
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: {
      type: String,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      code: {
        type: String,
        select: false,
        default: null,
      },
      expiresAt: {
        type: Date,
        select: false,
        default: null,
      },
    },

    hasOnboarded: {
      type: Boolean,
      default: false,
    },

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

    companion: {
      companionId: {
        type: String,
        default: null,
      },
      name: {
        type: String,
        default: null,
      },
      gender: {
        type: String,
        enum: ["male", "female", null],
        default: null,
      },
    },

    photo: {
      url: {
        type: String,
        default: null,
      },
      verified: {
        type: Boolean,
        default: false,
      },
    },
fullName: {
  type: String,
  default: "",
},

bio: {
  type: String,
  default: "",
},

// avatar: {
//   type: String,
//   default: "",
// },
museumVisits: {
  type: Number,
  default: 0,
},

discoveries: {
  type: Number,
  default: 0,
},

verifiedDiscoveries: {
  type: Number,
  default: 0,
},

completedQuizzes: {
  type: Number,
  default: 0,
},

expeditions: {
  type: Number,
  default: 0,
},
currentStreak: {
  type: Number,
  default: 0,
},

highestStreak: {
  type: Number,
  default: 0,
},
    quizStats: {
      maxScore: {
        type: Number,
        default: 0,
        min: 0,
      },
      maxStreak: {
        type: Number,
        default: 0,
        min: 0,
      },
    },

    researchPoints: {
      type: Number,
      default: 0,
      min: 0,
    },
coins: {
  type: Number,
  default: 0,
  min: 0,
},

xp: {
  type: Number,
  default: 0,
  min: 0,
},

level: {
  type: Number,
  default: 1,
  min: 1,
},

unlockedLevels: {
  type: [Number],
  default: [1],
},
shopItems: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShopItem",
  },
],
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
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    authProvider: this.authProvider,
    isVerified: this.isVerified,
    hasOnboarded: this.hasOnboarded,
    preferences: this.preferences,
    companion: this.companion,
  photo: this.photo?.url ?? null,
    fullName: this.fullName,
bio: this.bio,
// avatar: this.avatar,
currentStreak: this.currentStreak,
highestStreak: this.highestStreak,
    quizStats: this.quizStats,
    researchPoints: this.researchPoints,
    coins: this.coins,
     museumVisits: this.museumVisits,
  discoveries: this.discoveries,
  verifiedDiscoveries: this.verifiedDiscoveries,
  completedQuizzes: this.completedQuizzes,
  expeditions: this.expeditions,

xp: this.xp,
level: this.level,
unlockedLevels: this.unlockedLevels,
shopItems: this.shopItems,
    badges: this.badges,
    role: this.role,
    createdAt: this.createdAt,
  };
};

const User = mongoose.model("User", userSchema);

module.exports = User;
module.exports.ONBOARDING_OPTIONS = {
  AGE_GROUPS,
  PURPOSES,
  INTERESTS,
};