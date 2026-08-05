import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import SceneLayer from './SceneLayer.jsx'
import './ExhibitSection.css'

/**
 * One full-viewport museum exhibit for a single dinosaur: just the Scene
 * Layer background — no card or frame around it. The glass info panel is
 * no longer part of this component; it's now a single permanent fixture
 * rendered once at the page level (JurassicTimeline), like the navbar and
 * rail, since it no longer moves or re-appears per exhibit — only its
 * content changes.
 *
 * A plain opacity fade on mount/unmount (via Framer Motion) so exhibits
 * fade in/out smoothly when the parent's dinosaur array changes — e.g.
 * when Search filters the timeline down to a subset. This has no effect
 * on the normal, unfiltered case beyond a brief fade-in on first load.
 *
 * Forwards its ref so the parent can register this section with an
 * IntersectionObserver and with ExhibitNav's scroll-to-exhibit logic.
 */
const ExhibitSection = forwardRef(function ExhibitSection(
  { dinosaur, active, ...rest },
  ref,
) {
  return (
    <motion.section
      className={'exhibit-section' + (active ? ' exhibit-section--active' : '')}
      aria-label={`${dinosaur.name} exhibit`}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      {...rest}
    >
      <SceneLayer
        image={dinosaur.sceneImage}
        focalPoint={dinosaur.focalPoint}
        active={active}
      />
    </motion.section>
  )
})

export default ExhibitSection