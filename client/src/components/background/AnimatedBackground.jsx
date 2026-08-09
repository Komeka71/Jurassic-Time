import { useEffect, useRef } from "react";

import "./particles.css";
import Particles from "./Particles";

const backgrounds = {
  1: "/videos/background/level1.mp4",
  2: "/videos/background/level2.mp4",
  3: "/videos/background/level3.mp4",
  4: "/videos/background/level4.mp4",
  5: "/videos/background/level5.mp4",
};

const playbackRates = {
  1: 1,
  2: 0.6,
  3: 0.6,
  4: 0.75,
  5: 0.8,
};

export default function AnimatedBackground({
  level = 1,
  children,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.playbackRate = playbackRates[level] || 1;
  }, [level]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ========================= */}
      {/* BACKGROUND VIDEO */}
      {/* ========================= */}

      <video
        ref={videoRef}
        key={level}
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute
          inset-0
          z-0
          w-full
          h-full
          object-cover
        "
      >
        <source
          src={backgrounds[level] || backgrounds[1]}
          type="video/mp4"
        />
      </video>

      {/* ========================= */}
      {/* PARTICLES */}
      {/* ========================= */}

      <div
        className="
          absolute
          inset-0
          z-[1]
          overflow-hidden
          pointer-events-none
        "
      >
        <Particles level={level} />
      </div>

      {/* ========================= */}
      {/* DARK OVERLAY */}
      {/* ========================= */}

      <div
        className="
          absolute
          inset-0
          z-[2]
          bg-black/45
          pointer-events-none
        "
      />

      {/* ========================= */}
      {/* CINEMATIC GRADIENT */}
      {/* ========================= */}

      <div
        className="
          absolute
          inset-0
          z-[3]
          bg-gradient-to-b
          from-black/15
          via-transparent
          to-black/30
          pointer-events-none
        "
      />

      {/* ========================= */}
      {/* PAGE CONTENT */}
      {/* ========================= */}

      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
}