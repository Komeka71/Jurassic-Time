import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './ExhibitPanel.css'

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
 * One long-form research section — an eyebrow label, then a paragraph.
 * Renders nothing if `text` is empty, matching the rest of this panel's
 * existing pattern of skipping a section rather than showing an empty
 * one. Deliberately plain (no bordered "card" box) — the museum/wiki
 * brief calls for reading like an encyclopedia entry, not a dashboard
 * tile, so these sit directly on the panel background as flowing text.
 */
function ResearchSection({ eyebrow, text, fallback }) {
  const body = text || fallback
  if (!body) return null

  return (
    <motion.section className="exhibit-panel__section" variants={itemVariants}>
      <h3 className="exhibit-panel__section-heading">{eyebrow}</h3>
      <p className="exhibit-panel__text">{body}</p>
    </motion.section>
  )
}

/**
 * Reusable dinosaur Exhibit Panel — the final exhibit page for a
 * dinosaur, styled as a centered, floating museum specimen record
 * rather than a dashboard of small fact cards. Fully controlled by its
 * two props: pass a dinosaur object to open it, pass null/undefined to
 * close it.
 *
 * Redesigned for a museum/encyclopedia feel (Phase 6A): a horizontal
 * hero (image + identity + short intro), one horizontal stats bar (not
 * individual cards), then long-form research sections alongside a
 * gallery and a "Did You Know?" note. Every value below is read
 * straight from the `dinosaur` prop — nothing here is hardcoded for
 * Brachiosaurus or any other single species; swap in any dinosaur
 * object from data/*.js (or, later, GET /api/v1/dinosaurs/:slug — same
 * field names) and the whole panel renders correctly.
 *
 * Two fields this redesign reaches for don't exist in the data yet:
 *   - `dinosaur.discovery` (Discovery & Fossil History prose) — every
 *     current dinosaur has none, so this section shows the same kind
 *     of graceful fallback line the codebase already uses for a
 *     missing scientificName, rather than inventing fossil-history text.
 *   - `dinosaur.gallery` is real but currently empty for all 31
 *     dinosaurs — the gallery below falls back to the one image every
 *     dinosaur does have (`sceneImage`) so it never renders broken/empty,
 *     and automatically upgrades to a real multi-image gallery the
 *     moment gallery data exists, with no code change needed.
 * Both are called out in the Phase 6A report, not silently patched
 * over the backend — see the task's explicit instruction not to invent
 * new backend fields during this pass.
 *
 * Mobile (<768px): the existing bottom-sheet approach is preserved
 * unchanged in spirit — the panel slides up from the bottom edge and
 * every section stacks in a single column, stats bar included (as a
 * horizontal scroller, not a wrapped grid).
 */
