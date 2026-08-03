export function getHomepageSections(preferences = {}) {
  const {
    purpose = "Learn",
  } = preferences;

  switch (purpose) {
    case "Fun":
      return [
        "hero",
        "quiz",
        "games",
        "timeline",
        "map",
        "research",
      ];

    case "Research":
      return [
        "hero",
        "research",
        "map",
        "timeline",
        "quiz",
        "games",
      ];

    case "Teach":
      return [
        "hero",
        "timeline",
        "quiz",
        "research",
        "map",
        "games",
      ];

    case "Learn":
    default:
      return [
        "hero",
        "timeline",
        "map",
        "quiz",
        "research",
        "games",
      ];
  }
}