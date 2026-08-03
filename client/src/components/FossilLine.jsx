import './FossilLine.css'

/**
 * Vertical museum timeline: one dot per exhibit, connected by a single
 * continuous line. The active exhibit's dot gets a soft cyan glow. Purely
 * decorative/status display — navigation happens via ExhibitNav or by
 * scrolling, not by clicking a dot.
 */
function FossilLine({ count, activeIndex }) {
  return (
    <div className="fossil-line" aria-hidden="true">
      <span className="fossil-line__spine" />
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className={
            'fossil-line__mark' +
            (index === activeIndex ? ' fossil-line__mark--active' : '')
          }
        />
      ))}
    </div>
  )
}

export default FossilLine