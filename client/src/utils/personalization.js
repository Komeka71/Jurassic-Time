// export function getPersonalization(user) {
//   const preferences = user?.preferences || {};

//   const purpose = preferences.purpose || "Learning";
//   const interest = preferences.interests || "Carnivores";
//   const companion = user?.companion?.type || "velociraptor";
//   const ageGroup = preferences.ageGroup || "Teen";

//   const config = {
//     hero: {},
//     homepage: {},
//     guide: {},
//     quiz: {},
//     timeline: {},
//     map: {},
//     research: {},
//   };

//   /* ---------------- Hero ---------------- */

// config.hero = {
//   dinosaur: "trex",
//   title: `Welcome back, ${user?.username || "Explorer"}!`,
//   subtitle: "Let's continue your expedition.",
//   recommendation: interest,
// };
//   /* ---------------- Purpose ---------------- */

//   switch (purpose) {
//     case "Fun":
//       config.homepage.order = [
//         "hero",
//         "quiz",
//         "games",
//         "timeline",
//         "map",
//         "research",
//       ];

//       config.hero.title = "Ready for today's adventure?";
//       config.hero.subtitle =
//         "Play, earn XP and unlock new dinosaurs.";
//       break;

//     case "Research":
//       config.homepage.order = [
//         "hero",
//         "research",
//         "map",
//         "timeline",
//         "quiz",
//         "games",
//       ];

//       config.hero.title = "Research Expedition";
//       config.hero.subtitle =
//         "Explore fossils and scientific discoveries.";
//       break;

//     case "Teaching":
//       config.homepage.order = [
//         "hero",
//         "timeline",
//         "quiz",
//         "research",
//         "map",
//         "games",
//       ];

//       config.hero.title = "Build today's lesson";
//       config.hero.subtitle =
//         "Curated exhibits ready for your classroom.";
//       break;

//     default:
//       config.homepage.order = [
//         "hero",
//         "timeline",
//         "map",
//         "quiz",
//         "research",
//         "games",
//       ];

//       config.hero.title = "Welcome back!";
//       config.hero.subtitle =
//         "Continue discovering prehistoric life.";
//   }

//   /* ---------------- Interest ---------------- */

//   switch (interest) {
//     case "Marine reptiles":
//       config.hero.dinosaur = "mosasaurus";
//       break;

//  case "Flying reptiles":
//   config.hero.dinosaur = "brachiosaurus";
//   break;
//     case "Fossils & geology":
//       config.hero.dinosaur = "triceratops";
//       break;

//     case "Extinction science":
//       config.hero.dinosaur = "brachiosaurus";
//       break;

//     default:
//       config.hero.dinosaur = "trex";
//   }

//   /* ---------------- Guide ---------------- */

//   config.guide = {
//     companion,
//     greeting: `Welcome back! I'm your ${companion}.`,
//   };

//   /* ---------------- Quiz ---------------- */

//   config.quiz = {
//     category: interest,
//   };

//   /* ---------------- Timeline ---------------- */

//   config.timeline = {
//     interest,
//   };

//   /* ---------------- Map ---------------- */

//   config.map = {
//     interest,
//   };

//   /* ---------------- Research ---------------- */

//   config.research = {
//     interest,
//   };
// config.purpose = purpose;
// config.interests = interest;
// config.ageGroup = ageGroup;
//   return config;
// }


// Maps the onboarding `purpose` answer to a homepage section order.
//
// This does NOT hide, disable, or duplicate anything — every section listed
// here already renders on the homepage today. We only change the sequence
// they appear in, based on what the user told us they're on the site for.
//
// "hero" is intentionally pinned first for every purpose (including the
// default/logged-out case) since it's the top-of-page intro, not a feature
// card — reordering it away would change the page's visual structure, which
// we were told not to touch.
const DEFAULT_ORDER = [
  "hero",
  "timeline",
  "map",
  "quiz",
  "museum",
  "research",
  "games",
];

// Per-purpose priority for the remaining sections (everything after hero).
// "museum" and "hybridLab" are now reorderable like every other section —
// they render via the same sectionOrder.map() loop in Home.jsx, not in a
// fixed position.
const PURPOSE_SECTION_ORDER = {
  learning: ["timeline", "quiz", "map", "museum", "research", "games"],
  research: ["timeline", "research", "museum", "map", "quiz", "games"],
  fun: [
    "games",
    "quiz",
    "timeline",
    "hybridLab",
    "map",
    "museum",
    "research",
  ],
  teaching: ["timeline", "museum", "research", "quiz", "map", "games"],
};

/**
 * Returns personalization data for the homepage, derived from the
 * authenticated user's existing onboarding answers. Safe to call with
 * `user` as null/undefined (logged-out) or a user with no `purpose` set —
 * both fall back to the current/default homepage order.
 */
export function getPersonalization(user) {
  const purpose = user?.purpose || null;
  const restOrder = PURPOSE_SECTION_ORDER[purpose];
  const order = restOrder ? ["hero", ...restOrder] : DEFAULT_ORDER;

  return {
    purpose,
    homepage: { order },
  };
}