/* =========================================================================
   data.js — Sites, fossils and collection data for Fossil Excavation
   ========================================================================= */

export const SPECIES = {
  triceratops: {
    id: "triceratops",
    name: "Triceratops",
    era: "Late Cretaceous",
    diet: "Herbivore",
    site: "desert",
    color: "#c9a15a",
    fact: "Its enormous bony frill wasn't just armor — recent studies suggest it may have flushed with blood to signal rivals, much like a peacock's tail.",
    detail: "One of the last dinosaur genera before the mass extinction, Triceratops roamed what is now North America in small herds, using its three horns to spar with rivals and fend off predators like Tyrannosaurus.",
  },
  stegosaurus: {
    id: "stegosaurus",
    name: "Stegosaurus",
    era: "Late Jurassic",
    diet: "Herbivore",
    site: "desert",
    color: "#9fae7e",
    fact: "Stegosaurus had a brain roughly the size of a walnut, yet carried plates that may have regulated its body temperature like natural solar panels.",
    detail: "Famous for the double row of bony plates along its spine and the spiked 'thagomizer' tail, Stegosaurus was a slow-moving herbivore that grazed on low vegetation across ancient floodplains.",
  },
  brachiosaurus: {
    id: "brachiosaurus",
    name: "Brachiosaurus",
    era: "Late Jurassic",
    diet: "Herbivore",
    site: "river",
    color: "#7fa3a0",
    fact: "Its front legs were longer than its hind legs — a rare build among dinosaurs that gave it a giraffe-like posture for reaching the tallest treetops.",
    detail: "Among the largest land animals to have ever lived, Brachiosaurus used its towering neck to browse conifer canopies far above the reach of smaller herbivores sharing its riverside habitat.",
  },
  velociraptor: {
    id: "velociraptor",
    name: "Velociraptor",
    era: "Late Cretaceous",
    diet: "Carnivore",
    site: "river",
    color: "#c08a4e",
    fact: "Far smaller than popular depictions, Velociraptor stood about knee-high and was covered in feathers — closer to a fast, clever bird than a movie monster.",
    detail: "A swift pack-hunting predator, Velociraptor relied on a sickle-shaped claw on each foot and sharp senses to pursue prey across the dry, dune-swept environments it called home.",
  },
  trex: {
    id: "trex",
    name: "Tyrannosaurus Rex",
    era: "Late Cretaceous",
    diet: "Carnivore",
    site: "volcanic",
    color: "#bd6a4e",
    fact: "Despite its tiny arms, Tyrannosaurus had one of the strongest bites of any land animal, capable of crushing bone with several tons of force.",
    detail: "The apex predator of its ecosystem, Tyrannosaurus rex used binocular vision and a keen sense of smell to track prey across coastal floodplains near active volcanic terrain.",
  },
  pteranodon: {
    id: "pteranodon",
    name: "Pteranodon",
    era: "Late Cretaceous",
    diet: "Carnivore",
    site: "volcanic",
    color: "#8b8bab",
    fact: "With a wingspan of over 6 metres and almost no teeth, Pteranodon skimmed ancient seas swallowing fish whole, much like a modern pelican.",
    detail: "Though often grouped with dinosaurs, Pteranodon was a flying reptile — a pterosaur — that soared on thermal updrafts along coastlines shaped by nearby volcanic activity.",
  },
  ankylosaurus: {
    id: "ankylosaurus",
    name: "Ankylosaurus",
    era: "Late Cretaceous",
    diet: "Herbivore",
    site: "volcanic",
    color: "#8a9662",
    fact: "Its tail ended in a solid bone club heavy enough to shatter the leg bone of an attacking predator in a single swing.",
    detail: "Encased head to tail in thick bony armor plates, Ankylosaurus was a living fortress that grazed low vegetation, safe from all but the most determined predators.",
  },
};

export const SITES = {
  desert: {
    id: "desert",
    name: "Desert Ridge",
    tagline: "Wind-carved canyons hiding Jurassic giants.",
    difficulty: 1,
    locked: false,
    palette: { sky1: "#3a2a1c", sky2: "#0e0c09", ground1: "#4a3423", ground2: "#241a10" },
    pool: ["triceratops", "stegosaurus"],
  },
  river: {
    id: "river",
    name: "Ancient Riverbed",
    tagline: "Sediment layers along a long-vanished river.",
    difficulty: 2,
    locked: false,
    palette: { sky1: "#1c2e2a", sky2: "#0a0f0d", ground1: "#3a3a24", ground2: "#1a1f10" },
    pool: ["brachiosaurus", "velociraptor"],
  },
  volcanic: {
    id: "volcanic",
    name: "Volcanic Basin",
    tagline: "Ash-preserved remains from an era of fire.",
    difficulty: 3,
    locked: true,
    unlockAt: 4,
    palette: { sky1: "#3a1c14", sky2: "#0e0705", ground1: "#3a241c", ground2: "#1a100c" },
    pool: ["trex", "pteranodon", "ankylosaurus"],
  },
};

/* Empty-spot outcomes. `art` tells Excavation.jsx what (if anything) to sketch
   into the sediment once the player has brushed briefly. */
export const EMPTY_MESSAGES = [
  { text: "No significant dinosaur remains detected.", art: "rock" },
  { text: "Ancient plant remains were discovered.", art: "plant" },
  { text: "Only sediment and loose rock found here.", art: "rock" },
  { text: "Traces of mineral deposits, but no fossil.", art: "mineral" },
];

export const STEPS = ["Choose Site", "Excavate", "Discover", "Identify", "Add to Museum"];

/* ------------------------------ HELPERS -------------------------------- */

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickFossilFor(siteId, discovered) {
  const pool = SITES[siteId].pool;
  const undiscovered = pool.filter((id) => !discovered.has(id));
  const list = undiscovered.length ? undiscovered : pool;
  return list[Math.floor(Math.random() * list.length)];
}

export function randomEmptyMessage() {
  return EMPTY_MESSAGES[Math.floor(Math.random() * EMPTY_MESSAGES.length)];
}
