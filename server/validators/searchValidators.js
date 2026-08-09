const { query } = require('express-validator')

const searchValidator = [
  query('q').isString().withMessage('q is required').trim().isLength({ min: 1 }).withMessage('q must not be empty'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('limit must be between 1 and 50').toInt(),
]

module.exports = { searchValidator }