export function getPersonalization(user) {
  const preferences = user?.preferences || {};
  const purpose = (preferences.purpose || "learning").toLowerCase();
  // const interest = (preferences.interests || "carnivores").toLowerCase();
  const interest = (
  Array.isArray(preferences.interests) && preferences.interests.length > 0
    ? preferences.interests[0]
    : "carnivores"
).toLowerCase();
  const companion = user?.companion?.type || "velociraptor";
  const ageGroup = preferences.ageGroup || "Teen";

  const config = {
    hero: {},
    homepage: {},
    guide: {},
    quiz: {},
    timeline: {},
    map: {},
    research: {},
  };

  /* ---------------- Hero ---------------- */

  config.hero = {
    dinosaur: "trex",
    title: `Welcome back, ${user?.username || "Explorer"}!`,
    subtitle: "Let's continue your expedition.",
    recommendation: interest,
  };

  /* ---------------- Purpose ----------------

  preferences.purpose is stored lowercase (see PURPOSES in models/User.js:
  "learning" | "research" | "fun" | "teaching") — this switch now matches
  that exactly, rather than checking capitalized strings that never
  matched a real value and silently fell through to default.

  homepage.order pins "hero" first for every case. "museum" and
  "hybridLab" are normal reorderable sections alongside everything
  else — they render through Home.jsx's sectionOrder.map() loop, not
  in a fixed position.
  */

  switch (purpose) {
    case "fun":
      config.homepage.order = [
        "hero",
        "games",
        "quiz",
        "timeline",
        "hybridLab",
        "map",
        "museum",
        "research",
      ];
      config.hero.title = "Ready for today's adventure?";
      config.hero.subtitle =
        "Play, earn XP and unlock new dinosaurs.";
      break;

    case "research":
      config.homepage.order = [
        "hero",
        "timeline",
        "research",
        "museum",
        "map",
        "quiz",
        "games",
      ];
      config.hero.title = "Research Expedition";
      config.hero.subtitle =
        "Explore fossils and scientific discoveries.";
      break;

    case "teaching":
      config.homepage.order = [
        "hero",
        "timeline",
        "museum",
        "research",
        "quiz",
        "map",
        "games",
      ];
      config.hero.title = "Build today's lesson";
      config.hero.subtitle =
        "Curated exhibits ready for your classroom.";
      break;

    case "learning":
    default:
      config.homepage.order = [
        "hero",
        "timeline",
        "quiz",
        "map",
        "museum",
        "research",
        "games",
      ];
      config.hero.title = "Welcome back!";
      config.hero.subtitle =
        "Continue discovering prehistoric life.";
  }

  /* ---------------- Interest ----------------

  preferences.interests is stored lowercase (see INTERESTS in
  models/User.js: "carnivores" | "flying reptiles" | "marine reptiles" |
  "fossils/geology" | "extinction science") — matched exactly here,
  including the slash in "fossils/geology" (not "&").
  */

  switch (interest) {
    case "marine reptiles":
      config.hero.dinosaur = "mosasaurus";
      break;

    case "flying reptiles":
      config.hero.dinosaur = "brachiosaurus";
      break;

    case "fossils/geology":
      config.hero.dinosaur = "triceratops";
      break;

    case "extinction science":
      config.hero.dinosaur = "brachiosaurus";
      break;

    default:
      config.hero.dinosaur = "trex";
  }

  /* ---------------- Guide ---------------- */

  config.guide = {
    companion,
    greeting: `Welcome back! I'm your ${companion}.`,
  };

  /* ---------------- Quiz ---------------- */

  config.quiz = {
    category: interest,
  };

  /* ---------------- Timeline ---------------- */

  config.timeline = {
    interest,
  };

  /* ---------------- Map ---------------- */

  config.map = {
    interest,
  };

  /* ---------------- Research ---------------- */

  config.research = {
    interest,
  };

  config.purpose = purpose;
  config.interests = interest;
  config.ageGroup = ageGroup;

  return config;
}