export function getHomepageSections(preferences = {}) {
  const {
    purpose = "Learning",
    ageGroup = "Teen",
    interests = "",
  } = preferences;

  let sections = [];

  switch (purpose) {
    case "Fun":
      sections = [
        "quiz",
        "games",
        "timeline",
        "map",
        "research",
      ];
      break;

    case "Research":
      sections = [
        "research",
        "map",
        "timeline",
        "quiz",
        "games",
      ];
      break;

    case "Teaching":
      sections = [
        "timeline",
        "quiz",
        "research",
        "map",
        "games",
      ];
      break;

    case "Learning":
    default:
      sections = [
        "timeline",
        "map",
        "quiz",
        "research",
        "games",
      ];
  }

  // ---------- Interest adjustments ----------

  if (interests === "Carnivores") {
    sections.sort((a, b) => {
      const priority = {
        quiz: 0,
        timeline: 1,
        map: 2,
        research: 3,
        games: 4,
      };
      return priority[a] - priority[b];
    });
  }

  if (interests === "Fossils & geology") {
    sections.sort((a, b) => {
      const priority = {
        research: 0,
        timeline: 1,
        map: 2,
        quiz: 3,
        games: 4,
      };
      return priority[a] - priority[b];
    });
  }

  if (interests === "Marine reptiles") {
    sections.sort((a, b) => {
      const priority = {
        map: 0,
        timeline: 1,
        research: 2,
        quiz: 3,
        games: 4,
      };
      return priority[a] - priority[b];
    });
  }

  return [
    "hero",
    ...sections,
  ];
}