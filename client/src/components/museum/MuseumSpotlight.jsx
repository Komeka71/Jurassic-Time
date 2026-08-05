import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

/**
 * MuseumSpotlight
 * Wraps a section (Hero / Gallery) and renders a soft radial spotlight
 * that follows the cursor. Purely decorative - pointer-events disabled.
 * Automatically disabled on touch devices.
 */
export default function MuseumSpotlight({
  children,
  className = "",
  size = 420,
  opacity = 0.14,
  color = "255, 255, 255",
}) {
  const containerRef = useRef(null);
  const [isTouch, setIsTouch] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 0.5 });

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${springX}px ${springY}px, rgba(${color}, ${opacity}), transparent 80%)`;

  useEffect(() => {
    const touchCapable =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouch(touchCapable);
  }, []);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={!isTouch ? handleMouseMove : undefined}
      onMouseEnter={() => !isTouch && setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {!isTouch && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}