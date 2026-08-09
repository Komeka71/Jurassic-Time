/**
 * Wraps an async Express handler so a rejected promise (a thrown error
 * inside an `async` controller) is forwarded to `next(error)` instead of
 * becoming an unhandled rejection. Keeps every controller free of
 * try/catch boilerplate — see the "controllers contain almost no logic"
 * requirement.
 *
 * Usage: router.get('/', asyncHandler(controllerFn))
 */
function asyncHandler(fn) {
  return function wrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

module.exports = { asyncHandler }