// data.js
// Track Identification Lab — species archive.
//
// Each entry describes a footprint trail (procedurally rendered by
// TrackTrail.jsx, no image assets required) plus the museum-card
// content revealed once a species has been identified.
//
// footprint fields:
//   toeCount   number of forward toes rendered per print
//   clawed     whether toe tips taper to a claw point
//   gait       "biped" (alternating L/R single trackway) or
//              "quadruped" (paired fore/hind prints, wide trackway)
//   printSize  relative footprint scale, 0–1
//   foreSize   (quadruped only) fore-foot scale relative to printSize
//   stride     relative spacing between successive prints
//   straddle   relative trackway width (distance from centerline)
//   depth      visual impression depth, affects shadow strength

export const dinosaurs = [
  {
    id: 'trex',
    name: 'Tyrannosaurus rex',
    era: 'Late Cretaceous (68–66 Ma)',
    diet: 'Carnivore',
    fact: 'T. rex had one of the strongest bite forces ever measured in a land animal.',
    footprint: {
      toeCount: 3,
      clawed: true,
      gait: 'biped',
      printSize: 1,
      stride: 1.15,
      straddle: 0.18,
      depth: 0.9,
    },
    distractors: ['Allosaurus', 'Spinosaurus'],
  },
  {
    id: 'triceratops',
    name: 'Triceratops',
    era: 'Late Cretaceous (68–66 Ma)',
    diet: 'Herbivore',
    fact: 'Triceratops had three horns and a large bony frill that protected its head.',
    footprint: {
      toeCount: 4,
      clawed: false,
      gait: 'quadruped',
      printSize: 0.72,
      foreSize: 0.82,
      stride: 0.85,
      straddle: 0.5,
      depth: 0.7,
    },
    distractors: ['Pentaceratops', 'Styracosaurus'],
  },
  {
    id: 'stegosaurus',
    name: 'Stegosaurus',
    era: 'Late Jurassic (155–145 Ma)',
    diet: 'Herbivore',
    fact: 'The bony plates along its back may have helped regulate body temperature.',
    footprint: {
      toeCount: 3,
      clawed: false,
      gait: 'quadruped',
      printSize: 0.6,
      foreSize: 0.68,
      stride: 0.7,
      straddle: 0.46,
      depth: 0.55,
    },
    distractors: ['Kentrosaurus', 'Ankylosaurus'],
  },
  {
    id: 'velociraptor',
    name: 'Velociraptor',
    era: 'Late Cretaceous (75–71 Ma)',
    diet: 'Carnivore',
    fact: 'Velociraptor tracks rarely show its sickle claw, which was held clear of the ground.',
    footprint: {
      toeCount: 2,
      clawed: true,
      gait: 'biped',
      printSize: 0.42,
      stride: 0.62,
      straddle: 0.1,
      depth: 0.4,
    },
    distractors: ['Deinonychus', 'Troodon'],
  },
  {
    id: 'ankylosaurus',
    name: 'Ankylosaurus',
    era: 'Late Cretaceous (68–66 Ma)',
    diet: 'Herbivore',
    fact: 'Ankylosaurus swung a heavy bone club on its tail with enough force to break bone.',
    footprint: {
      toeCount: 4,
      clawed: false,
      gait: 'quadruped',
      printSize: 0.66,
      foreSize: 0.9,
      stride: 0.6,
      straddle: 0.56,
      depth: 0.6,
    },
    distractors: ['Euoplocephalus', 'Nodosaurus'],
  },
  {
    id: 'brachiosaurus',
    name: 'Brachiosaurus',
    era: 'Late Jurassic (154–150 Ma)',
    diet: 'Herbivore',
    fact: 'Its front legs were longer than its hind legs, an unusual trait among sauropods.',
    footprint: {
      toeCount: 5,
      clawed: false,
      gait: 'quadruped',
      printSize: 1.05,
      foreSize: 0.7,
      stride: 1.3,
      straddle: 0.42,
      depth: 1,
    },
    distractors: ['Diplodocus', 'Camarasaurus'],
  },
];

// Deterministic shuffle so a given trail's answer order stays stable
// across re-renders within a session, seeded from the dinosaur id.
function seededShuffle(array, seed) {
  const arr = [...array];
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function seedFromString(str) {
  let seed = 0;
  for (let i = 0; i < str.length; i += 1) seed += str.charCodeAt(i) * (i + 1);
  return seed;
}

export function getChoices(dino) {
  const options = [dino.name, ...dino.distractors];
  return seededShuffle(options, seedFromString(dino.id));
}

export const trails = dinosaurs.map((dino) => ({
  ...dino,
  choices: getChoices(dino),
}));