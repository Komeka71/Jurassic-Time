const User = require("../models/User");
const { ONBOARDING_OPTIONS } = require("../models/User");

// const { AGE_GROUPS, PURPOSES, INTERESTS } = ONBOARDING_OPTIONS;
const { AGE_GROUPS, PURPOSES, INTERESTS, DINO_COLORS } = ONBOARDING_OPTIONS;
// @route GET /api/users/onboarding-options
const getOnboardingOptions = (req, res) => {
  res.status(200).json({
    ageGroups: AGE_GROUPS,
    purposes: PURPOSES,
    interests: INTERESTS,
    companions: DINO_COLORS,
  });
};

// @route PUT /api/users/onboarding
const completeOnboarding = async (req, res, next) => {
  try {
    const {
      ageGroup,
      purpose,
      interests,
      companionId,
      companionName,
      companionGender,
    } = req.body;

    if (!AGE_GROUPS.includes(ageGroup)) {
      res.status(400);
      throw new Error("Please choose a valid age group.");
    }

    if (!PURPOSES.includes(purpose)) {
      res.status(400);
      throw new Error("Please choose a valid purpose.");
    }

    if (!Array.isArray(interests) || interests.length === 0) {
      res.status(400);
      throw new Error("Please choose at least one interest.");
    }

    const invalidInterest = interests.find(
      (i) => !INTERESTS.includes(i)
    );

    if (invalidInterest) {
      res.status(400);
      throw new Error(`"${invalidInterest}" isn't a recognized interest.`);
    }

if (!DINO_COLORS.includes(companionId)) {
  res.status(400);
  throw new Error("Please choose a valid dinosaur color.");
}
    const user = await User.findById(req.user._id);
if (!user) {
  res.status(404);
  throw new Error("User not found.");
}
    user.preferences = {
      ageGroup,
      purpose,
      interests,
    };
user.companion = {
  companionId,
  name: companionName?.trim() || companionId,
};

    user.hasOnboarded = true;

    await user.save();

    res.status(200).json(user.toPublicJSON());
  } catch (error) {
    next(error);
  }
};

// @route GET /api/users/profile
const getProfile = async (req, res) => {
  res.status(200).json(req.user.toPublicJSON());
};
// @route GET /api/users/stats
const getStats = async (req, res) => {
  res.status(200).json({
    totalXp: req.user.xp,
    level: req.user.level,
    coins: req.user.coins,
    completedQuizzes: req.user.completedQuizzes,
    discoveries: req.user.discoveries,
    verifiedDiscoveries: req.user.verifiedDiscoveries,
    museumVisits: req.user.museumVisits,
    expeditions: req.user.expeditions,
    currentStreak: req.user.currentStreak,
    highestStreak: req.user.highestStreak,
  });
};
// @route GET /api/users/quiz
const getQuizStats = async (req, res) => {
  res.status(200).json({
    accuracy: req.user.quizStats?.accuracy ?? 0,
    averageScore: req.user.quizStats?.averageScore ?? 0,
    highestScore: req.user.quizStats?.maxScore ?? 0,
    attempts: req.user.completedQuizzes ?? 0,
    currentStreak: req.user.currentStreak ?? 0,
    highestStreak: req.user.highestStreak ?? req.user.quizStats?.maxStreak ?? 0,
    bestCategory: req.user.quizStats?.bestCategory ?? null,
    worstCategory: req.user.quizStats?.worstCategory ?? null,
    categoryBreakdown: req.user.quizStats?.categoryBreakdown ?? [],
  });
};
// @route GET /api/users/inventory
const getInventory = async (req, res) => {
  res.status(200).json({
    coins: req.user.coins ?? 0,
    dnaSamples: 0,
    rareFossils: 0,
    artifacts: 0,
    keys: 0,
    tickets: 0,
  });
};
// @route GET /api/users/activity
const getActivity = async (req, res) => {
  res.status(200).json([]);
};
// @route PUT /api/users/profile
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

if (!user) {
  res.status(404);
  throw new Error("User not found.");
}


const {
  username,
  fullName,
  bio,
  ageGroup,
  purpose,
  interests,
  companionId,
  companionName,
  companionGender,
  photoUrl,
} = req.body;
if (username) {
  const trimmedUsername = username.trim();

  if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
    res.status(400);
    throw new Error("Username must be between 3 and 20 characters.");
  }

  const existingUser = await User.findOne({
    username: trimmedUsername,
    _id: { $ne: user._id },
  });

  if (existingUser) {
    res.status(400);
    throw new Error("Username is already taken.");
  }

  user.username = trimmedUsername;
}
if (typeof fullName === "string") {
  user.fullName = fullName.trim();
}

if (typeof bio === "string") {
  user.bio = bio.trim();
}
    if (ageGroup) {
      if (!AGE_GROUPS.includes(ageGroup)) {
        res.status(400);
        throw new Error("Please choose a valid age group.");
      }

      user.preferences.ageGroup = ageGroup;
    }

    if (purpose) {
      if (!PURPOSES.includes(purpose)) {
        res.status(400);
        throw new Error("Please choose a valid purpose.");
      }

      user.preferences.purpose = purpose;
    }

    if (interests) {
      const invalidInterest = interests.find(
        (i) => !INTERESTS.includes(i)
      );

      if (invalidInterest) {
        res.status(400);
        throw new Error(`"${invalidInterest}" isn't a recognized interest.`);
      }

      user.preferences.interests = interests;
    }

    if (companionId) {
      user.companion.companionId = companionId;
      user.companion.name = companionName?.trim() || companionId;

      // if (companionGender) {
      //   user.companion.gender = companionGender;
      // }
    }

  if (typeof photoUrl === "string" && photoUrl.trim()) {
  user.photo.url = photoUrl.trim();
  user.photo.verified = false;
}

    const updated = await user.save();

    res.status(200).json(updated.toPublicJSON());
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOnboardingOptions,
  completeOnboarding,
  getProfile,
  getStats,
  getInventory,
  getQuizStats,
  getActivity,
  updateProfile,
};