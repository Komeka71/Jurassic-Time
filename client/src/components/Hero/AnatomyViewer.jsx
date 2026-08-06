

import hotspotData from "../../data/anatomy/hotspots";
import dinosaurAssets from "../../assets/dinosaurAssets";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import trexHotspots from "../../data/trexHotspots";
const REVEAL_OFFSET_X = 10;
const REVEAL_OFFSET_Y = 0;
export default function AnatomyViewer({
  dinosaur,
  hoveredPart,
  setHoveredPart,
  setSelectedPart,
}){
  const containerRef = useRef(null);
const isMobile = window.innerWidth < 768;

const ringShadow = isMobile
  ? "0 0 10px rgba(74,222,128,.35), 0 0 24px rgba(74,222,128,.15)"
  : "0 0 14px rgba(74,222,128,.40), 0 0 35px rgba(74,222,128,.20), 0 0 60px rgba(74,222,128,.08)";
  const livingRef = useRef(null);      // NEW
  const skeletonRef = useRef(null);
  const ringRef = useRef(null);
  

  const [inside, setInside] = useState(false);

  const activePartRef = useRef(null);
const assets = dinosaurAssets[dinosaur];

  const mouse = useRef({ x: 0, y: 0 });
const animationFrame = useRef();
const hotspots = hotspotData[dinosaur] || [];

console.log("Current dinosaur:", dinosaur);
console.log("Hotspots object:", hotspots);
console.log("Hotspot IDs:", hotspots.map(h => h.id));
//  const revealRadius =
// Math.max(
// 45,
// Math.min(window.innerWidth * 0.04,80)
// );
const revealRadius =
window.innerWidth < 640
  ? 42
  : window.innerWidth < 768
  ? 48
  : window.innerWidth < 1280
  ? 60
  : 75;
// const IMAGE_OFFSET_X = 70;
// const IMAGE_OFFSET_Y = 20;
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
if (!containerRef.current) return;
    const update = () => {
const { x, y } = mouse.current;



const revealX = x + REVEAL_OFFSET_X;
const revealY = y + REVEAL_OFFSET_Y;

const circle = `circle(${revealRadius}px at ${revealX}px ${revealY}px)`;
if (skeletonRef.current) {
  skeletonRef.current.style.clipPath = circle;
  skeletonRef.current.style.webkitClipPath = circle;
}

// Living disappears inside circle
if (livingRef.current) {
  livingRef.current.style.maskImage =
    `radial-gradient(circle ${revealRadius}px at ${revealX}px ${revealY}px,
    transparent 98%,
    black 100%)`;

  livingRef.current.style.webkitMaskImage =
    livingRef.current.style.maskImage;
}
      // Scanner ring
      if (ringRef.current) {
     ringRef.current.style.transform =
  `translate3d(${revealX - revealRadius}px, ${revealY - revealRadius}px, 0)`;
      }
if (!livingRef.current) return;
      // Hotspot detection
      const width = livingRef.current.clientWidth;
const height = livingRef.current.clientHeight;

      const cursorX = (x / width) * 100;
      const cursorY = (y / height) * 100;

      let found = null;

      for (const hotspot of hotspots) {
        const dx = cursorX - hotspot.x;
        const dy = cursorY - hotspot.y;

        if (Math.sqrt(dx * dx + dy * dy) <= hotspot.radius) {
  console.log("Matched:", hotspot.id);
  found = hotspot.id;
  break;
}
      }

if (found && activePartRef.current !== found) {
  activePartRef.current = found;

  setHoveredPart(found);
  setSelectedPart(found);
}
      animationFrame.current = null;
    };

   const handleMove = (e) => {
  if (!livingRef.current) return;

  const imageRect = livingRef.current.getBoundingClientRect();

  mouse.current = {
    x: e.clientX - imageRect.left,
    y: e.clientY - imageRect.top,
  };

  if (!animationFrame.current) {
    animationFrame.current = requestAnimationFrame(update);
  }
};
if (!isMobile) {
  container.addEventListener("pointermove", handleMove);
}

return () => {
  if (!isMobile) {
    container.removeEventListener("pointermove", handleMove);
  }

  if (animationFrame.current) {
    cancelAnimationFrame(animationFrame.current);
  }
};
 }, [dinosaur]);
useEffect(() => {
  activePartRef.current = null;
  setHoveredPart(null);
  setSelectedPart(null);

  if (livingRef.current) {
    livingRef.current.style.maskImage = "none";
    livingRef.current.style.webkitMaskImage = "none";
  }

  if (skeletonRef.current) {
    skeletonRef.current.style.clipPath = "circle(0px at 0px 0px)";
    skeletonRef.current.style.webkitClipPath = "circle(0px at 0px 0px)";
  }
}, [dinosaur]);
  return (
  //  <AnimatePresence mode="wait">
  <motion.div
    key={dinosaur}
    ref={containerRef}
    initial={{
  opacity: 0,
  scale: 0.96,
}}

animate={{
  opacity: 1,
  scale: 1,
}}

exit={{
  opacity: 0,
  scale: 1.04,
}}

transition={{
  duration: 0.45,
  ease: "easeInOut",
}}
   className="
relative

w-[92vw]
sm:w-[85vw]
md:w-[720px]
lg:w-[820px]

xl:w-[930px]
2xl:w-[1120px]

max-w-full

aspect-[2047/1331]
overflow-visible
select-none
cursor-default
lg:cursor-crosshair
"
style={{
  touchAction: "none",
}}
      onMouseEnter={() => {
        setInside(true);

        if (skeletonRef.current) {
          skeletonRef.current.style.clipPath = "circle(0px at 0px 0px)";
          skeletonRef.current.style.webkitClipPath =
            "circle(0px at 0px 0px)";
        }
      }}
onMouseLeave={() => {
  setInside(false);

  // Only remove hover glow.
  setHoveredPart(null);

  // ❌ DON'T reset this
  // activePartRef.current = null;

  if (skeletonRef.current) {
    skeletonRef.current.style.clipPath = "circle(0px at 0px 0px)";
    skeletonRef.current.style.webkitClipPath =
      "circle(0px at 0px 0px)";
  }

  if (ringRef.current) {
    ringRef.current.style.transform =
      "translate3d(-9999px,-9999px,0)";
  }

  if (livingRef.current) {
    livingRef.current.style.maskImage = "none";
    livingRef.current.style.webkitMaskImage = "none";
  }
}}
    >
      {/* Living */}
      <img
    ref={livingRef}
    src={assets.living}
        alt=""
        draggable={false}
className="
absolute
inset-0
w-full
h-full
object-contain
pointer-events-none
"
style={{
transition:"mask-image .08s ease-out",
willChange: "mask-image",
}}
      />

      {/* Skeleton */}
      <img
        ref={skeletonRef}
        src={assets.skeleton}
        alt=""
        draggable={false}
        
        className="
absolute
inset-0
w-full
h-full
object-contain
object-center
pointer-events-none
"
        style={{
  clipPath: "circle(0px at 0px 0px)",
  WebkitClipPath: "circle(0px at 0px 0px)",
  willChange: "clip-path",
  transition: "clip-path .08s ease-out",
}}
      />

      {/* Scanner Ring */}
    {inside && !isMobile && (
        <div
          ref={ringRef}
         className="
absolute
rounded-full
border
md:border-2
border-green-400/70
pointer-events-none

"
          style={{
            width: revealRadius * 2,
            height: revealRadius * 2,
            transform: "translate3d(-9999px,-9999px,0)",
            willChange: "transform",
        boxShadow: ringShadow,          }}
        />
      )}
     </motion.div>
// </AnimatePresence>
  );
}







