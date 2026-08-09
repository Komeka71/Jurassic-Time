/**
 * A deliberate, expected error (bad input, not found, unauthorized, etc.)
 * as opposed to an unexpected bug. Thrown from services/controllers and
 * caught by the global error middleware, which uses `statusCode` and
 * `details` to shape the HTTP response — see middleware/errorMiddleware.js.
 */
class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code to respond with.
   * @param {string} message - Human-readable message, safe to show a client.
   * @param {Array|object|null} details - Optional extra detail, e.g. a list
   *   of per-field validation errors.
   */
  constructor(statusCode, message, details = null) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.details = details
    // Marks this as a known, handled error rather than a programming bug —
    // the error middleware uses this to decide how much detail is safe to
    // expose to the client vs. only to the server log.
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }

  static badRequest(message, details = null) {
    return new ApiError(400, message, details)
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message)
  }

  static forbidden(message = 'Forbidden') {
    return new ApiError(403, message)
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(404, message)
  }

  static conflict(message, details = null) {
    return new ApiError(409, message, details)
  }

  static internal(message = 'Internal server error') {
    return new ApiError(500, message)
  }
}

module.exports = { ApiError }