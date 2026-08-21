import { Link, useLocation } from 'react-router-dom'
import './TimelineNavbar.css'

/**
 * Minimal navbar: just a small search button, top-right.
 * All other nav items removed — they were non-functional placeholders
 * pending the shared project navbar.
 */
function TimelineNavbar() {
  const location = useLocation()
  const onSearchPage = location.pathname === '/search'

  return (
    <nav className="timeline-navbar" aria-label="Primary">
      <Link
        className="timeline-navbar__search-btn"
        to="/search"
        onClick={(event) => {
          if (onSearchPage) event.preventDefault()
        }}
        aria-label="Search"
      >
        🔍
      </Link>
    </nav>
  )
}

export default TimelineNavbar