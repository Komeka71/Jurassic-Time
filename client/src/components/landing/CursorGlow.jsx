import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

export default function CursorGlow() {
  const [isMobile] = useState(isMobileViewport);

  const x = useMotionValue(isMobile ? 0 : window.innerWidth / 2);
  const y = useMotionValue(isMobile ? 0 : window.innerHeight / 2);

  const smoothX = useSpring(x, {
    stiffness: 140,
    damping: 20,
  });

  const smoothY = useSpring(y, {
    stiffness: 140,
    damping: 20,
  });

  useEffect(() => {
    // Cursor glow follows a mouse — meaningless on touch devices, and
    // "mousemove" mostly never fires on phones anyway, but skip
    // attaching the listener entirely rather than relying on that.
    if (isMobile) return undefined;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, [x, y, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Soft spotlight */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          marginLeft: -210,
          marginTop: -210,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[100000]"
      >
        <div
          className="w-[420px] h-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,240,180,.12) 0%, rgba(80,255,160,.05) 40%, transparent 72%)",
            filter: "blur(55px)",
          }}
        />
      </motion.div>

      {/* Glow Dot */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          marginLeft: -5,
          marginTop: -5,
        }}
        className="pointer-events-none fixed left-0 top-0 z-[100001]"
      >
        <div
          className="w-[10px] h-[10px] rounded-full"
          style={{
            background: "#FFF4C4",
            boxShadow:
              "0 0 12px rgba(255,244,196,.9), 0 0 30px rgba(255,244,196,.5)",
          }}
        />
      </motion.div>
    </>
  );
}