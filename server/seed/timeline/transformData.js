/**
 * Pure, side-effect-free transforms from the frontend's raw data shapes
 * into the exact document shapes the approved Era/Dinosaur schemas
 * expect. No field is renamed and no content is invented — this only
 * merges two frontend files that describe the same era under the same
 * slug (see the approved design doc's `eras` consolidation) and adds
 * the one net-new field the schema needs that the frontend has no
 * equivalent for (`order`).
 */

/**
 * `eras.js` (landing cards) and `eraTimelines.js` (Timeline engine
 * config) both describe the same three eras under the same `id`. This
 * merges them into one document per era, matching models/Era.js exactly.
 */
function buildEraDocuments({ eraCards, eraTimelineMap }) {
  return eraCards.map((card, index) => {
    const timeline = eraTimelineMap[card.id]

    if (!timeline) {
      throw new Error(
        `data/eras.js declares era "${card.id}" but data/eraTimelines.js has no matching entry for it.`,
      )
    }

    return {
      id: card.id,
      name: card.name,
      title: timeline.title,
      eyebrow: timeline.eyebrow,
      range: card.range,
      period: timeline.period,
      tagline: card.tagline,
      description: timeline.description,
      heroImage: timeline.heroImage,
      depthStart: card.depthStart,
      depthEnd: card.depthEnd,
      order: index + 1,
      theme: timeline.theme,
    }
  })
}

/**
 * allDinosaurs.js already spreads every original per-dinosaur field and
 * adds `eraSlug` — every field name it produces already matches the
 * approved Dinosaur schema 1:1 (id, name, scientificName, era, diet,
 * type, facts, etc.), so this is a plain pass-through. It's still a
 * shallow copy of each entry so later mutation (attaching a resolved
 * eraId before the dinosaur upsert) never touches the frontend module's
 * own in-memory array.
 */
function buildDinosaurDocuments(allDinosaurs) {
  return allDinosaurs.map((dinosaur) => ({ ...dinosaur }))
}

module.exports = { buildEraDocuments, buildDinosaurDocuments }