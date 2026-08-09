const { Dinosaur } = require('../models/Dinosaur.js')
const { ApiError } = require('../utils/ApiError.js')
const { parsePagination, buildPaginationMeta } = require('../utils/pagination.js')

function buildFilter({ era, diet, type, continent } = {}) {
  const filter = {}
  if (era) filter.eraSlug = era
  if (diet) filter.diet = diet
  if (type) filter.type = type
  if (continent) filter.continent = continent
  return filter
}

async function listDinosaurs(queryParams = {}) {
  const filter = buildFilter(queryParams)
  const { page, limit, skip } = parsePagination(queryParams)

  const [items, total] = await Promise.all([
    Dinosaur.find(filter).sort({ name: 1 }).skip(skip).limit(limit),
    Dinosaur.countDocuments(filter),
  ])

  return { items, meta: buildPaginationMeta({ page, limit, total }) }
}

async function getDinosaurBySlug(slug) {
  const dinosaur = await Dinosaur.findOne({ id: slug })
  if (!dinosaur) throw ApiError.notFound(`No dinosaur found with slug "${slug}"`)
  return dinosaur
}

module.exports = { listDinosaurs, getDinosaurBySlug, buildFilter }