// Static mission data for the Mini Games "Choose Your Adventure" preview.
// Kept as a plain array (not a Mongoose model) — this is frontend-only display data.

export const missions = [
  {
    id: "dino-track-detective",
    number: 1,
    title: "Dino Track Detective",
    subtitle: "Track • Observe • Solve",
    time: "3–5 min",
    route: "/mini-games/dino-track-detective",
    video: "/videos/minigames/track.mp4",
    poster: "/images/minigames/track.png",
    icon: "footprints",
    theme: {
      ring: "ring-emerald-400/70",
      glow: "shadow-[0_0_45px_-10px_rgba(52,211,153,0.6)]",
      iconBg: "bg-emerald-500/90",
      titleText: "text-emerald-300",
      numberRing: "border-emerald-400/70",
    },
  },
  {
    id: "era-sorting",
    number: 2,
    title: "Era Sorting",
    subtitle: "Sort • Learn • Master",
    time: "4–6 min",
    route: "/mini-games/era-sorting",
    video: "/videos/minigames/era.mp4",
    poster: "/images/minigames/era.png",
    icon: "shield",
    theme: {
      ring: "ring-amber-300/80",
      glow: "shadow-[0_0_55px_-8px_rgba(252,211,77,0.7)]",
      iconBg: "bg-amber-400/90",
      titleText: "text-amber-300",
      numberRing: "border-amber-300/80",
    },
  },
  {
    id: "fossil-excavation",
    number: 3,
    title: "Fossil Excavation",
    subtitle: "Dig • Discover • Restore",
    time: "5–7 min",
    route: "/mini-games/fossil-excavation",
    video: "/videos/minigames/fossil.mp4",
    poster: "/images/minigames/fossil2.png",
    icon: "hammer",
    theme: {
      ring: "ring-orange-400/70",
      glow: "shadow-[0_0_45px_-10px_rgba(251,146,60,0.6)]",
      iconBg: "bg-orange-500/90",
      titleText: "text-orange-300",
      numberRing: "border-orange-400/70",
    },
  },
];
