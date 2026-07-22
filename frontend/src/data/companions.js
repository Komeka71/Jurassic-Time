// Simple emoji stand-ins so the flow runs with zero image assets.
// Swap "emoji" for real sprite sheets/art later without touching any logic —
// components only ever read companionId, name, and gender off the user object.
const companions = [
  {
    id: "velociraptor",
    label: "Velociraptor",
    tagline: "Quick, sharp-eyed, no-nonsense guide.",
    emoji: { male: "🦖", female: "🦖" },
  },
  {
    id: "triceratops",
    label: "Triceratops",
    tagline: "Steady, patient, explains things slowly.",
    emoji: { male: "🦕", female: "🦕" },
  },
  {
    id: "pterodactyl",
    label: "Pterodactyl",
    tagline: "Loves showing you the big-picture view.",
    emoji: { male: "🦅", female: "🦅" },
  },
];

export default companions;