function ExhibitPanel({ dinosaur, onClose }) {
  const isOpen = Boolean(dinosaur)

  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0)
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
      setActiveGalleryIndex(0)
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

  // Gallery images, with a graceful fallback to the one image every
  // dinosaur already has when `gallery` is empty (true for all current
  // data) — see the component doc comment above.
  const galleryImages =
    dinosaur?.gallery && dinosaur.gallery.length > 0
      ? dinosaur.gallery
      : dinosaur?.sceneImage
        ? [dinosaur.sceneImage]
        : []
  const hasMultipleImages = galleryImages.length > 1
  const [primaryImage, ...secondaryImages] = galleryImages
  const previewSecondary = secondaryImages.slice(0, 2)
  const remainingCount = galleryImages.length - 1 - previewSecondary.length

  const openGalleryAt = (index) => {
    setActiveGalleryIndex(index)
    setIsGalleryOpen(true)
  }

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
                {/* ---------------------------------------------------- */}
                {/* Hero: image | identity + short intro                  */}
                {/* ---------------------------------------------------- */}
                <div className="exhibit-panel__hero-row">
                  <motion.div
                    className="exhibit-panel__hero-image"
                    style={{ backgroundImage: `url(${dinosaur.sceneImage})` }}
                    variants={itemVariants}
                  />

                  <motion.div className="exhibit-panel__hero-info" variants={itemVariants}>
                    <p className="exhibit-panel__eyebrow">Specimen Record</p>
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
                          <span className="exhibit-panel__chip">{dinosaur.diet}</span>
                        )}
                        {dinosaur.period && (
                          <span className="exhibit-panel__chip">{dinosaur.period}</span>
                        )}
                        {dinosaur.region && (
                          <span className="exhibit-panel__chip">{dinosaur.region}</span>
                        )}
                      </div>
                    )}

                    {dinosaur.overview && (
                      <p className="exhibit-panel__intro">{dinosaur.overview}</p>
                    )}
                  </motion.div>
                </div>

                {/* ---------------------------------------------------- */}
                {/* Horizontal stats bar — one bar, not individual cards.  */}
                {/* Driven entirely by dinosaur.facts (label/value pairs   */}
                {/* already authored per-dinosaur) so it works for any      */}
                {/* species with zero changes here, and never shows a       */}
                {/* stat that isn't real data (see Phase 6A report for       */}
                {/* fields like Length/Family/Discovered that don't exist    */}
                {/* in the current data and are intentionally not invented). */}
                {/* ---------------------------------------------------- */}
                {dinosaur.facts?.length > 0 && (
                  <motion.div className="exhibit-panel__statbar" variants={itemVariants}>
                    {dinosaur.facts.map(({ label, value }) => (
                      <div className="exhibit-panel__stat" key={label}>
                        <span className="exhibit-panel__stat-value">{value}</span>
                        <span className="exhibit-panel__stat-label">{label}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* ---------------------------------------------------- */}
                {/* Research content | Gallery + Did You Know              */}
                {/* ---------------------------------------------------- */}
                <div className="exhibit-panel__body">
                  <div className="exhibit-panel__research">
                    <ResearchSection eyebrow="About" text={dinosaur.overview} />
                    <ResearchSection
                      eyebrow="Discovery & Fossil History"
                      text={dinosaur.discovery}
                      fallback="Discovery details for this specimen are still being catalogued."
                    />
                    <ResearchSection eyebrow="Life & Habitat" text={dinosaur.lifeEnvironment} />
                  </div>

                  <div className="exhibit-panel__aside">
                    {galleryImages.length > 0 && (
                      <motion.section className="exhibit-panel__gallery-section" variants={itemVariants}>
                        <h3 className="exhibit-panel__section-heading">Gallery</h3>

                        <button
                          type="button"
                          className="exhibit-panel__gallery-primary"
                          style={{ backgroundImage: `url(${primaryImage})` }}
                          onClick={() => openGalleryAt(0)}
                          aria-label={`View larger image of ${dinosaur.name}`}
                        />

                        {previewSecondary.length > 0 && (
                          <div className="exhibit-panel__gallery-row">
                            {previewSecondary.map((src, index) => (
                              <button
                                key={src}
                                type="button"
                                className="exhibit-panel__gallery-thumb"
                                style={{ backgroundImage: `url(${src})` }}
                                onClick={() => openGalleryAt(index + 1)}
                                aria-label={`View image ${index + 2} of ${dinosaur.name}`}
                              />
                            ))}
                            {remainingCount > 0 && (
                              <button
                                type="button"
                                className="exhibit-panel__gallery-thumb exhibit-panel__gallery-thumb--more"
                                onClick={() => openGalleryAt(3)}
                                aria-label={`View all ${galleryImages.length} photos`}
                              >
                                +{remainingCount}
                              </button>
                            )}
                          </div>
                        )}

                        {hasMultipleImages && (
                          <div className="exhibit-panel__gallery-dots" aria-hidden="true">
                            {galleryImages.map((src, index) => (
                              <span
                                key={src}
                                className={
                                  'exhibit-panel__gallery-dot' +
                                  (index === 0 ? ' exhibit-panel__gallery-dot--active' : '')
                                }
                              />
                            ))}
                          </div>
                        )}

                        {hasMultipleImages && (
                          <button
                            type="button"
                            className="exhibit-panel__gallery-viewall"
                            onClick={() => openGalleryAt(0)}
                          >
                            View all {galleryImages.length} photos
                          </button>
                        )}
                      </motion.section>
                    )}

                    {dinosaur.museumHighlight && (
                      <motion.section className="exhibit-panel__didyouknow" variants={itemVariants}>
                        <h3 className="exhibit-panel__section-heading">Did You Know?</h3>
                        <p className="exhibit-panel__text">{dinosaur.museumHighlight}</p>
                      </motion.section>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Placeholder fullscreen gallery — a real lightbox with
          navigation is future work; for now this confirms the
          interaction and shows how many photos exist. */}
      {isGalleryOpen && dinosaur && galleryImages.length > 0 && (
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
            <div
              className="exhibit-panel__lightbox-image"
              style={{ backgroundImage: `url(${galleryImages[activeGalleryIndex] ?? primaryImage})` }}
            />
            <p className="exhibit-panel__lightbox-text">
              Photo {activeGalleryIndex + 1} of {galleryImages.length} — {dinosaur.name}.
              {!hasMultipleImages && ' Full gallery view coming soon.'}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default ExhibitPanel