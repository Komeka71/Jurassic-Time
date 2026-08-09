const { param, query } = require('express-validator')
const { DIETS, CONTINENTS } = require('../constants')

/**
 * Deliberately NOT constrained to the current known era slugs (unlike
 * dinosaurs.eraSlug's schema-level enum) — eras is the open, extensible
 * source of truth (see models/Era.js / the design doc). A slug that
 * doesn't exist yet is a 404 from the service layer, not a 400 here.
 */
const eraSlugParamValidator = [
  param('slug')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('slug is required')
    .matches(/^[a-z0-9-]+$/)
    .withMessage('slug must be lowercase letters, numbers, and hyphens only'),
]

const listEraDinosaursValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer').toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100').toInt(),
  query('diet').optional().isIn(DIETS).withMessage(`diet must be one of: ${DIETS.join(', ')}`),
  query('continent').optional().isIn(CONTINENTS).withMessage(`continent must be one of: ${CONTINENTS.join(', ')}`),
  query('type').optional().isString().trim().notEmpty(),
]

module.exports = { eraSlugParamValidator, listEraDinosaursValidator }