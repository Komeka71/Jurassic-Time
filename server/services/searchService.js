const { Dinosaur } = require('../models/Dinosaur.js')

/**
 * Server-side counterpart to the frontend's search/searchService.js
 * collection registry (see the approved design doc §5 — "no separate
 * search collection"). Each entry knows how to query its own model and
 * map a raw document into the exact SearchResult shape
 * search/collections/dinosaurCollection.js already produces client-side
 * today, so a future swap of the frontend's search to call this
 * endpoint needs zero shape changes downstream (SearchCard, etc.).
 *
 * Matching is deliberately a case-insensitive substring regex over the
 * same three fields the frontend already matches on (name,
 * scientificName, era) — re-verified directly against
 * search/searchService.js's `itemMatches()` before writing this, which
 * does `normalize(item[field]).includes(normalizedQuery)`. That is a
 * plain substring match, not MongoDB's word-tokenized $text search, so
 * this uses regex to preserve the exact current search UX. See the
 * design doc's Search Strategy section for the three options this was
 * chosen from — the compound text index on Dinosaur still exists for a
 * future move to relevance-ranked or Atlas Search.
 */
const searchCollections = [
  {
    id: 'dinosaurs',
    async find(regex, limit) {
      return Dinosaur.find({
        $or: [{ name: regex }, { scientificName: regex }, { era: regex }],
      })
        .sort({ name: 1 })
        .limit(limit)
    },
    toResult(dinosaur) {
      return {
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
        // Used to build the /timeline/:eraSlug?exhibit=:dinosaurId link,
        // exactly as the frontend's own toResult() documents.
        dinosaurId: dinosaur.id,
      }
    },
  },
]

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

async function search(rawQuery, { limit = 20 } = {}) {
  const trimmed = String(rawQuery ?? '').trim()
  if (!trimmed) return []

  const regex = new RegExp(escapeRegExp(trimmed), 'i')

  const resultsByCollection = await Promise.all(
    searchCollections.map(async (collection) => {
      const docs = await collection.find(regex, limit)
      return docs.map((doc) => collection.toResult(doc))
    }),
  )

  return resultsByCollection.flat()
}

module.exports = { search }