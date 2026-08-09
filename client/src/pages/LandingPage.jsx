import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import EraCard from '../components/EraCard.jsx'
import { eras } from '../data/eras.js'
import './LandingPage.css'
import HomeButton from '../components/Homebtn.jsx';

// Eras with a built timeline route — every era now has one.
const ERA_ROUTES = {
  triassic: '/timeline/triassic',
  jurassic: '/timeline/jurassic',
  cretaceous: '/timeline/cretaceous',
}

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

function LandingPage() {
  const [selectedEra, setSelectedEra] = useState(null)
  const navigate = useNavigate()

  /**
   * Called after the landing content has finished fading out. Every era
   * now has a built timeline route, so this always navigates — the
   * fallback branch stays in place for any future era added to
   * data/eras.js before its timeline route exists.
   */
  const handleEraSelect = useCallback(
    (eraId) => {
      const route = ERA_ROUTES[eraId]
      if (route) {
        navigate(route)
      } else {
        console.log('Era selected (no timeline yet):', eraId)
      }
    },
    [navigate],
  )

  const handleCardClick = (eraId) => {
    setSelectedEra(eraId)
  }

  return (
    <div className="landing">
      <HomeButton onClick={() => navigate("/")} />
      <div className="landing__media" aria-hidden="true">
        {/* Background video is provided separately and dropped in at
            /public/video/space-loop.mp4 (or swap the src below). */}
        <video
          className="landing__video"
          autoPlay
          muted
          loop
          playsInline
          poster="/video/space-poster.jpg"
        >
          <source src="/video/space-loop.mp4" type="video/mp4" />
        </video>
        <div className="landing__overlay" />
      </div>

      <AnimatePresence onExitComplete={() => handleEraSelect(selectedEra)}>
        {!selectedEra && (
          <motion.main
            className="landing__content"
            exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
          >
            <motion.header
              className="landing__header"
              variants={headerVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="landing__eyebrow">A Museum Without Walls</p>
              <h1 className="landing__title">Paleora Timeline</h1>
              <p className="landing__subtitle">
                Step across 186 million years of prehistoric life. Choose an
                era to begin.
              </p>
            </motion.header>

            <div className="landing__cards">
              {eras.map((era, index) => (
                <EraCard
                  key={era.id}
                  era={era}
                  index={index}
                  onSelect={handleCardClick}
                />
              ))}
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LandingPage