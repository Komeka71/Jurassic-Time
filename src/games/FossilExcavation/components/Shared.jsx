import React from "react";
import { STEPS } from "../data";

export function Stepper({ activeIndex }) {
  return (
    <div className="stepper" aria-hidden="true">
      {STEPS.map((s, i) => (
        <React.Fragment key={s}>
          <div className={"stepper-item" + (i === activeIndex ? " active" : i < activeIndex ? " done" : "")}>
            <span className="stepper-dot" />
            <span className="stepper-label">{s}</span>
          </div>
          {i < STEPS.length - 1 && <span className="stepper-line" />}
        </React.Fragment>
      ))}
    </div>
  );
}

export function Stars({ n }) {
  return (
    <span className="stars">
      {[1, 2, 3].map((i) => (
        <span key={i} className={"star" + (i <= n ? " filled" : "")}>
          ★
        </span>
      ))}
    </span>
  );
}

/* Lightweight painterly backdrop per site. Swap for a photograph in
   assets/backgrounds/<site>.jpg when one is available — just replace the
   <svg> below with an <img> and keep the same wrapping element. */
export function SiteBackdrop({ id }) {
  if (id === "desert") {
    return (
      <svg viewBox="0 0 400 200" className="site-art" preserveAspectRatio="none">
        <defs>
          <linearGradient id="duneA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a2818" />
            <stop offset="100%" stopColor="#1a1108" />
          </linearGradient>
          <linearGradient id="duneB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#241a10" />
            <stop offset="100%" stopColor="#100b05" />
          </linearGradient>
        </defs>
        <circle cx="330" cy="40" r="30" fill="#e8b06a" opacity="0.35" />
        <circle cx="330" cy="40" r="16" fill="#e8b06a" opacity="0.55" />
        <polygon points="150,200 220,100 260,150 320,70 400,200" fill="url(#duneB)" />
        <polygon points="0,200 40,90 90,160 140,60 190,200" fill="url(#duneA)" />
      </svg>
    );
  }
  if (id === "river") {
    return (
      <svg viewBox="0 0 400 200" className="site-art" preserveAspectRatio="none">
        <defs>
          <linearGradient id="riverHill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#233527" />
            <stop offset="100%" stopColor="#0e1811" />
          </linearGradient>
        </defs>
        <polygon points="0,200 60,110 120,170 180,90 240,200" fill="url(#riverHill)" />
        <path d="M0 190 Q100 158 200 190 T400 190 V200 H0 Z" fill="#1e3a34" opacity="0.75" />
        <path d="M0 176 Q100 148 200 176 T400 176" stroke="#6fa89a" strokeWidth="2.4" fill="none" opacity="0.35" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 200" className="site-art" preserveAspectRatio="none">
      <defs>
        <radialGradient id="lava" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#e2622f" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e2622f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <polygon points="140,200 220,50 300,200" fill="#1f0e07" />
      <circle cx="220" cy="55" r="46" fill="url(#lava)" />
      <circle cx="220" cy="52" r="7" fill="#f0824a" />
      <polygon points="0,200 60,140 130,200" fill="#160a05" />
      <polygon points="270,200 330,120 400,200" fill="#160a05" />
    </svg>
  );
}
