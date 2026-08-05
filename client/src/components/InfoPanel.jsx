import './InfoPanel.css'

/**
 * The glass container itself (desktop panel + mobile card) always stays
 * mounted — it's permanent chrome, not something that re-appears per
 * exhibit. Only the content inside is conditional on `dinosaur`, and the
 * title/body pieces carry a `key` off the dinosaur's id, so React
 * genuinely remounts them (not just updates their text) every time the
 * exhibit changes — including the very first one, since `dinosaur` is
 * null during the hero and only becomes populated once an exhibit is
 * reached. That mount is what lets the CSS entrance animation in
 * InfoPanel.css fire identically every time, first exhibit included.
 *
 * Renders directly from `dinosaur.facts` — an ordered list of
 * { label, value } pairs defined in each era's data file (e.g.
 * data/jurassic.js) — rather than a hardcoded field list here. Any
 * dinosaur added to that file renders correctly with zero changes to
 * this component.
 *
 * `onViewDetails(dinosaur)` is called by either "View Details" button
 * (desktop panel or mobile card) — the parent page owns what happens
 * next (e.g. opening an <ExhibitPanel>).
 */
function InfoPanel({ dinosaur, onViewDetails }) {
  return (
    <>
      <aside className="info-panel">
        {dinosaur && (
          <>
            <p className="info-panel__eyebrow">Featured Species</p>
            <h2 className="info-panel__name" key={dinosaur.id}>
              {dinosaur.name}
            </h2>
            <div className="info-panel__body" key={`${dinosaur.id}-body`}>
              <dl className="info-panel__facts">
                {dinosaur.facts.map(({ label, value }) => (
                  <div className="info-panel__fact" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>

              <button
                type="button"
                className="info-panel__cta"
                onClick={() => onViewDetails?.(dinosaur)}
              >
                View Details
              </button>
            </div>
          </>
        )}
      </aside>

      <div className="info-panel-mobile">
        {dinosaur && (
          <>
            <p className="info-panel-mobile__name" key={dinosaur.id}>
              {dinosaur.name}
            </p>
            <div className="info-panel-mobile__body" key={`${dinosaur.id}-mobile-body`}>
              <p className="info-panel-mobile__meta">
                {dinosaur.diet} • {dinosaur.type}
              </p>
              <button
                type="button"
                className="info-panel-mobile__cta"
                onClick={() => onViewDetails?.(dinosaur)}
              >
                View Details
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default InfoPanel