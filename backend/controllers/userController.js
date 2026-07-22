import User, { ONBOARDING_OPTIONS } from "../models/User.js";

const { AGE_GROUPS, PURPOSES, INTERESTS } = ONBOARDING_OPTIONS;

// @route GET /api/users/onboarding-options
// Lets the frontend render the questionnaire from a single source of truth
// instead of hardcoding the same lists in two places.
export const getOnboardingOptions = (req, res) => {
  res.status(200).json({ ageGroups: AGE_GROUPS, purposes: PURPOSES, interests: INTERESTS });
};

// @route PUT /api/users/onboarding
// Saves the "Dig Site Briefing" 3-step questionnaire + companion pick.
export const completeOnboarding = async (req, res, next) => {
  try {
    const { ageGroup, purpose, interests, companionId, companionName, companionGender } = req.body;

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
    const invalidInterest = interests.find((i) => !INTERESTS.includes(i));
    if (invalidInterest) {
      res.status(400);
      throw new Error(`"${invalidInterest}" isn't a recognized interest.`);
    }
    if (!companionId || !["male", "female"].includes(companionGender)) {
      res.status(400);
      throw new Error("Please pick a companion and a skin.");
    }

    const user = await User.findById(req.user._id);
    user.preferences = { ageGroup, purpose, interests };
    user.companion = {
      companionId,
      name: companionName?.trim() || companionId,
      gender: companionGender,
    };
    user.hasOnboarded = true;

    await user.save();
    res.status(200).json(user.toPublicJSON());
  } catch (error) {
    next(error);
  }
};

// @route GET /api/users/profile
export const getProfile = async (req, res) => {
  res.status(200).json(req.user.toPublicJSON());
};

// @route PUT /api/users/profile
// Editable fields only: username, preferences, companion, photo.
// Quiz stats, points, and badges are NOT editable here — they're written
// by the quiz/shop features, never directly by the user.
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const { username, ageGroup, purpose, interests, companionId, companionName, companionGender, photoUrl } =
      req.body;

    if (username) {
      if (username.length < 3 || username.length > 20) {
        res.status(400);
        throw new Error("Username must be between 3 and 20 characters.");
      }
      user.username = username;
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
      const invalidInterest = interests.find((i) => !INTERESTS.includes(i));
      if (invalidInterest) {
        res.status(400);
        throw new Error(`"${invalidInterest}" isn't a recognized interest.`);
      }
      user.preferences.interests = interests;
    }

    if (companionId) {
      user.companion.companionId = companionId;
      user.companion.name = companionName?.trim() || companionId;
      if (companionGender) user.companion.gender = companionGender;
    }

    if (photoUrl) {
      // Changing the photo resets verification — an admin re-checks it.
      user.photo.url = photoUrl;
      user.photo.verified = false;
    }

    const updated = await user.save();
    res.status(200).json(updated.toPublicJSON());
  } catch (error) {
    next(error);
  }
};
