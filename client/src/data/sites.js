export const SITES = [
  {
    id: 1, name: "Hell Creek Formation", country: "USA", state: "Montana", lat: 47.3, lng: -106.5,
    dinos: [
      { name: "Tyrannosaurus Rex", emoji: "🦖", period: "Late Cretaceous · 68–66 Ma", desc: "The apex predator of its age. T-Rex had the most powerful bite of any land animal ever measured — strong enough to shatter bone. 'Sue', the most complete skeleton ever found, was excavated here.", length: "12 m", weight: "8,000 kg", diet: "Carnivore" },
      { name: "Triceratops", emoji: "🦕", period: "Late Cretaceous · 68–66 Ma", desc: "The iconic three-horned giant. Triceratops frills were likely used for display and species recognition. Fossil evidence suggests they lived in large herds across the Cretaceous floodplains.", length: "9 m", weight: "6,000 kg", diet: "Herbivore" },
      { name: "Ankylosaurus", emoji: "🛡️", period: "Late Cretaceous · 68–66 Ma", desc: "A living tank. Its bone-club tail could shatter T-Rex leg bones with a single swing. Armour plates called osteoderms were embedded directly into the skin.", length: "8 m", weight: "6,000 kg", diet: "Herbivore" }
    ]
  },
  {
    id: 2, name: "Morrison Formation", country: "USA", state: "Colorado / Wyoming", lat: 39.5, lng: -107.5,
    dinos: [
      { name: "Brontosaurus", emoji: "🦕", period: "Late Jurassic · 156–151 Ma", desc: "Re-validated as its own species in 2015 after a century of confusion. A true giant of the Jurassic, using its immense neck to reach high vegetation in Cretaceous forests.", length: "22 m", weight: "15,000 kg", diet: "Herbivore" },
      { name: "Stegosaurus", emoji: "🦕", period: "Late Jurassic · 155–150 Ma", desc: "The diamond-shaped plates along its back were likely for thermoregulation and display. Its tail spikes — nicknamed the 'thagomizer' — were deadly defensive weapons.", length: "9 m", weight: "5,000 kg", diet: "Herbivore" },
      { name: "Allosaurus", emoji: "🦖", period: "Late Jurassic · 155–150 Ma", desc: "The dominant predator of the Jurassic. Unlike T-Rex it had long arms with three-clawed hands for grappling prey. Evidence suggests coordinated group attacks on large sauropods.", length: "12 m", weight: "2,300 kg", diet: "Carnivore" }
    ]
  },
  {
    id: 3, name: "Gobi Desert", country: "Mongolia", state: "Ömnögovi", lat: 43.5, lng: 103.0,
    dinos: [
      { name: "Velociraptor", emoji: "🦖", period: "Late Cretaceous · 75–71 Ma", desc: "The real Velociraptor was turkey-sized and feathered — far from the movie monster. A famous fossil locked in combat with a Protoceratops shows it was an active, intelligent hunter.", length: "2 m", weight: "15 kg", diet: "Carnivore" },
      { name: "Protoceratops", emoji: "🦕", period: "Late Cretaceous · 75–71 Ma", desc: "A sheep-sized ancestor of Triceratops. The famous 'Fighting Dinosaurs' fossil shows it locked in a death struggle with Velociraptor — both buried alive by a collapsing sand dune.", length: "1.8 m", weight: "180 kg", diet: "Herbivore" },
      { name: "Oviraptor", emoji: "🐦", period: "Late Cretaceous · 75–71 Ma", desc: "Long wrongly accused of stealing eggs, it was actually brooding its own nest. A devoted parent likely covered in feathers, with a distinctive crest and powerful beak.", length: "2 m", weight: "35 kg", diet: "Omnivore" }
    ]
  },
  {
    id: 4, name: "Liaoning Province", country: "China", state: "Liaoning", lat: 41.5, lng: 121.0,
    dinos: [
      { name: "Microraptor", emoji: "🐦", period: "Early Cretaceous · 125–120 Ma", desc: "A four-winged feathered dinosaur that glided between trees. Its discovery was the missing link proving birds evolved from small tree-dwelling dinosaurs — it had flight feathers on all four limbs.", length: "0.77 m", weight: "1 kg", diet: "Carnivore" },
      { name: "Yutyrannus", emoji: "🦖", period: "Early Cretaceous · 125 Ma", desc: "The largest known feathered animal ever — a 1.4-tonne T-Rex cousin blanketed in long filamentous feathers, likely for insulation during unusually cold Early Cretaceous winters.", length: "9 m", weight: "1,400 kg", diet: "Carnivore" }
    ]
  },
  {
    id: 5, name: "Patagonia", country: "Argentina", state: "Neuquén", lat: -40.5, lng: -68.5,
    dinos: [
      { name: "Argentinosaurus", emoji: "🦕", period: "Late Cretaceous · 96–92 Ma", desc: "Possibly the largest animal ever to walk Earth. A single vertebra taller than a person. Its heart would have needed to pump blood twelve metres upward to reach its brain.", length: "35 m", weight: "70,000 kg", diet: "Herbivore" },
      { name: "Giganotosaurus", emoji: "🦖", period: "Late Cretaceous · 99–97 Ma", desc: "Larger than T-Rex but built for speed over raw power, with a long skull and blade-like teeth. Likely hunted the titanosaurs of Patagonia, potentially in coordinated groups.", length: "13 m", weight: "8,000 kg", diet: "Carnivore" }
    ]
  },
  {
    id: 6, name: "Tendaguru Formation", country: "Tanzania", state: "Lindi", lat: -9.8, lng: 39.7,
    dinos: [
      { name: "Giraffatitan", emoji: "🦕", period: "Late Jurassic · 154–150 Ma", desc: "Once lumped with Brachiosaurus, this African giant held its head nearly 12 metres high. Its skeleton in Berlin's Natural History Museum is the tallest mounted dinosaur skeleton in the world.", length: "26 m", weight: "38,000 kg", diet: "Herbivore" },
      { name: "Kentrosaurus", emoji: "🦕", period: "Late Jurassic · 155–150 Ma", desc: "Africa's spikier answer to Stegosaurus — paired spikes ran all the way to the tail tip. Hundreds of individuals excavated from Tendaguru make it one of Africa's richest fossil sites.", length: "4.5 m", weight: "1,500 kg", diet: "Herbivore" }
    ]
  },
  {
    id: 7, name: "Solnhofen Limestone", country: "Germany", state: "Bavaria", lat: 48.9, lng: 11.1,
    dinos: [
      { name: "Archaeopteryx", emoji: "🐦", period: "Late Jurassic · 150 Ma", desc: "The most significant fossil ever found — the bridge between dinosaurs and birds. It had feathers and a wishbone like a bird, yet teeth and a bony tail like a dinosaur. The first 'bird'.", length: "0.5 m", weight: "0.9 kg", diet: "Carnivore" },
      { name: "Compsognathus", emoji: "🦎", period: "Late Jurassic · 150 Ma", desc: "Once thought to be the smallest dinosaur known — a nimble, chicken-sized predator. A remarkable fossil even preserves the skeleton of a lizard inside its stomach.", length: "0.65 m", weight: "3 kg", diet: "Carnivore" }
    ]
  },
  {
    id: 8, name: "Dinosaur Provincial Park", country: "Canada", state: "Alberta", lat: 50.7, lng: -111.5,
    dinos: [
      { name: "Albertosaurus", emoji: "🦖", period: "Late Cretaceous · 76–74 Ma", desc: "A smaller, faster cousin of T-Rex. A bone bed containing at least 26 individuals is the strongest evidence yet found for pack hunting in large predatory dinosaurs.", length: "9 m", weight: "1,700 kg", diet: "Carnivore" },
      { name: "Parasaurolophus", emoji: "🦕", period: "Late Cretaceous · 76–74 Ma", desc: "Famous for its hollow crest that functioned like a trombone — producing deep resonant calls that carried kilometres across Cretaceous floodplains for herd communication.", length: "9.5 m", weight: "2,500 kg", diet: "Herbivore" }
    ]
  },
  {
    id: 9, name: "Sahara — Niger", country: "Niger", state: "Agadez", lat: 17.5, lng: 9.0,
    dinos: [
      { name: "Spinosaurus", emoji: "🦖", period: "Cretaceous · 112–93 Ma", desc: "The longest carnivorous dinosaur ever — longer than T-Rex. New research reveals it was semi-aquatic, hunting fish in rivers. Its 1.8-metre neural spines formed a dramatic sail or hump.", length: "16 m", weight: "7,000 kg", diet: "Piscivore" },
      { name: "Nigersaurus", emoji: "🦕", period: "Cretaceous · 119–99 Ma", desc: "The 'Mesozoic lawnmower' — a sauropod with a wide vacuum-cleaner mouth containing 500 replaceable teeth in a perfectly straight row, designed to mow low vegetation at ground level.", length: "9 m", weight: "4,000 kg", diet: "Herbivore" }
    ]
  },
  {
    id: 10, name: "Lourinhã Formation", country: "Portugal", state: "Leiria", lat: 39.2, lng: -9.3,
    dinos: [
      { name: "Torvosaurus gurneyi", emoji: "🦖", period: "Late Jurassic · 152–148 Ma", desc: "Europe's largest known predator. Fossils were found alongside a nest of embryos — a rare window into Jurassic reproduction. This apex predator ruled the Portuguese coastal forests.", length: "10 m", weight: "4,000 kg", diet: "Carnivore" }
    ]
  }
];