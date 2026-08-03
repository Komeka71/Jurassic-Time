/**
 * Jurassic dinosaur exhibit data. This is the same data model used by
 * every era file (triassic.js, cretaceous.js) — the Era Timeline engine
 * (pages/EraTimeline.jsx) doesn't know or care which era a dinosaur
 * belongs to, it just renders whatever array eras.js hands it.
 *
 * See ADDING A NEW DINOSAUR at the bottom of this file — no other file
 * needs to change to add one. Every field below except id/name/facts/
 * sceneImage is optional; the Exhibit Panel and info panel skip any
 * section whose field is missing rather than rendering it empty.
 */

const LATE_JURASSIC = 'Late Jurassic'

export const jurassicDinosaurs = [
  {
    id: 'brachiosaurus',
    name: 'Brachiosaurus',
    scientificName: 'Brachiosaurus altithorax',

    // Displayed pronunciation text, and the (usually plainer) string
    // handed to the browser's Speech Synthesis API.
    pronunciation: 'Brack-ee-oh-SORE-us',
    pronunciationAudio: 'Brachiosaurus',

    era: 'Jurassic',
    period: LATE_JURASSIC,
    diet: 'Herbivore',
    type: 'Sauropod',
    habitat: 'Floodplains & conifer forests',
    region: 'North America',

    overview:
      'One of the tallest and largest herbivores of the Jurassic, browsing tall conifers with its immense neck.',
    lifeEnvironment:
      'Towering above the forest canopy, Brachiosaurus spent most of its day feeding on conifers beyond the reach of other herbivores. Its immense size offered protection from many predators while shaping the Jurassic landscape around it.',
    museumHighlight:
      'A fully grown Brachiosaurus may have eaten hundreds of kilograms of vegetation every day.',

    sceneImage: '/images/exhibits/brachiosaurus.jpg',
    // Optional. Biases the scene's cover-crop toward the top of the frame
    // so a tall subject's neck/head reads fully — useful until revised
    // artwork with extra headroom replaces the current placeholder.
    // Defaults to '50% 50%' (plain center crop) if omitted.
    focalPoint: '50% 12%',

    // Optional, numeric (meters). Not currently rendered — the panel's
    // size-comparison bars were removed pending a proper silhouette-based
    // redesign — but kept here since it's real data that redesign will
    // want. The human-readable version still lives in facts[] below.
    heightMeters: 13,

    // Optional. Additional images for the Exhibit Panel gallery; the
    // gallery section hides entirely when this is empty.
    gallery: [],

    // Rendered directly, in this order, by the info panel and the
    // Exhibit Panel's Quick Facts — add, remove, reorder, or rename
    // entries freely, nothing else needs to change.
    facts: [
      { label: 'Diet', value: 'Herbivore' },
      { label: 'Type', value: 'Sauropod' },
      { label: 'Habitat', value: 'Floodplains & conifer forests' },
      { label: 'Height', value: '~13 m (43 ft)' },
      { label: 'Weight', value: '~35–60 tons' },
    ],
  },


  
  {
    id: 'stegosaurus',
    name: 'Stegosaurus',
    scientificName: 'Stegosaurus stenops',
    pronunciation: 'STEG-oh-SORE-us',
    pronunciationAudio: 'Stegosaurus',
    era: 'Jurassic',
    period: LATE_JURASSIC,
    diet: 'Herbivore',
    type: 'Thyreophoran',
    habitat: 'Fern prairies & woodland edges',
    region: 'North America',
    overview:
      'Instantly recognizable for its rows of bony plates and spiked tail, used for display and defense.',
    lifeEnvironment:
      'Grazing quietly among ferns and cycads, Stegosaurus carried its own defense wherever it went \u2014 a row of towering plates and a spiked tail ready to answer any predator bold enough to approach.',
    museumHighlight:
      'Stegosaurus had a brain roughly the size of a walnut, one of the smallest brain-to-body ratios of any known dinosaur.',
    sceneImage: '/images/exhibits/stegosaurus.jpg',
    focalPoint: '50% 50%',
    heightMeters: 4,
    gallery: [],
    facts: [
      { label: 'Diet', value: 'Herbivore' },
      { label: 'Type', value: 'Thyreophoran' },
      { label: 'Habitat', value: 'Fern prairies & woodland edges' },
      { label: 'Height', value: '~4 m (13 ft)' },
      { label: 'Weight', value: '~3.8–5 tons' },
    ],
  },

   

{
  id: 'ceratosaurus',
  name: 'Ceratosaurus',
  scientificName: 'Ceratosaurus nasicornis',
  pronunciation: 'Ser-at-oh-SORE-us',
  pronunciationAudio: 'Ceratosaurus',

  era: 'Jurassic',
  period: LATE_JURASSIC,
  diet: 'Carnivore',
  type: 'Theropod',
  habitat: 'River valleys & floodplains',
  region: 'North America',

  overview:
    'Recognizable by the distinctive horn on its snout, Ceratosaurus was a formidable predator that hunted smaller dinosaurs and other prey across Jurassic floodplains.',

  lifeEnvironment:
    'Ceratosaurus thrived near rivers and wetlands where prey was plentiful. Its powerful jaws, sharp teeth, and agile body allowed it to hunt efficiently while competing with larger predators like Allosaurus.',

  museumHighlight:
    'The prominent nasal horn may have been used for display, species recognition, or combat with rivals.',

  sceneImage: '/images/exhibits/ceratosaurus.jpg',
  focalPoint: '50% 40%',
  heightMeters: 3.5,

  gallery: [],

  facts: [
    { label: 'Diet', value: 'Carnivore' },
    { label: 'Type', value: 'Theropod' },
    { label: 'Habitat', value: 'River valleys & floodplains' },
    { label: 'Height', value: '~3.5 m (11.5 ft)' },
    { label: 'Weight', value: '~700 kg–1 ton' },
  ],
},


{
  id: 'dryosaurus',
  name: 'Dryosaurus',
  scientificName: 'Dryosaurus altus',
  pronunciation: 'Dry-oh-SORE-us',
  pronunciationAudio: 'Dryosaurus',

  era: 'Jurassic',
  period: LATE_JURASSIC,
  diet: 'Herbivore',
  type: 'Ornithopod',
  habitat: 'Woodlands & fern prairies',
  region: 'North America',

  overview:
    'A fast and lightly built herbivore, Dryosaurus relied on speed and agility rather than armor to escape Jurassic predators.',

  lifeEnvironment:
    'Dryosaurus grazed on low-growing plants and shrubs throughout open woodlands and fern-covered plains. Constantly alert, it depended on its excellent eyesight and swift legs to evade predators such as Allosaurus and Ceratosaurus.',

  museumHighlight:
    'Its long hind legs suggest it was one of the fastest herbivorous dinosaurs of the Jurassic Period.',

  sceneImage: '/images/exhibits/dryosaurus.jpg',
  focalPoint: '50% 42%',
  heightMeters: 1.5,

  gallery: [],

  facts: [
    { label: 'Diet', value: 'Herbivore' },
    { label: 'Type', value: 'Ornithopod' },
    { label: 'Habitat', value: 'Woodlands & fern prairies' },
    { label: 'Height', value: '~1.5 m (5 ft)' },
    { label: 'Weight', value: '~80–100 kg' },
  ],
},

{
  id: 'archaeopteryx',
  name: 'Archaeopteryx',
  scientificName: 'Archaeopteryx lithographica',
  pronunciation: 'Ar-kee-op-TAIR-iks',
  pronunciationAudio: 'Archaeopteryx',

  era: 'Jurassic',
  period: LATE_JURASSIC,
  diet: 'Carnivore',
  type: 'Avialan',
  habitat: 'Coastal islands & subtropical forests',
  region: 'Europe',

  overview:
    'One of the earliest known bird-like dinosaurs, Archaeopteryx possessed feathers, wings, teeth, and a long bony tail, bridging the evolutionary gap between dinosaurs and modern birds.',

  lifeEnvironment:
    'Living among warm island forests, Archaeopteryx climbed trees, glided between branches, and hunted insects, small reptiles, and other tiny prey. Although capable of short flights or glides, it still retained many characteristics of its dinosaur ancestors.',

  museumHighlight:
    'Archaeopteryx is one of the most significant fossils ever discovered, providing some of the strongest evidence that birds evolved from theropod dinosaurs.',

  sceneImage: '/images/exhibits/archaeopteryx.jpg',
  focalPoint: '50% 35%',
  heightMeters: 0.5,

  gallery: [],

  facts: [
    { label: 'Diet', value: 'Carnivore' },
    { label: 'Type', value: 'Avialan' },
    { label: 'Habitat', value: 'Coastal islands & subtropical forests' },
    { label: 'Height', value: '~0.5 m (1.6 ft)' },
    { label: 'Weight', value: '~0.8–1 kg' },
  ],
},


  {
    id: 'allosaurus',
    name: 'Allosaurus',
    scientificName: 'Allosaurus fragilis',
    pronunciation: 'Al-oh-SORE-us',
    pronunciationAudio: 'Allosaurus',
    era: 'Jurassic',
    period: LATE_JURASSIC,
    diet: 'Carnivore',
    type: 'Theropod',
    habitat: 'Semi-arid floodplains',
    region: 'North America',
    overview:
      'The dominant predator of its ecosystem — an agile, powerful hunter of large herbivorous dinosaurs.',
    lifeEnvironment:
      'Moving in on unsuspecting prey across sunlit floodplains, Allosaurus relied on speed, sharp senses, and powerful jaws to bring down animals many times its own size, establishing itself as the undisputed ruler of its world.',
    museumHighlight:
      'Allosaurus is known from hundreds of fossil specimens, making it one of the best-understood large theropods.',
    sceneImage: '/images/exhibits/allosaurus.jpg',
    focalPoint: '50% 50%',
    heightMeters: 4.5,
    gallery: [],
    facts: [
      { label: 'Diet', value: 'Carnivore' },
      { label: 'Type', value: 'Theropod' },
      { label: 'Habitat', value: 'Semi-arid floodplains' },
      { label: 'Height', value: '~4.5 m (15 ft)' },
      { label: 'Weight', value: '~2–2.3 tons' },
    ],
  },


{
  id: 'compsognathus',
  name: 'Compsognathus',
  scientificName: 'Compsognathus longipes',
  pronunciation: 'Comp-SOG-nath-us',
  pronunciationAudio: 'Compsognathus',

  era: 'Jurassic',
  period: LATE_JURASSIC,
  diet: 'Carnivore',
  type: 'Coelurosaur',
  habitat: 'Coastal forests',
  region: 'Europe',

  overview:
    'One of the smallest known dinosaurs, Compsognathus was a swift predator that hunted insects, lizards, and other tiny animals among the forests of the Late Jurassic.',

  lifeEnvironment:
    'Quick and agile, Compsognathus darted through dense vegetation searching for small prey. Its lightweight body and long legs made it an efficient hunter capable of outrunning many larger predators.',

  museumHighlight:
    'Roughly the size of a modern turkey, Compsognathus demonstrated that not all dinosaurs were enormous giants.',

  sceneImage: '/images/exhibits/compsognathus.jpg',
  focalPoint: '50% 45%',
  heightMeters: 0.6,

  gallery: [],

  facts: [
    { label: 'Diet', value: 'Carnivore' },
    { label: 'Type', value: 'Coelurosaur' },
    { label: 'Habitat', value: 'Coastal forests' },
    { label: 'Height', value: '~0.6 m (2 ft)' },
    { label: 'Weight', value: '~3 kg (6.5 lb)' },
  ],
},



{
  id: 'camarasaurus',
  name: 'Camarasaurus',
  scientificName: 'Camarasaurus lentus',
  pronunciation: 'Cam-ar-ah-SORE-us',
  pronunciationAudio: 'Camarasaurus',

  era: 'Jurassic',
  period: LATE_JURASSIC,
  diet: 'Herbivore',
  type: 'Sauropod',
  habitat: 'Floodplains & conifer forests',
  region: 'North America',

  overview:
    'A sturdy long-necked herbivore with a shorter neck than many other sauropods, Camarasaurus was one of the most common giants of the Late Jurassic.',

  lifeEnvironment:
    'Roaming broad floodplains rich with conifers, cycads, and ferns, Camarasaurus spent much of its day feeding on tough vegetation. Its powerful jaws and spoon-shaped teeth allowed it to consume plants that many other sauropods could not.',

  museumHighlight:
    'More Camarasaurus fossils have been discovered than almost any other Jurassic sauropod, giving scientists an exceptional understanding of its anatomy and lifestyle.',

  sceneImage: '/images/exhibits/camarasaurus.jpg',
  focalPoint: '50% 18%',
  heightMeters: 7.5,

  gallery: [],

  facts: [
    { label: 'Diet', value: 'Herbivore' },
    { label: 'Type', value: 'Sauropod' },
    { label: 'Habitat', value: 'Floodplains & conifer forests' },
    { label: 'Height', value: '~7.5 m (25 ft)' },
    { label: 'Weight', value: '~18–25 tons' },
  ],
},

{
  id: 'kentrosaurus',
  name: 'Kentrosaurus',
  scientificName: 'Kentrosaurus aethiopicus',
  pronunciation: 'Ken-tro-SORE-us',
  pronunciationAudio: 'Kentrosaurus',

  era: 'Jurassic',
  period: LATE_JURASSIC,
  diet: 'Herbivore',
  type: 'Thyreophoran',
  habitat: 'Woodlands & floodplains',
  region: 'Africa',

  overview:
    'A close relative of Stegosaurus, Kentrosaurus defended itself with sharp shoulder spikes and a heavily armed tail.',

  lifeEnvironment:
    'Kentrosaurus grazed on low-growing vegetation throughout wooded floodplains while relying on its impressive array of spikes to discourage predators. Though smaller than Stegosaurus, its defenses made it a dangerous target.',

  museumHighlight:
    'Unlike Stegosaurus, Kentrosaurus possessed long shoulder spikes that may have provided additional protection against attacking predators.',

  sceneImage: '/images/exhibits/kentrosaurus.jpg',
  focalPoint: '50% 42%',
  heightMeters: 2,

  gallery: [],

  facts: [
    { label: 'Diet', value: 'Herbivore' },
    { label: 'Type', value: 'Thyreophoran' },
    { label: 'Habitat', value: 'Woodlands & floodplains' },
    { label: 'Height', value: '~2 m (6.5 ft)' },
    { label: 'Weight', value: '~1–2 tons' },
  ],
},


{
  id: 'diplodocus',
  name: 'Diplodocus',
  scientificName: 'Diplodocus longus',
  pronunciation: 'Dip-LOD-oh-kus',
  pronunciationAudio: 'Diplodocus',

  era: 'Jurassic',
  period: LATE_JURASSIC,
  diet: 'Herbivore',
  type: 'Sauropod',
  habitat: 'River floodplains',
  region: 'North America',

  overview:
    'One of the longest dinosaurs ever discovered, Diplodocus used its remarkable neck to feed on low-growing vegetation across vast Jurassic floodplains.',

  lifeEnvironment:
    'Living among rivers, conifer forests, and fern-covered plains, Diplodocus likely traveled in herds for protection while slowly browsing vegetation throughout the day. Its immense body and sweeping tail made it an unmistakable presence in the Late Jurassic landscape.',

  museumHighlight:
    'Its extraordinarily long, whip-like tail may have been used for defense, communication, or producing a loud cracking sound.',

  sceneImage: '/images/exhibits/diplodocus.jpg',
  focalPoint: '50% 18%',
  heightMeters: 5.5,

  gallery: [],

  facts: [
    { label: 'Diet', value: 'Herbivore' },
    { label: 'Type', value: 'Sauropod' },
    { label: 'Habitat', value: 'River floodplains' },
    { label: 'Height', value: '~5.5 m (18 ft)' },
    { label: 'Weight', value: '~15–20 tons' },
  ],
},


{
  id: 'torvosaurus',
  name: 'Torvosaurus',
  scientificName: 'Torvosaurus tanneri',
  pronunciation: 'TOR-vo-SORE-us',
  pronunciationAudio: 'Torvosaurus',

  era: 'Jurassic',
  period: LATE_JURASSIC,
  diet: 'Carnivore',
  type: 'Theropod',
  habitat: 'Floodplains & open forests',
  region: 'North America',

  overview:
    'Among the largest predators of the Jurassic, Torvosaurus possessed massive jaws and powerful claws capable of tackling enormous prey.',

  lifeEnvironment:
    'Roaming expansive floodplains and open forests, Torvosaurus hunted large herbivorous dinosaurs while competing with other apex predators such as Allosaurus. Its strength made it one of the most fearsome hunters of its era.',

  museumHighlight:
    'Torvosaurus had some of the largest teeth of any Jurassic theropod, measuring over 10 centimeters (4 inches) long.',

  sceneImage: '/images/exhibits/torvosaurus.jpg',
  focalPoint: '50% 38%',
  heightMeters: 4.8,

  gallery: [],

  facts: [
    { label: 'Diet', value: 'Carnivore' },
    { label: 'Type', value: 'Theropod' },
    { label: 'Habitat', value: 'Floodplains & open forests' },
    { label: 'Height', value: '~4.8 m (16 ft)' },
    { label: 'Weight', value: '~4–5 tons' },
  ],
},

{
  id: 'apatosaurus',
  name: 'Apatosaurus',
  scientificName: 'Apatosaurus louisae',
  pronunciation: 'Ap-at-oh-SORE-us',
  pronunciationAudio: 'Apatosaurus',

  era: 'Jurassic',
  period: LATE_JURASSIC,
  diet: 'Herbivore',
  type: 'Sauropod',
  habitat: 'Floodplains & open woodlands',
  region: 'North America',

  overview:
    'A massive long-necked herbivore known for its thick neck and sturdy build, Apatosaurus was among the largest land animals of its time.',

  lifeEnvironment:
    'Apatosaurus wandered through lush floodplains filled with conifers, cycads, and ferns, using its powerful neck to strip vegetation while sharing its habitat with predators such as Allosaurus and Ceratosaurus.',

  museumHighlight:
    'Originally confused with Brontosaurus, Apatosaurus became one of the most famous dinosaurs in paleontology.',

  sceneImage: '/images/exhibits/apatosaurus.jpg',
  focalPoint: '50% 16%',
  heightMeters: 5,

  gallery: [],

  facts: [
    { label: 'Diet', value: 'Herbivore' },
    { label: 'Type', value: 'Sauropod' },
    { label: 'Habitat', value: 'Floodplains & open woodlands' },
    { label: 'Height', value: '~5 m (16 ft)' },
    { label: 'Weight', value: '~20–30 tons' },
  ],
},

]

