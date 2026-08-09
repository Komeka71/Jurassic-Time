const { Era } = require('../models/Era.js')
const { Dinosaur } = require('../models/Dinosaur.js')
const { ApiError } = require('../utils/ApiError.js')
const { parsePagination, buildPaginationMeta } = require('../utils/pagination.js')

async function listEras() {
  return Era.find().sort({ order: 1 })
}

async function getEraBySlug(slug) {
  const era = await Era.findOne({ id: slug })
  if (!era) throw ApiError.notFound(`No era found with slug "${slug}"`)
  return era
}

/**
 * Dinosaurs belonging to one era, with the same diet/continent/type
 * filters the standalone dinosaur list supports. Confirms the era
 * itself exists first — a 404 for an unknown era is a clearer signal
 * than silently returning an empty, possibly-paginated list.
 */
async function listDinosaursForEra(slug, queryParams = {}) {
  await getEraBySlug(slug)

  const filter = { eraSlug: slug }
  if (queryParams.diet) filter.diet = queryParams.diet
  if (queryParams.continent) filter.continent = queryParams.continent
  if (queryParams.type) filter.type = queryParams.type

  const { page, limit, skip } = parsePagination(queryParams)

  const [items, total] = await Promise.all([
    Dinosaur.find(filter).sort({ name: 1 }).skip(skip).limit(limit),
    Dinosaur.countDocuments(filter),
  ])

  return { items, meta: buildPaginationMeta({ page, limit, total }) }
}

module.exports = { listEras, getEraBySlug, listDinosaursForEra }