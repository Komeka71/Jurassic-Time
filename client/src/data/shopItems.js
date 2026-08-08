const shopItems = [
  {
    id: "explorer-hat",
    name: "Explorer Hat",
    category: "gear",
    price: 80,
    image: "/shop/items/explorer-hat.png",
    description:
      "A trusted hat for explorers brave enough to follow ancient tracks.",
    rarity: "Common",
    levelRequired: 1,
    featured: false,
  },

  {
    id: "fossil-brush",
    name: "Fossil Brush",
    category: "gear",
    price: 100,
    image: "/shop/items/fossil-brush.png",
    description:
      "Carefully uncover fossils hidden beneath millions of years of history.",
    rarity: "Common",
    levelRequired: 1,
    featured: false,
  },

  {
    id: "dino-backpack",
    name: "Dino Backpack",
    category: "gear",
    price: 180,
    image: "/shop/items/dino-backpack.png",
    description:
      "A spiky explorer backpack made for carrying prehistoric discoveries.",
    rarity: "Rare",
    levelRequired: 1,
    featured: true,
    avatarSlot: "bag",
  },

  {
    id: "leaf-hat",
    name: "Leaf Hat",
    category: "dino",
    price: 120,
    image: "/shop/items/leaf-hat.png",
    description:
      "Fresh jungle fashion personally approved by your Dino companion.",
    rarity: "Common",
    levelRequired: 1,
    featured: false,
    avatarSlot: "hat",
  },

  {
    id: "winter-scarf",
    name: "Woolly Scarf",
    category: "dino",
    price: 160,
    image: "/shop/items/winter-scarf.png",
    description:
      "A fluffy scarf perfect for freezing Ice Age expeditions.",
    rarity: "Rare",
    levelRequired: 4,
    featured: true,
    avatarSlot: "scarf",
  },

  {
    id: "volcano-cape",
    name: "Volcano Cape",
    category: "dino",
    price: 240,
    image: "/shop/items/volcano-cape.png",
    description:
      "A fiery explorer cape glowing with the spirit of Volcano Ridge.",
    rarity: "Epic",
    levelRequired: 3,
    featured: true,
    avatarSlot: "cape",
  },

  {
    id: "meteor-glasses",
    name: "Meteor Goggles",
    category: "dino",
    price: 300,
    image: "/shop/items/meteor-glasses.png",
    description:
      "Cosmic explorer goggles designed for chasing falling stars.",
    rarity: "Epic",
    levelRequired: 5,
    featured: true,
    avatarSlot: "goggles",
  },

  {
    id: "amber-fragment",
    name: "Amber Fragment",
    category: "relic",
    price: 200,
    image: "/shop/items/amber-fragment.png",
    description:
      "Ancient golden amber preserving a tiny secret from prehistoric Earth.",
    rarity: "Rare",
    levelRequired: 2,
    featured: false,
  },

  {
    id: "ancient-egg",
    name: "Ancient Egg",
    category: "relic",
    price: 350,
    image: "/shop/items/ancient-egg.png",
    description:
      "A mysterious prehistoric egg. Something may still be moving inside...",
    rarity: "Legendary",
    levelRequired: 2,
    featured: true,
  },

  {
    id: "ice-crystal",
    name: "Ice Crystal",
    category: "relic",
    price: 220,
    image: "/shop/items/ice-crystal.png",
    description:
      "A frozen crystal recovered from the deepest Ice Age caves.",
    rarity: "Epic",
    levelRequired: 4,
    featured: true,
  },

  {
    id: "meteor-shard",
    name: "Meteor Shard",
    category: "relic",
    price: 400,
    image: "/shop/items/meteor-shard.png",
    description:
      "A scorching cosmic fragment that survived an ancient impact.",
    rarity: "Legendary",
    levelRequired: 5,
    featured: true,
  },

  {
    id: "golden-fossil",
    name: "Golden Fossil",
    category: "relic",
    price: 500,
    image: "/shop/items/golden-fossil.png",
    description:
      "An incredibly rare golden fossil sought by explorers across the island.",
    rarity: "Legendary",
    levelRequired: 5,
    featured: false,
  },
];

export default shopItems;