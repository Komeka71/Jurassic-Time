import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import DinoGuide from "../../guide/DinoGuide";
import { ArrowRight } from "lucide-react";

export default function ResearchTransition({
  open,
  onComplete,
}) {
  const [scene, setScene] = useState("wave");

  useEffect(() => {
    if (!open) return;

    setScene("wave");

    // Let the greeting finish first
    const walkTimer = setTimeout(() => {
      setScene("walkingRight");
    }, 2200);

    return () => {
      clearTimeout(walkTimer);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Background Video */}
          <video
            autoPlay
            muted
            playsInline
            onEnded={onComplete}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source
              src="/videos/research/research-transition.mp4"
              type="video/mp4"
            />
          </video>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Dino Guide */}
<motion.div
  initial={{
    opacity: 0,
    scale: 0.9,
  }}
  animate={{
    opacity: 1,
    scale: 1,
  }}
  transition={{
    delay: 0.2,
    duration: 0.5,
    ease: "easeOut",
  }}
  className="
absolute

bottom-6
left-[20%]

z-20

origin-bottom-left

scale-[1.5]
"
>
  <DinoGuide
    controlled
    mood={scene}
    message={
      scene === "wave"
        ? "Welcome back, Explorer!"
        : "The Research Archive awaits."
    }
    disableClick
  />
</motion.div>
          <motion.button
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.8 }}
  onClick={onComplete}
  className="
    absolute
    bottom-8
    right-8
    z-50

    rounded-full
    border border-white/30
    bg-black/35
    backdrop-blur-md

    px-5
    py-2

    text-sm
    font-medium
    text-white

    hover:bg-white/20
    hover:border-white/60

    transition-all
    duration-300
  "
>
  Skip 
  <ArrowRight size={16}/>
</motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}