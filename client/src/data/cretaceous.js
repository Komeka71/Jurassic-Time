/**
 * Cretaceous dinosaur exhibit data — same object shape as jurassic.js
 * (see that file's header for the full field-by-field contract). The Era
 * Timeline engine doesn't know or care which era a dinosaur belongs to;
 * it just renders whatever array eraTimelines.js hands it, so populating
 * this array is the entire implementation of the Cretaceous experience.
 */

const LATE_CRETACEOUS = 'Late Cretaceous'

export const cretaceousDinosaurs = [
  {
    id: 'tyrannosaurus',
    name: 'Tyrannosaurus rex',
    scientificName: 'Tyrannosaurus rex',
    pronunciation: 'ty-RAN-oh-SORE-us REX',
    pronunciationAudio: 'Tyrannosaurus rex',

    era: 'Cretaceous',
    period: LATE_CRETACEOUS,
    diet: 'Carnivore',
    type: 'Theropod',
    habitat: 'Subtropical floodplains & forests',
    region: 'North America',

    overview:
      'One of the largest land predators ever known, with a bone-crushing bite among the most powerful of any terrestrial animal.',
    lifeEnvironment:
      'Tyrannosaurus rex ruled the floodplains and forests of the very end of the Cretaceous, using powerful jaws and keen senses to hunt and scavenge alongside Triceratops and other giants of its era.',
    museumHighlight:
      'A single Tyrannosaurus bite could exert several tons of force, enough to crush bone \u2014 among the strongest bites ever measured in an animal.',

    sceneImage: '/images/exhibits/tyrannosaurus.jpg',
    focalPoint: '50% 50%',
    heightMeters: 4,
    gallery: [],
    facts: [
      { label: 'Diet', value: 'Carnivore' },
      { label: 'Type', value: 'Theropod' },
      { label: 'Habitat', value: 'Subtropical floodplains & forests' },
      { label: 'Height', value: '~4 m (13 ft)' },
      { label: 'Weight', value: '~8\u20139 tons' },
    ],
  },
  {
    id: 'triceratops',
    name: 'Triceratops',
    scientificName: 'Triceratops horridus',
    pronunciation: 'try-SERA-tops',
    pronunciationAudio: 'Triceratops',

    era: 'Cretaceous',
    period: LATE_CRETACEOUS,
    diet: 'Herbivore',
    type: 'Ceratopsian',
    habitat: 'Open woodlands & floodplains',
    region: 'North America',

    overview:
      'A massive horned herbivore known for its distinctive bony frill and three facial horns, likely used for defense and display.',
    lifeEnvironment:
      'Triceratops grazed in herds across the floodplains of the very end of the Cretaceous, using its horns and frill to fend off attacks from Tyrannosaurus and other predators.',
    museumHighlight:
      'Triceratops skulls could grow to nearly 2.5 meters long \u2014 among the largest skulls of any land animal to ever exist.',

    sceneImage: '/images/exhibits/triceratops.jpg',
    focalPoint: '50% 50%',
    heightMeters: 3,
    gallery: [],
    facts: [
      { label: 'Diet', value: 'Herbivore' },
      { label: 'Type', value: 'Ceratopsian' },
      { label: 'Habitat', value: 'Open woodlands & floodplains' },
      { label: 'Height', value: '~3 m (10 ft)' },
      { label: 'Weight', value: '~6\u20139 tons' },
    ],
  },
  {
    id: 'velociraptor',
    name: 'Velociraptor',
    scientificName: 'Velociraptor mongoliensis',
    pronunciation: 'vel-OSS-ih-RAP-tor',
    pronunciationAudio: 'Velociraptor',

    era: 'Cretaceous',
    period: LATE_CRETACEOUS,
    diet: 'Carnivore',
    type: 'Dromaeosaurid',
    habitat: 'Arid desert dunes',
    region: 'Central Asia',

    overview:
      'A small, swift predator covered in feathers, far more bird-like in appearance than its popular depiction suggests.',
    lifeEnvironment:
      'Velociraptor hunted across the arid dune fields of the Gobi, relying on speed, sharp claws, and keen senses to ambush small prey in one of the harshest environments of the Cretaceous.',
    museumHighlight:
      'A famous fossil captured a Velociraptor locked in combat with a Protoceratops, preserved together in the middle of their struggle by a collapsing sand dune.',

    sceneImage: '/images/exhibits/velociraptor.jpg',
    focalPoint: '50% 50%',
    heightMeters: 0.5,
    gallery: [],
    facts: [
      { label: 'Diet', value: 'Carnivore' },
      { label: 'Type', value: 'Dromaeosaurid' },
      { label: 'Habitat', value: 'Arid desert dunes' },
      { label: 'Height', value: '~0.5 m (1.6 ft)' },
      { label: 'Weight', value: '~15\u201320 kg' },
    ],
  },

  {
  id: 'spinosaurus',
  name: 'Spinosaurus',
  scientificName: 'Spinosaurus aegyptiacus',
  pronunciation: 'spy-NOSS-oh-SORE-us',
  pronunciationAudio: 'Spinosaurus',

  era: 'Cretaceous',
  period: LATE_CRETACEOUS,
  diet: 'Carnivore',
  type: 'Spinosaurid',
  habitat: 'Rivers, swamps & coastal wetlands',
  region: 'North Africa',

  overview:
    'A giant semi-aquatic predator distinguished by its enormous sail and crocodile-like snout, adapted for hunting both fish and terrestrial prey.',
  lifeEnvironment:
    'Spinosaurus dominated vast river systems and wetlands, wading through shallow waters while using its elongated jaws to seize fish and other animals near the shoreline.',
  museumHighlight:
    'Current evidence suggests Spinosaurus spent much of its life in and around water, making it one of the most aquatic dinosaurs ever discovered.',

  sceneImage: '/images/exhibits/spinosaurus.jpg',
  focalPoint: '50% 50%',
  heightMeters: 5,
  gallery: [],
  facts: [
    { label: 'Diet', value: 'Carnivore' },
    { label: 'Type', value: 'Spinosaurid' },
    { label: 'Habitat', value: 'Rivers, swamps & coastal wetlands' },
    { label: 'Height', value: '~5 m (16 ft)' },
    { label: 'Weight', value: '~7–10 tons' },
  ],
},


{
  id: 'ankylosaurus',
  name: 'Ankylosaurus',
  scientificName: 'Ankylosaurus magniventris',
  pronunciation: 'ang-KAI-loh-SORE-us',
  pronunciationAudio: 'Ankylosaurus',

  era: 'Cretaceous',
  period: LATE_CRETACEOUS,
  diet: 'Herbivore',
  type: 'Ankylosaur',
  habitat: 'Woodlands & floodplains',
  region: 'North America',

  overview:
    'A heavily armored herbivore protected by bony plates and a massive tail club capable of delivering devastating defensive blows.',
  lifeEnvironment:
    'Ankylosaurus browsed low vegetation across forests and floodplains, relying on its natural armor and powerful tail to deter even the largest predators.',
  museumHighlight:
    'Its tail club may have been strong enough to fracture the leg bones of attacking predators.',

  sceneImage: '/images/exhibits/ankylosaurus.jpg',
  focalPoint: '50% 50%',
  heightMeters: 1.7,
  gallery: [],
  facts: [
    { label: 'Diet', value: 'Herbivore' },
    { label: 'Type', value: 'Ankylosaur' },
    { label: 'Habitat', value: 'Woodlands & floodplains' },
    { label: 'Height', value: '~1.7 m (5.5 ft)' },
    { label: 'Weight', value: '~6–8 tons' },
  ],
},

{
  id: 'parasaurolophus',
  name: 'Parasaurolophus',
  scientificName: 'Parasaurolophus walkeri',
  pronunciation: 'PAR-ah-saw-ROL-oh-fus',
  pronunciationAudio: 'Parasaurolophus',

  era: 'Cretaceous',
  period: LATE_CRETACEOUS,
  diet: 'Herbivore',
  type: 'Hadrosaur',
  habitat: 'River valleys & forests',
  region: 'North America',

  overview:
    'A graceful duck-billed dinosaur recognized by its long backward-curving crest, likely used for communication and display.',
  lifeEnvironment:
    'Parasaurolophus traveled in herds through lush forests and river valleys, feeding on leaves and communicating across long distances using resonating calls.',
  museumHighlight:
    'Its hollow crest likely functioned as a natural resonance chamber capable of producing deep, powerful sounds.',

  sceneImage: '/images/exhibits/parasaurolophus.jpg',
  focalPoint: '50% 50%',
  heightMeters: 4,
  gallery: [],
  facts: [
    { label: 'Diet', value: 'Herbivore' },
    { label: 'Type', value: 'Hadrosaur' },
    { label: 'Habitat', value: 'River valleys & forests' },
    { label: 'Height', value: '~4 m (13 ft)' },
    { label: 'Weight', value: '~2.5–3 tons' },
  ],
},

{
  id: 'quetzalcoatlus',
  name: 'Quetzalcoatlus',
  scientificName: 'Quetzalcoatlus northropi',
  pronunciation: 'ket-zal-koh-AT-lus',
  pronunciationAudio: 'Quetzalcoatlus',

  era: 'Cretaceous',
  period: LATE_CRETACEOUS,
  diet: 'Carnivore',
  type: 'Pterosaur',
  habitat: 'Open floodplains & coastal regions',
  region: 'North America',

  overview:
    'One of the largest flying animals in Earth\'s history, possessing an enormous wingspan and towering height when standing.',
  lifeEnvironment:
    'Quetzalcoatlus soared over floodplains and coastlines before descending to hunt small animals, using its long beak to capture prey on land.',
  museumHighlight:
    'With an estimated wingspan exceeding 10 meters, Quetzalcoatlus rivaled the size of a small aircraft.',

  sceneImage: '/images/exhibits/quetzalcoatlus.jpg',
  focalPoint: '50% 50%',
  heightMeters: 5,
  gallery: [],
  facts: [
    { label: 'Diet', value: 'Carnivore' },
    { label: 'Type', value: 'Pterosaur' },
    { label: 'Habitat', value: 'Open floodplains & coastal regions' },
    { label: 'Height', value: '~5 m (16 ft)' },
    { label: 'Wingspan', value: '~10–11 m (33–36 ft)' },
  ],
},

{
  id: 'pachycephalosaurus',
  name: 'Pachycephalosaurus',
  scientificName: 'Pachycephalosaurus wyomingensis',
  pronunciation: 'PACK-ee-SEF-ah-loh-SORE-us',
  pronunciationAudio: 'Pachycephalosaurus',

  era: 'Cretaceous',
  period: LATE_CRETACEOUS,
  diet: 'Herbivore',
  type: 'Pachycephalosaur',
  habitat: 'Woodlands & open forests',
  region: 'North America',

  overview:
    'A small bipedal herbivore famous for its thick domed skull, which may have been used in display or combat between rivals.',
  lifeEnvironment:
    'Pachycephalosaurus wandered lightly wooded environments, feeding on low vegetation while using visual displays and possible head-butting behavior to compete for mates.',
  museumHighlight:
    'Its skull dome reached nearly 25 centimeters thick, making it one of the strongest skull structures known among dinosaurs.',

  sceneImage: '/images/exhibits/pachycephalosaurus.jpg',
  focalPoint: '50% 50%',
  heightMeters: 1.5,
  gallery: [],
  facts: [
    { label: 'Diet', value: 'Herbivore' },
    { label: 'Type', value: 'Pachycephalosaur' },
    { label: 'Habitat', value: 'Woodlands & open forests' },
    { label: 'Height', value: '~1.5 m (5 ft)' },
    { label: 'Weight', value: '~400–450 kg' },
  ],
},



]