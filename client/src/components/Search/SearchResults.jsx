import SearchCard from './SearchCard.jsx'
import './SearchResults.css'

/**
 * Plain grid of SearchCard results. Deliberately dumb — no fetching, no
 * filtering, just rendering whatever array it's handed. SearchPage owns
 * the actual search call and any filtering; keeping this component pure
 * makes it reusable wherever a list of SearchResults needs to render
 * (e.g. a "quick results" dropdown under the navbar SearchBar later).
 */
function SearchResults({ results }) {
  return (
    <div className="search-results">
      {results.map((result) => (
        <SearchCard key={result.id} result={result} />
      ))}
    </div>
  )
}

export default SearchResults