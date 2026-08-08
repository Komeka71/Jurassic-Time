/*
========================================
AVATAR ASSET CONFIG
========================================

Single source of truth for mapping
(dinosaur color + equipped slots) -> image path.

Combinations are pre-rendered — no compositing.

CANONICAL SLOT ORDER
Verified against actual filenames in
client/public/avatars/green/ — NOT alphabetical.
Do not reorder without regenerating this file to
match your actual asset filenames.
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
========================================
PREFIX PER COLOR
========================================
green has no prefix, pink = "p_", yellow = "y_"
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

export const DINO_COLORS = ["green", "yellow", "pink"];

/*
========================================
BUILD COMBINATION KEY
========================================
Normalizes slot order so {scarf,hat} and {hat,scarf}
resolve identically.
*/
export function buildComboKey(slots) {
  const unique = [...new Set(slots)].filter(Boolean);

  const ordered = AVATAR_SLOT_ORDER.filter((s) =>
    unique.includes(s)
  );

  return ordered.join("_");
}

/*
========================================
RESOLVE AVATAR IMAGE PATH
========================================

color: "green" | "yellow" | "pink"
equippedItems: Map or plain object { [avatarSlot]: itemId }

Only slot NAMES matter for the image (not which item ID
occupies the slot) — e.g. "hat" always looks the same
regardless of which hat item you own, since there is
currently only one item per slot in the shop.
*/
export function resolveAvatarImage(color, equippedItems) {
  const safeColor = DINO_COLORS.includes(color) ? color : "green";

  const prefix = COLOR_PREFIX[safeColor];

  const slots = equippedItems
    ? Object.keys(
        equippedItems instanceof Map
          ? Object.fromEntries(equippedItems)
          : equippedItems
      ).filter((slot) => {
        const val =
          equippedItems instanceof Map
            ? equippedItems.get(slot)
            : equippedItems[slot];
        return !!val && AVATAR_SLOT_ORDER.includes(slot);
      })
    : [];

  if (slots.length === 0) {
    return `${ASSET_BASE}/${safeColor}/${BASE_FILENAME[safeColor]}`;
  }

  const comboKey = buildComboKey(slots.slice(0, MAX_EQUIPPED_AVATAR_ITEMS));

  return `${ASSET_BASE}/${safeColor}/${prefix}${comboKey}.png`;
}