/**
 * Small, centralized fetch wrapper for the backend REST API
 * (backend/routes/v1/*) — every network call to the backend goes
 * through this one file instead of being scattered across components.
 *
 * Base URL is configurable via VITE_API_BASE_URL (see .env.example) so
 * each developer/environment can point at their own backend without
 * touching code, and defaults to the backend's local dev port.
 *
 * Every backend response already follows one consistent envelope
 * (see backend/utils/ApiResponse.js / errorMiddleware.js):
 *   success: { success: true, data, meta? }
 *   error:   { success: false, message, errors? }
 * `request()` unwraps that once, here, so every function below just
 * returns the plain `data` (and `meta`, where relevant) — callers never
 * see the envelope or have to re-check `success` themselves.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1'

async function request(path, { params } = {}) {
  const url = new URL(`${API_BASE_URL}${path}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, value)
      }
    })
  }

  let response
  try {
    response = await fetch(url)
  } catch {
    throw new Error('Could not reach the museum API. Check your connection and try again.')
  }

  const body = await response.json().catch(() => null)

  if (!response.ok || !body?.success) {
    throw new Error(body?.message || `Request to ${path} failed (${response.status})`)
  }

  return body
}

export async function getEras() {
  const { data } = await request('/eras')
  return data
}

export async function getEraBySlug(slug) {
  const { data } = await request(`/eras/${encodeURIComponent(slug)}`)
  return data
}

/**
 * One era's dinosaurs. `limit` defaults generously above any current
 * era's real dinosaur count (max today: 12) so the Timeline gets every
 * exhibit in a single request without needing pagination UI — if an
 * era's roster ever grows past 100, this needs to become page-aware
 * like getAllDinosaurs() below.
 */
export async function getDinosaursForEra(eraSlug, params = {}) {
  const { data, meta } = await request(`/eras/${encodeURIComponent(eraSlug)}/dinosaurs`, {
    params: { limit: 100, ...params },
  })
  return { items: data, meta }
}

export async function getDinosaurs(params = {}) {
  const { data, meta } = await request('/dinosaurs', { params })
  return { items: data, meta }
}

export async function getDinosaurBySlug(slug) {
  const { data } = await request(`/dinosaurs/${encodeURIComponent(slug)}`)
  return data
}

/**
 * Walks the backend's real pagination (page/limit/totalPages) rather
 * than guessing one large `limit` — correct regardless of how many
 * dinosaurs eventually exist, and doesn't reimplement any pagination
 * logic itself, just calls the existing paginated endpoint repeatedly.
 * Used by the Search collection, which needs every dinosaur to match
 * against (see search/collections/dinosaurCollection.js).
 */
export async function getAllDinosaurs() {
  const first = await getDinosaurs({ page: 1, limit: 100 })
  const pages = [first.items]
  for (let page = 2; page <= first.meta.totalPages; page += 1) {
    // eslint-disable-next-line no-await-in-loop -- pages must be fetched in order; total is small today
    const next = await getDinosaurs({ page, limit: 100 })
    pages.push(next.items)
  }
  return pages.flat()
}

export async function searchDinosaurs(query, params = {}) {
  const { data, meta } = await request('/search', { params: { q: query, ...params } })
  return { items: data, meta }
}