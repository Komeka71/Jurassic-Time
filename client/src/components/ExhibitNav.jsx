import './ExhibitNav.css'

/**
 * Vertical exhibit navigation. Clicking Previous/Next scrolls to the
 * neighboring exhibit exactly the way scrolling manually would — both
 * paths funnel through the same scroll-to-exhibit logic in
 * EraTimeline, so the active marker and info panel update either way.
 */
function ExhibitNav({ onPrev, onNext, canPrev, canNext }) {
  return (
    <div className="exhibit-nav">
      <button
        type="button"
        className="exhibit-nav__arrow"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous exhibit"
      >
        <span className="exhibit-nav__icon">▲</span>
        <span className="exhibit-nav__label">Previous</span>
      </button>

      <span className="exhibit-nav__divider" aria-hidden="true">
        ↓
      </span>

      <button
        type="button"
        className="exhibit-nav__arrow"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next exhibit"
      >
        <span className="exhibit-nav__label">Next</span>
        <span className="exhibit-nav__icon">▼</span>
      </button>
    </div>
  )
}

export default ExhibitNav