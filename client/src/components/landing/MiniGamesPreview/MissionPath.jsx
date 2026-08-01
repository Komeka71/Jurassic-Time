import { motion } from "framer-motion";

// Glowing expedition trail connecting the 3 mission islands.
// Static dotted base + a bright dashed overlay whose dashoffset animates
// infinitely to read as "light traveling" along the path, plus pulsing
// glow nodes at each mission position.
//
// Renders two variants sharing the same visual language:
//  - horizontal, for the lg:flex-row desktop layout
//  - vertical, for the flex-col stacked layout on mobile/tablet
// Position numbers (120 / 600 / 1080 along the main axis) are tuned to
// roughly land under/beside the 3 circles — nudge if your gap/breakpoints
// change.
function PathGradientDefs({ id }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" x2="1">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#fb923c" />
      </linearGradient>
    </defs>
  );
}

function GlowNodes({ nodes, axis }) {
  return nodes.map((node, i) => (
    <motion.circle
      key={i}
      cx={axis === "x" ? node.pos : 30}
      cy={axis === "x" ? 30 : node.pos}
      r={6}
      fill={node.color}
      animate={{ opacity: [0.5, 1, 0.5], r: [5, 7.5, 5] }}
      transition={{
        repeat: Infinity,
        duration: 2.5,
        delay: i * 0.4,
        ease: "easeInOut",
      }}
    />
  ));
}

const NODES = [
  { pos: 120, color: "#34d399" },
  { pos: 600, color: "#fbbf24" },
  { pos: 1080, color: "#fb923c" },
];

export default function MissionPath() {
  return (
    <>
      {/* Desktop / horizontal */}
      <div className="pointer-events-none absolute inset-x-0 top-28 z-0 hidden h-16 lg:block">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="h-16 w-full overflow-visible"
        >
          <PathGradientDefs id="missionPathGradientH" />

          <motion.path
            d="M120,30 L1080,30"
            fill="none"
            stroke="url(#missionPathGradientH)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1 16"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          <motion.path
            d="M120,30 L1080,30"
            fill="none"
            stroke="url(#missionPathGradientH)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="40 260"
            opacity={0.85}
            animate={{ strokeDashoffset: [0, -600] }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          />

          <GlowNodes nodes={NODES} axis="x" />
        </svg>
      </div>

      {/* Mobile / tablet — vertical, running behind the stacked islands */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 block w-16 -translate-x-1/2 lg:hidden">
        <svg
          viewBox="0 0 60 1200"
          preserveAspectRatio="none"
          className="h-full w-16 overflow-visible"
        >
          <PathGradientDefs id="missionPathGradientV" />

          <motion.path
            d="M30,120 L30,1080"
            fill="none"
            stroke="url(#missionPathGradientV)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1 16"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          <motion.path
            d="M30,120 L30,1080"
            fill="none"
            stroke="url(#missionPathGradientV)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="40 260"
            opacity={0.85}
            animate={{ strokeDashoffset: [0, -600] }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          />

          <GlowNodes nodes={NODES} axis="y" />
        </svg>
      </div>
    </>
  );
}
