import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './DetailDrawer.css'

// Only this many thumbnails show inline; the rest are reachable via the
// "+N" tile, which opens the (placeholder) fullscreen gallery view.
const GALLERY_PREVIEW_COUNT = 3

// Drives the cascade of sections once the drawer itself has finished
// sliding in (see DetailDrawer.css's own, unchanged 400ms open transition).
const containerVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.4, staggerChildren: 0.09 },
  },
}

// Every section shares this: opacity + a small translateY only, nothing else.
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
}

/**
 * Reusable dinosaur Detail Drawer — the final exhibit page for a
 * dinosaur, not a scrolling article. Fully controlled by its two props:
 * pass a dinosaur object to open it, pass null/undefined to close it.
 *
 * Desktop: slides in from the right at ~48-50% of the viewport width,
 * overlaying the page — the scene stays visible behind the dimmed
 * backdrop. Overview/Quick Facts/Life in its Environment/Did You Know
 * lay out as a 2-column museum information board (Gallery spans full
 * width below); Mobile (<768px) stacks the same content vertically as a
 * bottom sheet, unchanged from earlier versions of this component.
 *
 * Every section is read straight from the dinosaur object and is skipped
 * when its field is missing/empty — nothing here is hardcoded
 * per-dinosaur. Any page can reuse this the same way: keep a
 * `selectedDinosaur` state locally, mount one
 * <DetailDrawer dinosaur={selectedDinosaur} onClose={...} />, and set
 * that state (from a timeline card, a search result, a map pin) to open
 * it.
 */
