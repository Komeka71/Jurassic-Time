const { param, query } = require('express-validator')
const { DIETS, CONTINENTS, ERA_SLUGS } = require('../constants')

const listDinosaursValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer').toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100').toInt(),
  query('era').optional().isIn(ERA_SLUGS).withMessage(`era must be one of: ${ERA_SLUGS.join(', ')}`),
  query('diet').optional().isIn(DIETS).withMessage(`diet must be one of: ${DIETS.join(', ')}`),
  query('continent').optional().isIn(CONTINENTS).withMessage(`continent must be one of: ${CONTINENTS.join(', ')}`),
  query('type').optional().isString().trim().notEmpty(),
]

const dinosaurSlugParamValidator = [
  param('slug')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('slug is required')
    .matches(/^[a-z0-9-]+$/)
    .withMessage('slug must be lowercase letters, numbers, and hyphens only'),
]

module.exports = { listDinosaursValidator, dinosaurSlugParamValidator }