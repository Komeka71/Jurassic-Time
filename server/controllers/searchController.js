const { asyncHandler } = require('../utils/asyncHandler.js')
const { sendSuccess } = require('../utils/ApiResponse.js')
const searchService = require('../services/searchService.js')

const getSearchResults = asyncHandler(async (req, res) => {
  const results = await searchService.search(req.query.q, { limit: req.query.limit })
  sendSuccess(res, { data: results, meta: { query: req.query.q, count: results.length } })
})

module.exports = { getSearchResults }