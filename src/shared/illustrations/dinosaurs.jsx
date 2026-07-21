import React from 'react';

// Fallback artwork used by ArtworkImage when no real photo/render is
// available yet. Drawn as a single-tone engraved-plaque silhouette so
// it sits naturally in the museum aesthetic even before real art is
// sourced. Color is inherited via `currentColor`, so it follows
// whatever text color the surrounding card sets (typically --dtd-brass).

function IconBase({ className, children }) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 160"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const BODY_FILL = { fill: 'currentColor', fillOpacity: 0.16, stroke: 'currentColor' };

export function TrexIllustration({ className }) {
  return (
    <IconBase className={className}>
      {/* torso, leaning forward */}
      <ellipse cx="118" cy="82" rx="46" ry="23" transform="rotate(-24 118 82)" {...BODY_FILL} />
      {/* neck + head wedge */}
      <path {...BODY_FILL} d="M156,60 C168,50 182,40 198,42 C204,48 200,56 190,58 L178,70 C172,74 162,72 156,66 Z" />
      {/* jaw line + teeth */}
      <path d="M178,70 L192,60" />
      {/* tail */}
      <path {...BODY_FILL} d="M80,96 C58,102 38,108 22,118 C40,110 60,106 82,104 Z" />
      {/* small arm */}
      <path d="M140,86 C136,92 136,98 141,102" />
      {/* legs */}
      <path strokeWidth="7" d="M104,100 L98,140" />
      <path strokeWidth="7" d="M128,102 L134,140" />
      {/* feet */}
      <path d="M90,140 L106,140" />
      <path d="M126,140 L142,140" />
      {/* eye */}
      <circle cx="184" cy="50" r="3" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function TriceratopsIllustration({ className }) {
  return (
    <IconBase className={className}>
      {/* frill */}
      <path {...BODY_FILL} d="M150,36 C168,30 184,38 186,54 C188,64 182,72 172,72 L150,64 Z" />
      {/* torso */}
      <ellipse cx="112" cy="96" rx="52" ry="24" {...BODY_FILL} />
      {/* head */}
      <path {...BODY_FILL} d="M150,64 C162,66 172,76 170,88 C168,96 158,98 150,92 L142,74 Z" />
      {/* horns */}
      <path d="M155,64 L146,38" />
      <path d="M164,68 L180,46" />
      <path d="M147,76 L128,64" />
      {/* horn tips */}
      <circle cx="146" cy="38" r="2" fill="currentColor" stroke="none" />
      <circle cx="180" cy="46" r="2" fill="currentColor" stroke="none" />
      <circle cx="128" cy="64" r="2" fill="currentColor" stroke="none" />
      {/* legs */}
      <path strokeWidth="7" d="M84,116 L82,140" />
      <path strokeWidth="7" d="M108,118 L108,140" />
      <path strokeWidth="7" d="M136,118 L138,140" />
      <path strokeWidth="7" d="M156,114 L160,140" />
      {/* tail */}
      <path d="M62,100 C50,102 42,106 36,112" />
      {/* eye */}
      <circle cx="156" cy="78" r="3" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function StegosaurusIllustration({ className }) {
  return (
    <IconBase className={className}>
      {/* arched torso */}
      <path
        {...BODY_FILL}
        d="M46,112 C46,90 66,74 100,72 C130,70 158,80 174,100 C182,108 180,116 172,118
           C140,124 80,124 54,118 C48,116 46,114 46,112 Z"
      />
      {/* head, low and small */}
      <path {...BODY_FILL} d="M174,100 C186,98 196,102 198,110 C196,116 188,118 180,114 Z" />
      {/* back plates */}
      <path d="M78,74 L84,54 L92,74" />
      <path d="M100,71 L106,50 L114,71" />
      <path d="M124,72 L130,52 L138,73" />
      <path d="M146,78 L152,58 L160,80" />
      {/* tail spikes */}
      <path d="M46,108 L28,100" />
      <path d="M48,116 L30,120" />
      {/* legs */}
      <path strokeWidth="7" d="M64,116 L62,140" />
      <path strokeWidth="7" d="M92,120 L92,142" />
      <path strokeWidth="7" d="M132,122 L134,142" />
      <path strokeWidth="7" d="M158,112 L162,138" />
      {/* eye */}
      <circle cx="184" cy="104" r="2.5" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function VelociraptorIllustration({ className }) {
  return (
    <IconBase className={className}>
      {/* torso, horizontal */}
      <ellipse cx="120" cy="88" rx="38" ry="16" transform="rotate(-8 120 88)" {...BODY_FILL} />
      {/* neck + head */}
      <path {...BODY_FILL} d="M154,80 C166,74 180,70 194,72 C198,76 196,82 188,84 L168,92 C160,94 154,90 154,84 Z" />
      {/* jaw */}
      <path d="M168,92 L188,84" />
      {/* stiff tail */}
      <path d="M84,90 C64,86 40,82 18,80" strokeWidth="4" />
      {/* standing leg */}
      <path strokeWidth="6" d="M112,100 L108,140" />
      <path d="M98,140 L118,140" />
      {/* raised leg with sickle claw */}
      <path strokeWidth="6" d="M134,100 C138,110 136,118 126,122" />
      <path d="M126,122 C132,120 138,122 140,116" />
      {/* small arm */}
      <path d="M148,86 C144,92 142,98 146,102" />
      {/* eye */}
      <circle cx="180" cy="78" r="2.5" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function AnkylosaurusIllustration({ className }) {
  return (
    <IconBase className={className}>
      {/* low, wide armored body */}
      <path
        {...BODY_FILL}
        d="M42,106 C42,92 58,82 90,80 C124,78 158,82 180,92 C192,98 194,106 188,112
           C180,120 140,124 100,124 C70,124 46,120 42,112 Z"
      />
      {/* head */}
      <path {...BODY_FILL} d="M42,100 C32,98 24,102 22,108 C24,114 32,116 42,112 Z" />
      {/* armor ridges */}
      <path d="M66,82 L64,104" />
      <path d="M88,80 L88,106" />
      <path d="M112,79 L112,108" />
      <path d="M136,81 L138,108" />
      <path d="M158,86 L162,106" />
      {/* tail + club */}
      <path d="M188,102 C202,100 212,96 218,90" />
      <circle cx="222" cy="86" r="8" {...BODY_FILL} />
      {/* legs */}
      <path strokeWidth="8" d="M64,118 L62,140" />
      <path strokeWidth="8" d="M100,122 L100,142" />
      <path strokeWidth="8" d="M140,122 L142,142" />
      <path strokeWidth="8" d="M172,114 L176,138" />
      {/* eye */}
      <circle cx="34" cy="104" r="2.5" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function BrachiosaurusIllustration({ className }) {
  return (
    <IconBase className={className}>
      {/* torso */}
      <ellipse cx="104" cy="104" rx="48" ry="26" {...BODY_FILL} />
      {/* long rising neck */}
      <path {...BODY_FILL} d="M132,86 C148,64 158,42 156,22 C164,20 172,26 172,34
           C172,54 162,76 146,96 Z" />
      {/* small head */}
      <path {...BODY_FILL} d="M156,22 C162,16 172,14 178,18 C180,24 174,30 166,30 Z" />
      {/* tail */}
      <path {...BODY_FILL} d="M58,98 C40,100 24,104 12,112 C28,106 46,104 62,106 Z" />
      {/* front (taller) legs */}
      <path strokeWidth="8" d="M126,124 L130,146" />
      <path strokeWidth="8" d="M108,128 L110,148" />
      {/* back (shorter) legs */}
      <path strokeWidth="8" d="M76,122 L72,142" />
      <path strokeWidth="8" d="M60,116 L54,136" />
      {/* eye */}
      <circle cx="168" cy="22" r="2.5" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

// Generic fallback for any subject id not yet illustrated — a crossed
// fossil-bone glyph rather than a species-specific shape.
export function DefaultIllustration({ className }) {
  const bone = 'M0,-6 C-5,-6 -8,-9 -8,-13 C-8,-17 -5,-19 -1,-18 L52,18 C56,17 59,20 59,24 C59,28 56,31 52,30 L-1,-6 Z';
  return (
    <IconBase className={className}>
      <g transform="translate(90,60)" {...BODY_FILL}>
        <path d="M0,0 C-6,-6 -6,-15 2,-18 C8,-20 14,-16 14,-9 C22,-9 26,-3 24,5
                 L66,47 C74,45 80,49 78,57 C76,65 68,66 63,60
                 C63,68 55,70 50,64 L8,22 C0,24 -6,18 -4,10 C-8,10 -2,2 0,0 Z" />
      </g>
      {/* second bone, crossing the first */}
      <g transform="translate(150,60) scale(-1,1)" {...BODY_FILL}>
        <path d="M0,0 C-6,-6 -6,-15 2,-18 C8,-20 14,-16 14,-9 C22,-9 26,-3 24,5
                 L66,47 C74,45 80,49 78,57 C76,65 68,66 63,60
                 C63,68 55,70 50,64 L8,22 C0,24 -6,18 -4,10 C-8,10 -2,2 0,0 Z" />
      </g>
    </IconBase>
  );
}

export const dinosaurIllustrations = {
  trex: TrexIllustration,
  triceratops: TriceratopsIllustration,
  stegosaurus: StegosaurusIllustration,
  velociraptor: VelociraptorIllustration,
  ankylosaurus: AnkylosaurusIllustration,
  brachiosaurus: BrachiosaurusIllustration,
};