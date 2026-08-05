// dinosaurs.js
// -----------------------------------------------------------------------
// Static content for the "Era Sorting" mini-game.
// Kept separate from EraSorting.jsx so the game logic never hardcodes
// era colors, ranges, or dinosaur facts — everything is looked up here.
// -----------------------------------------------------------------------

/**
 * The three geological eras used as drop zones.
 * `silhouette` keys are shared with DINOSAURS[].silhouette and map to the
 * hand-drawn icon shapes rendered in EraSorting.jsx (getSilhouette()).
 */
export const ERAS = [
  {
    id: 'triassic',
    label: 'Triassic',
    range: '251–201 million years ago',
    tagline: 'Where the first dinosaurs emerged',
    // warm reddish terrain, warm volcanic ambient light
    terrainFrom: '#7a3b2c',
    terrainTo: '#a9553a',
    glow: '#e08a5b',
    glowSoft: 'rgba(224, 138, 91, 0.22)',
  },
  {
    id: 'jurassic',
    label: 'Jurassic',
    range: '201–145 million years ago',
    tagline: 'The age of giants and lush canopies',
    // lush green jungle, soft green mist
    terrainFrom: '#1f3c26',
    terrainTo: '#3f6b45',
    glow: '#8fd18a',
    glowSoft: 'rgba(143, 209, 138, 0.20)',
  },
  {
    id: 'cretaceous',
    label: 'Cretaceous',
    range: '145–66 million years ago',
    tagline: 'The final, most diverse chapter',
    // cool blue-green forest, subtle cool lighting
    terrainFrom: '#173a3f',
    terrainTo: '#2f6f6a',
    glow: '#7fd6c9',
    glowSoft: 'rgba(127, 214, 201, 0.20)',
  },
];

/**
 * The full dinosaur pool (6 per era, 18 total). Each game draws a random
 * ROSTER_SIZE-card roster from this pool via pickRoster(), so the lineup
 * is different every playthrough.
 * `silhouette` picks a stylized icon shape (theropod / sauropod /
 * stegosaur / ceratopsian) drawn as inline SVG for a consistent,
 * illustrated "museum plate" look without external image assets.
 */
export const DINOSAURS = [
  // ---- Triassic ----
  {
    id: 'coelophysis',
    name: 'Coelophysis',
    era: 'triassic',
    fact: 'A slender, fast-moving hunter — one of the earliest known dinosaurs.',
    silhouette: 'theropod-small',
  },
  {
    id: 'plateosaurus',
    name: 'Plateosaurus',
    era: 'triassic',
    fact: 'An early long-necked herbivore that could rear up on two legs to browse high foliage.',
    silhouette: 'sauropod-early',
  },
  {
    id: 'eoraptor',
    name: 'Eoraptor',
    era: 'triassic',
    fact: 'One of the very first dinosaurs, no bigger than a fox.',
    silhouette: 'theropod-small',
  },
  {
    id: 'herrerasaurus',
    name: 'Herrerasaurus',
    era: 'triassic',
    fact: 'A swift, early predator among the very first dinosaurian hunters.',
    silhouette: 'theropod-small',
  },
  {
    id: 'liliensternus',
    name: 'Liliensternus',
    era: 'triassic',
    fact: 'One of the largest predators of the Late Triassic, still modest by later standards.',
    silhouette: 'theropod-small',
  },
  {
    id: 'procompsognathus',
    name: 'Procompsognathus',
    era: 'triassic',
    fact: 'A small, quick-footed dinosaur about the size of a turkey.',
    silhouette: 'theropod-small',
  },

  // ---- Jurassic ----
  {
    id: 'stegosaurus',
    name: 'Stegosaurus',
    era: 'jurassic',
    fact: 'Famous for the row of bony plates along its back and a spiked tail.',
    silhouette: 'stegosaur',
  },
  {
    id: 'brachiosaurus',
    name: 'Brachiosaurus',
    era: 'jurassic',
    fact: 'A towering long-necked giant that browsed treetops other herbivores could not reach.',
    silhouette: 'sauropod',
  },
  {
    id: 'allosaurus',
    name: 'Allosaurus',
    era: 'jurassic',
    fact: 'The dominant predator of its time, with powerful jaws and short horns above the eyes.',
    silhouette: 'theropod-large',
  },
  {
    id: 'diplodocus',
    name: 'Diplodocus',
    era: 'jurassic',
    fact: 'One of the longest dinosaurs ever, with a whip-like tail nearly half its body length.',
    silhouette: 'sauropod',
  },
  {
    id: 'ceratosaurus',
    name: 'Ceratosaurus',
    era: 'jurassic',
    fact: 'A blade-toothed predator known for the small horn above its nose.',
    silhouette: 'theropod-large',
  },
  {
    id: 'camptosaurus',
    name: 'Camptosaurus',
    era: 'jurassic',
    fact: 'A sturdy, plant-eating dinosaur that could move on two legs or all fours.',
    silhouette: 'sauropod-early',
  },

  // ---- Cretaceous ----
  {
    id: 'trex',
    name: 'Tyrannosaurus Rex',
    era: 'cretaceous',
    fact: 'A massive apex predator with one of the strongest bites of any land animal.',
    silhouette: 'theropod-large',
  },
  {
    id: 'triceratops',
    name: 'Triceratops',
    era: 'cretaceous',
    fact: 'Instantly recognizable by its three horns and wide bony frill.',
    silhouette: 'ceratopsian',
  },
  {
    id: 'velociraptor',
    name: 'Velociraptor',
    era: 'cretaceous',
    fact: 'A small, feathered, sharp-witted pack hunter, much smaller than film portrayals.',
    silhouette: 'theropod-small',
  },
  {
    id: 'spinosaurus',
    name: 'Spinosaurus',
    era: 'cretaceous',
    fact: 'A sail-backed giant, among the largest predatory dinosaurs known.',
    silhouette: 'theropod-large',
  },
  {
    id: 'ankylosaurus',
    name: 'Ankylosaurus',
    era: 'cretaceous',
    fact: 'A heavily armored herbivore with a club-like tail for defense.',
    silhouette: 'stegosaur',
  },
  {
    id: 'parasaurolophus',
    name: 'Parasaurolophus',
    era: 'cretaceous',
    fact: 'Known for its long, curved head crest, likely used to make resonant calls.',
    silhouette: 'sauropod-early',
  },
];

// Convenience lookup used across the game.
export const ERA_MAP = Object.fromEntries(ERAS.map((e) => [e.id, e]));
export const TOTAL_DINOSAURS = DINOSAURS.length;

// How many cards make up a single playthrough.
export const ROSTER_SIZE = 10;

/** Fisher–Yates shuffle, returns a new array (does not mutate input). */
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Draws a random roster of `size` dinosaurs from the full pool for a
 * single playthrough. Called once on mount and again on every restart.
 */
export function pickRoster(size = ROSTER_SIZE) {
  return shuffle(DINOSAURS).slice(0, size);
}