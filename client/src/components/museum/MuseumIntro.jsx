import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./MuseumIntro.css";

const LEDGER_ITEMS = [
  "247 SPECIES CATALOGUED",
  "18 ACTIVE DIG SITES",
  "4 EPOCHS ARCHIVED",
  "12,400 FOSSIL RECORDS",
  "6 CONTINENTS SURVEYED",
];

export default function MuseumIntro({
  videoSrc = "/videos/museum-hero.mp4",
  posterSrc = "/images/museum-hero-poster.jpg",
  eyebrow = "JURASSIC TIME",
  subEyebrow = "MUSEUM ARCHIVE",
  title = ["WHERE TIME", "LEFT ITS MARK."],
  description = "Step through the archive of Earth's deep past — walk reconstructed halls, examine verified fossil evidence, and trace the species that ruled before us.",
  primaryCta = {
    label: "Explore Archive",
    onClick: () => {},
  },
  secondaryCta = {
    label: "Virtual Tour",
    onClick: () => {},
  },
  status = "ARCHIVE ONLINE",
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 60);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="museum-intro">
      {/* Background layer */}
      <div className="mi-background" aria-hidden="true">
        <video
          className="mi-video"
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        <div className="mi-overlay" />
      </div>

      {/* Top navigation */}
      <header className="mi-nav">
        <div className="mi-brand">
          <span className="mi-brand-mark" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
            >
              <path
                d="M4 20c2-6 4-9 8-9s6 3 8 9"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />

              <circle
                cx="12"
                cy="6"
                r="2.4"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </span>

          <span className="mi-brand-text">
            {eyebrow}
            <span className="mi-brand-divider">|</span>
            <span className="mi-brand-sub">
              {subEyebrow}
            </span>
          </span>
        </div>

        <div className="mi-status">
          <span
            className="mi-status-dot"
            aria-hidden="true"
          />
          {status}
        </div>
      </header>

      {/* Field ledger ticker */}
      <div
        className="mi-ledger"
        role="status"
        aria-label="Live archive statistics"
      >
        <div className="mi-ledger-track">
          {[...LEDGER_ITEMS, ...LEDGER_ITEMS].map(
            (item, i) => (
              <span
                className="mi-ledger-item"
                key={i}
              >
                {item}

                <span className="mi-ledger-dot">
                  •
                </span>
              </span>
            )
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="mi-content">
        <motion.p
          className="mi-kicker"
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={
            loaded
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          Est. Deep Time Collection
        </motion.p>

        <h1 className="mi-title">
          {title.map((line, i) => (
            <motion.span
              className="mi-title-line"
              key={i}
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={
                loaded
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: 0.15 + i * 0.12,
              }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mi-description"
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={
            loaded
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.45,
          }}
        >
          {description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mi-actions"
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={
            loaded
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.6,
          }}
        >
          <button
            type="button"
            className="mi-btn-primary"
            onClick={primaryCta.onClick}
          >
            {primaryCta.label}

            <svg
              viewBox="0 0 16 16"
              width="14"
              height="14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className="mi-btn-secondary"
            onClick={secondaryCta.onClick}
          >
            <span className="mi-play-ring">
              <svg
                viewBox="0 0 16 16"
                width="10"
                height="10"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M4 2.5v11l9-5.5-9-5.5z" />
              </svg>
            </span>

            {secondaryCta.label}
          </button>
        </motion.div>
      </div>

      {/* Corner seal */}
      <div
        className="mi-seal"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 60 60"
          width="40"
          height="40"
        >
          <circle
            cx="30"
            cy="30"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />

          <circle
            cx="30"
            cy="30"
            r="23"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />

          <text
            x="30"
            y="20"
            textAnchor="middle"
            fontSize="5.5"
            fill="currentColor"
            letterSpacing="1.5"
          >
            EST.
          </text>

          <text
            x="30"
            y="34"
            textAnchor="middle"
            fontSize="8"
            fill="currentColor"
            fontWeight="600"
          >
            JT
          </text>

          <text
            x="30"
            y="45"
            textAnchor="middle"
            fontSize="4.5"
            fill="currentColor"
            letterSpacing="1"
          >
            ARCHIVE
          </text>
        </svg>
      </div>

      {/* Scroll cue */}
      <div
        className="mi-scroll-cue"
        aria-hidden="true"
      >
        <span className="mi-scroll-line" />
        <span className="mi-scroll-label">
          SCROLL
        </span>
      </div>
    </section>
  );
}