const { validationResult } = require('express-validator')
const { ApiError } = require('../utils/ApiError.js')

/**
 * Runs after a route's express-validator chain (see validators/). If any
 * validator in the chain failed, turns the accumulated errors into one
 * 400 ApiError with a per-field details array; otherwise calls next().
 *
 * Usage:
 *   router.get('/:slug', someParamValidator, validateRequest, controller)
 */
function validateRequest(req, res, next) {
  const result = validationResult(req)
  if (result.isEmpty()) return next()

  const details = result.array().map((e) => ({
    field: e.path,
    message: e.msg,
  }))

  next(ApiError.badRequest('Validation failed', details))
}

module.exports = { validateRequest }