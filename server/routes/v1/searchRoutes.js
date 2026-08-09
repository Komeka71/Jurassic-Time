const { Router } = require('express')
const { validateRequest } = require('../../middleware/validateRequest.js')
const { searchValidator } = require('../../validators/searchValidators.js')
const controller = require('../../controllers/searchController.js')

const router = Router()

// GET /api/v1/search?q=...
router.get('/', searchValidator, validateRequest, controller.getSearchResults)

module.exports = router