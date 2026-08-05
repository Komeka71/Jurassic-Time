import { eras } from './eraTimelines.js'

/**
 * Flattened list of every dinosaur across every era, each annotated with
 * its era's URL slug (needed to navigate back to "the right timeline" —
 * see the search dinosaur collection). This is the seam between Timeline
 * and Search: Timeline's per-era data in eraTimelines.js remains the
 * single source of truth, and this file just re-exposes it in one flat
 * array for anything that needs to search/browse across all eras at
 * once. EraTimeline itself never imports this — it only ever needs one
 * era at a time, straight from eraTimelines.js.
 */
export const allDinosaurs = Object.entries(eras).flatMap(([eraSlug, eraConfig]) =>
  eraConfig.dinosaurs.map((dinosaur) => ({ ...dinosaur, eraSlug })),
)