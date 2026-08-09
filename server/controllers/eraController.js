const { asyncHandler } = require('../utils/asyncHandler.js')
const { sendSuccess } = require('../utils/ApiResponse.js')
const eraService = require('../services/eraService.js')

const getEras = asyncHandler(async (req, res) => {
  const eras = await eraService.listEras()
  sendSuccess(res, { data: eras })
})

const getEraBySlug = asyncHandler(async (req, res) => {
  const era = await eraService.getEraBySlug(req.params.slug)
  sendSuccess(res, { data: era })
})

const getDinosaursForEra = asyncHandler(async (req, res) => {
  const { items, meta } = await eraService.listDinosaursForEra(req.params.slug, req.query)
  sendSuccess(res, { data: items, meta })
})

module.exports = { getEras, getEraBySlug, getDinosaursForEra }