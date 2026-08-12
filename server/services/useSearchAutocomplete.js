import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { search } from './searchService.js'

const MAX_SUGGESTIONS = 6
const MIN_QUERY_LENGTH = 2

export function useSearchAutocomplete() {
  const navigate = useNavigate()
  const requestIdRef = useRef(0)

  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const fetchSuggestions = (value) => {
    const requestId = ++requestIdRef.current
    if (value.trim().length < MIN_QUERY_LENGTH) {
      setSuggestions([])
      setIsOpen(false)
      setHighlightedIndex(-1)
      return
    }

    search(value).then((found) => {
      if (requestId !== requestIdRef.current) return
      const next = found.slice(0, MAX_SUGGESTIONS)
      setSuggestions(next)
      setIsOpen(next.length > 0)
      setHighlightedIndex(-1)
    })
  }

  const selectSuggestion = (result) => {
    if (!result?.eraSlug) return
    setIsOpen(false)
    setSuggestions([])
    setHighlightedIndex(-1)
    navigate(`/timeline/${result.eraSlug}?exhibit=${encodeURIComponent(result.dinosaurId ?? '')}`)
  }

  const goToSearchPage = (value) => {
    setIsOpen(false)
    navigate(`/search?q=${encodeURIComponent(value)}`)
  }

  const handleKeyDown = (event, currentValue) => {
    if (!isOpen || suggestions.length === 0) {
      if (event.key === 'Enter' && currentValue.trim()) {
        goToSearchPage(currentValue)
      }
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlightedIndex((prev) => Math.min(prev + 1, suggestions.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlightedIndex((prev) => Math.max(prev - 1, 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (highlightedIndex >= 0) {
        selectSuggestion(suggestions[highlightedIndex])
      } else if (currentValue.trim()) {
        goToSearchPage(currentValue)
      }
    } else if (event.key === 'Escape') {
      setIsOpen(false)
      setHighlightedIndex(-1)
    }
  }

  return {
    suggestions,
    isOpen,
    highlightedIndex,
    setIsOpen,
    setHighlightedIndex,
    fetchSuggestions,
    selectSuggestion,
    goToSearchPage,
    handleKeyDown,
  }
}