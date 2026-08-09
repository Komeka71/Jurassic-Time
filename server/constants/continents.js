/**
 * Continent-level buckets, matching SearchFilters.jsx's REGION_OPTIONS
 * exactly. This is distinct from `dinosaurs.region`, which stays a
 * specific free-text string (e.g. "Central Asia") as authored today —
 * `continent` is the new, additive, coarser field these values validate.
 */
const CONTINENTS = [
  'North America',
  'South America',
  'Europe',
  'Asia',
  'Africa',
  'Australia',
]

module.exports = { CONTINENTS }