import React, { useMemo } from 'react';
import '../DinoTrackDetective.css';
import ArtworkImage from '../../../shared/components/ArtworkImage.jsx';
import HomeButton from '../../../components/Homebtn.jsx';
import { useNavigate } from 'react-router-dom';

// ---------------------------------------------------------------------------
// Deterministic pseudo-random generator (seeded so a given trail never
// jitters between re-renders, but every species still looks organic).
// ---------------------------------------------------------------------------
function makeRng(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function polar(angleDeg, radius) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
}

// Builds a single tapered "toe" path, fanning outward from the heel.
// angleDeg: 0 = pointing right, -90 = pointing straight up (forward).
function toePath(angleDeg, length, baseWidth, clawed) {
  const tip = polar(angleDeg, length);
  const left = polar(angleDeg - 90, baseWidth / 2);
  const right = polar(angleDeg + 90, baseWidth / 2);
  const bulge = clawed ? 0.55 : 0.72;
  const midOuterL = polar(angleDeg - 22, length * bulge);
  const midOuterR = polar(angleDeg + 22, length * bulge);
  const tipRadius = clawed ? 0 : baseWidth * 0.16;
  const tipL = tipRadius ? polar(angleDeg - 6, length - tipRadius) : tip;
  const tipR = tipRadius ? polar(angleDeg + 6, length - tipRadius) : tip;

  return `M ${left.x} ${left.y}
    Q ${midOuterL.x} ${midOuterL.y} ${tipL.x} ${tipL.y}
    ${tipRadius ? `Q ${tip.x} ${tip.y} ${tipR.x} ${tipR.y}` : ''}
    Q ${midOuterR.x} ${midOuterR.y} ${right.x} ${right.y}
    Q 0 0 ${left.x} ${left.y} Z`;
}

// Renders one complete footprint (heel pad + fanned toes) as an SVG group.
function Footprint({ id, size, toeCount, clawed, opacity, rngSeed }) {
  const rng = useMemo(() => makeRng(rngSeed), [rngSeed]);

  // Forward (direction of travel) is +x, since trails run left-to-right
  // across the exhibit floor. Toes fan around 0deg; the heel sits
  // slightly behind (-x) the toe cluster.
  const spreadByCount = { 2: 34, 3: 68, 4: 100, 5: 140 };
  const spread = spreadByCount[toeCount] || 80;
  const step = toeCount > 1 ? spread / (toeCount - 1) : 0;
  const start = 0 - spread / 2;

  const heelRx = size * (0.34 + rng() * 0.03);
  const heelRy = size * (0.26 + rng() * 0.03);
  const toeLen = size * (0.62 + rng() * 0.05);
  const toeBase = size * (0.24 + (toeCount >= 4 ? -0.06 : 0));

  const toes = Array.from({ length: toeCount }, (_, i) => {
    const angle = start + step * i + (rng() - 0.5) * 4;
    return (
      <path
        key={`${id}-toe-${i}`}
        d={toePath(angle, toeLen, toeBase, clawed)}
        className="track-toe"
      />
    );
  });

  return (
    <g opacity={opacity}>
      <ellipse
        className="track-heel"
        cx={-heelRx * 0.4}
        cy="0"
        rx={heelRx}
        ry={heelRy}
      />
      {toes}
    </g>
  );
}

// ---------------------------------------------------------------------------
// Trail layout: converts a species' gait parameters into a series of
// positioned footprints running left (near, large) to right (far, small),
// echoing the soft perspective of a spotlit excavation floor.
// ---------------------------------------------------------------------------
function buildBipedTrail(fp, seed) {
  const rng = makeRng(seed);
  const stations = 6;
  const prints = [];
  for (let i = 0; i < stations; i += 1) {
    const t = i / (stations - 1);
    const side = i % 2 === 0 ? -1 : 1;
    const x = 90 + t * 700 * (0.72 + fp.stride * 0.28);
    const y = 190 + Math.sin(t * Math.PI * 1.4) * 14 + side * fp.straddle * 90;
    const scale = (1.15 - t * 0.42) * fp.printSize;
    const rotation = side * (16 + rng() * 8) + (t - 0.5) * 10;
    prints.push({
      key: `s-${i}`,
      x: Math.min(x, 830),
      y,
      scale,
      rotation,
      opacity: 0.55 + (1 - t) * 0.45,
      seed: seed + i * 37,
    });
  }
  return prints;
}

