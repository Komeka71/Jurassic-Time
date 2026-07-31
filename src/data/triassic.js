/**
 * Triassic dinosaur exhibit data — same object shape as jurassic.js (see
 * that file's header for the full field-by-field contract). The Era
 * Timeline engine doesn't know or care which era a dinosaur belongs to;
 * it just renders whatever array eraTimelines.js hands it, so populating
 * this array is the entire implementation of the Triassic experience.
 */

const LATE_TRIASSIC = 'Late Triassic'

export const triassicDinosaurs = [
 
  {
  id: 'eodromaeus',
  name: 'Eodromaeus',
  scientificName: 'Eodromaeus murphi',
  pronunciation: 'EE-oh-DRO-may-us',
  pronunciationAudio: 'Eodromaeus',

  era: 'Triassic',
  period: LATE_TRIASSIC,
  diet: 'Carnivore',
  type: 'Theropod',
  habitat: 'Semi-arid floodplains',
  region: 'South America',

  overview:
    'A swift early theropod, Eodromaeus was built for speed and is among the oldest known relatives of later meat-eating dinosaurs.',

  lifeEnvironment:
    'Eodromaeus sprinted across dry floodplains hunting insects, lizards, and other small vertebrates. Its lightweight frame and long legs made it one of the fastest hunters of the Late Triassic.',

  museumHighlight:
    'Its remarkably complete skeleton has helped scientists understand how the earliest theropods evolved into the giant predators of later eras.',

  sceneImage: '/images/exhibits/eodromaeus.jpg',
  focalPoint: '50% 45%',
  heightMeters: 1.2,
  gallery: [],

  facts: [
    { label: 'Diet', value: 'Carnivore' },
    { label: 'Type', value: 'Theropod' },
    { label: 'Habitat', value: 'Semi-arid floodplains' },
    { label: 'Height', value: '~1.2 m (4 ft)' },
    { label: 'Weight', value: '~15–20 kg' },
  ],
},
 


  {
  id: 'melanorosaurus',
  name: 'Melanorosaurus',
  scientificName: 'Melanorosaurus readi',
  pronunciation: 'Mel-an-or-oh-SORE-us',
  pronunciationAudio: 'Melanorosaurus',

  era: 'Triassic',
  period: LATE_TRIASSIC,
  diet: 'Herbivore',
  type: 'Sauropodomorph',
  habitat: 'Seasonal woodlands & floodplains',
  region: 'South Africa',

  overview:
    'A massive early sauropodomorph with a heavily built body, Melanorosaurus foreshadowed the gigantic long-necked dinosaurs of the Jurassic Period.',

  lifeEnvironment:
    'Melanorosaurus spent much of its day feeding on conifers, cycads, and low-growing vegetation across seasonal floodplains. Its sturdy limbs supported a body much heavier than most other Triassic herbivores, allowing it to exploit food sources unavailable to smaller dinosaurs.',

  museumHighlight:
    'Melanorosaurus is considered one of the closest Triassic relatives of the enormous sauropods that would later dominate prehistoric ecosystems.',

  sceneImage: '/images/exhibits/melanorosaurus.jpg',
  focalPoint: '50% 18%',
  heightMeters: 3.8,
  gallery: [],

  facts: [
    { label: 'Diet', value: 'Herbivore' },
    { label: 'Type', value: 'Sauropodomorph' },
    { label: 'Habitat', value: 'Seasonal woodlands & floodplains' },
    { label: 'Height', value: '~3.8 m (12.5 ft)' },
    { label: 'Weight', value: '~2–3 tons' },
  ],
},
 
  {
  id: 'liliensternus',
  name: 'Liliensternus',
  scientificName: 'Liliensternus liliensterni',
  pronunciation: 'Lil-ee-en-STERN-us',
  pronunciationAudio: 'Liliensternus',

  era: 'Triassic',
  period: LATE_TRIASSIC,
  diet: 'Carnivore',
  type: 'Theropod',
  habitat: 'Conifer forests & river valleys',
  region: 'Europe',

  overview:
    'One of the largest carnivorous dinosaurs of the Late Triassic, Liliensternus was a swift apex predator and an early representative of the theropod lineage.',

  lifeEnvironment:
    'Liliensternus patrolled dense conifer forests and winding river valleys in search of prey, using its long legs and sharp teeth to hunt smaller dinosaurs and reptiles. It occupied the top of the food chain in many Late Triassic ecosystems.',

  museumHighlight:
    'Although living millions of years before Allosaurus and Tyrannosaurus, Liliensternus already displayed many of the features that would define later giant theropod predators.',

  sceneImage: '/images/exhibits/liliensternus.jpg',
  focalPoint: '50% 38%',
  heightMeters: 2.5,
  gallery: [],

  facts: [
    { label: 'Diet', value: 'Carnivore' },
    { label: 'Type', value: 'Theropod' },
    { label: 'Habitat', value: 'Conifer forests & river valleys' },
    { label: 'Height', value: '~2.5 m (8 ft)' },
    { label: 'Weight', value: '~300–400 kg' },
  ],
},
  {
    id: 'coelophysis',
    name: 'Coelophysis',
    scientificName: 'Coelophysis bauri',
    pronunciation: 'SEE-loh-FY-sis',
    pronunciationAudio: 'Coelophysis',

    era: 'Triassic',
    period: LATE_TRIASSIC,
    diet: 'Carnivore',
    type: 'Theropod',
    habitat: 'Semi-arid floodplains',
    region: 'North America',

    overview:
      'A small, swift, and agile predator, among the earliest dinosaurs known from a large, well-preserved fossil population.',
    lifeEnvironment:
      'Coelophysis moved in large groups across Late Triassic floodplains, using speed and sharp teeth to hunt small reptiles, insects, and other early dinosaurs sharing its world.',
    museumHighlight:
      'Hundreds of Coelophysis skeletons were discovered together at Ghost Ranch, New Mexico \u2014 one of the largest dinosaur bonebeds ever found.',

    sceneImage: '/images/exhibits/coelophysis.jpg',
    focalPoint: '50% 50%',
    heightMeters: 1,
    gallery: [],
    facts: [
      { label: 'Diet', value: 'Carnivore' },
      { label: 'Type', value: 'Theropod' },
      { label: 'Habitat', value: 'Semi-arid floodplains' },
      { label: 'Height', value: '~1 m (3 ft)' },
      { label: 'Weight', value: '~15\u201330 kg' },
    ],
  },


  {
    id: 'plateosaurus',
    name: 'Plateosaurus',
    scientificName: 'Plateosaurus engelhardti',
    pronunciation: 'PLAT-ee-oh-SORE-us',
    pronunciationAudio: 'Plateosaurus',

    era: 'Triassic',
    period: LATE_TRIASSIC,
    diet: 'Herbivore',
    type: 'Sauropodomorph',
    habitat: 'Seasonal floodplains & conifer woodlands',
    region: 'Europe',

    overview:
      'One of the earliest large herbivorous dinosaurs, capable of rearing onto its hind legs to reach high vegetation.',
    lifeEnvironment:
      'Plateosaurus moved in loose herds across seasonal floodplains, browsing ferns and conifers and occasionally rearing up on its hind legs to reach higher branches beyond the grasp of smaller herbivores.',
    museumHighlight:
      'Mass graveyards containing dozens of Plateosaurus skeletons have been found in Germany, suggesting herds may have died together during droughts or floods.',

    sceneImage: '/images/exhibits/plateosaurus.jpg',
    focalPoint: '50% 50%',
    heightMeters: 2.1,
    gallery: [],
    facts: [
      { label: 'Diet', value: 'Herbivore' },
      { label: 'Type', value: 'Sauropodomorph' },
      { label: 'Habitat', value: 'Seasonal floodplains & conifer woodlands' },
      { label: 'Height', value: '~2.1 m (7 ft)' },
      { label: 'Weight', value: '~4 tons' },
    ],
  },
  {
    id: 'herrerasaurus',
    name: 'Herrerasaurus',
    scientificName: 'Herrerasaurus ischigualastensis',
    pronunciation: 'heh-RARE-ah-SORE-us',
    pronunciationAudio: 'Herrerasaurus',

    era: 'Triassic',
    period: LATE_TRIASSIC,
    diet: 'Carnivore',
    type: 'Herrerasaurid',
    habitat: 'Semi-arid highlands',
    region: 'South America',

    overview:
      'One of the earliest known true dinosaurs, a swift and lightly built predator that hunted among the first dinosaur communities.',
    lifeEnvironment:
      'Herrerasaurus prowled the highlands of what is now Argentina, using speed and grasping claws to hunt small reptiles and early dinosaur relatives in a world still dominated by non-dinosaur reptiles.',
    museumHighlight:
      'Herrerasaurus lived alongside early dinosaur relatives that were still a minority among the reptiles of its time, offering a rare window into the very beginning of the dinosaur age.',

    sceneImage: '/images/exhibits/herrerasaurus.jpg',
    focalPoint: '50% 50%',
    heightMeters: 1.1,
    gallery: [],
    facts: [
      { label: 'Diet', value: 'Carnivore' },
      { label: 'Type', value: 'Herrerasaurid' },
      { label: 'Habitat', value: 'Semi-arid highlands' },
      { label: 'Height', value: '~1.1 m (3.5 ft)' },
      { label: 'Weight', value: '~210\u2013350 kg' },
    ],
  },
 
  {
  id: 'eoraptor',
  name: 'Eoraptor',
  scientificName: 'Eoraptor lunensis',
  pronunciation: 'EE-oh-RAP-tor',
  pronunciationAudio: 'Eoraptor',

  era: 'Triassic',
  period: LATE_TRIASSIC,
  diet: 'Omnivore',
  type: 'Basal Dinosaur',
  habitat: 'River valleys & seasonal woodlands',
  region: 'South America',

  overview:
    'One of the earliest known dinosaurs, Eoraptor was a small, lightly built omnivore that represents the dawn of dinosaur evolution.',

  lifeEnvironment:
    'Eoraptor lived among river valleys and sparse woodlands, feeding on insects, small vertebrates, fruits, and vegetation. Its agile body allowed it to move quickly through a landscape still dominated by crocodile-like reptiles rather than dinosaurs.',

  museumHighlight:
    'Discovered in Argentina, Eoraptor is considered one of the oldest and most primitive dinosaurs ever found, dating back roughly 231 million years.',

  sceneImage: '/images/exhibits/eoraptor.jpg',
  focalPoint: '50% 45%',
  heightMeters: 0.4,
  gallery: [],

  facts: [
    { label: 'Diet', value: 'Omnivore' },
    { label: 'Type', value: 'Basal Dinosaur' },
    { label: 'Habitat', value: 'River valleys & seasonal woodlands' },
    { label: 'Height', value: '~0.4 m (1.3 ft)' },
    { label: 'Weight', value: '~10 kg' },
  ],
},



{
  id: 'daemonosaurus',
  name: 'Daemonosaurus',
  scientificName: 'Daemonosaurus chauliodus',
  pronunciation: 'DEE-mon-oh-SORE-us',
  pronunciationAudio: 'Daemonosaurus',

  era: 'Triassic',
  period: LATE_TRIASSIC,
  diet: 'Carnivore',
  type: 'Theropod',
  habitat: 'Wooded floodplains',
  region: 'North America',

  overview:
    'A small predatory dinosaur distinguished by its unusually short skull and elongated front teeth, representing an early branch of theropod evolution.',

  lifeEnvironment:
    'Daemonosaurus hunted among wooded floodplains and dense vegetation, using its sharp teeth to seize insects, reptiles, and other small prey hidden beneath ferns and fallen logs.',

  museumHighlight:
    'Its unique skull combines primitive and advanced characteristics, making Daemonosaurus an important clue in understanding early dinosaur evolution.',

  sceneImage: '/images/exhibits/daemonosaurus.jpg',
  focalPoint: '50% 45%',
  heightMeters: 0.8,
  gallery: [],

  facts: [
    { label: 'Diet', value: 'Carnivore' },
    { label: 'Type', value: 'Theropod' },
    { label: 'Habitat', value: 'Wooded floodplains' },
    { label: 'Height', value: '~0.8 m (2.6 ft)' },
    { label: 'Weight', value: '~15 kg' },
  ],
},

{
  id: 'riojasaurus',
  name: 'Riojasaurus',
  scientificName: 'Riojasaurus incertus',
  pronunciation: 'Ree-OH-ha-SORE-us',
  pronunciationAudio: 'Riojasaurus',

  era: 'Triassic',
  period: LATE_TRIASSIC,
  diet: 'Herbivore',
  type: 'Sauropodomorph',
  habitat: 'River floodplains & open woodlands',
  region: 'South America',

  overview:
    'One of the largest herbivorous dinosaurs of the Late Triassic, Riojasaurus marked an important step toward the giant long-necked sauropods that would dominate the Jurassic.',

  lifeEnvironment:
    'Riojasaurus wandered broad floodplains covered with conifers, cycads, and ferns, feeding on abundant vegetation. Its powerful legs and long neck allowed it to browse a wide variety of plants while living alongside some of the earliest carnivorous dinosaurs.',

  museumHighlight:
    'Riojasaurus was among the first dinosaurs to evolve the large body size that later became a defining feature of Jurassic sauropods.',

  sceneImage: '/images/exhibits/riojasaurus.jpg',
  focalPoint: '50% 18%',
  heightMeters: 3.6,
  gallery: [],

  facts: [
    { label: 'Diet', value: 'Herbivore' },
    { label: 'Type', value: 'Sauropodomorph' },
    { label: 'Habitat', value: 'River floodplains & open woodlands' },
    { label: 'Height', value: '~3.6 m (12 ft)' },
    { label: 'Weight', value: '~3–4 tons' },
  ],
},



{
  id: 'pampadromaeus',
  name: 'Pampadromaeus',
  scientificName: 'Pampadromaeus barberenai',
  pronunciation: 'Pam-pah-DRO-may-us',
  pronunciationAudio: 'Pampadromaeus',

  era: 'Triassic',
  period: LATE_TRIASSIC,
  diet: 'Omnivore',
  type: 'Sauropodomorph',
  habitat: 'Seasonal floodplains & open woodlands',
  region: 'South America',

  overview:
    'A small, agile early sauropodomorph, Pampadromaeus represents an important stage in the evolution of the gigantic long-necked herbivores that would later dominate the Jurassic.',

  lifeEnvironment:
    'Pampadromaeus moved through seasonal woodlands and floodplains, feeding on insects, small animals, and vegetation. Its flexible diet and lightweight build allowed it to thrive in the rapidly changing ecosystems of the Late Triassic.',

  museumHighlight:
    'Pampadromaeus preserves characteristics of both primitive dinosaurs and later sauropodomorphs, making it an important evolutionary link.',

  sceneImage: '/images/exhibits/pampadromaeus.jpg',
  focalPoint: '50% 45%',
  heightMeters: 0.9,
  gallery: [],

  facts: [
    { label: 'Diet', value: 'Omnivore' },
    { label: 'Type', value: 'Sauropodomorph' },
    { label: 'Habitat', value: 'Seasonal floodplains & open woodlands' },
    { label: 'Height', value: '~0.9 m (3 ft)' },
    { label: 'Weight', value: '~15–25 kg' },
  ],
},



]