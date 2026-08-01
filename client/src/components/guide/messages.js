
const sectionMessages = {
  hero: {
    idle: [
      "Welcome to PaleoVerse! 🦖",
      "Hover over a dinosaur to begin.",
      "Click on a glowing bone!",
      "Choose a specimen to explore.",
      "Millions of years of history await!",
    ],

    lookingAround: [
      "I think I spotted something...",
      "Those bones look interesting.",
      "Try examining the skull.",
      "Every fossil tells a story.",
    ],

    pointingRight: [
      "Check the information panel!",
      "Look at that dinosaur!",
      "Let's inspect this specimen.",
    ],

    thinking: [
      "Which dinosaur should we study first?",
      "So many incredible species...",
    ],
  },
  miniGames: {
  idle: [
    "🎮 Ready for today's expedition?",
    "Which challenge will you conquer first?",
    "Three games. Endless discoveries!",
    "Let's sharpen your explorer skills!",
    "Adventure starts here!",
  ],

  lookingAround: [
    "Hmm... I think I spotted footprints.",
    "There's a fossil hidden nearby!",
    "Something ancient is waiting to be discovered.",
    "Look carefully... every clue matters.",
  ],

  thinking: [
    "Which game should we play first?",
    "Track... Sort... or Excavate?",
    "Every great explorer starts with practice.",
    "Hmm... that's an interesting challenge.",
  ],

  pointingRight: [
    "Try Dino Track Detective!",
    "Era Sorting is over there!",
    "Don't miss Fossil Excavation!",
    "Choose your next adventure!",
  ],

  happy: [
    "Great job, explorer! 🦖",
    "You're getting better every expedition!",
    "Awesome work!",
    "You're becoming a real paleontologist!",
  ],

  celebrate: [
    "Mission Complete! 🎉",
    "Excellent exploration!",
    "Another challenge conquered!",
    "Fantastic work, explorer!",
  ],
},
};

export const messages = {
  idle: [
    "Hello Explorer! 👋",
    "Ready to discover dinosaurs?",
    "Let's explore together!",
    "What shall we discover today?",
    "I smell fossils nearby...",
    "The jungle feels alive today!",
  ],

  wave: [
    "Hey there! 👋",
    "Nice to see you again!",
    "Welcome back, Explorer!",
    "Over here!",
  ],

  lookingAround: [
  "Did something move?",
  "I think I spotted a fossil!",
  "Hmm... fascinating...",
  "Let's investigate.",
  "Something ancient is nearby.",
  "I'm scanning the jungle...",
],

  thinking: [
    "Hmm...",
    "Let me think...",
    "Interesting...",
    "Analyzing prehistoric knowledge...",
    "That's a tricky one...",
  ],

  standing: [
    "Beautiful day for an expedition!",
    "I'll keep watch.",
    "Everything seems peaceful.",
    "Waiting for our next discovery.",
  ],

  walkingRight: [
    "Follow me!",
    "Let's keep moving!",
    "Adventure awaits!",
    "Come this way!",
  ],

  pointingRight: [
    "Look over there!",
    "I found something!",
    "Check that out!",
    "There's something interesting!",
  ],

  eating: [
  "Crunch... crunch... 🌿",
  "These ferns are delicious!",
  "Don't mind me... lunch break!",
  "Fresh cycads are the best.",
  "Being a herbivore isn't so bad!",
  "Exploring works up an appetite!",
  "Mmm... prehistoric salad!",
],

  roar: [
    "ROOOAAARRR!!",
    "That should scare away predators!",
    "Rawr!",
    "King of the jungle!",
  ],

 happy: [
  "Hehe! 😄",
  "You're awesome!",
  "That made my day!",
  "You're a great explorer!",
  "This is fun!",
  "Let's discover more!",
  "Yay!",
],
  happyJumps: [
    "Woohoo!",
    "Fantastic!",
    "You did it!",
    "That's amazing!",
  ],

  loveHappy: [
    "You're my favorite explorer! 💚",
    "I'm proud of you!",
    "Let's keep going!",
    "You're doing great!",
  ],

  celebrate: [
    "We discovered something incredible!",
    "Mission accomplished!",
    "That deserves a celebration!",
    "Amazing work!",
  ],

  sad: [
    "Aww...",
    "That didn't go as planned.",
    "Maybe next time!",
    "Don't give up!",
  ],

  angry: [
  "Hey! 😤",
  "Watch the tail!",
  "Careful, explorer!",
  "I'm prehistoric, not indestructible!",
  "Easy there!",
  "That startled me!",
],
shushing: [
  "Shhh... 🤫",
  "Museum voices, please.",
  "You'll wake the fossils!",
  "Quiet... I hear footsteps.",
  "Even T-Rex respected museums.",
  "The exhibits are sleeping.",
],
  sleep: [
  "Zzz...",
  "Dreaming about the Jurassic...",
  "Wake me for discoveries...",
  "Five more minutes...",
],
wakeup: [
  "Oh! You're back! 👋",
  "I was dreaming about dinosaurs!",
  "Ready for another adventure?",
  "Let's keep exploring!",
  "Did I miss anything?",
],
  camp: [
    "Camping is fun!",
    "The stars look beautiful tonight.",
    "Time to rest by the fire.",
    "This camp feels cozy.",
  ],
};

export function getRandomMessage(mood, section = "default") {
  const sectionPool = sectionMessages[section]?.[mood];

  if (sectionPool && sectionPool.length > 0) {
    return sectionPool[
      Math.floor(Math.random() * sectionPool.length)
    ];
  }

  const pool = messages[mood];

  if (!pool || pool.length === 0) return "";

  return pool[Math.floor(Math.random() * pool.length)];
}