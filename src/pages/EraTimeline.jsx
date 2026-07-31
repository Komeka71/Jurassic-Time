import { useCallback, useEffect, useRef, useState } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import TimelineNavbar from '../components/TimelineNavbar.jsx'
import BackButton from '../components/BackButton.jsx'
import TimelineHero from '../components/TimelineHero.jsx'
import ExhibitSection from '../components/ExhibitSection.jsx'
import FossilLine from '../components/FossilLine.jsx'
import ExhibitNav from '../components/ExhibitNav.jsx'
import InfoPanel from '../components/InfoPanel.jsx'
import ExhibitPanel from '../components/ExhibitPanel.jsx'
import { eras } from '../data/eraTimelines.js'
import './EraTimeline.css'

/**
 * Reusable Era Timeline engine. Renders the scroll-snapped hero + exhibit
 * experience for whichever era the URL names (/timeline/:era) — Jurassic
 * today, Triassic/Cretaceous once their data/*.js files are populated.
 * Nothing in this file is era-specific; every piece of content (hero
 * copy, dinosaur list) comes from data/eraTimelines.js via the `era`
 * route param.
 *
 * Same components as before, reused unchanged: SceneLayer (inside
 * ExhibitSection), ExhibitSection, FossilLine, ExhibitNav, InfoPanel,
 * ExhibitPanel. None of them know or care which era they're rendering.
 *
 * The fossil timeline, nav arrows, AND the glass info panel are all
 * shared, fixed chrome — like the navbar and back button — because none
 * of them belong to one exhibit; they represent progress across the
 * current era's exhibits, so they live once at the page level instead of
 * being remounted per exhibit. The panel itself never moves, slides, or
 * re-fades between exhibits — only its content (title, then body)
 * animates in, which InfoPanel handles internally via a key change on
 * `dinosaur`.
 *
 * A single IntersectionObserver watches the hero AND every exhibit: while
 * the hero is in view, the rail and panel stay hidden (kept clean/
 * immersive), and both fade in once the visitor reaches the first
 * exhibit. The same observer drives the active marker; the nav buttons
 * reuse the same "scroll to exhibit" logic so clicking and scrolling
 * converge on identical behavior.
 *
 * "View Details" (desktop panel or mobile card) opens the reusable
 * <ExhibitPanel>, passing whichever dinosaur object was clicked —
 * exhibitDinosaur is separate from activeIndex so the panel keeps
 * showing that dinosaur even if the visitor scrolls elsewhere.
 *
 * Data source today: static arrays under src/data/. When this migrates
 * to a backend (e.g. GET /api/eras/:era), only data/eraTimelines.js's
 * internals need to change — this component consumes `eras[slug]`
 * either way and requires no further architectural changes.
 *
 * Each era also carries its own `theme` (colors only — never layout,
 * type, or animation). It's applied once here as CSS custom properties
 * on the root element; every shared component below reads var(--era-*)
 * in its own stylesheet, so the same component tree simply looks
 * different per era with no per-component theme plumbing.
 *
 * Global Museum Search links here as /timeline/:era?exhibit=:dinosaurId
 * (see search/collections/dinosaurCollection.js and
 * components/Search/SearchCard.jsx) — this is the one piece of Search-
 * aware logic in this file, since it genuinely requires Timeline-side
 * support (scrolling to and opening a specific exhibit on arrival).
 */
