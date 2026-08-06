import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function DinoCompanion() {
  const mouseX = useMotionValue(window.innerWidth / 2);
  const mouseY = useMotionValue(window.innerHeight / 2);

  const x = useSpring(mouseX, {
    stiffness: 70,
    damping: 20,
  });

  const y = useSpring(mouseY, {
    stiffness: 70,
    damping: 20,
  });

  const timer = useRef(null);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX + 30);
      mouseY.set(e.clientY + 25);

      setMoving(true);

      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        setMoving(false);
      }, 250);
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <motion.div
      style={{
        x,
        y,
      }}
      className="fixed left-0 top-0 z-[120] pointer-events-none"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-40 select-none"
        src={
          moving
            ? "/videos/dino/walk.mp4"
            : "/videos/dino/idle.mp4"
        }
      />
    </motion.div>
  );
}