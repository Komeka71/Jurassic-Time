import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { search } from '../../search/searchService.js'
import './SearchBar.css'

const MAX_SUGGESTIONS = 6
const MIN_QUERY_LENGTH = 2

/**
 * Large, centered, glassmorphism museum search box. Lives only on
 * SearchPage now — it's the hero of that page, not a navbar accessory.
 *
 * Auto-focuses on mount so a visitor can start typing immediately.
 * Drives instant, live search by writing every keystroke straight to
 * the URL's ?q= param via setSearchParams(..., { replace: true }) —
 * `replace` (not `push`) so each keystroke doesn't spam browser
 * history with its own entry.
 *
 * The input is effectively local/uncontrolled — a ref + defaultValue,
 * synced from the URL once on mount — so typing itself never has any
 * perceptible lag waiting on React state round-trips.
 *
 * A lightweight autocomplete dropdown sits underneath, reusing the
 * exact same search(query) call the results page uses (no second
 * search engine, no duplicated matching logic) — it just takes the
 * first few matches and renders them as selectable suggestions.
 * Selecting one jumps straight into that dinosaur's era exhibit via
 * the same /timeline/:eraSlug?exhibit=:dinosaurId link SearchCard uses.
 */
function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const containerRef = useRef(null)
  const requestIdRef = useRef(0)

  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Close the dropdown on outside click.
  useEffect(() => {
    function handlePointerDown(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  const fetchSuggestions = (value) => {
    const requestId = ++requestIdRef.current
    if (value.trim().length < MIN_QUERY_LENGTH) {
      setSuggestions([])
      setIsOpen(false)
      setHighlightedIndex(-1)
      return
    }

    search(value).then((found) => {
      if (requestId !== requestIdRef.current) return // stale response, ignore
      const next = found.slice(0, MAX_SUGGESTIONS)
      setSuggestions(next)
      setIsOpen(next.length > 0)
      setHighlightedIndex(-1)
    })
  }

  const handleChange = (event) => {
    const value = event.target.value
    const nextParams = new URLSearchParams(searchParams)
    if (value.trim()) {
      nextParams.set('q', value)
    } else {
      nextParams.delete('q')
    }
    setSearchParams(nextParams, { replace: true })
    fetchSuggestions(value)
  }

  const selectSuggestion = (result) => {
    if (!result?.eraSlug) return
    setIsOpen(false)
    setSuggestions([])
    setHighlightedIndex(-1)
    navigate(`/timeline/${result.eraSlug}?exhibit=${encodeURIComponent(result.dinosaurId ?? '')}`)
  }

  const handleKeyDown = (event) => {
    if (!isOpen || suggestions.length === 0) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlightedIndex((prev) => Math.min(prev + 1, suggestions.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlightedIndex((prev) => Math.max(prev - 1, 0))
    } else if (event.key === 'Enter') {
      if (highlightedIndex >= 0) {
        event.preventDefault()
        selectSuggestion(suggestions[highlightedIndex])
      }
      // No highlighted suggestion: let the default (form submit prevented
      // below) happen, leaving the visitor on /search?q=... as-is.
    } else if (event.key === 'Escape') {
      setIsOpen(false)
      setHighlightedIndex(-1)
    }
  }

  return (
    <form
      className="search-bar"
      role="search"
      onSubmit={(event) => event.preventDefault()}
      ref={containerRef}
    >
      <div className="search-bar__field">
        <span
          className="search-bar__icon"
          role="button"
          tabIndex={-1}
          aria-label="Focus search"
          onMouseDown={(event) => {
            // mousedown (not click), same reasoning as suggestion
            // selection below — fires before the input blurs.
            event.preventDefault()
            inputRef.current?.focus()
          }}
        >
          🔍
        </span>
        <input
          ref={inputRef}
          type="search"
          autoComplete="off"
          className="search-bar__input"
          placeholder="Search dinosaurs by name, scientific name, or era…"
          defaultValue={searchParams.get('q') ?? ''}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={(event) => fetchSuggestions(event.target.value)}
          aria-label="Search the museum"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="search-bar-suggestions"
        />
      </div>

      {isOpen && (
        <ul className="search-bar__suggestions" id="search-bar-suggestions" role="listbox">
          {suggestions.map((result, index) => (
            <li
              key={result.dinosaurId ?? result.title}
              role="option"
              aria-selected={index === highlightedIndex}
              className={
                index === highlightedIndex
                  ? 'search-bar__suggestion search-bar__suggestion--active'
                  : 'search-bar__suggestion'
              }
              onMouseEnter={() => setHighlightedIndex(index)}
              onMouseDown={(event) => {
                // mousedown (not click) so it fires before the input's blur
                event.preventDefault()
                selectSuggestion(result)
              }}
            >
              <span className="search-bar__suggestion-name">{result.title}</span>
              {result.subtitle && (
                <span className="search-bar__suggestion-scientific">{result.subtitle}</span>
              )}
              {result.era && <span className="search-bar__suggestion-era">{result.era}</span>}
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}

export default SearchBar