function EraTimeline() {
  const { era: eraSlug } = useParams()
  const eraConfig = eras[eraSlug]

  const scrollRef = useRef(null)
  const heroRef = useRef(null)
  const sectionRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHeroActive, setIsHeroActive] = useState(true)
  // Which dinosaur the Exhibit Panel is showing — independent of
  // activeIndex/scroll position, so the panel stays on whichever
  // dinosaur the visitor picked even if they keep scrolling.
  const [exhibitDinosaur, setExhibitDinosaur] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()

  const dinosaurs = eraConfig?.dinosaurs ?? []

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.6) return

          if (entry.target === heroRef.current) {
            setIsHeroActive(true)
            return
          }

          const index = Number(entry.target.dataset.exhibitIndex)
          if (!Number.isNaN(index)) {
            setIsHeroActive(false)
            setActiveIndex(index)
          }
        })
      },
      { root, threshold: 0.6 },
    )

    if (heroRef.current) observer.observe(heroRef.current)
    sectionRefs.current.forEach((el) => el && observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const goToIndex = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(dinosaurs.length - 1, index))
      sectionRefs.current[clamped]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    },
    [dinosaurs.length],
  )

  const handlePrev = useCallback(() => goToIndex(activeIndex - 1), [activeIndex, goToIndex])
  const handleNext = useCallback(() => goToIndex(activeIndex + 1), [activeIndex, goToIndex])

  // Arriving from Search: /timeline/:era?exhibit=:dinosaurId. Scrolls to
  // that dinosaur and opens its Exhibit Panel automatically — the
  // visitor never has to search again once they land here. The param is
  // then removed from the URL (replacing history, not pushing) so it
  // doesn't linger and re-trigger if the visitor later scrolls away and
  // back, or refreshes after closing the panel.
  useEffect(() => {
    const exhibitId = searchParams.get('exhibit')
    if (!exhibitId || dinosaurs.length === 0) return

    const index = dinosaurs.findIndex((dinosaur) => dinosaur.id === exhibitId)
    if (index === -1) return

    goToIndex(index)
    setExhibitDinosaur(dinosaurs[index])

    setSearchParams(
      (params) => {
        params.delete('exhibit')
        return params
      },
      { replace: true },
    )
    // Intentionally only re-runs when the incoming param or dataset
    // changes — goToIndex is stable per dinosaurs.length and shouldn't
    // re-trigger this on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, dinosaurs, goToIndex, setSearchParams])

  // Unknown era slug (e.g. a typo'd URL) — send the visitor home rather
  // than rendering a broken page. This never fires for any era linked
  // from the UI today.
  if (!eraConfig) {
    return <Navigate to="/" replace />
  }

  // While the hero is showing, there's no "current" exhibit yet. Passing
  // null (rather than dinosaurs[0]) means the very first exhibit really
  // does mount fresh when the visitor arrives — the same way exhibit 2
  // and 3 do — instead of silently already being "active" since index 0
  // was the default state all along.
  const currentDinosaur = isHeroActive ? null : dinosaurs[activeIndex]

  // The entire visual theme system in one place: every shared component
  // (hero, rail, fossil line, info panel, exhibit panel) reads these as
  // var(--era-*) in its own CSS instead of a hardcoded color — so
  // switching eras is just switching which values live here, with zero
  // changes to any component. Computed once per era (this object is
  // cheap and only changes when eraConfig itself changes), then applied
  // as a single inline style on the root — not per-component inline
  // styles, so there's no added render cost anywhere below this.
  const theme = eraConfig.theme
  const themeVars = theme && {
    '--era-primary': theme.primary,
    '--era-primary-dim': theme.primaryDim,
    '--era-secondary': theme.secondary,
    '--era-accent': theme.accent,
    '--era-glow': theme.glow,
    '--era-background-overlay': theme.backgroundOverlay,
    '--era-progress-from': theme.progressFrom,
    '--era-progress-to': theme.progressTo,
    '--era-chip-background': theme.chipBackground,
    '--era-chip-border': theme.chipBorder,
    '--era-chip-text': theme.chipText,
  }

  return (
    <motion.div
      className="era-timeline"
      style={themeVars}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <TimelineNavbar />
      <BackButton />

      <div
        className={
          'era-timeline__rail' + (isHeroActive ? ' era-timeline__rail--hidden' : '')
        }
        aria-hidden={isHeroActive}
      >
        <ExhibitNav
          onPrev={handlePrev}
          onNext={handleNext}
          canPrev={activeIndex > 0}
          canNext={activeIndex < dinosaurs.length - 1}
        />
        <FossilLine count={dinosaurs.length} activeIndex={activeIndex} />
      </div>

      <div
        className={
          'era-timeline__panel' + (isHeroActive ? ' era-timeline__panel--hidden' : '')
        }
        aria-hidden={isHeroActive}
      >
        <InfoPanel dinosaur={currentDinosaur} onViewDetails={setExhibitDinosaur} />
      </div>

      <ExhibitPanel dinosaur={exhibitDinosaur} onClose={() => setExhibitDinosaur(null)} />

      <div className="era-timeline__scroll" ref={scrollRef}>
        <section
          className="era-timeline__snap-section era-timeline__snap-section--hero"
          ref={heroRef}
        >
          <TimelineHero
            eyebrow={eraConfig.eyebrow}
            title={eraConfig.title}
            period={eraConfig.period}
            description={eraConfig.description}
            heroImage={eraConfig.heroImage}
          />
        </section>

        {dinosaurs.map((dinosaur, index) => (
          <ExhibitSection
            key={dinosaur.id}
            ref={(el) => {
              sectionRefs.current[index] = el
            }}
            data-exhibit-index={index}
            dinosaur={dinosaur}
            active={index === activeIndex}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default EraTimeline