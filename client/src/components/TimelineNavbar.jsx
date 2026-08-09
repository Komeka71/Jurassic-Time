import { Link, useLocation } from 'react-router-dom'
import './TimelineNavbar.css'

const NAV_ITEMS = ['Timeline', 'Map', 'Quiz', 'Museum', 'Shop', 'AI Guide']

/**
 * Temporary placeholder navbar. Will be replaced by the shared project
 * navbar once it exists — links are non-functional for now.
 *
 * No search input lives here — it's a plain nav link ("🔍 Search") that
 * jumps straight to the dedicated /search page, same as every other nav
 * item. The full SearchBar (with its autocomplete dropdown) lives only
 * on SearchPage.
 *
 * To keep the exhibit view uncluttered, the nav links (including Search)
 * fade out by default and reveal on hover/focus of the navbar — see
 * TimelineNavbar.css. The brand/logo is intentionally excluded from that
 * fade and stays visible at all times.
 */
function TimelineNavbar() {
  const location = useLocation()
  const onSearchPage = location.pathname === '/search'

  return (
    <nav className="timeline-navbar" aria-label="Primary">
      <span className="timeline-navbar__brand">Paleora Museum</span>
      <ul className="timeline-navbar__list">
        {NAV_ITEMS.map((item) => (
          <li key={item}>
            <a
              className="timeline-navbar__link"
              href="#"
              onClick={(event) => event.preventDefault()}
            >
              {item}
            </a>
          </li>
        ))}
        <li>
          <Link
            className="timeline-navbar__link"
            to="/search"
            onClick={(event) => {
              if (onSearchPage) event.preventDefault()
            }}
          >
            🔍 Search
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default TimelineNavbar