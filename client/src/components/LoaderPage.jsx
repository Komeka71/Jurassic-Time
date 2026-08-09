import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

/* ─── Styles ─── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Fredoka:wght@600;700&family=Inter:wght@400;500&display=swap');

  html, body {
    margin: 0; padding: 0;
    width: 100%; height: 100%;
    background: var(--bg-0);
    overflow: hidden;
  }
  #root { width: 100%; height: 100%; }

  :root {
    --bg-0: #0a1610;
    --bg-1: #0c1a13;
    --ink-0: #f5f3ea;
    --ink-1: rgba(245,243,234,0.6);
    --ink-2: rgba(245,243,234,0.32);
    --egg-core: #fff3d6;
    --egg-mid: #f8d78a;
    --egg-edge: #e6a53f;
    --crack: #0c1a13;
    --emerald: #34d399;
    --ochre: #b9812f;
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
     ROOT WRAPPER — controls the final fade-out handoff to the app
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  .loader-root {
    position: fixed;
    inset: 0;
    z-index: 100;
    transition: opacity 0.5s ease;
    opacity: 1;
  }

  .loader-root.leaving {
    opacity: 0;
    pointer-events: none;
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
     WELCOME SCREEN  (z=5 — below loader)
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  .welcome-screen {
    position: fixed;
    inset: 0;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--bg-0);
    overflow: hidden;
  }

  .welcome-screen::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        ellipse 700px 480px at 50% 50%,
        rgba(52,211,153,0.11),
        transparent 68%
      ),
      linear-gradient(180deg, var(--bg-1), var(--bg-0));
    animation: wsBg 5s ease-in-out infinite alternate;
  }

  @keyframes wsBg {
    from { opacity: 0.65; }
    to   { opacity: 1; }
  }

  /* Soft ring halo behind title */
  .welcome-screen::after {
    content: '';
    position: absolute;
    width: 480px;
    height: 480px;
    border-radius: 50%;
    border: 1px solid rgba(52,211,153,0.07);
    box-shadow:
      0 0 0 48px rgba(52,211,153,0.025),
      0 0 0 110px rgba(52,211,153,0.015);
    pointer-events: none;
  }

  /* ─ Title block: "Welcome To" on one line, logo on the next.
     Both elements share the same max-width box so they align to
     the same visual column instead of centering independently. ─ */
  .welcome-title {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: min(80vw, 520px);
    margin: 0 auto;
    padding: 0 24px;
    opacity: 0;
    filter: blur(14px);
    transform: scale(0.82) translateY(18px);
  }

  .welcome-title.on {
    animation: titleIn 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes titleIn {
    0% {
      opacity: 0;
      filter: blur(14px);
      transform: scale(0.82) translateY(18px);
    }

    35% {
      opacity: 1;
      filter: blur(5px);
    }

    100% {
      opacity: 1;
      filter: blur(0px);
      transform: scale(1) translateY(0);
    }
  }

  .welcome-title-line {
    font-family: 'Fredoka', 'Baloo 2', system-ui, sans-serif;
    font-size: clamp(2.1rem, 6.8vw, 5.4rem);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    color: var(--ochre);

    /* Keeps Welcome To visually tight with PALEORA */
    line-height: 0.85;
  }

  /* ─ Adjust --logo-nudge below to visually re-center the mark inside logo.png
     (negative = shift left, positive = shift right). The PNG has slightly
     asymmetric internal padding so flexbox alone can't perfectly center it. ─ */
  .welcome-logo {
    --logo-nudge: -8px;

    /* Pull PALEORA much closer to Welcome To */
    margin-top: -60px;

    /* Slightly larger logo */
    width: 110%;

    height: auto;
    display: block;
    transform: translateX(var(--logo-nudge));
    filter: drop-shadow(0 0 18px rgba(248,215,138,0.25));
  }

  .welcome-rule {
    position: relative;
    z-index: 1;
    margin-top: 22px;
    width: 200px;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--emerald) 40%,
      var(--egg-mid) 60%,
      transparent
    );
    opacity: 0;
    transform: scaleX(0.1);
  }

  .welcome-rule.on {
    animation: ruleIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards;
  }

  @keyframes ruleIn {
    to {
      opacity: 0.55;
      transform: scaleX(1);
    }
  }

  .welcome-sub {
    position: relative;
    z-index: 1;
    margin-top: 14px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 11px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--emerald);
    opacity: 0;
    transform: translateY(8px);
  }

  .welcome-sub.on {
    animation: subIn 0.75s ease 0.85s forwards;
  }

  @keyframes subIn {
    to {
      opacity: 0.6;
      transform: translateY(0);
    }
  }


  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
     LOADER PAGE  (z=10 — above welcome)
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  .loader-page {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: var(--bg-0);
    color: var(--ink-0);
    font-family: 'Inter', system-ui, sans-serif;
    overflow: hidden;
    transition: opacity 0.22s ease;
  }

  .loader-page.fading {
    opacity: 0;
    pointer-events: none;
  }

  .loader-page::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        ellipse 800px 560px at 50% 46%,
        rgba(52,211,153,0.08),
        transparent 62%
      ),
      linear-gradient(180deg, var(--bg-1), var(--bg-0));
    z-index: 0;
  }

  /* ─ Fireflies ─ */
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
    box-shadow: 0 0 5px 1px rgba(52,211,153,0.5);
    animation: flicker 3.6s ease-in-out infinite;
  }

  .fly.amber {
    background: var(--egg-edge);
    box-shadow: 0 0 5px 1px rgba(230,165,63,0.5);
  }

  @keyframes flicker {
    0%,100% {
      opacity: 0.2;
      transform: scale(0.85);
    }

    50% {
      opacity: 0.85;
      transform: scale(1);
    }
  }

  .center {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* ─ Egg wrapper ─ */
  .egg-wrap {
    position: relative;
    width: 130px;
    height: 150px;
    transition: transform 0.15s ease-out;
    will-change: transform;
  }

  .egg-glow {
    position: absolute;
    inset: -30%;
    background: radial-gradient(
      circle at 50% 45%,
      rgba(248,215,138,0.28),
      transparent 65%
    );
    pointer-events: none;
    border-radius: 50%;
  }

  .egg-wrap.cracking .egg-glow {
    animation: glowPulse 0.42s ease-in-out infinite alternate;
  }

  .egg-wrap.cracked .egg-glow {
    animation: glowBurst 0.7s ease forwards;
  }

  @keyframes glowPulse {
    from {
      opacity: 0.4;
    }

    to {
      opacity: 1;
      filter: brightness(2.8);
    }
  }

  @keyframes glowBurst {
    0% {
      inset: -30%;
      opacity: 1;
    }

    45% {
      inset: -110%;
      opacity: 1;
      filter: brightness(3.5);
    }

    100% {
      inset: -220%;
      opacity: 0;
      filter: brightness(1);
    }
  }

  /* ─ Main egg ─ */
  .egg {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50% 50% 50% 50% / 58% 58% 42% 42%;
    background: radial-gradient(
      circle at 42% 34%,
      var(--egg-core),
      var(--egg-mid) 55%,
      var(--egg-edge) 100%
    );
    box-shadow:
      inset -8px -10px 20px rgba(179,107,20,0.35),
      inset 6px 8px 14px rgba(255,250,230,0.5);
    overflow: hidden;
    animation: idle 3.2s ease-in-out infinite;
    transition: opacity 0.1s ease;
  }

  .egg-wrap.cracking .egg {
    animation: shake 0.07s ease-in-out infinite;
  }

  .egg-wrap.cracked .egg {
    opacity: 0;
    animation: none;
  }

  @keyframes idle {
    0%,100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-3px);
    }
  }

  @keyframes shake {
    0%,100% {
      transform: translateX(0) rotate(0deg);
    }

    25% {
      transform: translateX(-7px) rotate(-2.8deg);
    }

    75% {
      transform: translateX(7px) rotate(2.8deg);
    }
  }

  /* ─ Egg halves (crack-open) ─ */
  .egg-half {
    position: absolute;
    inset: 0;
    border-radius: 50% 50% 50% 50% / 58% 58% 42% 42%;
    background: radial-gradient(
      circle at 42% 34%,
      var(--egg-core),
      var(--egg-mid) 55%,
      var(--egg-edge) 100%
    );
    box-shadow:
      inset -8px -10px 20px rgba(179,107,20,0.35),
      inset 6px 8px 14px rgba(255,250,230,0.5);
    overflow: hidden;
    opacity: 0;
  }

  .egg-half.top {
    clip-path: polygon(-5% 0%, 105% 0%, 105% 54%, -5% 54%);
  }

  .egg-half.bottom {
    clip-path: polygon(-5% 46%, 105% 46%, 105% 105%, -5% 105%);
  }

  .egg-wrap.cracked .egg-half.top {
    animation: topFly 0.88s cubic-bezier(0.2, 0, 0.8, 1) forwards;
  }

  .egg-wrap.cracked .egg-half.bottom {
    animation: btmFly 0.88s cubic-bezier(0.2, 0, 0.8, 1) forwards;
  }

  @keyframes topFly {
    0% {
      opacity: 1;
      transform: translate(0,0) rotate(0deg);
    }

    55% {
      opacity: 0.85;
    }

    100% {
      opacity: 0;
      transform: translateY(-135%) translateX(-38px) rotate(-30deg);
    }
  }

  @keyframes btmFly {
    0% {
      opacity: 1;
      transform: translate(0,0) rotate(0deg);
    }

    55% {
      opacity: 0.85;
    }

    100% {
      opacity: 0;
      transform: translateY(105%) translateX(32px) rotate(20deg);
    }
  }

  /* ─ Crack SVG ─ */
  .cracks {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .crack-glow {
    fill: none;
    stroke: var(--egg-core);
    stroke-width: 6;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 190;
    stroke-dashoffset: 190;
    opacity: 0.5;
    filter: blur(2px);
  }

  .crack-line {
    fill: none;
    stroke: var(--crack);
    stroke-width: 3.6;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 190;
    stroke-dashoffset: 190;
  }

  .crack-branch {
    fill: none;
    stroke: var(--crack);
    stroke-width: 2.4;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 40;
    stroke-dashoffset: 40;
  }

  /* ─ Label / hint ─ */
  .label {
    margin-top: 24px;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-2);
    text-align: center;
    transition: opacity 0.28s ease;
  }

  .label.hide {
    opacity: 0;
  }

  .label b {
    display: block;
    margin-top: 6px;
    font-family: 'Baloo 2', sans-serif;
    font-size: 15px;
    letter-spacing: 0;
    text-transform: none;
    color: var(--ink-0);
    font-weight: 500;
  }

  .hint {
    position: absolute;
    bottom: 36px;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-2);
    transition: opacity 0.4s ease;
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
     PARTICLE BURST  (z=15)
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  .particles {
    position: fixed;
    inset: 0;
    z-index: 15;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .particle {
    position: absolute;
    border-radius: 50%;
    animation: pFly var(--dur) ease-out var(--delay) both;
  }

  @keyframes pFly {
    0% {
      opacity: 1;
      transform: translate(0,0) scale(1);
    }

    100% {
      opacity: 0;
      transform: translate(var(--tx), var(--ty)) scale(0.15);
    }
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
     SPLIT PANELS  (z=50)
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  .split-panel {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 50;
    pointer-events: none;
    transition: transform 0.92s cubic-bezier(0.76, 0, 0.24, 1);
  }

  .split-panel.top {
    top: 0;
    height: 50%;
    background: linear-gradient(to bottom, var(--bg-0) 65%, #0d2018);
  }

  .split-panel.bottom {
    bottom: 0;
    height: 50%;
    background: linear-gradient(to top, var(--bg-0) 65%, #0d2018);
  }

  .split-panel.top::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--emerald) 25%,
      var(--egg-mid) 50%,
      var(--emerald) 75%,
      transparent 100%
    );
    box-shadow:
      0 0 22px 6px rgba(52,211,153,0.45),
      0 0 5px 1px rgba(248,215,138,0.4);
  }

  .split-panel.bottom::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--emerald) 25%,
      var(--egg-mid) 50%,
      var(--emerald) 75%,
      transparent 100%
    );
    box-shadow:
      0 0 22px 6px rgba(52,211,153,0.45),
      0 0 5px 1px rgba(248,215,138,0.4);
  }

  .split-panel.top.open {
    transform: translateY(-100%);
  }

  .split-panel.bottom.open {
    transform: translateY(100%);
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━
     FLASH OVERLAY  (z=60)
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  .flash-overlay {
    position: fixed;
    inset: 0;
    z-index: 60;
    pointer-events: none;
    opacity: 0;
  }

  .flash-overlay.on {
    animation: flashAnim 0.72s ease forwards;
  }

  @keyframes flashAnim {
    0% {
      opacity: 0;
      background: rgba(255,248,220,0.93);
    }

    16% {
      opacity: 1;
      background: rgba(255,248,220,0.93);
    }

    58% {
      opacity: 0.3;
      background: rgba(255,248,220,0.7);
    }

    100% {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .egg,
    .egg-half,
    .fly {
      animation: none !important;
    }

    .welcome-title.on {
      animation-duration: 0.01s !important;
      animation-fill-mode: forwards !important;
    }
  }
`;

/* ─── Component ─── */
export default function LoaderPage({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [boosted, setBoosted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [eggXform, setEggXform] = useState(
    'rotate(0deg) translate(0,0)'
  );
  const [hintOpacity, setHintOpacity] = useState(0.7);

  // Reveal sequence
  const [cracking, setCracking] = useState(false);
  const [cracked, setCracked] = useState(false);
  const [fading, setFading] = useState(false);
  const [particles, setParticles] = useState([]);
  const [splitting, setSplitting] = useState(false);
  const [panelsOpen, setPanelsOpen] = useState(false);
  const [flashing, setFlashing] = useState(false);
  const [welcomed, setWelcomed] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const progressRef = useRef(0);
  const boostedRef = useRef(false);
  const rafRef = useRef(null);
  const stageRef = useRef(null);

  const SPEED = 0.55;

  /* ── Crack progress update ── */
  const updateCracks = useCallback((p) => {
    const mainDash = 190;

    const mainOff =
      mainDash -
      mainDash * Math.max(
        0,
        Math.min(1, p / 70)
      );

    const bDash = 40;

    const b1Off =
      bDash -
      bDash * Math.max(
        0,
        Math.min(1, (p - 45) / 30)
      );

    const b2Off =
      bDash -
      bDash * Math.max(
        0,
        Math.min(1, (p - 65) / 30)
      );

    const el = (id) => document.getElementById(id);

    if (el('c1')) {
      el('c1').style.strokeDashoffset = mainOff;
    }

    if (el('cg')) {
      el('cg').style.strokeDashoffset = mainOff;
    }

    if (el('b1')) {
      el('b1').style.strokeDashoffset = b1Off;
    }

    if (el('b2')) {
      el('b2').style.strokeDashoffset = b2Off;
    }
  }, []);

  /* ── RAF loop ── */
  const tick = useCallback(() => {
    if (progressRef.current < 100) {
      progressRef.current += boostedRef.current
        ? SPEED * 3.4
        : SPEED;

      progressRef.current = Math.min(
        progressRef.current,
        100
      );

      setProgress(
        Math.round(progressRef.current)
      );

      updateCracks(progressRef.current);

      if (progressRef.current > 6) {
        setHintOpacity(0);
      }

      rafRef.current =
        requestAnimationFrame(tick);
    } else {
      setIsComplete(true);
    }
  }, [updateCracks]);

  useEffect(() => {
    rafRef.current =
      requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(
          rafRef.current
        );
      }
    };
  }, [tick]);

  useEffect(() => {
    boostedRef.current = boosted;
  }, [boosted]);

  /* ── Reveal sequence ── */
  useEffect(() => {
    if (!isComplete) return;

    const WELCOME_HOLD = 1800;
    const LEAVE_FADE = 500;

    const T = [
      // 1. Egg shakes
      setTimeout(
        () => setCracking(true),
        80
      ),

      // 2. Egg halves fly apart + particle burst
      setTimeout(() => {
        setCracking(false);
        setCracked(true);
        setFading(true);

        const count = 30;

        const pts = Array.from(
          { length: count },
          (_, i) => {
            const angle =
              (i / count) * 360 +
              Math.random() * 11;

            const dist =
              90 + Math.random() * 150;

            const rad =
              (angle * Math.PI) / 180;

            const amber =
              Math.random() < 0.42;

            const size =
              3 + Math.random() * 5;

            return {
              id: i,
              tx: `${
                Math.cos(rad) * dist
              }px`,
              ty: `${
                Math.sin(rad) * dist
              }px`,
              size,
              color: amber
                ? 'rgba(248,215,138,0.95)'
                : 'rgba(52,211,153,0.95)',
              shadow: amber
                ? 'rgba(230,165,63,0.55)'
                : 'rgba(52,211,153,0.55)',
              dur: `${
                0.45 +
                Math.random() * 0.5
              }s`,
              delay: `${
                (Math.random() * 0.09).toFixed(2)
              }s`,
            };
          }
        );

        setParticles(pts);

        setTimeout(
          () => setParticles([]),
          1100
        );
      }, 670),

      // 3. Split panels mount
      setTimeout(
        () => setSplitting(true),
        810
      ),

      // 4. Panels slide open
      setTimeout(
        () => setPanelsOpen(true),
        910
      ),

      // 5. Flash
      setTimeout(
        () => setFlashing(true),
        990
      ),

      // 6. Welcome block appears
      setTimeout(
        () => setWelcomed(true),
        1520
      ),

      // 7. After holding, begin fading
      setTimeout(
        () => setLeaving(true),
        1520 + WELCOME_HOLD
      ),

      // 8. Swap to real app
      setTimeout(
        () => onComplete?.(),
        1520 +
          WELCOME_HOLD +
          LEAVE_FADE
      ),
    ];

    return () =>
      T.forEach(clearTimeout);
  }, [isComplete, onComplete]);

  /* ── Stable fireflies ── */
  const fireflies = useMemo(
    () =>
      Array.from(
        { length: 16 },
        (_, i) => ({
          i,
          amber:
            Math.random() < 0.35,
          size:
            2 +
            Math.random() * 2.2,
          left:
            Math.random() * 100,
          top:
            Math.random() * 100,
          delay:
            Math.random() * 3.6,
          dur:
            2.8 +
            Math.random() * 2.4,
        })
      ),
    []
  );

  const handleMove = (e) => {
    if (isComplete) return;

    const rect =
      stageRef.current?.getBoundingClientRect();

    if (!rect) return;

    const dx =
      (
        e.clientX -
        rect.left -
        rect.width / 2
      ) /
      (rect.width / 2);

    const dy =
      (
        e.clientY -
        rect.top -
        rect.height / 2
      ) /
      (rect.height / 2);

    setEggXform(
      `rotate(${dx * 6}deg) translate(${dx * 5}px, ${dy * 4}px)`
    );
  };

  const handleLeave = () => {
    if (isComplete) return;

    setBoosted(false);
    setEggXform(
      'rotate(0deg) translate(0,0)'
    );
  };

  const eggCls = [
    'egg-wrap',
    cracking && 'cracking',
    cracked && 'cracked',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={`loader-root${
        leaving ? ' leaving' : ''
      }`}
    >
      <style>{styles}</style>

      {/* ── Welcome screen (behind everything) ── */}
      <div className="welcome-screen">
        <div
          className={`welcome-title${
            welcomed ? ' on' : ''
          }`}
        >
          <span className="welcome-title-line">
            Welcome To
          </span>

          <img
            src="/logo.png"
            alt="Paleora"
            className="welcome-logo"
          />
        </div>

        <div
          className={`welcome-rule${
            welcomed ? ' on' : ''
          }`}
        />

        <div
          className={`welcome-sub${
            welcomed ? ' on' : ''
          }`}
        >
          The journey begins
        </div>
      </div>

      {/* ── Loader page ── */}
      <div
        className={`loader-page${
          fading ? ' fading' : ''
        }`}
        ref={stageRef}
        onPointerDown={() =>
          !isComplete &&
          setBoosted(true)
        }
        onPointerUp={() =>
          setBoosted(false)
        }
        onPointerLeave={handleLeave}
        onPointerMove={handleMove}
      >
        <div className="fireflies">
          {fireflies.map((f) => (
            <div
              key={f.i}
              className={`fly${
                f.amber ? ' amber' : ''
              }`}
              style={{
                width: `${f.size}px`,
                height: `${f.size}px`,
                left: `${f.left}%`,
                top: `${f.top}%`,
                animationDelay:
                  `${f.delay}s`,
                animationDuration:
                  `${f.dur}s`,
              }}
            />
          ))}
        </div>

        <div className="center">
          <div
            className={eggCls}
            style={{
              transform:
                isComplete
                  ? undefined
                  : eggXform,
            }}
          >
            <div className="egg-glow" />

            {/* Full egg with animated cracks */}
            <div className="egg">
              <svg
                className="cracks"
                viewBox="0 0 130 150"
              >
                <path
                  className="crack-glow"
                  id="cg"
                  d="M64 14 L78 44 L54 62 L82 88 L58 112 L70 138"
                />

                <path
                  className="crack-line"
                  id="c1"
                  d="M64 14 L78 44 L54 62 L82 88 L58 112 L70 138"
                />

                <path
                  className="crack-branch"
                  id="b1"
                  d="M78 44 L100 40"
                />

                <path
                  className="crack-branch"
                  id="b2"
                  d="M82 88 L104 96"
                />
              </svg>
            </div>

            {/* Top half — flies up-left */}
            <div className="egg-half top">
              <svg
                className="cracks"
                viewBox="0 0 130 150"
              >
                <path
                  className="crack-line"
                  d="M64 14 L78 44 L54 62 L82 88 L58 112 L70 138"
                  style={{
                    strokeDashoffset: 0,
                  }}
                />
              </svg>
            </div>

            {/* Bottom half — flies down-right */}
            <div className="egg-half bottom">
              <svg
                className="cracks"
                viewBox="0 0 130 150"
              >
                <path
                  className="crack-line"
                  d="M64 14 L78 44 L54 62 L82 88 L58 112 L70 138"
                  style={{
                    strokeDashoffset: 0,
                  }}
                />
              </svg>
            </div>
          </div>

          <div
            className={`label${
              cracking || cracked
                ? ' hide'
                : ''
            }`}
          >
            Hatching

            <b>
              {`${progress}%`}
            </b>
          </div>
        </div>

        <div
          className="hint"
          style={{
            opacity: hintOpacity,
          }}
        >
          tap the egg to hurry it along
        </div>
      </div>

      {/* ── Particle burst ── */}
      {particles.length > 0 && (
        <div className="particles">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: p.color,
                boxShadow:
                  `0 0 7px 2px ${p.shadow}`,
                '--tx': p.tx,
                '--ty': p.ty,
                '--dur': p.dur,
                '--delay': p.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* ── Split panels ── */}
      {splitting && (
        <>
          <div
            className={`split-panel top${
              panelsOpen ? ' open' : ''
            }`}
          />

          <div
            className={`split-panel bottom${
              panelsOpen ? ' open' : ''
            }`}
          />
        </>
      )}

      {/* ── Flash overlay ── */}
      <div
        className={`flash-overlay${
          flashing ? ' on' : ''
        }`}
      />
    </div>
  );
}