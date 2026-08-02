// Static mission data for the Mini Games "Choose Your Adventure" preview.
// Kept as a plain array (not a Mongoose model) — this is frontend-only display data.

export const missions = [
  {
    id: "dino-track-detective",
    number: 1,
    title: "Dino Track Detective",
    subtitle: "Track • Observe • Solve",
    time: "3–5 min",
    difficulty: 1,
    description:
      "Follow ancient tracks through the jungle and identify which dinosaur passed through.",
    route: "/mini-games/dino-track-detective",
    video: "/videos/minigames/track.mp4",
    poster: "/images/minigames/track.png",
    icon: "footprints",
    theme: {
      border: "border-emerald-400/70",
      titleText: "text-emerald-300",
      numberRing: "border-emerald-400/70",
      iconBg: "bg-emerald-500/90",
      difficultyFill: "bg-emerald-400",
      accentHex: "#34d399",
      glowIdle:
        "0 0 30px 4px rgba(52,211,153,0.25), 0 0 60px 14px rgba(52,211,153,0.08)",
      glowHover:
        "0 0 55px 10px rgba(52,211,153,0.55), 0 0 110px 30px rgba(52,211,153,0.22)",
    },
  },
  {
    id: "era-sorting",
    number: 2,
    title: "Era Sorting",
    subtitle: "Sort • Learn • Master",
    time: "4–6 min",
    difficulty: 2,
    description:
      "Sort creatures and events into their correct geological era before time runs out.",
    route: "/mini-games/era-sorting",
    video: "/videos/minigames/era.mp4",
    poster: "/images/minigames/era.png",
    icon: "shield",
    theme: {
      border: "border-amber-300/80",
      titleText: "text-amber-300",
      numberRing: "border-amber-300/80",
      iconBg: "bg-amber-400/90",
      difficultyFill: "bg-amber-300",
      accentHex: "#fbbf24",
      glowIdle:
        "0 0 34px 4px rgba(251,191,36,0.3), 0 0 65px 14px rgba(251,191,36,0.1)",
      glowHover:
        "0 0 60px 12px rgba(251,191,36,0.6), 0 0 120px 32px rgba(251,191,36,0.25)",
    },
  },
  {
    id: "fossil-excavation",
    number: 3,
    title: "Fossil Excavation",
    subtitle: "Dig • Discover • Restore",
    time: "5–7 min",
    difficulty: 3,
    description:
      "Carefully excavate a buried skeleton and piece it back together bone by bone.",
    route: "/mini-games/fossil-excavation",
    video: "/videos/minigames/fossil.mp4",
    poster: "/images/minigames/fossil2.png",
    icon: "hammer",
    theme: {
      border: "border-orange-400/70",
      titleText: "text-orange-300",
      numberRing: "border-orange-400/70",
      iconBg: "bg-orange-500/90",
      difficultyFill: "bg-orange-400",
      accentHex: "#fb923c",
      glowIdle:
        "0 0 30px 4px rgba(251,146,60,0.25), 0 0 60px 14px rgba(251,146,60,0.08)",
      glowHover:
        "0 0 55px 10px rgba(251,146,60,0.55), 0 0 110px 30px rgba(251,146,60,0.22)",
    },
  },
];
