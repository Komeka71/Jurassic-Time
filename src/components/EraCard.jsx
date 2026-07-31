import { motion } from 'framer-motion'
import DinoSilhouette from './DinoSilhouette.jsx'
import './EraCard.css'

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.15 * index,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const accentColors = {
  triassic: '#F59E0B',      // Warm amber
  jurassic: '#6FE4E0',      // Cyan/teal
  cretaceous: '#A855F7',    // Purple (or '#C2410C' for burnt orange)
}

function EraCard({ era, index, onSelect }) {
  const { id, name, range, tagline, depthStart, depthEnd } = era

  return (
   <motion.button
  type="button"
  className="era-card"
  style={{ '--accent': accentColors[id] }}
  custom={index}
  variants={cardVariants}
  initial="hidden"
  animate="visible"
  whileHover="hover"
  whileTap={{ scale: 0.98 }}
  onClick={() => onSelect(id)}
  aria-label={`Explore the ${name} era, ${range}`}
>
      <motion.div
        className="era-card__art"
        variants={{ hover: { scale: 1.08 } }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <DinoSilhouette era={id} className="era-card__silhouette" />
      </motion.div>

      <div className="era-card__body">
        <div className="era-card__strata" aria-hidden="true">
          <span className="era-card__strata-track">
            <span
              className="era-card__strata-fill"
              style={{
                left: `${depthStart * 100}%`,
                width: `${(depthEnd - depthStart) * 100}%`,
              }}
            />
          </span>
        </div>

        <p className="era-card__range">{range}</p>
        <h3 className="era-card__name">{name}</h3>
        <p className="era-card__tagline">{tagline}</p>

        <span className="era-card__cta">
          Explore Era
          <svg
            className="era-card__cta-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div className="era-card__glow" aria-hidden="true" />
    </motion.button>
  )
}

export default EraCard
