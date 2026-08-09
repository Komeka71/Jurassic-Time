const mongoose = require('mongoose')
const { Era } = require('../../models/Era.js')
const { Dinosaur } = require('../../models/Dinosaur.js')

// Used only to satisfy the Dinosaur schema's `eraId` requirement during
// this validation pass, which deliberately runs before eras have been
// upserted and therefore before any real era _id exists yet (see
// seed.js's step order: validate happens before eraId resolution). This
// placeholder lets every OTHER field on every dinosaur get fully
// checked by the real schema before the database is written to at all.
// Errors on this specific field are filtered out below — the real
// relationship's correctness is separately and more meaningfully
// verified by the eraSlug cross-check in findMissingEraReferences().
const PLACEHOLDER_ERA_ID = new mongoose.Types.ObjectId()

async function collectSchemaErrors(Model, docs, label, extraFields = {}) {
  const errors = []

  for (const doc of docs) {
    const instance = new Model({ ...doc, ...extraFields })
    try {
      await instance.validate()
    } catch (validationError) {
      for (const fieldError of Object.values(validationError.errors || {})) {
        if (Object.prototype.hasOwnProperty.call(extraFields, fieldError.path)) continue
        errors.push({
          document: `${label}:${doc.id ?? '(missing id)'}`,
          field: fieldError.path,
          message: fieldError.message,
        })
      }
    }
  }

  return errors
}

function findDuplicateIds(docs, label) {
  const seen = new Set()
  const errors = []

  for (const doc of docs) {
    if (seen.has(doc.id)) {
      errors.push({
        document: `${label}:${doc.id}`,
        field: 'id',
        message: `duplicate ${label} id "${doc.id}" in source data`,
      })
    }
    seen.add(doc.id)
  }

  return errors
}

function findMissingEraReferences(eraDocs, dinosaurDocs) {
  const knownSlugs = new Set(eraDocs.map((era) => era.id))
  const errors = []

  for (const dinosaur of dinosaurDocs) {
    if (!knownSlugs.has(dinosaur.eraSlug)) {
      errors.push({
        document: `dinosaur:${dinosaur.id}`,
        field: 'eraSlug',
        message: `references era "${dinosaur.eraSlug}", which is not among the era documents being seeded`,
      })
    }
  }

  return errors
}

/**
 * Runs every check that matters before a single write happens:
 *   - full Mongoose schema validation (types, required fields, enums,
 *     the `facts` custom validator) for every era and every dinosaur
 *   - no duplicate `id` within the source data itself
 *   - every dinosaur's `eraSlug` resolves to one of the eras being seeded
 *
 * Returns an array of { document, field, message } — empty means clean.
 */
async function validateSeedData({ eraDocs, dinosaurDocs }) {
  const eraSchemaErrors = await collectSchemaErrors(Era, eraDocs, 'era')
  const dinosaurSchemaErrors = await collectSchemaErrors(Dinosaur, dinosaurDocs, 'dinosaur', {
    eraId: PLACEHOLDER_ERA_ID,
  })

  const duplicateErrors = [...findDuplicateIds(eraDocs, 'era'), ...findDuplicateIds(dinosaurDocs, 'dinosaur')]
  const referentialErrors = findMissingEraReferences(eraDocs, dinosaurDocs)

  return [...eraSchemaErrors, ...dinosaurSchemaErrors, ...duplicateErrors, ...referentialErrors]
}

module.exports = { validateSeedData }