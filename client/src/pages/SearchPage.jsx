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
 * Global Museum Search results page. Reads ?q= from the URL (so the
 * query, and therefore the results, survive refresh and browser back/
 * forward with zero extra state management) and calls the shared search
 * service — the exact same service a future navbar "quick results"
 * dropdown or any other search UI would call. This page owns the actual
 * search request and the optional era filter; SearchResults/SearchCard/
 * SearchEmptyState are all pure display components with no fetching
 * logic of their own.
 */
function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

  const [results, setResults] = useState([])
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'done'
  const [activeEra, setActiveEra] = useState(null)

  useEffect(() => {
    let cancelled = false
    setActiveEra(null)

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
    () => (activeEra ? results.filter((result) => result.era === activeEra) : results),
    [results, activeEra],
  )

  return (
    <div className="search-page">
      <TimelineNavbar />
      <BackButton />

      <main className="search-page__content">
        <header className="search-page__header">
          <p className="search-page__eyebrow">Museum Search</p>
          <h1 className="search-page__title">
            {query ? `Results for \u201c${query}\u201d` : 'Search the Museum'}
          </h1>
          <div className="search-page__bar">
            <SearchBar />
          </div>
        </header>

        {!query.trim() && (
          <p className="search-page__prompt">
            Search dinosaurs by name, scientific name, or era to begin.
          </p>
        )}

        {status === 'loading' && <p className="search-page__prompt">Searching…</p>}

        {status === 'done' && results.length === 0 && <SearchEmptyState query={query} />}

        {status === 'done' && results.length > 0 && (
          <>
            <SearchFilters results={results} activeEra={activeEra} onChange={setActiveEra} />
            <SearchResults results={visibleResults} />
          </>
        )}
      </main>
    </div>
  )
}

export default SearchPage