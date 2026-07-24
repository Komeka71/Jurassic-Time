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
export function getRandomMessage(mood) {
  const pool = messages[mood];

  if (!pool || pool.length === 0) return "";

  return pool[Math.floor(Math.random() * pool.length)];
}