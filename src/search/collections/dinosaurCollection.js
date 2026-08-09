import { getAllDinosaurs } from '../../api/client.js'
import { registerSearchCollection } from '../searchService.js'

/**
 * Registers dinosaurs as a searchable collection — Phase 1 of Global
 * Museum Search. Matches on name, scientificName, and era (case-
 * insensitive, trimmed, partial — handled generically by searchService).
 *
 * Phase 6B: `getItems` now fetches from the backend (MongoDB, via
 * GET /api/v1/dinosaurs — see api/client.js's getAllDinosaurs, which
 * walks pagination rather than assuming everything fits on one page)
 * instead of returning the local data/allDinosaurs.js array. This is
 * exactly the swap this function's original comment anticipated —
 * `getItems` was already async-capable for this reason. Nothing else
 * changes: `toResult`, `searchFields`, and searchService.js's own
 * matching logic (itemMatches) are all untouched, so Search's UI and
 * behavior are identical — only the data source moved to MongoDB.
 *
 * `toResult` is the only place that knows dinosaurs' specific field
 * names; every UI component downstream (SearchCard, etc.) only ever
 * sees the common SearchResult shape, so a future "eras"/"mini games"/
 * "DNA lab"/"articles"/"AI Guide" collection just needs its own toResult
 * mapping into the same shape — nothing here or in the UI needs to
 * change.
 */
registerSearchCollection({
  id: 'dinosaurs',
  label: 'Dinosaurs',
  searchFields: ['name', 'scientificName', 'era'],
  getItems: () => getAllDinosaurs(),
  toResult: (dinosaur) => ({
    id: `dinosaurs:${dinosaur.id}`,
    type: 'dinosaurs',
    typeLabel: 'Dinosaur',
    title: dinosaur.name,
    subtitle: dinosaur.scientificName,
    image: dinosaur.sceneImage,
    description: dinosaur.overview,
    era: dinosaur.era,
    eraSlug: dinosaur.eraSlug,
    diet: dinosaur.diet,
    dinosaurType: dinosaur.type,
    region: dinosaur.region,
    // Used to build the /timeline/:eraSlug?exhibit=:dinosaurId link that
    // scrolls to and auto-opens this dinosaur's exhibit.
    dinosaurId: dinosaur.id,
  }),
})