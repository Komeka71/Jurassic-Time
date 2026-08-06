import './searchEmptyState.css'

/**
 * Polished museum-style empty state for a search that returned nothing.
 * `query` is shown back to the visitor so it's clear what was searched;
 * the suggestions are generic on purpose since Search spans multiple
 * future collections (eras, mini games, DNA lab, articles, AI Guide),
 * not just dinosaurs.
 */
function SearchEmptyState({ query }) {
  return (
    <div className="search-empty-state">
      <p className="search-empty-state__title">
        No results for &ldquo;{query}&rdquo;.
      </p>
      <ul className="search-empty-state__suggestions">
        <li>Check your spelling</li>
        <li>Try the scientific name instead</li>
        <li>Browse an era from the home page</li>
      </ul>
    </div>
  )
}

export default SearchEmptyState