import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BackButton from '../components/BackButton.jsx'
import SearchBar from '../components/Search/SearchBar.jsx'
import SearchFilters from '../components/Search/SearchFilters.jsx'
import SearchResults from '../components/Search/SearchResults.jsx'
import SearchEmptyState from '../components/Search/SearchEmptyState.jsx'
import { getAllItems } from '../search/searchService.js'
import { ERA_OPTIONS } from '../search/filterOptions.js'
// Defensive: guarantees collections are registered even if this page is
// ever reached (e.g. via code-splitting) before App.jsx's own import of
// this same module has run. Re-importing an already-loaded ES module is
// a no-op, so this is free.
import '../search/registerCollections.js'
import './SearchPage.css'

const SEARCH_FIELDS = ['title', 'subtitle', 'era']

function normalize(text) {
  return String(text ?? '').trim().toLowerCase()
}

/**
 * Global Museum Search — a standalone browse/search/filter page rather
 * than a generic search-results page. Reads ?q= from the URL (so the
 * query, and therefore the results, survive refresh and browser back/
 * forward with zero extra state management) — SearchBar is what writes
 * to it on every keystroke.
 *
 * Data flow: the full collection is fetched exactly once, on mount, via
 * getAllItems() (searchService.js — reuses the same collection registry
 * SearchBar's autocomplete already relies on, so both stay backed by
 * MongoDB with zero hardcoded data). Never opens blank: with no query
 * and no filters, every dinosaur is shown immediately.
 *
 * Query text and all four filters (era/diet/type/continent) are then
 * applied together as one client-side, AND-combined pass over that
 * already-fetched list (see `visibleResults` below) — matching on the
 * same fields (name/scientificName/era) the backend's own /search
 * endpoint and the SearchBar autocomplete dropdown use, so results here
 * never disagree with what the dropdown suggests. Filtering client-side
 * like this is what lets search text and filters combine at all: the
 * backend's /search endpoint doesn't accept filter params, and
 * /dinosaurs's filters don't accept a text query — see the backend
 * investigation notes for why an endpoint-level combination isn't
 * available without changing backend behavior, which this feature must
 * not do.
 *
 * SearchResults/SearchCard/SearchEmptyState remain pure display
 * components with no fetching or filtering logic of their own.
 */
function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const trimmedQuery = normalize(query)

  const [allResults, setAllResults] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'
  const [retryToken, setRetryToken] = useState(0)

  const [era, setEra] = useState(null)
  const [diet, setDiet] = useState(null)
  const [type, setType] = useState(null)
  const [continent, setContinent] = useState(null)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    getAllItems()
      .then((items) => {
        if (cancelled) return
        setAllResults(items)
        setStatus('success')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [retryToken])

  const searchedResults = useMemo(() => {
    if (!trimmedQuery) return allResults
    return allResults.filter((result) =>
      SEARCH_FIELDS.some((field) => normalize(result[field]).includes(trimmedQuery)),
    )
  }, [allResults, trimmedQuery])

  // Every dinosaur type actually present, derived from the full,
  // unfiltered collection (not the currently-narrowed results) so every
  // type stays selectable regardless of what's currently searched/
  // filtered — the backend has no fixed enum for `type`, so this is the
  // dynamic source the design doc calls for.
  const typeOptions = useMemo(
    () => [...new Set(allResults.map((result) => result.dinosaurType).filter(Boolean))].sort(),
    [allResults],
  )

  const visibleResults = useMemo(
    () =>
      searchedResults.filter((result) => {
        if (era && result.eraSlug !== era) return false
        if (diet && result.diet !== diet) return false
        if (type && result.dinosaurType !== type) return false
        if (continent && result.continent !== continent) return false
        return true
      }),
    [searchedResults, era, diet, type, continent],
  )

  const clearAllFilters = () => {
    setEra(null)
    setDiet(null)
    setType(null)
    setContinent(null)
  }

  const activeFilterChips = [
    era && {
      key: 'era',
      label: ERA_OPTIONS.find((option) => option.value === era)?.label ?? era,
      onRemove: () => setEra(null),
    },
    diet && { key: 'diet', label: diet, onRemove: () => setDiet(null) },
    type && { key: 'type', label: type, onRemove: () => setType(null) },
    continent && { key: 'continent', label: continent, onRemove: () => setContinent(null) },
  ].filter(Boolean)

  return (
    <div className="search-page">
      <BackButton />

      <main className="search-page__content">
        <header className="search-page__toolbar">
          <div className="search-page__heading">
            <p className="search-page__eyebrow">Museum Search</p>
            <h1 className="search-page__title">Browse the Collection</h1>
          </div>

          <div className="search-page__controls">
            <SearchBar />
            <SearchFilters
              era={era}
              diet={diet}
              type={type}
              continent={continent}
              onEraChange={setEra}
              onDietChange={setDiet}
              onTypeChange={setType}
              onContinentChange={setContinent}
              onClearAll={clearAllFilters}
              typeOptions={typeOptions}
            />
          </div>
        </header>

        <section className="search-page__body">
          {status === 'loading' && (
            <p className="search-page__prompt">Loading the collection…</p>
          )}

          {status === 'error' && (
            <div className="search-page__status">
              <p className="search-page__prompt">
                We couldn't load the museum's collection.
              </p>
              <button
                type="button"
                className="search-page__retry"
                onClick={() => setRetryToken((token) => token + 1)}
              >
                Try again
              </button>
            </div>
          )}

          {status === 'success' && (
            <>
              {activeFilterChips.length > 0 && (
                <div className="search-page__active-filters">
                  {activeFilterChips.map((chip) => (
                    <button
                      key={chip.key}
                      type="button"
                      className="search-page__active-chip"
                      onClick={chip.onRemove}
                    >
                      {chip.label}
                      <span aria-hidden="true">✕</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    className="search-page__clear-all"
                    onClick={clearAllFilters}
                  >
                    Clear all
                  </button>
                </div>
              )}

              <p className="search-page__count">
                {visibleResults.length} {visibleResults.length === 1 ? 'dinosaur' : 'dinosaurs'}
              </p>

              {visibleResults.length > 0 ? (
                <SearchResults results={visibleResults} />
              ) : (
                <SearchEmptyState query={query} hasActiveFilters={activeFilterChips.length > 0} />
              )}
            </>
          )}
        </section>
      </main>
    </div>
  )
}

export default SearchPage