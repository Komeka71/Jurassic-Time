/**
 * Global Museum Search service — a small registry + matching engine with
 * zero knowledge of dinosaurs, Timeline, or any other feature. Anything
 * searchable (dinosaurs today; eras, mini games, the DNA lab, articles,
 * and the AI Guide later) registers itself as a "collection" via
 * registerSearchCollection(), and search() queries every registered
 * collection uniformly. Adding a new searchable feature never requires
 * touching this file or any existing collection.
 *
 * A collection is:
 *   {
 *     id:            unique string, e.g. 'dinosaurs'
 *     label:         human-readable name, e.g. 'Dinosaurs'
 *     searchFields:  string[] of raw-item field names to match against
 *     getItems():    returns raw items — an array, OR a Promise of one
 *                     (kept async-capable from day one so swapping local
 *                     data for a real API call, e.g. MongoDB via
 *                     GET /api/dinosaurs, later needs no changes here or
 *                     in any UI component)
 *     toResult(item): maps one raw item to the common SearchResult shape
 *                     each UI component (SearchCard, etc.) expects
 *   }
 */

const collections = new Map()

export function registerSearchCollection(collection) {
  collections.set(collection.id, collection)
}

export function getSearchCollections() {
  return Array.from(collections.values())
}

function normalize(text) {
  return String(text ?? '').trim().toLowerCase()
}

function itemMatches(item, fields, normalizedQuery) {
  return fields.some((field) => normalize(item[field]).includes(normalizedQuery))
}

/**
 * Case-insensitive, trimmed, partial-match search across every
 * registered collection (or a subset, via `collectionIds`). Always
 * returns a Promise — today it resolves immediately since every
 * collection's data is local, but callers already treat it as async so
 * a collection backed by a real network request works without any
 * caller-side changes.
 */
export async function search(query, { collectionIds } = {}) {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) return []

  const targets = collectionIds
    ? collectionIds.map((id) => collections.get(id)).filter(Boolean)
    : getSearchCollections()

  const resultsByCollection = await Promise.all(
    targets.map(async (collection) => {
      const items = await collection.getItems()
      return items
        .filter((item) => itemMatches(item, collection.searchFields, normalizedQuery))
        .map((item) => collection.toResult(item))
    }),
  )

  return resultsByCollection.flat()
}

/**
 * Every item across every registered collection, unfiltered — the
 * "browse everything" counterpart to search(). Used to populate Search
 * with a full list before any query is typed, instead of leaving the
 * page blank. Reuses each collection's own getItems()/toResult() so it
 * automatically covers whatever collections exist (dinosaurs today;
 * eras, mini games, etc. later) with zero per-collection special-casing
 * here or in any caller.
 */
export async function getAllItems({ collectionIds } = {}) {
  const targets = collectionIds
    ? collectionIds.map((id) => collections.get(id)).filter(Boolean)
    : getSearchCollections()

  const resultsByCollection = await Promise.all(
    targets.map(async (collection) => {
      const items = await collection.getItems()
      return items.map((item) => collection.toResult(item))
    }),
  )

  return resultsByCollection.flat()
}