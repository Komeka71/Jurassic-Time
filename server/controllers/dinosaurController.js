const { asyncHandler } = require('../utils/asyncHandler.js')
const { sendSuccess } = require('../utils/ApiResponse.js')
const dinosaurService = require('../services/dinosaurService.js')

const getDinosaurs = asyncHandler(async (req, res) => {
  const { items, meta } = await dinosaurService.listDinosaurs(req.query)
  sendSuccess(res, { data: items, meta })
})

const getDinosaurBySlug = asyncHandler(async (req, res) => {
  const dinosaur = await dinosaurService.getDinosaurBySlug(req.params.slug)
  sendSuccess(res, { data: dinosaur })
})

module.exports = { getDinosaurs, getDinosaurBySlug }