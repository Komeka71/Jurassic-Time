import api from '../../api/axios.js'
import { registerSearchCollection } from '../searchService.js'

/**
 * Registers dinosaurs as a searchable collection — Phase 1 of Global
 * Museum Search. Matches on name, scientificName, and era (case-
 * insensitive, trimmed, partial — handled generically by searchService).
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
  
 
  getItems: async () => {
    const { data } = await api.get('/v1/dinosaurs')
    return data.data
  },

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