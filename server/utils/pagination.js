const DEFAULT_LIMIT = 20
const MAX_LIMIT = 100

/**
 * Reads page/limit off a (already-validated) query object and returns
 * the values plus the Mongo skip offset. Clamped defensively even
 * though the route-level validator already constrains these — a
 * service should never trust its caller blindly.
 */
function parsePagination(query = {}) {
  const page = Math.max(1, parseInt(query.page, 10) || 1)
  const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(query.limit, 10) || DEFAULT_LIMIT))
  const skip = (page - 1) * limit
  return { page, limit, skip }
}

function buildPaginationMeta({ page, limit, total }) {
  return {
    page,
    limit,
    total,
    totalPages: total === 0 ? 0 : Math.ceil(total / limit),
  }
}

module.exports = { parsePagination, buildPaginationMeta, DEFAULT_LIMIT, MAX_LIMIT }