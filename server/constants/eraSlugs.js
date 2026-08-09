/**
 * The three era slugs that exist in the museum today, matching the
 * literal `/timeline/:era` values and the `id` used in both
 * data/eraTimelines.js and data/eras.js.
 *
 * Used to validate `dinosaurs.eraSlug` (the denormalized copy) against a
 * known-good value, catching typos/drift between a dinosaur and its
 * real era. Deliberately NOT applied as an enum on `eras.id` itself —
 * the eras collection is the authoritative source of what eras exist,
 * so adding a 4th era should just mean inserting a new eras document.
 *
 * Adding a new era: insert the new eras document, then add its slug
 * here in the same change so new dinosaurs in that era pass validation.
 * A one-line, visible update — not a breaking migration.
 */
const ERA_SLUGS = ['triassic', 'jurassic', 'cretaceous']

module.exports = { ERA_SLUGS }