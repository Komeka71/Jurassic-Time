const pageMessages = {
  hero: [
    "👋 Welcome to Paleora!",
    "🦖 Your prehistoric adventure begins here.",
    "🌿 Ready to explore millions of years of history?",
    "⭐ Discover dinosaurs like never before!",
  ],

  timeline: [
    "⏳ Welcome to the Timeline!",
    "📜 Travel through the Triassic, Jurassic and Cretaceous.",
    "🦕 Every era has its own incredible story.",
    "🌍 Watch Earth's history unfold before you.",
  ],

  map: [
    "🌍 Click the Earth to begin your expedition!",
    "🗺️ Welcome to the Expedition Atlas!",
    "🦴 Explore where legendary fossils were discovered.",
    "📍 Click the Earth to enter the interactive map.",
  ],
hybridLab: [
    "🔒 Restricted access. Proceed carefully.",
    "🧬 Welcome to the fusion of two extinct worlds.",
    "⚠️ Some experiments here... will they survive?",
    "🦖 Ready to create something that hasn't existed in millions of years?",
  ],
  quiz: [
    "📚 Read the question carefully!",
    "🤔 Think before selecting your answer.",
    "🧠 Learning is more important than scoring.",
    "🦖 Every question teaches something new.",
  ],

  research: [
    "🔬 Welcome to the Paleora Research Archive.",
    "🦴 Every fossil tells a prehistoric story.",
    "📜 Browse discoveries from explorers around the world.",
    "🧪 Science begins with curiosity.",
  ],

  miniGames: [
    "🎮 Ready for today's expedition?",
    "🦖 Choose a challenge and sharpen your explorer skills!",
    "🏆 Learn while having fun!",
    "⭐ Every game teaches something new.",
  ],

  collection: [
    "📚 Welcome to your collection!",
    "🦕 Every discovery is preserved here.",
    "🏆 Build your prehistoric encyclopedia.",
  ],

  shop: [
    "🛍️ Welcome to the Dino Shop!",
    "🦖 Spend your hard-earned coins wisely.",
    "🎁 Unlock exciting rewards!",
  ],

  leaderboard: [
    "🏆 See how you rank among explorers.",
    "⭐ Keep learning to climb higher.",
  ],

  profile: [
    "👤 Welcome back, Explorer!",
    "📈 Let's continue your journey.",
  ],

  default: [
    "👋 Welcome back!",
    "🦖 Ready for another adventure?",
  ],
  museum: [
    "🏛️ Welcome to the Museum Explorer!",
    "🦴 Every hall holds a different era of Earth's history.",
    "🎧 Try the audio guide for the full experience.",
    "🗺️ Pick a museum and start exploring.",
  ],
  // pageMessages.js
  museumIntro: [
    "🏛️ Welcome to the Museum Archive.",
    "🦴 Step through and explore Earth's deep past.",
    "🎬 Try the Virtual Tour for a guided walk.",
  ],
  dinoTrackDetective: [
    "🦶 Welcome to the Track Identification Lab.",
    "🔍 Study the footprints before you answer.",
    "🧭 No timers here — take your time, Detective.",
  ],
  eraSorting: [
    "🕰️ Welcome to Era Sorting!",
    "🦕 Drag each dinosaur to its correct era.",
    "⏳ Ninety seconds on the clock — go!",
  ],
};

export function getPageMessage(page = "default") {
  const list = pageMessages[page] || pageMessages.default;

  return list[Math.floor(Math.random() * list.length)];
}