/**
 * ADDING A NEW DINOSAUR (e.g. Diplodocus)
 * ----------------------------------------
 * 1. Add the image at:
 *      public/images/exhibits/diplodocus.jpg
 *
 * 2. Append one object to the array above:
 *
 *      {
 *        id: 'diplodocus',
 *        name: 'Diplodocus',
 *        scientificName: 'Diplodocus longus',       // optional
 *        pronunciation: 'Dip-LOD-oh-kus',            // optional
 *        pronunciationAudio: 'Diplodocus',           // optional, used for speech
 *        era: 'Jurassic',
 *        period: LATE_JURASSIC,                      // optional
 *        diet: 'Herbivore',
 *        type: 'Sauropod',
 *        habitat: 'River floodplains',
 *        region: 'North America',                    // optional
 *        overview: 'One of the longest animals ever to exist...',
 *        lifeEnvironment: 'Diplodocus roamed in herds...', // optional
 *        museumHighlight: 'Its whip-like tail may have...',  // optional
 *        sceneImage: '/images/exhibits/diplodocus.jpg',
 *        focalPoint: '50% 50%',                       // optional
 *        heightMeters: 5.5,                            // optional, real data for a future silhouette-based size feature
 *        gallery: [],                                  // optional
 *        facts: [
 *          { label: 'Diet', value: 'Herbivore' },
 *          { label: 'Type', value: 'Sauropod' },
 *          { label: 'Habitat', value: 'River floodplains' },
 *          { label: 'Height', value: '~5.5 m (18 ft)' },
 *          { label: 'Weight', value: '~15–20 tons' },
 *        ],
 *      }
 *
 * 3. Done. Nothing else in the codebase changes — the Era Timeline
 *    engine, the info panel, and the Exhibit Panel all read this array
 *    (via eras.js) directly. Any field left out simply causes that
 *    panel's section to be skipped (e.g. no `gallery` entries hides the
 *    Gallery section, no `pronunciation` hides the pronunciation row).
 */