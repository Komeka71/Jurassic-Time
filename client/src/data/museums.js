// Museum Explorer — factual reference data
// Image paths are placeholders for hackathon demo assets.
// Drop real photography into /public/images/museums/<slug>/ to replace.

export const categories = [
  { id: "research", label: "Research" },
  { id: "dinosaurs", label: "Dinosaurs" },
  { id: "fossils", label: "Fossils" },
  { id: "ice-age", label: "Ice Age" },
  { id: "marine-reptiles", label: "Marine Reptiles" },
];

export const museums = [
  {
    slug: "royal-tyrrell",
    name: "Royal Tyrrell Museum",
    country: "Canada",
    city: "Drumheller, Alberta",
    tags: ["dinosaurs", "research", "fossils"],
    shortDescription:
      "Set in the Alberta badlands, one of the world's leading centres for dinosaur research, built on the fossil-rich rock of the Horseshoe Canyon and Judith River formations.",
    featuredExhibitCount: 4,
    heroImage:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Entrance,_Royal_Tyrrell_Museum_of_Palaeontology,_Drumheller,_Alberta,_2025-07-13.jpg",
    thumbnail:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Entrance,_Royal_Tyrrell_Museum_of_Palaeontology,_Drumheller,_Alberta,_2025-07-13.jpg",
    gridSize: "tall",
    about:
      "The Royal Tyrrell Museum opened in 1985 in the Drumheller badlands, a landscape carved by glacial meltwater into a maze of hoodoos and exposed sedimentary layers. Because so much rock is laid bare here, Alberta has become one of the densest dinosaur fossil beds on Earth, and the museum was purpose-built beside that resource rather than in a distant capital city. The building itself, designed by BCW Architects, was shaped around 27 requirements from the museum's founding director, including a mandate to harmonize with the surrounding badlands and let visitors' eyes adjust gradually from the bright prairie light outside to the dim galleries within.",
    history:
      "Named for geologist Joseph Burr Tyrrell, who found the skull of what became Albertosaurus sarcophagus along the Red Deer River in 1884, the museum grew out of decades of Alberta government fieldwork. Today its collection holds more than 160,000 cataloged fossils and over 350 holotypes, the largest fossil collection in Canada, though only a small fraction is ever on display at once. Its field station and preparation labs remain active excavation hubs, and visitors can watch technicians preparing real specimens through glass-walled labs.",
    collections: [
      {
        title: "Dinosaur Hall",
        description:
          "More than 40 mounted skeletons under a soaring glass roof, most excavated within a day's drive of the museum, including tyrannosaurs, horned dinosaurs, and duck-bills native to Alberta.",
        image: "/images/museums/royal-tyrrell/dinosaur-hall.jpg",
      },
      {
        title: "Cretaceous Garden",
        description:
          "A living plant collection of ferns, conifers, and cycads representing the flora dinosaurs would have grazed on in Late Cretaceous Alberta.",
        image: "/images/museums/royal-tyrrell/cretaceous-garden.jpg",
      },
      {
        title: "Badlands Gallery",
        description:
          "Explains how the Red Deer River carved the surrounding hoodoos and exposed the fossil beds the museum was built to study.",
        image: "/images/museums/royal-tyrrell/badlands.jpg",
      },
      {
        title: "Grounds for Discovery",
        description:
          "Home to Borealopelta, the world's best-preserved armoured dinosaur, found by oil sand workers in the Athabasca oil sands and displayed with skin and armor plating still intact.",
        image: "/images/museums/royal-tyrrell/grounds-for-discovery.jpg",
      },
    ],
    featuredExhibits: [
      {
        slug: "black-beauty-trex",
        name: "\u201cBlack Beauty\u201d Tyrannosaurus rex",
        scientificName: "Tyrannosaurus rex",
        age: "Late Cretaceous, ~67 million years",
        location: "Crowsnest Pass, Alberta, Canada",
        image: "/images/museums/royal-tyrrell/black-beauty.jpg",
        discoveryStory:
          "Found in 1980 by a local teenager along the Crowsnest River, the skeleton's bones were stained a lustrous black-brown by manganese in the surrounding rock during fossilization, giving the specimen its name.",
        facts: [
          "One of the most complete T. rex skeletons ever recovered in Canada.",
          "The manganese staining occurred long after death, during burial.",
          "Its relatively small size suggests it may not have been fully grown.",
        ],
      },
      {
        slug: "albertosaurus-bonebed",
        name: "Albertosaurus Bonebed",
        scientificName: "Albertosaurus sarcophagus",
        age: "Late Cretaceous, ~70 million years",
        location: "Dry Island Buffalo Jump, Alberta, Canada",
        image: "/images/museums/royal-tyrrell/albertosaurus.jpg",
        discoveryStory:
          "Rediscovered in 1910 by fossil hunter Barnum Brown and relocated decades later, this bonebed contains the remains of at least 12 individuals, suggesting Albertosaurus may have lived or hunted in loose groups.",
        facts: [
          "One of the only known multi-individual tyrannosaur bonebeds in the world.",
          "Includes animals of different ages, from juveniles to adults.",
          "Excavations at the site continue as part of the museum's field program.",
        ],
      },
    ],
    timeline: [
      { year: "1884", event: "Joseph Burr Tyrrell discovers the first Albertosaurus skull along the Red Deer River." },
      { year: "1910", event: "Barnum Brown's crew maps the Albertosaurus bonebed near Dry Island." },
      { year: "1980", event: "\u201cBlack Beauty\u201d is discovered near Crowsnest Pass." },
      { year: "1985", event: "The Royal Tyrrell Museum opens to the public in Drumheller." },
    ],
    gallery: [
      "/images/museums/royal-tyrrell/gallery-1.jpg",
      "/images/museums/royal-tyrrell/gallery-2.jpg",
      "/images/museums/royal-tyrrell/gallery-3.jpg",
    ],
    visitInfo: {
      hours: "Open daily, 9:30 AM \u2013 5:00 PM (seasonal hours may vary)",
      location: "Midland Provincial Park, Drumheller, Alberta, Canada",
      tip: "Book the Badlands field program to dig alongside active researchers.",
    },
  },
  {
    slug: "field-museum",
    name: "Field Museum",
    country: "USA",
    city: "Chicago, Illinois",
    tags: ["dinosaurs", "research", "fossils"],
    shortDescription:
      "Home to SUE, the most complete Tyrannosaurus rex skeleton ever found, and a research wing that has shaped modern paleontology for over a century.",
    featuredExhibitCount: 3,
    heroImage: "https://commons.wikimedia.org/wiki/Special:FilePath/FIeld_Museum.JPG",
    thumbnail:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sue_-_Tyrannosaurus_Rex_Dinosaur_-_Field_Museum_of_Natural_History,_Chicago_by_Joy_of_Museums_-_3.jpg",
    gridSize: "wide",
    about:
      "Founded in 1893 to house biological and anthropological collections from the World's Columbian Exposition, the Field Museum has grown into one of the largest natural history museums in the world, with fossil holdings spanning nearly every era of life on Earth. Its current building, opened in 1921 on Chicago's lakefront, was planned as a monumental Georgia-marble hall along Michigan Avenue, with a facade stretching over 700 feet.",
    history:
      "The museum's dinosaur program gained global attention in 1990, when fossil hunter Sue Hendrickson discovered a nearly complete T. rex skeleton in South Dakota. After a legal battle over ownership, the Field Museum acquired the specimen at auction in 1997 for $8.4 million, then the highest price ever paid for a fossil, and unveiled it to the public in Stanley Field Hall on May 17, 2000, after roughly 30,000 hours of preparation work.",
    collections: [
      {
        title: "Griffin Halls of Evolving Planet",
        description:
          "A walk through 4 billion years of life on Earth, from single-celled organisms to the rise and fall of the dinosaurs.",
        image: "/images/museums/field-museum/griffin-hall.jpg",
      },
      {
        title: "Fossil Preparation Lab",
        description:
          "A working laboratory visible to visitors, where technicians clean and stabilize newly collected specimens.",
        image: "/images/museums/field-museum/prep-lab.jpg",
      },
    ],
    featuredExhibits: [
      {
        slug: "sue-trex",
        name: "SUE the T. rex",
        scientificName: "Tyrannosaurus rex",
        age: "Late Cretaceous, ~67 million years",
        location: "Hell Creek Formation, South Dakota, USA",
        image: "/images/museums/field-museum/sue.jpg",
        discoveryStory:
          "Discovered in 1990 by fossil hunter Sue Hendrickson, for whom the specimen is named, the skeleton is about 90 percent complete by bone volume, with roughly 250 of the 380 bones known from a T. rex skeleton, making it one of the most studied specimens in the world.",
        facts: [
          "At over 40 feet long and 13 feet tall at the hip, SUE is the largest T. rex skeleton ever found.",
          "Rare bones were recovered intact, including the wishbone and most of the belly ribs.",
          "SUE now has its own dedicated gallery inside the Griffin Halls of Evolving Planet.",
        ],
      },
      {
        slug: "maximo-titanosaur",
        name: "M\u00e1ximo the Titanosaur",
        scientificName: "Patagotitan mayorum",
        age: "Late Cretaceous, ~100 million years",
        location: "Patagonia, Argentina",
        image: "/images/museums/field-museum/maximo.jpg",
        discoveryStory:
          "A cast of one of the largest land animals ever discovered, so long that its neck and tail extend beyond the walls of the museum's main hall into neighboring galleries.",
        facts: [
          "Estimated to have weighed as much as several elephants combined.",
          "The original fossils were unearthed on a ranch in Argentina starting in 2012.",
          "Titanosaurs like this one were plant-eaters despite their immense size.",
        ],
      },
    ],
    timeline: [
      { year: "1893", event: "The museum is founded following the World's Columbian Exposition." },
      { year: "1990", event: "Sue Hendrickson discovers SUE in the Hell Creek Formation, South Dakota." },
      { year: "1997", event: "The Field Museum acquires SUE at auction." },
      { year: "2000", event: "SUE goes on public display for the first time." },
    ],
    gallery: [
      "/images/museums/field-museum/gallery-1.jpg",
      "/images/museums/field-museum/gallery-2.jpg",
      "/images/museums/field-museum/gallery-3.jpg",
    ],
    visitInfo: {
      hours: "Open daily, 9:00 AM \u2013 5:00 PM",
      location: "1400 S. Lake Shore Drive, Chicago, Illinois, USA",
      tip: "Arrive early to see SUE's hall before tour groups fill the gallery.",
    },
  },
  {
    slug: "smithsonian",
    name: "Smithsonian National Museum of Natural History",
    country: "USA",
    city: "Washington, D.C.",
    tags: ["dinosaurs", "research", "fossils", "marine-reptiles"],
    shortDescription:
      "The David H. Koch Hall of Fossils reimagines a century-old dinosaur collection through the lens of deep time and ecosystem change.",
    featuredExhibitCount: 3,
    heroImage: "/images/museums/smithsonian/hero.jpg",
    thumbnail: "/images/museums/smithsonian/thumb.jpg",
    gridSize: "tall",
    about:
      "Part of the Smithsonian Institution, the museum has displayed dinosaur fossils on the National Mall since the early 20th century. Its fossil hall was closed for a multi-year renovation and reopened in 2019 as the David H. Koch Hall of Fossils \u2013 Deep Time.",
    history:
      "The centerpiece specimen, a Diplodocus longus, has stood in the rotunda area for over a century, while the surrounding halls were rebuilt around a narrative of climate change across Earth's history, ending with a section on the human impact on the present-day planet.",
    collections: [
      {
        title: "Deep Time Hall",
        description:
          "Roughly 700 specimens arranged to trace 3.7 billion years of life, mass extinctions, and recoveries, ending with present-day climate change.",
        image: "/images/museums/smithsonian/deep-time.jpg",
      },
      {
        title: "Ocean Hall",
        description:
          "Explores ancient and modern marine life, including fossil marine reptiles that shared the seas with the dinosaurs.",
        image: "/images/museums/smithsonian/ocean-hall.jpg",
      },
    ],
    featuredExhibits: [
      {
        slug: "nations-trex",
        name: "The Nation's T. rex",
        scientificName: "Tyrannosaurus rex",
        age: "Late Cretaceous, ~66-67 million years",
        location: "Hell Creek Formation, Montana, USA",
        image: "/images/museums/smithsonian/nations-trex.jpg",
        discoveryStory:
          "Discovered in Montana in 1988, the skeleton is on long-term loan to the Smithsonian and is mounted mid-stride, shown feeding on a Triceratops carcass to illustrate dinosaur behavior rather than posed as a static trophy.",
        facts: [
          "Displayed interacting with prey rather than standing alone.",
          "On loan from the U.S. Army Corps of Engineers, which owns the specimen.",
          "One of the most visited fossils on the National Mall.",
        ],
      },
      {
        slug: "hatcher-triceratops",
        name: "Hatcher the Triceratops",
        scientificName: "Triceratops horridus",
        age: "Late Cretaceous, ~66-68 million years",
        location: "Lance Creek Formation, Wyoming, USA",
        image: "/images/museums/smithsonian/hatcher.jpg",
        discoveryStory:
          "Composed largely of real fossil bone rather than reconstruction, Hatcher is named after 19th-century fossil collector John Bell Hatcher, who gathered many of the Triceratops specimens the Smithsonian still studies today.",
        facts: [
          "Named for the collector who supplied dozens of Triceratops specimens to the Smithsonian in the 1880s-90s.",
          "One of the most complete Triceratops skeletons on public display.",
          "Its mount was updated with a more scientifically accurate posture during the 2019 renovation.",
        ],
      },
    ],
    timeline: [
      { year: "1910", event: "Diplodocus longus goes on display, one of the earliest mounted dinosaurs on the Mall." },
      { year: "1988", event: "The Nation's T. rex is discovered in Montana." },
      { year: "2014", event: "The fossil hall closes for a five-year renovation." },
      { year: "2019", event: "The David H. Koch Hall of Fossils \u2013 Deep Time reopens." },
    ],
    gallery: [
      "/images/museums/smithsonian/gallery-1.jpg",
      "/images/museums/smithsonian/gallery-2.jpg",
      "/images/museums/smithsonian/gallery-3.jpg",
    ],
    visitInfo: {
      hours: "Open daily, 10:00 AM \u2013 5:30 PM",
      location: "10th St. & Constitution Ave. NW, Washington, D.C., USA",
      tip: "The Deep Time hall is least crowded within the first hour of opening.",
    },
  },
  {
    slug: "nhm-london",
    name: "Natural History Museum London",
    country: "UK",
    city: "London, England",
    tags: ["dinosaurs", "research", "fossils", "marine-reptiles"],
    shortDescription:
      "A Victorian cathedral of science whose fossil halls trace the birth of the word 'dinosaur' itself, coined by museum superintendent Richard Owen.",
    featuredExhibitCount: 3,
    heroImage:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Natural_History_Museum,_London,_Central_Hall.jpg",
    thumbnail:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Diplodocus_(replica).001_-_London.JPG",
    gridSize: "wide",
    about:
      "Opened in 1881 in a purpose-built terracotta building designed by Alfred Waterhouse, the museum grew out of the natural history collections of the British Museum. Its founding director, Richard Owen, coined the term 'Dinosauria' in 1842, four decades before the museum itself existed, giving the very word 'dinosaur' a direct line back to this institution.",
    history:
      "For over a century the museum's central Hintze Hall was dominated by 'Dippy,' a plaster cast of a Diplodocus carnegii skeleton gifted by Andrew Carnegie and unveiled in 1905 in front of 300 guests. Dippy moved between galleries for decades before settling in Hintze Hall in 1979. In 2017, it was replaced there by the real skeleton of a blue whale, nicknamed 'Hope,' while Dippy began a UK-wide tour that drew more than two million visitors across eight cities.",
    collections: [
      {
        title: "Dinosaurs Gallery",
        description:
          "A dedicated walkway of mounted skeletons and moving animatronic models, including a life-size Tyrannosaurus rex model.",
        image: "/images/museums/nhm-london/dinosaurs-gallery.jpg",
      },
      {
        title: "Fossil Marine Reptiles",
        description:
          "Built around fossils collected by pioneering 19th-century fossil hunter Mary Anning, including ichthyosaurs and plesiosaurs from the Jurassic coast.",
        image: "/images/museums/nhm-london/marine-reptiles.jpg",
      },
    ],
    featuredExhibits: [
      {
        slug: "dippy-diplodocus",
        name: "Dippy the Diplodocus",
        scientificName: "Diplodocus carnegii",
        age: "Late Jurassic, ~152-154 million years",
        location: "Cast from a specimen found in Wyoming, USA",
        image: "/images/museums/nhm-london/dippy.jpg",
        discoveryStory:
          "A plaster cast of a skeleton unearthed on Andrew Carnegie's ranch land, Dippy was gifted to the museum in 1905 and stood in the central hall for over a century before being sent on a national tour of UK museums.",
        facts: [
          "Not an original fossil, but one of the most famous cast skeletons in the world.",
          "Its 1905 unveiling helped popularize dinosaurs with the British public.",
          "Replaced in the main hall in 2017 by the blue whale skeleton 'Hope.'",
        ],
      },
      {
        slug: "anning-ichthyosaur",
        name: "Mary Anning's Ichthyosaur",
        scientificName: "Temnodontosaurus platyodon",
        age: "Early Jurassic, ~200 million years",
        location: "Lyme Regis, Dorset, England",
        image: "/images/museums/nhm-london/ichthyosaur.jpg",
        discoveryStory:
          "Collected from the cliffs of Lyme Regis by Mary Anning, one of the first professional fossil hunters, whose finds helped establish that extinct marine reptiles once swam in what is now the English coastline.",
        facts: [
          "Anning made this find as a young fossil collector working the Jurassic coast.",
          "Ichthyosaurs were marine reptiles, not dinosaurs, but lived alongside them.",
          "Anning's work laid groundwork for the science of paleontology in Britain.",
        ],
      },
    ],
    timeline: [
      { year: "1842", event: "Richard Owen coins the term 'Dinosauria.'" },
      { year: "1881", event: "The Natural History Museum opens in South Kensington." },
      { year: "1905", event: "Dippy the Diplodocus cast is gifted by Andrew Carnegie." },
      { year: "2017", event: "Dippy is replaced in Hintze Hall by the blue whale skeleton 'Hope.'" },
    ],
    gallery: [
      "/images/museums/nhm-london/gallery-1.jpg",
      "/images/museums/nhm-london/gallery-2.jpg",
      "/images/museums/nhm-london/gallery-3.jpg",
    ],
    visitInfo: {
      hours: "Open daily, 10:00 AM \u2013 5:50 PM",
      location: "Cromwell Road, South Kensington, London, UK",
      tip: "Entry is free, but the Dinosaurs Gallery uses timed tickets on busy days.",
    },
  },
  {
    slug: "fukui",
    name: "Fukui Prefectural Dinosaur Museum",
    country: "Japan",
    city: "Katsuyama, Fukui",
    tags: ["dinosaurs", "research", "fossils"],
    shortDescription:
      "One of the top three dinosaur museums in the world by collection size, built beside the Kitadani Formation quarry that continues to yield new species.",
    featuredExhibitCount: 3,
    heroImage: "/images/museums/fukui/hero.jpg",
    thumbnail: "/images/museums/fukui/thumb.jpg",
    gridSize: "tall",
    about:
      "Opened in 2000 inside a striking silver dome designed by architect Kisho Kurokawa, the museum sits in Katsuyama, near the Kitadani Formation dig site that has been excavated continuously since the late 1980s.",
    history:
      "Fieldwork at the nearby quarry has produced several dinosaur species found nowhere else, formally named for the region: Fukuisaurus tetoriensis, Fukuiraptor kitadaniensis, and Fukuititan nipponensis among them, establishing Fukui as a center of Japanese paleontology.",
    collections: [
      {
        title: "Dinosaur World",
        description:
          "The main exhibition floor, with dozens of mounted skeletons including species discovered locally in the Katsuyama quarry.",
        image: "/images/museums/fukui/dinosaur-world.jpg",
      },
      {
        title: "Kitadani Quarry",
        description:
          "An outdoor annex near the original dig site where visitors can see active excavation work and try hands-on fossil digging.",
        image: "/images/museums/fukui/kitadani-quarry.jpg",
      },
    ],
    featuredExhibits: [
      {
        slug: "fukuiraptor",
        name: "Fukuiraptor",
        scientificName: "Fukuiraptor kitadaniensis",
        age: "Early Cretaceous, ~120-130 million years",
        location: "Kitadani Formation, Fukui, Japan",
        image: "/images/museums/fukui/fukuiraptor.jpg",
        discoveryStory:
          "First described from bones recovered at the Kitadani quarry beginning in the late 1990s, Fukuiraptor was one of the first dinosaurs to be named entirely from Japanese fossil material.",
        facts: [
          "Named after the Fukui region where it was unearthed.",
          "A medium-sized carnivore, smaller than famous North American theropods.",
          "Helped establish Japan as a source of scientifically significant dinosaur fossils.",
        ],
      },
      {
        slug: "fukuisaurus",
        name: "Fukuisaurus",
        scientificName: "Fukuisaurus tetoriensis",
        age: "Early Cretaceous, ~120-130 million years",
        location: "Kitadani Formation, Fukui, Japan",
        image: "/images/museums/fukui/fukuisaurus.jpg",
        discoveryStory:
          "A plant-eating ornithopod described from partial skull material found at the same quarry that produced Fukuiraptor, part of a wave of new species defined from Kitadani fossils.",
        facts: [
          "One of the first ornithopod dinosaurs named from Japan.",
          "Lived in the same Early Cretaceous ecosystem as Fukuiraptor.",
          "Its name references the Tetori Group of rock formations.",
        ],
      },
    ],
    timeline: [
      { year: "1980s", event: "Fossil-bearing rock is identified at the Kitadani Formation near Katsuyama." },
      { year: "2000", event: "The Fukui Prefectural Dinosaur Museum opens." },
      { year: "2003", event: "Fukuiraptor kitadaniensis is formally described." },
      { year: "present", event: "Excavations at Kitadani quarry continue each field season." },
    ],
    gallery: [
      "/images/museums/fukui/gallery-1.jpg",
      "/images/museums/fukui/gallery-2.jpg",
      "/images/museums/fukui/gallery-3.jpg",
    ],
    visitInfo: {
      hours: "Open daily except select holidays, 9:00 AM \u2013 5:00 PM",
      location: "51-11 Terao, Muroko-cho, Katsuyama, Fukui, Japan",
      tip: "Combine your visit with the outdoor Kitadani Quarry dig experience in summer.",
    },
  },
  {
    slug: "zigong",
    name: "Zigong Dinosaur Museum",
    country: "China",
    city: "Zigong, Sichuan",
    tags: ["dinosaurs", "research", "fossils"],
    shortDescription:
      "Built directly over an active fossil quarry, letting visitors see Jurassic dinosaur bones still embedded in the rock where they were found.",
    featuredExhibitCount: 3,
    heroImage: "/images/museums/zigong/hero.jpg",
    thumbnail: "/images/museums/zigong/thumb.jpg",
    gridSize: "wide",
    about:
      "Opened in 1987 on the site of the Dashanpu fossil quarry, the Zigong Dinosaur Museum was the first museum in China dedicated entirely to dinosaurs, and one of very few in the world constructed directly above a working dig site.",
    history:
      "The Dashanpu quarry was uncovered in 1972 during construction work and has since produced one of the densest concentrations of Middle Jurassic dinosaur fossils known anywhere, giving Zigong a reputation as a 'dinosaur hometown' in China.",
    collections: [
      {
        title: "In-Situ Fossil Wall",
        description:
          "A preserved quarry face left exactly as excavated, with dozens of dinosaur bones visible embedded in the original rock.",
        image: "/images/museums/zigong/fossil-wall.jpg",
      },
      {
        title: "Jurassic Hall",
        description:
          "Mounted skeletons of sauropods and theropods recovered from Dashanpu, representing a Middle Jurassic ecosystem rarely preserved elsewhere.",
        image: "/images/museums/zigong/jurassic-hall.jpg",
      },
    ],
    featuredExhibits: [
      {
        slug: "shunosaurus",
        name: "Shunosaurus",
        scientificName: "Shunosaurus lii",
        age: "Middle Jurassic, ~170 million years",
        location: "Dashanpu Quarry, Zigong, China",
        image: "/images/museums/zigong/shunosaurus.jpg",
        discoveryStory:
          "One of the most common sauropods recovered from the Dashanpu quarry, known from more complete skeletal material than almost any other Jurassic sauropod, including a rare preserved tail club.",
        facts: [
          "Notable for a bony tail club, unusual among long-necked sauropods.",
          "Dozens of individuals have been recovered from the same quarry.",
          "One of the best-understood sauropods from the Middle Jurassic.",
        ],
      },
      {
        slug: "yangchuanosaurus",
        name: "Yangchuanosaurus",
        scientificName: "Yangchuanosaurus shangyouensis",
        age: "Late Jurassic, ~160 million years",
        location: "Sichuan Basin, China",
        image: "/images/museums/zigong/yangchuanosaurus.jpg",
        discoveryStory:
          "A large predatory theropod first described from Sichuan Province, often described as an Asian counterpart to North America's Allosaurus in size and ecological role.",
        facts: [
          "One of the largest predators known from Jurassic China.",
          "Related to the North American Allosaurus and Metriacanthosaurus family of theropods.",
          "Found in the same broader region that includes the Dashanpu quarry.",
        ],
      },
    ],
    timeline: [
      { year: "1972", event: "Construction workers uncover fossils at Dashanpu." },
      { year: "1979", event: "Formal excavation of the Dashanpu quarry begins." },
      { year: "1987", event: "The Zigong Dinosaur Museum opens over the quarry site." },
      { year: "present", event: "Zigong is recognized as one of China's richest dinosaur fossil regions." },
    ],
    gallery: [
      "/images/museums/zigong/gallery-1.jpg",
      "/images/museums/zigong/gallery-2.jpg",
      "/images/museums/zigong/gallery-3.jpg",
    ],
    visitInfo: {
      hours: "Open daily, 8:30 AM \u2013 6:00 PM",
      location: "238 Dashanpu, Da'an District, Zigong, Sichuan, China",
      tip: "The in-situ fossil wall is the highlight; give it extra time over the mounted halls.",
    },
  },
  {
    slug: "raiyoli",
    name: "Dinosaur Fossil Park & Museum, Raiyoli",
    country: "India",
    city: "Balasinor, Gujarat",
    tags: ["dinosaurs", "research", "fossils"],
    shortDescription:
      "India's first dedicated dinosaur museum, built beside a fossil field ranked among the world's largest dinosaur egg hatchery sites, and home to Rajasaurus narmadensis.",
    featuredExhibitCount: 2,
    heroImage: "/images/museums/raiyoli/hero.jpg",
    thumbnail: "/images/museums/raiyoli/thumb.jpg",
    gridSize: "tall",
    about:
      "Raiyoli village, north of Balasinor in Gujarat, sits on fossil beds accidentally uncovered in 1981 during a Geological Survey of India field survey. Excavations since have identified remains of more than a dozen dinosaur species and thousands of fossilized eggs, making the site one of the largest known dinosaur hatcheries in the world.",
    history:
      "India's first dinosaur museum opened at the site in 2019, pairing an open-air fossil park with an indoor museum of galleries, a 3-D theatre, and life-size sculptures. The most significant find from the region, the carnivorous Rajasaurus narmadensis, was formally named in 2003 from bones gathered over previous decades.",
    collections: [
      {
        title: "Open-Air Fossil Park",
        description:
          "Walking trails across the original excavation grounds where dinosaur bones and eggs were unearthed in situ.",
        image: "/images/museums/raiyoli/fossil-park.jpg",
      },
      {
        title: "Dinosaurs of Gujarat Gallery",
        description:
          "Indoor exhibits on the species identified from the Narmada basin, alongside a 3-D film on Rajasaurus narmadensis.",
        image: "/images/museums/raiyoli/gujarat-gallery.jpg",
      },
    ],
    featuredExhibits: [
      {
        slug: "rajasaurus",
        name: "Rajasaurus",
        scientificName: "Rajasaurus narmadensis",
        age: "Late Cretaceous, ~66-70 million years",
        location: "Raiyoli, Gujarat, India",
        image: "/images/museums/raiyoli/rajasaurus.jpg",
        discoveryStory:
          "Assembled from bones collected across multiple expeditions and formally named in 2003, Rajasaurus was a crested, abelisaurid predator whose name combines 'raja' (king) with a nod to the nearby Narmada river.",
        facts: [
          "A crested carnivore related to abelisaurids found in Madagascar and South America.",
          "Its distribution supports the idea that India was once connected to Madagascar and South America within the ancient Gondwana landmass.",
          "One of the very few dinosaur species named and described primarily from Indian fossil material.",
        ],
      },
      {
        slug: "rahiolisaurus",
        name: "Rahiolisaurus",
        scientificName: "Rahiolisaurus gujaratensis",
        age: "Late Cretaceous, ~66-70 million years",
        location: "Raiyoli, Gujarat, India",
        image: "/images/museums/raiyoli/rahiolisaurus.jpg",
        discoveryStory:
          "Described in 2010 from remains representing several individuals found together, this slender theropod is named directly for the village of Raiyoli where it was recovered.",
        facts: [
          "Named after the Raiyoli site itself.",
          "A lighter-built theropod than its neighbor Rajasaurus.",
          "One of two dinosaur species unique to the Balasinor region.",
        ],
      },
    ],
    timeline: [
      { year: "1981", event: "Geological Survey of India geologists uncover fossil beds at Raiyoli." },
      { year: "2003", event: "Rajasaurus narmadensis is formally named." },
      { year: "2010", event: "Rahiolisaurus gujaratensis is described from Raiyoli remains." },
      { year: "2019", event: "India's first dinosaur museum opens at the Raiyoli site." },
    ],
    gallery: [
      "/images/museums/raiyoli/gallery-1.jpg",
      "/images/museums/raiyoli/gallery-2.jpg",
      "/images/museums/raiyoli/gallery-3.jpg",
    ],
    visitInfo: {
      hours: "Open daily except Mondays, 10:00 AM \u2013 6:00 PM",
      location: "Raiyoli village, near Balasinor, Mahisagar district, Gujarat, India",
      tip: "Balasinor is roughly two hours from Ahmedabad by road; plan for a full-day trip.",
    },
  },
];

export const getMuseumBySlug = (slug) => museums.find((m) => m.slug === slug);

export const getExhibitBySlug = (museumSlug, exhibitSlug) => {
  const museum = getMuseumBySlug(museumSlug);
  if (!museum) return null;
  const exhibit = museum.featuredExhibits.find((e) => e.slug === exhibitSlug);
  return exhibit ? { ...exhibit, museum } : null;
};
