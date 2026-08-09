import { Link } from 'react-router-dom'
import { eras } from '../../data/eraTimelines.js'
import './SearchCard.css'

/**
 * One museum-themed search result. Renders from the common SearchResult
 * shape produced by any collection's toResult() (see search/searchService.js)
 * — this component has no idea the data originally came from dinosaurs
 * specifically, only that it has the fields listed in the spec (image,
 * title/subtitle, era, diet, type, region, description).
 *
 * Tinted with its own era's theme colors (looked up from
 * data/eraTimelines.js) rather than the page's ambient --era-* variables
 * — results can span every era at once here, so each card carries its
 * own accent instead of all sharing whatever the page's fallback theme
 * happens to be. This is the same "compute once, apply as CSS custom
 * properties" pattern EraTimeline uses for the whole page, just scoped
 * to one card.
 *
 * "View Exhibit" links straight into that dinosaur's era timeline with
 * an ?exhibit= param — EraTimeline picks that up, scrolls to it, and
 * opens its detail panel automatically (see EraTimeline.jsx).
 */
function SearchCard({ result }) {
  const theme = eras[result.eraSlug]?.theme
  const themeVars = theme && {
    '--era-primary': theme.primary,
    '--era-primary-dim': theme.primaryDim,
    '--era-chip-background': theme.chipBackground,
    '--era-chip-border': theme.chipBorder,
    '--era-chip-text': theme.chipText,
  }

  const exhibitHref = result.eraSlug
    ? `/timeline/${result.eraSlug}?exhibit=${encodeURIComponent(result.dinosaurId ?? '')}`
    : null

  return (
    <article className="search-card" style={themeVars}>
      <div
        className="search-card__image"
        style={result.image ? { backgroundImage: `url(${result.image})` } : undefined}
        aria-hidden="true"
      />

      <div className="search-card__body">
        {result.era && <span className="search-card__era">{result.era}</span>}

        <h3 className="search-card__title">{result.title}</h3>
        {result.subtitle && <p className="search-card__subtitle">{result.subtitle}</p>}

        {(result.diet || result.dinosaurType || result.region) && (
          <div className="search-card__meta">
            {result.diet && <span>{result.diet}</span>}
            {result.dinosaurType && <span>{result.dinosaurType}</span>}
            {result.region && <span>{result.region}</span>}
          </div>
        )}

        {result.description && (
          <p className="search-card__description">{result.description}</p>
        )}

        {exhibitHref && (
          <Link className="search-card__cta" to={exhibitHref}>
            View Exhibit
          </Link>
        )}
      </div>
    </article>
  )
}

export default SearchCard