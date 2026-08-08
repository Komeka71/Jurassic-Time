/*
============================================================
AVATAR ASSET CONFIG
============================================================

Maps:

dinosaur color
+
equipped item IDs

into the correct pre-rendered avatar image.

IMPORTANT:

The shop uses "avatarSlot" for EQUIPMENT LOGIC.

Example:

Explorer Hat:
avatarSlot = "hat"

Leaf Hat:
avatarSlot = "hat"

That is correct because only one hat can be equipped.

However, visually they are different:

Explorer Hat -> hat.png
Leaf Hat     -> leaf.png

Therefore this file maps the ITEM ID to the
visual asset token.

============================================================
*/

export const AVATAR_SLOT_ORDER = [
  "bag",
  "hat",
  "goggles",
  "leaf",
  "scarf",
  "cape",
];

export const MAX_EQUIPPED_AVATAR_ITEMS = 2;

const ASSET_BASE = "/avatars";

/*
============================================================
COLOR CONFIG
============================================================
*/

const COLOR_PREFIX = {
  green: "",
  pink: "p_",
  yellow: "y_",
};

const BASE_FILENAME = {
  green: "green.png",
  pink: "pink.png",
  yellow: "yellow.png",
};

export const DINO_COLORS = [
  "green",
  "yellow",
  "pink",
];

/*
============================================================
ITEM -> VISUAL ASSET TOKEN
============================================================

The value is the filename token.

Examples:

explorer-hat -> hat

means:

/avatars/green/hat.png

leaf-hat -> leaf

means:

/avatars/green/leaf.png

This is necessary because both items use:

avatarSlot: "hat"

for equipment logic, but they have different
visual appearances.

============================================================
*/

const ITEM_ASSET_TOKEN = {
  "dino-backpack": "bag",

  "explorer-hat": "hat",

  "leaf-hat": "leaf",

  "meteor-glasses": "goggles",

  "winter-scarf": "scarf",

  "volcano-cape": "cape",
};

/*
============================================================
NORMALIZE EQUIPPED ITEMS
============================================================

Input:

{
  hat: "leaf-hat",
  bag: "dino-backpack"
}

Output:

["leaf", "bag"]

The item IDs are converted into the visual
asset tokens used by the actual PNG filenames.

============================================================
*/

function getVisualTokens(equippedItems) {
  if (!equippedItems) {
    return [];
  }

  const entries =
    equippedItems instanceof Map
      ? Array.from(equippedItems.entries())
      : Object.entries(equippedItems);

  const tokens = [];

  for (const [slot, itemId] of entries) {
    if (!itemId) {
      continue;
    }

    /*
    --------------------------------------------
    Known item
    --------------------------------------------
    */

    const visualToken =
      ITEM_ASSET_TOKEN[itemId];

    if (visualToken) {
      tokens.push(visualToken);
      continue;
    }

    /*
    --------------------------------------------
    Fallback
    --------------------------------------------

    If an older item doesn't exist in the
    mapping yet, use its slot.

    This keeps the avatar working for things
    such as:

    bag
    scarf
    cape
    goggles
    --------------------------------------------
    */

    if (
      AVATAR_SLOT_ORDER.includes(slot)
    ) {
      tokens.push(slot);
    }
  }

  return [
    ...new Set(tokens),
  ];
}

/*
============================================================
BUILD COMBINATION KEY
============================================================

The actual filenames use this order:

bag
hat
goggles
leaf
scarf
cape

Examples:

["hat"]
        -> hat

["leaf"]
        -> leaf

["bag", "hat"]
        -> bag_hat

["bag", "leaf"]
        -> bag_leaf

["leaf", "scarf"]
        -> leaf_scarf

["hat", "scarf"]
        -> hat_scarf

============================================================
*/

export function buildComboKey(tokens) {
  const unique = [
    ...new Set(tokens),
  ].filter(Boolean);

  const ordered =
    AVATAR_SLOT_ORDER.filter(
      (token) =>
        unique.includes(token)
    );

  return ordered.join("_");
}

/*
============================================================
RESOLVE AVATAR IMAGE
============================================================
*/

export function resolveAvatarImage(
  color,
  equippedItems
) {
  const safeColor =
    DINO_COLORS.includes(color)
      ? color
      : "green";

  const prefix =
    COLOR_PREFIX[safeColor];

  /*
  --------------------------------------------
  Get visual tokens from actual equipped items
  --------------------------------------------
  */

  const visualTokens =
    getVisualTokens(equippedItems);

  /*
  --------------------------------------------
  No equipment
  --------------------------------------------
  */

  if (visualTokens.length === 0) {
    return `${ASSET_BASE}/${safeColor}/${BASE_FILENAME[safeColor]}`;
  }

  /*
  --------------------------------------------
  Maximum 2 equipped visual items
  --------------------------------------------
  */

  const limitedTokens =
    visualTokens.slice(
      0,
      MAX_EQUIPPED_AVATAR_ITEMS
    );

  /*
  --------------------------------------------
  Build filename
  --------------------------------------------
  */

  const comboKey =
    buildComboKey(limitedTokens);

  return `${ASSET_BASE}/${safeColor}/${prefix}${comboKey}.png`;
}