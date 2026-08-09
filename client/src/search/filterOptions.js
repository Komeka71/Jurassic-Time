/**
 * Static option lists for the Search page's filter panel.
 *
 * These mirror the backend's own enums exactly:
 *   - ERA_OPTIONS      <-> backend/constants/eraSlugs.js (ERA_SLUGS)
 *   - DIET_OPTIONS      <-> backend/constants/diets.js (DIETS)
 *   - CONTINENT_OPTIONS <-> backend/constants/continents.js (CONTINENTS)
 *
 * They're hardcoded here (not imported from the backend) because the
 * backend is a separate CommonJS package outside this Vite project, but
 * every value below is intentionally identical to its backend source of
 * truth. If a new era/diet/continent is ever added on the backend, this
 * file needs the matching one-line addition — nothing else in Search
 * needs to change.
 *
 * `type` has no options list here because the backend has no enum for
 * it (dinosaurValidators.js accepts any non-empty string) — Search
 * derives its Type filter options dynamically from whatever dinosaur
 * types are actually loaded instead.
 */

export const ERA_OPTIONS = [
  { value: 'triassic', label: 'Triassic' },
  { value: 'jurassic', label: 'Jurassic' },
  { value: 'cretaceous', label: 'Cretaceous' },
]

export const DIET_OPTIONS = ['Herbivore', 'Carnivore', 'Omnivore']

export const CONTINENT_OPTIONS = [
  'North America',
  'South America',
  'Europe',
  'Asia',
  'Africa',
  'Australia',
]