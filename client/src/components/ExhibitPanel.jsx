import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './ExhibitPanel.css'

// Only this many thumbnails show inline; a 4th "+N" tile opens the
// (placeholder) fullscreen gallery view when more exist.
const GALLERY_PREVIEW_COUNT = 3

const MOBILE_QUERY = '(max-width: 768px)'

// Every card/section shares this: opacity + a small translateY only.
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
}

// Drives the cascade of content once the panel itself has finished
// scaling/fading in (desktop) or sliding up (mobile).
const containerVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.3, staggerChildren: 0.08 },
  },
}

/**
 * A small, reusable "museum plaque" card — an icon, a heading, and
 * whatever content is passed as children. Used for Overview, Quick
 * Facts, Life in its Environment, and Museum Highlight.
 */
function InfoCard({ icon, heading, highlight, children }) {
  return (
    <motion.section
      className={'exhibit-panel__card' + (highlight ? ' exhibit-panel__card--highlight' : '')}
      variants={itemVariants}
    >
      <h3 className="exhibit-panel__card-heading">
        <span aria-hidden="true">{icon}</span> {heading}
      </h3>
      {children}
    </motion.section>
  )
}

/**
 * Reusable dinosaur Exhibit Panel — the final exhibit page for a
 * dinosaur, styled as a centered, floating museum panel rather than a
 * sidebar. Fully controlled by its two props: pass a dinosaur object to
 * open it, pass null/undefined to close it.
 *
 * Desktop/tablet: a centered panel that scales up (96% → 100%) and
 * fades/lifts in over the dimmed, lightly blurred timeline — the scene
 * stays visible in the margins around it. Overview/Quick Facts/Life in
 * its Environment/Museum Highlight lay out as a 2x2 museum information
 * board; Gallery spans the full width beneath.
 *
 * Mobile (<768px): the existing bottom-sheet approach is preserved
 * unchanged in spirit — the panel slides up from the bottom edge and
 * every section stacks in a single column — this large desktop layout is
 * never forced onto phones.
 *
 * Every section is read straight from the dinosaur object and is skipped
 * when its field is missing/empty — nothing here is hardcoded
 * per-dinosaur. Any page can reuse this the same way: keep a
 * `selectedDinosaur` state locally, mount one
 * <ExhibitPanel dinosaur={selectedDinosaur} onClose={...} />, and set
 * that state (from a timeline card, a search result, a map pin) to open
 * it.
 */
