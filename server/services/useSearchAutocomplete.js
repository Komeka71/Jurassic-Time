// inside your homepage navbar component
import { useRef } from 'react'
import { useSearchAutocomplete } from '../search/useSearchAutocomplete.js'

function HomeSearchBar() {
  const inputRef = useRef(null)
  const containerRef = useRef(null)
  const {
    suggestions, isOpen, highlightedIndex,
    setIsOpen, setHighlightedIndex,
    fetchSuggestions, selectSuggestion, handleKeyDown,
  } = useSearchAutocomplete()

  return (
    <div className="home-search" ref={containerRef} style={{ position: 'relative' }}>
      <input
        ref={inputRef}
        type="search"
        autoComplete="off"
        placeholder="Search dinosaurs, fossils, anatomy…"
        onChange={(e) => fetchSuggestions(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, inputRef.current.value)}
        onFocus={(e) => fetchSuggestions(e.target.value)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
      />

      {isOpen && (
        <ul className="home-search__suggestions" role="listbox">
          {suggestions.map((result, index) => (
            <li
              key={result.dinosaurId ?? result.title}
              role="option"
              aria-selected={index === highlightedIndex}
              className={index === highlightedIndex ? 'active' : ''}
              onMouseEnter={() => setHighlightedIndex(index)}
              onMouseDown={(e) => {
                e.preventDefault()
                selectSuggestion(result)
              }}
            >
              <span>{result.title}</span>
              {result.subtitle && <span className="dim">{result.subtitle}</span>}
              {result.era && <span className="dim">{result.era}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}