function DetailDrawer({ dinosaur, onClose }) {
  const isOpen = Boolean(dinosaur)

  // Keeps rendering the last dinosaur while the close transition plays,
  // instead of the content disappearing the instant `dinosaur` goes null.
  const [displayDinosaur, setDisplayDinosaur] = useState(dinosaur)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

  useEffect(() => {
    if (dinosaur) setDisplayDinosaur(dinosaur)
  }, [dinosaur])

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

  // Stop any speech and close the gallery overlay once the drawer closes.
  useEffect(() => {
    if (!isOpen) {
      if (speechSupported) window.speechSynthesis.cancel()
      setIsSpeaking(false)
      setIsGalleryOpen(false)
    }
  }, [isOpen, speechSupported])

  const d = displayDinosaur

  const handleSpeak = () => {
    if (!speechSupported || !d) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(d.pronunciationAudio || d.name)
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  const galleryPreview = d?.gallery?.slice(0, GALLERY_PREVIEW_COUNT) ?? []
  const galleryRemaining = (d?.gallery?.length ?? 0) - GALLERY_PREVIEW_COUNT

  return (
    <>
      <div
        className={
          'detail-drawer__backdrop' + (isOpen ? ' detail-drawer__backdrop--open' : '')
        }
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={'detail-drawer' + (isOpen ? ' detail-drawer--open' : '')}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-label={d ? `${d.name} details` : undefined}
      >
        {d && (
          <>
            <button
              type="button"
              className="detail-drawer__close"
              onClick={onClose}
              aria-label="Close details"
            >
              ✕
            </button>

            <motion.div
              className="detail-drawer__scroll"
              variants={containerVariants}
              initial="hidden"
              animate={isOpen ? 'visible' : 'hidden'}
            >
              <motion.div
                className="detail-drawer__hero"
                style={{ backgroundImage: `url(${d.sceneImage})` }}
                variants={itemVariants}
              />

              <div className="detail-drawer__content">
                <motion.div variants={itemVariants}>
                  <h2 className="detail-drawer__name">{d.name}</h2>
                  <p className="detail-drawer__scientific">
                    {d.scientificName || 'Scientific name coming soon'}
                  </p>
                </motion.div>

                {d.pronunciation && (
                  <motion.div className="detail-drawer__pronunciation" variants={itemVariants}>
                    {speechSupported && (
                      <button
                        type="button"
                        className={
                          'detail-drawer__speaker' +
                          (isSpeaking ? ' detail-drawer__speaker--speaking' : '')
                        }
                        onClick={handleSpeak}
                        aria-label={`Hear how to pronounce ${d.name}`}
                      >
                        🔊
                      </button>
                    )}
                    <span className="detail-drawer__pronunciation-text">
                      {d.pronunciation}
                    </span>
                  </motion.div>
                )}

                {(d.diet || d.period || d.region) && (
                  <motion.div className="detail-drawer__chips" variants={itemVariants}>
                    {d.diet && (
                      <span className="detail-drawer__chip">
                        <span aria-hidden="true">🦕</span> {d.diet}
                      </span>
                    )}
                    {d.period && (
                      <span className="detail-drawer__chip">
                        <span aria-hidden="true">🌿</span> {d.period}
                      </span>
                    )}
                    {d.region && (
                      <span className="detail-drawer__chip">
                        <span aria-hidden="true">🌍</span> {d.region}
                      </span>
                    )}
                  </motion.div>
                )}

                {/* Museum information board: 2 columns on desktop
                    (Overview | Quick Facts / Life | Did You Know), a
                    single stacked column on mobile. Gallery spans the
                    full width beneath. */}
                <div className="detail-drawer__grid">
                  {d.overview && (
                    <motion.section
                      className="detail-drawer__section"
                      variants={itemVariants}
                    >
                      <h3 className="detail-drawer__heading">Overview</h3>
                      <p className="detail-drawer__text">{d.overview}</p>
                    </motion.section>
                  )}

                  <motion.section className="detail-drawer__section" variants={itemVariants}>
                    <h3 className="detail-drawer__heading">Quick Facts</h3>
                    <dl className="detail-drawer__facts">
                      {d.facts.map(({ label, value }) => (
                        <div className="detail-drawer__fact" key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </motion.section>

                  {d.lifeEnvironment && (
                    <motion.section
                      className="detail-drawer__section"
                      variants={itemVariants}
                    >
                      <h3 className="detail-drawer__heading">Life in its Environment</h3>
                      <p className="detail-drawer__text">{d.lifeEnvironment}</p>
                    </motion.section>
                  )}

                  {d.funFact && (
                    <motion.section
                      className="detail-drawer__section"
                      variants={itemVariants}
                    >
                      <div className="detail-drawer__fun-fact">
                        <span className="detail-drawer__fun-fact-icon" aria-hidden="true">
                          💡
                        </span>
                        <div>
                          <h3 className="detail-drawer__heading">Did You Know?</h3>
                          <p className="detail-drawer__text">{d.funFact}</p>
                        </div>
                      </div>
                    </motion.section>
                  )}

                  {galleryPreview.length > 0 && (
                    <motion.section
                      className="detail-drawer__section detail-drawer__section--full"
                      variants={itemVariants}
                    >
                      <h3 className="detail-drawer__heading">Gallery</h3>
                      <div className="detail-drawer__gallery">
                        {galleryPreview.map((src, index) => {
                          const isLastPreview = index === galleryPreview.length - 1
                          const showMore = isLastPreview && galleryRemaining > 0
                          return (
                            <button
                              key={src}
                              type="button"
                              className="detail-drawer__gallery-item"
                              style={{ backgroundImage: `url(${src})` }}
                              onClick={() => setIsGalleryOpen(true)}
                              aria-label={
                                showMore
                                  ? `View all ${d.gallery.length} photos`
                                  : `Open gallery for ${d.name}`
                              }
                            >
                              {showMore && (
                                <span className="detail-drawer__gallery-more">
                                  +{galleryRemaining}
                                </span>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </motion.section>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </aside>

      {/* Placeholder fullscreen gallery — a real lightbox with
          navigation is future work; for now this confirms the
          interaction and shows how many photos exist. */}
      {isGalleryOpen && d && (
        <div className="detail-drawer__lightbox" onClick={() => setIsGalleryOpen(false)}>
          <div
            className="detail-drawer__lightbox-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="detail-drawer__close"
              onClick={() => setIsGalleryOpen(false)}
              aria-label="Close gallery"
            >
              ✕
            </button>
            <p className="detail-drawer__lightbox-text">
              Full gallery view coming soon — {d.gallery.length} photo
              {d.gallery.length === 1 ? '' : 's'} of {d.name}.
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default DetailDrawer