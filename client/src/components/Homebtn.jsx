import React from "react";

/**
 * HomeButton — global floating "return to home" control for DinoDex.
 *
 * Matches the app's dark sci-fi / forest-glow UI:
 * - near-black translucent glass background
 * - emerald/green glow ring (same family as the "Begin Experiment" dial
 *   and the green corner-tick panel on the Genetics Lab screen)
 * - thin corner-tick frame accents instead of a plain border
 *
 * Usage:
 *   import HomeButton from "./HomeButton";
 *   <HomeButton onClick={() => navigate("/")} />
 *
 * Drop it once per page — it's self-positioning (fixed, top-left,
 * inset a bit from the edge so it never collides with a browser chrome
 * or a page's own back arrow).
 */
export default function HomeButton({ onClick, label = "Home", href }) {
  const Tag = href ? "a" : "button";
  const tagProps = href ? { href } : { onClick, type: "button" };

  return (
    <Tag
      {...tagProps}
      aria-label={label}
      className="dd-home-btn"
    >
      <span className="dd-home-btn__ring" aria-hidden="true" />
      <svg
        className="dd-home-btn__icon"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 11.5 12 4l8 7.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 10v8a1 1 0 0 0 1 1H10a1 1 0 0 0 1-1v-3.5a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1V19a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="dd-home-btn__corner dd-home-btn__corner--tl" aria-hidden="true" />
      <span className="dd-home-btn__corner dd-home-btn__corner--br" aria-hidden="true" />

      <style>{`
        .dd-home-btn {
          position: fixed;
          top: 96px;
          left: 32px;
          z-index: 40;
          width: 52px;
          height: 52px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(10, 16, 13, 0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(120, 200, 150, 0.25);
          border-radius: 50%;
          color: rgba(210, 235, 215, 0.9);
          cursor: pointer;
          text-decoration: none;
          transition: border-color 180ms ease, transform 180ms ease,
            box-shadow 180ms ease, color 180ms ease;
          box-shadow: 0 0 0 0 rgba(80, 220, 140, 0);
        }

        .dd-home-btn__ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid rgba(90, 210, 140, 0.35);
          opacity: 0.5;
          transition: opacity 180ms ease, transform 180ms ease;
        }

        .dd-home-btn__icon {
          width: 20px;
          height: 20px;
          position: relative;
          z-index: 1;
        }

        .dd-home-btn__corner {
          position: absolute;
          width: 9px;
          height: 9px;
          border: 1.4px solid rgba(120, 220, 160, 0.55);
          opacity: 0;
          transition: opacity 180ms ease;
        }
        .dd-home-btn__corner--tl {
          top: -5px;
          left: -5px;
          border-right: none;
          border-bottom: none;
        }
        .dd-home-btn__corner--br {
          bottom: -5px;
          right: -5px;
          border-left: none;
          border-top: none;
        }

        .dd-home-btn:hover,
        .dd-home-btn:focus-visible {
          color: rgba(200, 255, 210, 1);
          border-color: rgba(120, 230, 160, 0.55);
          transform: translateY(-1px);
          box-shadow: 0 0 22px 2px rgba(80, 220, 140, 0.25);
          outline: none;
        }
        .dd-home-btn:hover .dd-home-btn__ring,
        .dd-home-btn:focus-visible .dd-home-btn__ring {
          opacity: 1;
          transform: scale(1.08);
        }
        .dd-home-btn:hover .dd-home-btn__corner,
        .dd-home-btn:focus-visible .dd-home-btn__corner {
          opacity: 1;
        }
        .dd-home-btn:active {
          transform: translateY(0) scale(0.96);
        }

        @media (max-width: 640px) {
          .dd-home-btn {
            top: 80px;
            left: 16px;
            width: 46px;
            height: 46px;
          }
          .dd-home-btn__icon {
            width: 18px;
            height: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dd-home-btn,
          .dd-home-btn__ring,
          .dd-home-btn__corner {
            transition: none;
          }
        }
      `}</style>
    </Tag>
  );
}