function buildQuadrupedTrail(fp, seed) {
  const rng = makeRng(seed);
  const stations = 4;
  const prints = [];
  ['left', 'right'].forEach((side, sideIdx) => {
    const sign = side === 'left' ? -1 : 1;
    for (let i = 0; i < stations; i += 1) {
      const t = i / (stations - 1);
      const baseX = 90 + t * 700 * (0.68 + fp.stride * 0.32);
      const baseY = 190 + Math.sin(t * Math.PI * 1.2) * 10 + sign * fp.straddle * 110;
      const perspective = 1.1 - t * 0.4;

      // Hind print (larger)
      prints.push({
        key: `${side}-hind-${i}`,
        x: Math.min(baseX + 14, 840),
        y: baseY,
        scale: perspective * fp.printSize,
        rotation: sign * (8 + rng() * 6),
        opacity: 0.55 + (1 - t) * 0.45,
        seed: seed + sideIdx * 97 + i * 41,
        hind: true,
      });
      // Fore print (smaller, slightly behind/inside)
      prints.push({
        key: `${side}-fore-${i}`,
        x: Math.min(baseX - 26, 810),
        y: baseY - sign * 6,
        scale: perspective * fp.printSize * (fp.foreSize || 0.8),
        rotation: sign * (6 + rng() * 6),
        opacity: 0.5 + (1 - t) * 0.4,
        seed: seed + sideIdx * 97 + i * 41 + 500,
        hind: false,
      });
    }
  });
  return prints;
}

function seedFromString(str) {
  let seed = 0;
  for (let i = 0; i < str.length; i += 1) seed += str.charCodeAt(i) * (i + 7);
  return seed || 1;
}

// The procedurally-generated trail, used as the fallback whenever no
// real track photo/render exists yet at /assets/tracks/{id}-track.*
function ProceduralTrail({ fp, dinoId }) {
  const seed = seedFromString(dinoId);

  const prints = useMemo(
    () => (fp.gait === 'biped' ? buildBipedTrail(fp, seed) : buildQuadrupedTrail(fp, seed)),
    [dinoId]
  );

  return (
    <svg
      className="track-trail__svg"
      viewBox="0 0 900 320"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Fossilized footprint trail awaiting identification"
    >
      <defs>
        <radialGradient id="groundLight" cx="30%" cy="55%" r="75%">
          <stop offset="0%" stopColor="#6e6d6c" />
          <stop offset="55%" stopColor="#332a1f" />
          <stop offset="100%" stopColor="#171310" />
        </radialGradient>
        <linearGradient id="vignette" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="900" height="320" fill="url(#groundLight)" />

      {/* subtle scattered sediment texture */}
      {Array.from({ length: 26 }).map((_, i) => {
        const gx = (i * 137) % 900;
        const gy = 40 + ((i * 71) % 240);
        const r = 1 + ((i * 13) % 3);
        return (
          <circle
            key={`grain-${i}`}
            cx={gx}
            cy={gy}
            r={r}
            className="track-grain"
          />
        );
      })}

      {prints.map((p) => (
        <g key={p.key} transform={`translate(${p.x}, ${p.y}) rotate(${p.rotation}) scale(${p.scale})`}>
          <Footprint
            id={p.key}
            size={54}
            toeCount={fp.toeCount}
            clawed={fp.clawed}
            opacity={p.opacity}
            rngSeed={p.seed}
          />
        </g>
      ))}

      <rect x="0" y="0" width="900" height="320" fill="url(#vignette)" />
    </svg>
  );
}

export default function TrackTrail({ dino, trailNumber, totalTrails }) {
  const navigate = useNavigate();
  const { footprint: fp } = dino;

  return (
    <div className="track-trail">
      <HomeButton onClick={() => navigate('/')} />
      
      <div className="track-trail__frame">
        <div className="track-trail__header">
          <div className="track-trail__badge" aria-hidden="true">
            <span className="track-trail__badge-label">Trail</span>
            <span className="track-trail__badge-number">{String(trailNumber).padStart(2, '0')}</span>
            <span className="track-trail__badge-total">of {totalTrails}</span>
          </div>
          <span className="track-trail__title">Track Identification Lab</span>
          <span className="track-trail__subtitle">Museum AI Archive</span>
        </div>

        <ArtworkImage
          id={`${dino.id}-track`}
          alt="Fossilized footprint trail awaiting identification"
          basePath="/assets/tracks"
          className="track-trail__photo"
          fallbackClassName="track-trail__art"
          fallback={<ProceduralTrail fp={fp} dinoId={dino.id} />}
        />
      </div>
    </div>
  );
}
