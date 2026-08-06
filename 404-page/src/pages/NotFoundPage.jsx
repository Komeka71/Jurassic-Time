import React, { useEffect, useRef } from 'react';

/* ─── Styles ─── */
const styles = `
  :root {
    --bg-0: #0a1610;
    --bg-1: #0c1a13;
    --ink-0: #f5f3ea;
    --ink-1: rgba(245,243,234,0.72);
    --ink-2: rgba(245,243,234,0.4);
    --egg-core: #fff3d6;
    --egg-mid: #f8d78a;
    --egg-edge: #e6a53f;
    --emerald: #34d399;
    --cta: #f5b942;
    --cta-ink: #20160a;
  }

  .notfound-page {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px;
    margin: 0;
    background: var(--bg-0);
    color: var(--ink-0);
    font-family: 'Inter', system-ui, sans-serif;
    overflow: hidden;
  }

  .notfound-page::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 900px 620px at 50% 42%, rgba(52,211,153,0.10), transparent 62%),
      radial-gradient(ellipse 1200px 800px at 50% 105%, rgba(230,165,63,0.07), transparent 60%),
      linear-gradient(180deg, var(--bg-1), var(--bg-0));
    z-index: 0;
  }

  .notfound-page::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 14px 14px;
    opacity: 0.35;
    z-index: 0;
  }

  .fireflies {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
  }

  .fly {
    position: absolute;
    border-radius: 50%;
    background: var(--emerald);
    filter: blur(0.4px);
    box-shadow: 0 0 6px 1px rgba(52,211,153,0.55);
    animation: flicker 3.6s ease-in-out infinite;
  }

  .fly.amber {
    background: var(--cta);
    box-shadow: 0 0 6px 1px rgba(245,185,66,0.55);
  }

  @keyframes flicker {
    0%, 100% { opacity: 0.25; transform: scale(0.85); }
    50% { opacity: 0.9; transform: scale(1); }
  }

  .content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tag {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-2);
    margin-bottom: 18px;
  }

  .tag b {
    color: var(--ink-1);
    font-weight: 600;
  }

  .heading {
    font-family: 'Baloo 2', sans-serif;
    font-weight: 600;
    font-size: clamp(26px, 4.4vw, 36px);
    color: var(--ink-0);
    margin: 0 0 8px;
  }

  .numrow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin: 6px 0 18px;
  }

  .digit {
    font-family: 'Baloo 2', sans-serif;
    font-weight: 700;
    font-size: clamp(110px, 20vw, 190px);
    line-height: 1;
    color: var(--ink-0);
    filter: drop-shadow(0 0 18px rgba(245,185,66,0.10));
  }

  .egg-wrap {
    position: relative;
    width: clamp(96px, 17vw, 168px);
    height: clamp(110px, 19.5vw, 192px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .egg-glow {
    position: absolute;
    inset: -30%;
    background: radial-gradient(circle at 50% 45%, rgba(248,215,138,0.35), transparent 65%);
    filter: blur(6px);
    animation: breathe 4.5s ease-in-out infinite;
  }

  @keyframes breathe {
    0%, 100% { opacity: 0.75; }
    50% { opacity: 1; }
  }

  .orbit {
    position: absolute;
    width: 132%;
    height: 58%;
    border: 1.6px solid rgba(245,243,234,0.55);
    border-radius: 50%;
    transform: rotate(-18deg);
  }

  .orbit .seed {
    position: absolute;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--bg-0);
    border: 1.6px solid rgba(245,243,234,0.7);
    left: 14%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .egg {
    position: relative;
    width: 76%;
    height: 88%;
    border-radius: 50% 50% 50% 50% / 58% 58% 42% 42%;
    background: radial-gradient(circle at 42% 34%, var(--egg-core), var(--egg-mid) 55%, var(--egg-edge) 100%);
    box-shadow:
      inset -8px -10px 20px rgba(179,107,20,0.35),
      inset 6px 8px 14px rgba(255,250,230,0.5);
    z-index: 1;
  }

  .egg::before,
  .egg::after {
    content: "";
    position: absolute;
    background: rgba(179,107,20,0.28);
    border-radius: 2px;
  }

  .egg::before {
    width: 1.4px;
    height: 34%;
    top: 18%;
    left: 44%;
    transform: rotate(12deg);
  }

  .egg::after {
    width: 1.4px;
    height: 20%;
    top: 46%;
    left: 56%;
    transform: rotate(-18deg);
  }

  .sub {
    font-size: 15px;
    color: var(--ink-1);
    max-width: 360px;
    line-height: 1.55;
    margin: 0 0 30px;
  }

  .btn {
    appearance: none;
    border: none;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 14px 32px;
    border-radius: 999px;
    text-decoration: none;
    color: var(--cta-ink);
    background: var(--cta);
    box-shadow: 0 8px 22px rgba(245,185,66,0.22);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 26px rgba(245,185,66,0.32);
  }

  @media (max-width: 480px) {
    .numrow { gap: 2px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .fly, .egg-glow { animation: none !important; }
  }
`;

/* ─── Component ─── */
export default function NotFoundPage() {
  const fieldRef = useRef(null);

  useEffect(() => {
    // Fireflies are rendered statically; no DOM manipulation needed in React
  }, []);

  const fireflies = Array.from({ length: 22 }, (_, i) => {
    const amber = Math.random() < 0.35;
    const size = 2 + Math.random() * 2.4;
    return (
      <div
        key={i}
        className={`fly${amber ? ' amber' : ''}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3.6}s`,
          animationDuration: `${2.8 + Math.random() * 2.4}s`,
        }}
      />
    );
  });

  return (
    <>
      <style>{styles}</style>
      <div className="notfound-page">
        <div className="fireflies" ref={fieldRef}>
          {fireflies}
        </div>

        <div className="content">
          <div className="tag">
            <b>DinoVerse</b> · Field Expedition
          </div>

          <h1 className="heading">This page went extinct</h1>

          <div className="numrow">
            <span className="digit">4</span>
            <div className="egg-wrap">
              <div className="egg-glow" />
              <div className="orbit">
                <div className="seed" />
              </div>
              <div className="egg" />
            </div>
            <span className="digit">4</span>
          </div>

          <p className="sub">
            We couldn't dig up the page you were looking for. It may have been
            relocated, renamed, or never fossilized in the first place.
          </p>

          <a className="btn" href="/">
            Back to camp
          </a>
        </div>
      </div>
    </>
  );
}
