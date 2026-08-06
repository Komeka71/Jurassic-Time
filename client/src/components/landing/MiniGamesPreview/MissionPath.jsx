import { motion } from "framer-motion";

// Glowing expedition trail connecting the 3 mission islands.
// Deliberately built with plain divs instead of SVG — the SVG version
// wasn't rendering reliably, and a row of divs is about as hard to
// accidentally hide as markup gets. A 3-stop color sweep (emerald -> amber
// -> orange) across evenly spaced dots, with a staggered opacity pulse
// that reads as light chasing along the line, plus 3 bigger glowing
// "node" dots roughly under each mission.
const STOPS = ["#34d399", "#fbbf24", "#fb923c"];
const DOT_COUNT = 22;

function hexToRgb(hex) {
  const num = parseInt(hex.replace("#", ""), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function colorAt(t) {
  const seg = t <= 0.5 ? 0 : 1;
  const localT = t <= 0.5 ? t / 0.5 : (t - 0.5) / 0.5;
  const c1 = hexToRgb(STOPS[seg]);
  const c2 = hexToRgb(STOPS[seg + 1]);
  const r = lerp(c1[0], c2[0], localT);
  const g = lerp(c1[1], c2[1], localT);
  const b = lerp(c1[2], c2[2], localT);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function Trail({ direction }) {
  const isRow = direction === "row";

  return (
    <div
      className={`flex ${isRow ? "flex-row items-center" : "flex-col items-center"} h-full w-full justify-between`}
    >
      {[...Array(DOT_COUNT)].map((_, i) => {
        const t = i / (DOT_COUNT - 1);
        const color = colorAt(t);
        const isNode = i === 0 || i === Math.floor((DOT_COUNT - 1) / 2) || i === DOT_COUNT - 1;

        return (
          <motion.span
            key={i}
            className="rounded-full"
            style={{
              backgroundColor: color,
              width: isNode ? 10 : 5,
              height: isNode ? 10 : 5,
              boxShadow: isNode
                ? `0 0 14px 3px ${color}`
                : `0 0 6px 1px ${color}`,
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: i * 0.08,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

export default function MissionPath() {
  return (
    <>
      {/* Desktop / horizontal */}
      <div className="pointer-events-none absolute left-[12%] right-[12%] top-20 z-0 hidden h-4 md:top-24 lg:block">
        <Trail direction="row" />
      </div>

      {/* Mobile / tablet — vertical, running behind the stacked islands */}
      <div className="pointer-events-none absolute inset-y-10 left-1/2 z-0 block w-4 -translate-x-1/2 lg:hidden">
        <Trail direction="column" />
      </div>
    </>
  );
}
