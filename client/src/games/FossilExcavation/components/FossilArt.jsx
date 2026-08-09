import React, { useState } from "react";

/* =========================================================================
   FossilArt.jsx
   Renders real fossil photography from assets/fossils/. The brushing
   mechanic in Excavation.jsx composites dirt above this layer and erases
   it to reveal whatever is rendered here — image or fallback alike — so no
   changes to the brushing system are needed.

   Expected asset naming (see assets/README.md):
     assets/fossils/<species-id>-fossil.webp
   e.g. assets/fossils/stegosaurus-fossil.webp

   If an image is missing (e.g. during early development before real
   photography has been dropped in), SpeciesArt quietly falls back to a
   procedural sketch so the pit/card never shows a broken-image icon.
   ========================================================================= */

// Update this if your bundler serves assets/fossils from a different path
// (e.g. a Vite `public/` folder, an imported asset map, or a CDN).
const FOSSIL_IMAGE_BASE = "/assets/fossils";

function fossilImageSrc(id) {
  return `${FOSSIL_IMAGE_BASE}/${id}-bone.png`;
}

export function SpeciesArt({ id, mode = "specimen", accent, className = "" }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return <ProceduralFallback id={id} mode={mode} accent={accent} className={className} />;
  }

  return (
    <div className={`species-art ${mode} ${className}`}>
      <img
        src={fossilImageSrc(id)}
        alt={`${id} fossil`}
        className="species-photo"
        draggable={false}
        onError={() => setErrored(true)}
      />
    </div>
  );
}

