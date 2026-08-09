const { Router } = require('express')
const { validateRequest } = require('../../middleware/validateRequest.js')
const { listDinosaursValidator, dinosaurSlugParamValidator } = require('../../validators/dinosaurValidators.js')
const controller = require('../../controllers/dinosaurController.js')

const router = Router()

// GET /api/v1/dinosaurs
router.get('/', listDinosaursValidator, validateRequest, controller.getDinosaurs)

// GET /api/v1/dinosaurs/:slug
router.get('/:slug', dinosaurSlugParamValidator, validateRequest, controller.getDinosaurBySlug)

module.exports = router