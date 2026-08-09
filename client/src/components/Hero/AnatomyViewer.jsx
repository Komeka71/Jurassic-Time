import hotspotData from "../../data/anatomy/hotspots";
import dinosaurAssets from "../../assets/dinosaurAssets";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REVEAL_OFFSET_X = 10;
const REVEAL_OFFSET_Y = 0;

// Shown once per browser until the visitor actually performs the
// touch-and-hold gesture, so returning users aren't nagged forever.
const HINT_SEEN_KEY = "paleora_anatomy_touch_hint_seen";

export default function AnatomyViewer({
  dinosaur,
  hoveredPart,
  setHoveredPart,
  setSelectedPart,
}) {
  const containerRef = useRef(null);
  const isMobile = window.innerWidth < 768;

  const ringShadow = isMobile
    ? "0 0 10px rgba(74,222,128,.35), 0 0 24px rgba(74,222,128,.15)"
    : "0 0 14px rgba(74,222,128,.40), 0 0 35px rgba(74,222,128,.20), 0 0 60px rgba(74,222,128,.08)";

  const livingRef = useRef(null);
  const skeletonRef = useRef(null);
  const ringRef = useRef(null);

  const [inside, setInside] = useState(false);

  // True while a finger is actively pressed down on mobile — this is
  // what drives the touch-and-hold reveal (as opposed to `inside`,
  // which on desktop just means "cursor is over the element").
  const [holding, setHolding] = useState(false);

  // Whether to show the "Touch & hold to scan" hint. Only relevant
  // on mobile, and only until the user actually holds once.
  const [showHint, setShowHint] = useState(false);

  const activePartRef = useRef(null);
  const assets = dinosaurAssets[dinosaur];

  const mouse = useRef({ x: 0, y: 0 });
  const animationFrame = useRef();
  const hotspots = hotspotData[dinosaur] || [];

  const revealRadius =
    window.innerWidth < 640
      ? 42
      : window.innerWidth < 768
      ? 48
      : window.innerWidth < 1280
      ? 60
      : 75;

  // Reveal the hint on mobile once, the first time this component
  // mounts, unless the visitor has already discovered the gesture.
  useEffect(() => {
    if (!isMobile) return;

    const seen = localStorage.getItem(HINT_SEEN_KEY) === "true";
    if (!seen) {
      setShowHint(true);
    }
  }, [isMobile]);

  const dismissHint = () => {
    if (!showHint) return;
    setShowHint(false);
    localStorage.setItem(HINT_SEEN_KEY, "true");
  };

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
        livingRef.current.style.maskImage = `radial-gradient(circle ${revealRadius}px at ${revealX}px ${revealY}px,
    transparent 98%,
    black 100%)`;

        livingRef.current.style.webkitMaskImage =
          livingRef.current.style.maskImage;
      }

      // Scanner ring
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${
          revealX - revealRadius
        }px, ${revealY - revealRadius}px, 0)`;
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

    const setPointFromEvent = (clientX, clientY) => {
      if (!livingRef.current) return;

      const imageRect = livingRef.current.getBoundingClientRect();

      mouse.current = {
        x: clientX - imageRect.left,
        y: clientY - imageRect.top,
      };

      if (!animationFrame.current) {
        animationFrame.current = requestAnimationFrame(update);
      }
    };

    // ================= DESKTOP: hover follows the cursor =================
    const handleMove = (e) => {
      setPointFromEvent(e.clientX, e.clientY);
    };

    // ================= MOBILE: touch-and-hold =================
    const clearReveal = () => {
      if (skeletonRef.current) {
        skeletonRef.current.style.clipPath = "circle(0px at 0px 0px)";
        skeletonRef.current.style.webkitClipPath = "circle(0px at 0px 0px)";
      }
      if (livingRef.current) {
        livingRef.current.style.maskImage = "none";
        livingRef.current.style.webkitMaskImage = "none";
      }
      if (ringRef.current) {
        ringRef.current.style.transform = "translate3d(-9999px,-9999px,0)";
      }
      setHoveredPart(null);
    };

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      if (!touch) return;

      setHolding(true);
      dismissHint();

      setPointFromEvent(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      if (!touch) return;

      setPointFromEvent(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = () => {
      setHolding(false);
      clearReveal();
    };

    if (isMobile) {
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
      container.addEventListener("touchend", handleTouchEnd);
      container.addEventListener("touchcancel", handleTouchEnd);
    } else {
      container.addEventListener("pointermove", handleMove);
    }

    return () => {
      if (isMobile) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
        container.removeEventListener("touchcancel", handleTouchEnd);
      } else {
        container.removeEventListener("pointermove", handleMove);
      }

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dinosaur, isMobile]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dinosaur]);

  return (
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
        if (isMobile) return;

        setInside(true);

        if (skeletonRef.current) {
          skeletonRef.current.style.clipPath = "circle(0px at 0px 0px)";
          skeletonRef.current.style.webkitClipPath = "circle(0px at 0px 0px)";
        }
      }}
      onMouseLeave={() => {
        if (isMobile) return;

        setInside(false);

        // Only remove hover glow.
        setHoveredPart(null);

        if (skeletonRef.current) {
          skeletonRef.current.style.clipPath = "circle(0px at 0px 0px)";
          skeletonRef.current.style.webkitClipPath = "circle(0px at 0px 0px)";
        }

        if (ringRef.current) {
          ringRef.current.style.transform = "translate3d(-9999px,-9999px,0)";
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
          transition: "mask-image .08s ease-out",
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
      {((inside && !isMobile) || (isMobile && holding)) && (
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
            boxShadow: ringShadow,
          }}
        />
      )}

      {/* Touch & Hold Hint (mobile only, first visit) */}
      <AnimatePresence>
        {isMobile && showHint && !holding && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="
absolute
left-1/2
bottom-3
-translate-x-1/2

z-10

flex
items-center
gap-2

rounded-full
border
border-green-400/40
bg-black/70

px-4
py-2

backdrop-blur-sm

pointer-events-none
"
          >
            <motion.span
              animate={{ scale: [1, 1.35, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="h-2.5 w-2.5 rounded-full bg-green-400"
            />
            <span className="text-xs font-medium tracking-wide text-white/90">
              Touch &amp; hold to scan the skeleton
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}