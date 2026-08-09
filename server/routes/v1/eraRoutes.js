const { Router } = require('express')
const { validateRequest } = require('../../middleware/validateRequest.js')
const { eraSlugParamValidator, listEraDinosaursValidator } = require('../../validators/eraValidators.js')
const controller = require('../../controllers/eraController.js')

const router = Router()

// GET /api/v1/eras
router.get('/', controller.getEras)

// GET /api/v1/eras/:slug
router.get('/:slug', eraSlugParamValidator, validateRequest, controller.getEraBySlug)

// GET /api/v1/eras/:slug/dinosaurs
router.get(
  '/:slug/dinosaurs',
  [...eraSlugParamValidator, ...listEraDinosaursValidator],
  validateRequest,
  controller.getDinosaursForEra,
)

module.exports = router