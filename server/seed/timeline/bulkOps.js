/**
 * Pure builders for the bulkWrite() operation arrays used by seed.js.
 * Kept separate from the DB-calling code in seed.js so the exact shape
 * of each operation can be verified without touching a real database.
 */

function buildEraUpsertOps(eraDocs) {
  return eraDocs.map((doc) => ({
    updateOne: {
      filter: { id: doc.id },
      update: { $set: doc },
      upsert: true,
    },
  }))
}

function buildDinosaurUpsertOps(dinosaurDocs, eraIdBySlug) {
  return dinosaurDocs.map((doc) => ({
    updateOne: {
      filter: { id: doc.id },
      update: { $set: { ...doc, eraId: eraIdBySlug.get(doc.eraSlug) } },
      upsert: true,
    },
  }))
}

module.exports = { buildEraUpsertOps, buildDinosaurUpsertOps }