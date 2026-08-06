import './SearchFilters.css'

/**
 * Optional era filter over the current result set. Deliberately simple
 * and client-side (filtering results already returned by the search
 * service, not re-querying) — options are derived from whatever eras are
 * actually present in `results`, so a filter chip never appears for an
 * era with zero matches.
 */
function SearchFilters({ results, activeEra, onChange }) {
  const eras = [...new Set(results.map((result) => result.era).filter(Boolean))]

  if (eras.length < 2) return null

  return (
    <div className="search-filters">
      <button
        type="button"
        className={
          'search-filters__chip' + (!activeEra ? ' search-filters__chip--active' : '')
        }
        onClick={() => onChange(null)}
      >
        All
      </button>
      {eras.map((era) => (
        <button
          key={era}
          type="button"
          className={
            'search-filters__chip' + (activeEra === era ? ' search-filters__chip--active' : '')
          }
          onClick={() => onChange(era)}
        >
          {era}
        </button>
      ))}
    </div>
  )
}

export default SearchFilters