/** Sparse artwork shown while brushing an empty excavation spot (no fossil here). */
export function EmptyLayerArt({ art }) {
  if (art === "plant") {
    return (
      <svg viewBox="0 0 220 130" className="species-art empty-art">
        <g fill="none" stroke="#8a9662" strokeWidth="2" strokeLinecap="round" opacity="0.85">
          <path d="M110 118 L110 30" />
          <path d="M110 40 Q80 30 60 48 M110 55 Q140 45 158 62 M110 70 Q78 62 58 80 M110 85 Q142 78 160 96" />
        </g>
      </svg>
    );
  }
  if (art === "mineral") {
    return (
      <svg viewBox="0 0 220 130" className="species-art empty-art">
        <g fill="#8b8bab33" stroke="#8b8bab" strokeWidth="2" strokeLinejoin="round" opacity="0.85">
          <polygon points="90,100 105,55 130,60 140,100 115,118" />
          <polygon points="130,105 150,80 165,95 155,115" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 220 130" className="species-art empty-art">
      <g fill="#5a4c3644" stroke="#6b5c3e" strokeWidth="2" opacity="0.8">
        <ellipse cx="90" cy="90" rx="34" ry="18" />
        <ellipse cx="150" cy="100" rx="22" ry="12" />
        <ellipse cx="60" cy="100" rx="16" ry="9" />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Procedural fallback (dev-time only). Same silhouettes used before real
   photography was wired in — kept purely so a missing asset degrades
   gracefully instead of breaking the layout.
   ------------------------------------------------------------------------- */

const PATHS = {
  triceratops: (id) => (
    <>
      <ellipse cx="120" cy="80" rx="70" ry="30" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2.4" />
      <path d="M55 65 Q30 40 15 55 Q30 60 40 75 Z" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2" />
      <circle cx="52" cy="62" r="20" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2.2" />
      <path d="M40 48 L28 20 M52 44 L52 12 M64 48 L76 20" fill="none" stroke={`url(#rim-${id})`} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M150 105 L150 125 M175 105 L178 125 M70 108 L68 126 M95 108 L95 126" fill="none" stroke={`url(#rim-${id})`} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M190 78 Q205 70 200 92 Q195 100 185 90 Z" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2" />
    </>
  ),
  stegosaurus: (id) => (
    <>
      <path d="M20 95 Q60 105 100 92 Q140 78 170 85 Q195 88 205 100 Q195 108 170 106 Q120 108 70 106 Q40 106 20 95 Z" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2.4" />
      <circle cx="30" cy="80" r="14" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2.2" />
      <path d="M60 60 L75 30 L82 62 Z M90 55 L102 24 L110 58 Z M118 55 L128 26 L136 58 Z M144 60 L152 34 L160 64 Z" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2" />
      <path d="M195 95 L215 85 M195 100 L217 100" fill="none" stroke={`url(#rim-${id})`} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M45 108 L45 126 M75 110 L73 127 M150 110 L150 127 M175 108 L177 126" fill="none" stroke={`url(#rim-${id})`} strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
  brachiosaurus: (id) => (
    <>
      <ellipse cx="110" cy="100" rx="55" ry="26" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2.4" />
      <path d="M80 82 Q65 30 45 12" fill="none" stroke={`url(#rim-${id})`} strokeWidth="3" strokeLinecap="round" />
      <circle cx="40" cy="10" r="10" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2.2" />
      <path d="M160 92 Q195 110 200 145" fill="none" stroke={`url(#rim-${id})`} strokeWidth="3" strokeLinecap="round" />
      <path d="M75 122 L72 145 M100 126 L98 148 M130 126 L132 148 M150 122 L153 145" fill="none" stroke={`url(#rim-${id})`} strokeWidth="2.6" strokeLinecap="round" />
    </>
  ),
  velociraptor: (id) => (
    <>
      <ellipse cx="110" cy="75" rx="42" ry="20" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2.2" />
      <path d="M150 70 Q170 55 165 40 L172 42 Q178 60 155 78 Z" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2" />
      <circle cx="160" cy="52" r="12" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2" />
      <path d="M70 82 Q30 95 15 120 M28 100 L34 118" fill="none" stroke={`url(#rim-${id})`} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M95 92 L90 118 L105 118 M75 90 L68 112" fill="none" stroke={`url(#rim-${id})`} strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
  trex: (id) => (
    <>
      <ellipse cx="100" cy="80" rx="48" ry="26" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2.4" />
      <path d="M140 66 Q175 48 185 30 L178 30 Q165 48 138 60 Z" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2" />
      <circle cx="168" cy="42" r="16" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2.2" />
      <path d="M182 34 L192 30 M184 40 L194 38 M186 46 L195 46" fill="none" stroke={`url(#rim-${id})`} strokeWidth="2" strokeLinecap="round" />
      <path d="M125 60 L134 55 M118 64 L126 58" fill="none" stroke={`url(#rim-${id})`} strokeWidth="2" strokeLinecap="round" />
      <path d="M60 100 Q30 118 20 138 M85 106 L82 138" fill="none" stroke={`url(#rim-${id})`} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M55 78 Q20 68 5 50" fill="none" stroke={`url(#rim-${id})`} strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
  pteranodon: (id) => (
    <>
      <ellipse cx="110" cy="80" rx="18" ry="10" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2" />
      <path d="M110 76 Q60 30 10 40 Q60 55 95 78 Z" fill={`url(#fill-${id})`} opacity="0.7" stroke={`url(#rim-${id})`} strokeWidth="2" />
      <path d="M112 76 Q160 30 210 40 Q160 55 125 78 Z" fill={`url(#fill-${id})`} opacity="0.7" stroke={`url(#rim-${id})`} strokeWidth="2" />
      <path d="M118 68 Q140 30 165 22 Q150 45 128 66 Z" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2" />
      <circle cx="118" cy="66" r="8" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2" />
    </>
  ),
  ankylosaurus: (id) => (
    <>
      <ellipse cx="115" cy="82" rx="75" ry="24" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2.4" />
      <circle cx="55" cy="72" r="12" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2.2" />
      <path d="M75 62 L85 78 M100 58 L108 76 M125 58 L131 76 M150 62 L154 78" fill="none" stroke={`url(#rim-${id})`} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M190 88 Q212 90 214 102 Q212 112 198 108 Q208 96 190 88 Z" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2" />
      <path d="M60 104 L58 118 M170 104 L172 118" fill="none" stroke={`url(#rim-${id})`} strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
};

const GENERIC = (id) => (
  <>
    <path d="M70 140 Q140 110 210 118 Q280 124 330 100" fill="none" stroke={`url(#rim-${id})`} strokeWidth="3" strokeLinecap="round" />
    <path d="M60 150 Q35 132 30 112 Q28 100 45 96 Q68 96 78 118 Q84 134 70 148 Z" fill={`url(#fill-${id})`} stroke={`url(#rim-${id})`} strokeWidth="2.4" />
    <path d="M330 100 Q365 92 390 70" fill="none" stroke={`url(#rim-${id})`} strokeWidth="2.6" strokeLinecap="round" />
    <path d="M150 160 L140 200 M140 200 L120 205 M140 200 L160 205" fill="none" stroke={`url(#rim-${id})`} strokeWidth="2.6" strokeLinecap="round" />
    <path d="M230 150 L225 198 M225 198 L205 203 M225 198 L245 203" fill="none" stroke={`url(#rim-${id})`} strokeWidth="2.6" strokeLinecap="round" />
  </>
);

/** Generic, non-identifying placeholder for an undiscovered specimen in the Collection screen. */
export function LockedSilhouette({ className = "" }) {
  return (
    <svg viewBox="0 0 220 130" className={`species-art bone locked ${className}`} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="locked-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a2216" />
          <stop offset="100%" stopColor="#14100a" />
        </linearGradient>
        <linearGradient id="locked-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4a3c26" />
          <stop offset="100%" stopColor="#2a2116" />
        </linearGradient>
      </defs>
      <g style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))" }}>
        <ellipse cx="110" cy="80" rx="70" ry="28" fill="url(#locked-fill)" stroke="url(#locked-rim)" strokeWidth="2.4" />
        <circle cx="45" cy="70" r="16" fill="url(#locked-fill)" stroke="url(#locked-rim)" strokeWidth="2.2" />
      </g>
    </svg>
  );
}

function ProceduralFallback({ id, mode, accent, className = "" }) {
  const gradId = `${mode}-${id}`;
  const draw = PATHS[id] || GENERIC;
  const boneMode = mode === "bone";
  const viewBox = id === "brachiosaurus" ? "0 0 220 150" : "0 0 220 130";

  return (
    <svg viewBox={viewBox} className={`species-art ${mode} ${className} fallback`} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={`fill-${gradId}`} x1="0" y1="0" x2="1" y2="1">
          {boneMode ? (
            <>
              <stop offset="0%" stopColor="#3a2c1c" />
              <stop offset="55%" stopColor="#241a10" />
              <stop offset="100%" stopColor="#120c07" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor={accent || "#c9a15a"} stopOpacity="0.85" />
              <stop offset="60%" stopColor={accent || "#c9a15a"} stopOpacity="0.35" />
              <stop offset="100%" stopColor="#120c07" stopOpacity="0.2" />
            </>
          )}
        </linearGradient>
        <linearGradient id={`rim-${gradId}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8cf94" />
          <stop offset="45%" stopColor="#c89b3c" />
          <stop offset="100%" stopColor="#7a5c22" />
        </linearGradient>
      </defs>
      <g style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))" }}>{draw(gradId)}</g>
    </svg>
  );
}