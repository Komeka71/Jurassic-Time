/**
 * Every successful response in this API follows the same envelope:
 *
 *   { success: true, data: <payload>, meta?: { ...pagination, etc. } }
 *
 * Errors follow the matching shape produced by middleware/errorMiddleware.js:
 *
 *   { success: false, message: <string>, errors?: [...] }
 *
 * Controllers call `sendSuccess(res, ...)` rather than building the
 * envelope by hand, so the shape can't drift between endpoints.
 */
function sendSuccess(res, { statusCode = 200, data = null, meta = undefined, message = undefined } = {}) {
  const body = { success: true }
  if (message !== undefined) body.message = message
  body.data = data
  if (meta !== undefined) body.meta = meta
  return res.status(statusCode).json(body)
}

module.exports = { sendSuccess }