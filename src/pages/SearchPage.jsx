import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import TimelineNavbar from '../components/TimelineNavbar.jsx'
import BackButton from '../components/BackButton.jsx'
import SearchBar from '../components/Search/SearchBar.jsx'
import SearchFilters from '../components/Search/SearchFilters.jsx'
import SearchResults from '../components/Search/SearchResults.jsx'
import SearchEmptyState from '../components/Search/SearchEmptyState.jsx'
import { search } from '../search/searchService.js'
// Defensive: guarantees collections are registered even if this page is
// ever reached (e.g. via code-splitting) before App.jsx's own import of
// this same module has run. Re-importing an already-loaded ES module is
// a no-op, so this is free.
import '../search/registerCollections.js'
import './SearchPage.css'

/**
 * Global Museum Search — a spacious, hero-style museum page rather than
 * a generic search-results page. Reads ?q= from the URL (so the query,
 * and therefore the results, survive refresh and browser back/forward
 * with zero extra state management) and calls the shared search
 * service — the exact same service any future navbar "quick results"
 * dropdown or other search UI would call.
 *
 * Owns three independent filters (era / diet / region), AND-combined
 * client-side over whatever the search service already returned — the
 * search service itself never knows filters exist. Region uses a
 * "contains" match rather than strict equality, since the dropdown's
 * continent-level options (e.g. "Asia") don't always exactly equal the
 * data's more specific region values (e.g. "Central Asia").
 *
 * SearchResults/SearchCard/SearchEmptyState remain pure display
 * components with no fetching or filtering logic of their own.
 */
function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

  const [results, setResults] = useState([])
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'done'
  const [era, setEra] = useState(null)
  const [diet, setDiet] = useState(null)
  const [region, setRegion] = useState(null)

  useEffect(() => {
    let cancelled = false
    setEra(null)
    setDiet(null)
    setRegion(null)

    if (!query.trim()) {
      setResults([])
      setStatus('idle')
      return undefined
    }

    setStatus('loading')
    search(query).then((found) => {
      if (!cancelled) {
        setResults(found)
        setStatus('done')
      }
    })

    return () => {
      cancelled = true
    }
  }, [query])

  const visibleResults = useMemo(
    () =>
      results.filter((result) => {
        if (era && result.era !== era) return false
        if (diet && result.diet !== diet) return false
        if (region && !result.region?.toLowerCase().includes(region.toLowerCase())) return false
        return true
      }),
    [results, era, diet, region],
  )

  return (
    <div className="search-page">
      <TimelineNavbar />
      <BackButton />

      <main className="search-page__content">
        <header className="search-page__header">
          <p className="search-page__eyebrow">Museum Search</p>
          <h1 className="search-page__title">Search the Museum</h1>
          <p className="search-page__subtitle">
            Find dinosaurs by name, scientific name, or era across every exhibit.
          </p>
          <div className="search-page__bar">
            <SearchBar />
          </div>
        </header>

        <section className="search-page__body">
          {!query.trim() && (
            <p className="search-page__prompt">
              Start typing above to explore the collection.
            </p>
          )}

          {status === 'loading' && <p className="search-page__prompt">Searching…</p>}

          {status === 'done' && results.length === 0 && <SearchEmptyState query={query} />}

          {status === 'done' && results.length > 0 && (
            <>
              <SearchFilters
                era={era}
                diet={diet}
                region={region}
                onEraChange={setEra}
                onDietChange={setDiet}
                onRegionChange={setRegion}
              />
              {visibleResults.length > 0 ? (
                <SearchResults results={visibleResults} />
              ) : (
                <SearchEmptyState query={query} />
              )}
            </>
          )}
        </section>
      </main>
    </div>
  )
}

export default SearchPage
