/**
 * Idempotent database seed. Reads the REAL frontend data files (via
 * loadFrontendData.js), validates every document against the approved
 * Mongoose models, and upserts eras/dinosaurs via bulkWrite() — never
 * insertMany() — so running `npm run seed` any number of times converges
 * on the same data instead of creating duplicates.
 *
 * Step order (matches the requested implementation order):
 *   1. connect to MongoDB
 *   2. validate all data — abort with zero writes if anything fails
 *   3. upsert eras
 *   4. resolve era ObjectIds
 *   5. upsert dinosaurs
 *   6. print a summary
 */

require('../../config/env.js') // fail fast if MONGODB_URI etc. are missing
const { connectDB, disconnectDB } = require('../../config/db.js')
const { Era } = require('../../models/Era.js')
const { Dinosaur } = require('../../models/Dinosaur.js')
const { logger } = require('../../utils/logger.js')
const { loadFrontendData } = require('./loadFrontendData.js')
const { buildEraDocuments, buildDinosaurDocuments } = require('./transformData.js')
const { validateSeedData } = require('./validateSeedData.js')
const { buildEraUpsertOps, buildDinosaurUpsertOps } = require('./bulkOps.js')

async function upsertEras(eraDocs) {
  return Era.bulkWrite(buildEraUpsertOps(eraDocs), { ordered: false })
}

async function resolveEraIds(slugs) {
  const eras = await Era.find({ id: { $in: slugs } }, { id: 1 }).lean()
  const idBySlug = new Map(eras.map((era) => [era.id, era._id]))

  const missing = slugs.filter((slug) => !idBySlug.has(slug))
  if (missing.length > 0) {
    throw new Error(`Could not resolve an ObjectId for era slug(s): ${missing.join(', ')} — era upsert may have failed`)
  }

  return idBySlug
}

async function upsertDinosaurs(dinosaurDocs, eraIdBySlug) {
  return Dinosaur.bulkWrite(buildDinosaurUpsertOps(dinosaurDocs, eraIdBySlug), { ordered: false })
}

function printValidationErrors(errors) {
  logger.error(`seed: ${errors.length} validation failure(s) — aborting, database was not written to`)
  for (const error of errors) {
    console.error(`  ✗ [${error.document}] ${error.field}: ${error.message}`)
  }
}

function printSummary({ eraResult, dinosaurResult }) {
  const lines = [
    '',
    '===== Seed Summary =====',
    `Eras inserted:       ${eraResult.upsertedCount}`,
    `Eras updated:        ${eraResult.modifiedCount}`,
    `Eras unchanged:      ${eraResult.matchedCount - eraResult.modifiedCount}`,
    `Dinosaurs inserted:  ${dinosaurResult.upsertedCount}`,
    `Dinosaurs updated:   ${dinosaurResult.modifiedCount}`,
    `Dinosaurs unchanged: ${dinosaurResult.matchedCount - dinosaurResult.modifiedCount}`,
    `Validation failures: 0`,
    '=========================',
    '',
  ]
  lines.forEach((line) => console.log(line))
}

async function main() {
  // --- 1. connect ---------------------------------------------------
  await connectDB()

  try {
    logger.info('seed: loading frontend data…')
    const frontendData = await loadFrontendData()

    const eraDocs = buildEraDocuments(frontendData)
    const dinosaurDocs = buildDinosaurDocuments(frontendData.allDinosaurs)
    logger.info(`seed: loaded ${eraDocs.length} era(s) and ${dinosaurDocs.length} dinosaur(s) from frontend data`)

    // --- 2. validate — no write happens unless this fully passes ----
    logger.info('seed: validating all documents against the Mongoose models…')
    const validationErrors = await validateSeedData({ eraDocs, dinosaurDocs })

    if (validationErrors.length > 0) {
      printValidationErrors(validationErrors)
      process.exitCode = 1
      return
    }
    logger.info('seed: all documents valid ✓')

    // --- 3. upsert eras ------------------------------------------------
    logger.info('seed: upserting eras…')
    const eraResult = await upsertEras(eraDocs)

    // --- 4. resolve era ObjectIds ---------------------------------------
    logger.info('seed: resolving era ObjectIds…')
    const eraIdBySlug = await resolveEraIds(eraDocs.map((era) => era.id))

    // --- 5. upsert dinosaurs --------------------------------------------
    logger.info('seed: upserting dinosaurs…')
    const dinosaurResult = await upsertDinosaurs(dinosaurDocs, eraIdBySlug)

    // --- 6. summary ------------------------------------------------------
    printSummary({ eraResult, dinosaurResult })
  } finally {
    await disconnectDB()
  }
}

main()
  .then(() => process.exit(process.exitCode || 0))
  .catch((error) => {
    logger.error('seed: fatal error', { message: error.message })
    console.error(error)
    process.exit(1)
  })