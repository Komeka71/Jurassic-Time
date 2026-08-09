import { useEffect, useRef, useState } from 'react'
import { ERA_OPTIONS, DIET_OPTIONS, CONTINENT_OPTIONS } from '../../search/filterOptions.js'
import './SearchFilters.css'

/**
 * One filter category inside the panel — a label plus a row of
 * single-select toggle chips (click the active chip again to clear
 * just that category). `options` is either an array of plain strings
 * (diet, continent, type) or `{ value, label }` pairs (era, where the
 * value sent to onChange — an eraSlug — differs from what's shown).
 */
function FilterGroup({ title, options, value, onChange }) {
  if (options.length === 0) return null

  return (
    <fieldset className="search-filters__group">
      <legend className="search-filters__group-label">{title}</legend>
      <div className="search-filters__chip-row">
        {options.map((option) => {
          const optionValue = typeof option === 'string' ? option : option.value
          const optionLabel = typeof option === 'string' ? option : option.label
          const isActive = value === optionValue

          return (
            <button
              key={optionValue}
              type="button"
              className={
                'search-filters__chip' + (isActive ? ' search-filters__chip--active' : '')
              }
              aria-pressed={isActive}
              onClick={() => onChange(isActive ? null : optionValue)}
            >
              {optionLabel}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

/**
 * Filter trigger + panel for Search — Era / Diet / Type / Continent,
 * all AND-combinable, applied client-side by SearchPage over whatever
 * the search/browse step already returned (see SearchPage.jsx; this
 * component only reports the selected values upward, it never fetches
 * or filters anything itself).
 *
 * Era/Diet/Continent option lists are the static, backend-mirrored
 * lists from search/filterOptions.js — every value here is guaranteed
 * to be one the backend's own /dinosaurs filters would accept. Type has
 * no backend enum, so its options are passed in by SearchPage, derived
 * from whatever dinosaur types are actually loaded.
 *
 * Same panel markup serves as a popover anchored under the trigger on
 * desktop and a bottom-sheet drawer on mobile — SearchFilters.css
 * switches between the two purely via a max-width media query, so this
 * component doesn't need to know which layout it's in.
 */
function SearchFilters({
  era,
  diet,
  type,
  continent,
  onEraChange,
  onDietChange,
  onTypeChange,
  onContinentChange,
  onClearAll,
  typeOptions = [],
}) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const activeCount = [era, diet, type, continent].filter(Boolean).length

  // Close on outside click.
  useEffect(() => {
    if (!isOpen) return undefined

    function handlePointerDown(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [isOpen])

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Lock background scroll while the panel is a full mobile drawer.
  useEffect(() => {
    if (!isOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <div className="search-filters" ref={containerRef}>
      <button
        type="button"
        className={
          'search-filters__trigger' + (activeCount > 0 ? ' search-filters__trigger--active' : '')
        }
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span aria-hidden="true">⚲</span>
        Filters
        {activeCount > 0 && <span className="search-filters__badge">{activeCount}</span>}
      </button>

      {isOpen && (
        <>
          <div
            className="search-filters__backdrop"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />
          <div className="search-filters__panel" role="dialog" aria-label="Filter results">
            <div className="search-filters__panel-header">
              <h2 className="search-filters__panel-title">Filters</h2>
              <button
                type="button"
                className="search-filters__close"
                aria-label="Close filters"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="search-filters__panel-body">
              <FilterGroup title="Era" options={ERA_OPTIONS} value={era} onChange={onEraChange} />
              <FilterGroup
                title="Diet"
                options={DIET_OPTIONS}
                value={diet}
                onChange={onDietChange}
              />
              <FilterGroup title="Type" options={typeOptions} value={type} onChange={onTypeChange} />
              <FilterGroup
                title="Continent"
                options={CONTINENT_OPTIONS}
                value={continent}
                onChange={onContinentChange}
              />
            </div>

            <div className="search-filters__panel-footer">
              <button
                type="button"
                className="search-filters__clear"
                onClick={onClearAll}
                disabled={activeCount === 0}
              >
                Clear all
              </button>
              <button
                type="button"
                className="search-filters__apply"
                onClick={() => setIsOpen(false)}
              >
                Show results
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default SearchFilters