export function getPersonalization(user) {
  const preferences = user?.preferences || {};

  const purpose = preferences.purpose || "Learning";
  const interest = preferences.interests || "Carnivores";
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
  /* ---------------- Purpose ---------------- */

  switch (purpose) {
    case "Fun":
      config.homepage.order = [
        "hero",
        "quiz",
        "games",
        "timeline",
        "map",
        "research",
      ];

      config.hero.title = "Ready for today's adventure?";
      config.hero.subtitle =
        "Play, earn XP and unlock new dinosaurs.";
      break;

    case "Research":
      config.homepage.order = [
        "hero",
        "research",
        "map",
        "timeline",
        "quiz",
        "games",
      ];

      config.hero.title = "Research Expedition";
      config.hero.subtitle =
        "Explore fossils and scientific discoveries.";
      break;

    case "Teaching":
      config.homepage.order = [
        "hero",
        "timeline",
        "quiz",
        "research",
        "map",
        "games",
      ];

      config.hero.title = "Build today's lesson";
      config.hero.subtitle =
        "Curated exhibits ready for your classroom.";
      break;

    default:
      config.homepage.order = [
        "hero",
        "timeline",
        "map",
        "quiz",
        "research",
        "games",
      ];

      config.hero.title = "Welcome back!";
      config.hero.subtitle =
        "Continue discovering prehistoric life.";
  }

  /* ---------------- Interest ---------------- */

  switch (interest) {
    case "Marine reptiles":
      config.hero.dinosaur = "mosasaurus";
      break;

 case "Flying reptiles":
  config.hero.dinosaur = "brachiosaurus";
  break;
    case "Fossils & geology":
      config.hero.dinosaur = "triceratops";
      break;

    case "Extinction science":
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