function ExhibitPanel({ dinosaur, onClose }) {
  const isOpen = Boolean(dinosaur)

  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

  // Tracks the mobile breakpoint in JS only because Framer Motion's
  // scale/translate values for the panel differ structurally between
  // the two layouts (see panelMotion below) — everything else about the
  // responsive split is handled in plain CSS media queries.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const mql = window.matchMedia(MOBILE_QUERY)
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isGalleryOpen) {
          setIsGalleryOpen(false)
        } else {
          onClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isGalleryOpen, onClose])

  // Stop any speech and close the gallery overlay once the panel closes.
  useEffect(() => {
    if (!isOpen) {
      if (speechSupported) window.speechSynthesis.cancel()
      setIsSpeaking(false)
      setIsGalleryOpen(false)
    }
  }, [isOpen, speechSupported])

  const handleSpeak = () => {
    if (!speechSupported || !dinosaur) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(
      dinosaur.pronunciationAudio || dinosaur.name,
    )
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  // Desktop/tablet: scale up + fade + lift in, no bounce. Mobile: the
  // familiar slide-up sheet — a plain Y transform, no scale/opacity
  // change on the panel itself (only the backdrop fades).
  const panelMotion = isMobile
    ? {
        initial: { y: '100%' },
        animate: { y: 0 },
        exit: { y: '100%' },
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }
    : {
        initial: { opacity: 0, scale: 0.96, y: 14 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96, y: 14 },
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }

  const galleryPreview = dinosaur?.gallery?.slice(0, GALLERY_PREVIEW_COUNT) ?? []
  const galleryRemaining = (dinosaur?.gallery?.length ?? 0) - GALLERY_PREVIEW_COUNT

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="exhibit-panel-backdrop"
            className="exhibit-panel__backdrop"
            onClick={onClose}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {dinosaur && (
          <motion.div
            key="exhibit-panel-stage"
            className="exhibit-panel__stage"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.aside
              className="exhibit-panel"
              role="dialog"
              aria-modal="true"
              aria-label={`${dinosaur.name} exhibit`}
              onClick={(event) => event.stopPropagation()}
              {...panelMotion}
            >
              <button
                type="button"
                className="exhibit-panel__close"
                onClick={onClose}
                aria-label="Close exhibit"
              >
                ✕
              </button>

              <motion.div
                className="exhibit-panel__scroll"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="exhibit-panel__hero-row">
                  <motion.div
                    className="exhibit-panel__hero-image"
                    style={{ backgroundImage: `url(${dinosaur.sceneImage})` }}
                    variants={itemVariants}
                  />

                  <motion.div className="exhibit-panel__hero-info" variants={itemVariants}>
                    <h2 className="exhibit-panel__name">{dinosaur.name}</h2>
                    <p className="exhibit-panel__scientific">
                      {dinosaur.scientificName || 'Scientific name coming soon'}
                    </p>

                    {dinosaur.pronunciation && (
                      <div className="exhibit-panel__pronunciation">
                        {speechSupported && (
                          <button
                            type="button"
                            className={
                              'exhibit-panel__speaker' +
                              (isSpeaking ? ' exhibit-panel__speaker--speaking' : '')
                            }
                            onClick={handleSpeak}
                            aria-label={`Hear how to pronounce ${dinosaur.name}`}
                          >
                            🔊
                          </button>
                        )}
                        <span>
                          <span className="exhibit-panel__pronunciation-label">
                            Pronounced:
                          </span>{' '}
                          <span className="exhibit-panel__pronunciation-text">
                            {dinosaur.pronunciation}
                          </span>
                        </span>
                      </div>
                    )}

                    {(dinosaur.diet || dinosaur.period || dinosaur.region) && (
                      <div className="exhibit-panel__chips">
                        {dinosaur.diet && (
                          <span className="exhibit-panel__chip">
                            <span aria-hidden="true">🦕</span> {dinosaur.diet}
                          </span>
                        )}
                        {dinosaur.period && (
                          <span className="exhibit-panel__chip">
                            <span aria-hidden="true">🌿</span> {dinosaur.period}
                          </span>
                        )}
                        {dinosaur.region && (
                          <span className="exhibit-panel__chip">
                            <span aria-hidden="true">🌍</span> {dinosaur.region}
                          </span>
                        )}
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Museum information board: 2x2 on desktop/tablet
                    (Overview | Quick Facts / Life | Museum Highlight),
                    a single stacked column on mobile. */}
                <div className="exhibit-panel__grid">
                  {dinosaur.overview && (
                    <InfoCard icon="📖" heading="Overview">
                      <p className="exhibit-panel__text">{dinosaur.overview}</p>
                    </InfoCard>
                  )}

                  <InfoCard icon="📋" heading="Quick Facts">
                    <dl className="exhibit-panel__facts">
                      {dinosaur.facts.map(({ label, value }) => (
                        <div className="exhibit-panel__fact" key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </InfoCard>

                  {dinosaur.lifeEnvironment && (
                    <InfoCard icon="🌿" heading="Life in its Environment">
                      <p className="exhibit-panel__text">{dinosaur.lifeEnvironment}</p>
                    </InfoCard>
                  )}

                  {dinosaur.museumHighlight && (
                    <InfoCard icon="🦴" heading="Museum Highlight" highlight>
                      <p className="exhibit-panel__text">{dinosaur.museumHighlight}</p>
                    </InfoCard>
                  )}
                </div>

                {galleryPreview.length > 0 && (
                  <motion.section
                    className="exhibit-panel__gallery-section"
                    variants={itemVariants}
                  >
                    <h3 className="exhibit-panel__card-heading">
                      <span aria-hidden="true">🖼</span> Gallery
                    </h3>
                    <div className="exhibit-panel__gallery">
                      {galleryPreview.map((src) => (
                        <button
                          key={src}
                          type="button"
                          className="exhibit-panel__gallery-item"
                          style={{ backgroundImage: `url(${src})` }}
                          onClick={() => setIsGalleryOpen(true)}
                          aria-label={`Open gallery for ${dinosaur.name}`}
                        />
                      ))}
                      {galleryRemaining > 0 && (
                        <button
                          type="button"
                          className="exhibit-panel__gallery-more"
                          onClick={() => setIsGalleryOpen(true)}
                          aria-label={`View all ${dinosaur.gallery.length} photos`}
                        >
                          <span className="exhibit-panel__gallery-more-count">
                            +{galleryRemaining}
                          </span>
                          <span className="exhibit-panel__gallery-more-label">View All</span>
                        </button>
                      )}
                    </div>
                  </motion.section>
                )}
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Placeholder fullscreen gallery — a real lightbox with
          navigation is future work; for now this confirms the
          interaction and shows how many photos exist. */}
      {isGalleryOpen && dinosaur && (
        <div className="exhibit-panel__lightbox" onClick={() => setIsGalleryOpen(false)}>
          <div
            className="exhibit-panel__lightbox-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="exhibit-panel__close"
              onClick={() => setIsGalleryOpen(false)}
              aria-label="Close gallery"
            >
              ✕
            </button>
            <p className="exhibit-panel__lightbox-text">
              Full gallery view coming soon — {dinosaur.gallery.length} photo
              {dinosaur.gallery.length === 1 ? '' : 's'} of {dinosaur.name}.
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default ExhibitPanel