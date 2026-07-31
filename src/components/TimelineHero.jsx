import './TimelineHero.css'

/**
 * The hero's atmosphere now comes from a real cinematic photo (`heroImage`,
 * from each era's config in data/eraTimelines.js) rather than a
 * CSS-simulated scene. `.timeline-hero__background` handles sizing
 * (cover/center/no-repeat) and a plain fallback color in its own
 * stylesheet; this component just supplies the URL. Two overlay layers
 * sit on top for readability and mood — see TimelineHero.css.
 *
 * All copy is props rather than hardcoded text, so this component has no
 * era-specific content of its own — it's driven entirely by whatever era
 * config the page passes in.
 */
function TimelineHero({ eyebrow, title, period, description, heroImage }) {
  return (
    <header className="timeline-hero">
      <div
        className="timeline-hero__background"
        aria-hidden="true"
        style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
      />
      <div className="timeline-hero__overlay" aria-hidden="true" />
      <div className="timeline-hero__fade" aria-hidden="true" />

      <div className="timeline-hero__content">
        <p className="timeline-hero__eyebrow">{eyebrow}</p>
        <h1 className="timeline-hero__title">{title}</h1>
        <p className="timeline-hero__range">{period}</p>
        <p className="timeline-hero__description">{description}</p>
      </div>

      <div className="timeline-hero__scroll" aria-hidden="true">
        <span className="timeline-hero__scroll-arrow">↓</span>
        <span className="timeline-hero__scroll-label">Scroll to Begin</span>
      </div>
    </header>
  )
}

export default TimelineHero