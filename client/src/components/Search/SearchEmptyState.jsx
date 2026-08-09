import './SearchEmptyState.css'

/**
 * Polished museum-style empty state for a search/filter combination
 * that returned nothing. `query` is shown back to the visitor so it's
 * clear what was searched; the suggestions are generic on purpose since
 * Search spans multiple future collections (eras, mini games, DNA lab,
 * articles, AI Guide), not just dinosaurs.
 *
 * `hasActiveFilters` covers the case where the empty result came purely
 * from filters narrowing the full browsable list (no query typed at
 * all) — the messaging and suggestions shift to be about filters
 * instead of spelling/search terms.
 */
function SearchEmptyState({ query, hasActiveFilters = false }) {
  const trimmedQuery = query?.trim()

  return (
    <div className="search-empty-state">
      <p className="search-empty-state__title">
        {trimmedQuery
          ? <>No results for &ldquo;{query}&rdquo;.</>
          : 'No dinosaurs match these filters.'}
      </p>
      <ul className="search-empty-state__suggestions">
        {trimmedQuery && <li>Check your spelling</li>}
        {trimmedQuery && <li>Try the scientific name instead</li>}
        {hasActiveFilters && <li>Try removing a filter</li>}
        <li>Browse an era from the home page</li>
      </ul>
    </div>
  )
}

export default SearchEmptyState