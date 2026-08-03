
import { useGuide } from "../../context/GuideContext";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DiscoveryCard from "./DiscoveryCard";
import DinoGuide from "../guide/DinoGuide";

export default function MapPreview() {
  const earthRef = useRef(null);
  const bgRef = useRef(null);
  const navigate = useNavigate();
const {
  setCurrentPage,
  setCurrentDinosaur,
  setLastAction,
} = useGuide();
useEffect(() => {
  if (earthRef.current) {
    earthRef.current.playbackRate = 0.45;
  }

  if (bgRef.current) {
    bgRef.current.playbackRate = 0.35;
  }

  setCurrentPage("mapPreview");
  setCurrentDinosaur("earth");
  setLastAction("");
}, [
  setCurrentPage,
  setCurrentDinosaur,
  setLastAction,
]);

  return (
    <section
      id="map-preview"
     className="
relative
overflow-hidden

py-16
sm:py-20
lg:py-10
"
    >
      {/* Background Video */}
      <video
        ref={bgRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/map/space.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#020612]/70" />

      {/* Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_65%)] pointer-events-none" />

      {/* Content */}
<div
  className="
    relative
    z-20

    max-w-[1600px]

    mx-auto

    px-5
    sm:px-8
    lg:px-10
    xl:px-14
    2xl:px-20
  "
>
  
       <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="uppercase tracking-[0.35em] text-blue-400 font-semibold text-xs sm:text-sm"
        >
          Ancient Earth
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="
            mt-4
            font-bold
            leading-tight
            text-white

            text-4xl
            sm:text-5xl
            lg:text-[3.6rem]
          "
        >
          Explore the Ancient World
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="
            mt-5
            max-w-2xl
            text-gray-300
            text-base
            sm:text-lg
            leading-8
          "
        >
          Journey across prehistoric Earth and discover where dinosaurs once
          ruled the planet. Every glowing point marks a legendary fossil site
          waiting to be explored.
        </motion.p>

        {/* Earth */}
  <div
  className="
    mt-2
    hidden
    xl:flex
    items-center
    justify-center
    w-full
    gap-6
    2xl:gap-20
  "
>
<div
  className="
    w-[350px]
    2xl:w-[350px]

    shrink-0

    flex
    justify-center
    items-start

    mt-76

    origin-top

    scale-[0.9]
    xl:scale-[1.2]
    2xl:scale-[1.05]
  "
>
  <DinoGuide section="map" />
</div>
<div
  className="
    flex-1

    flex
    justify-center
    items-center
  "
>  <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            relative
            -mt-10

w-[300px]
h-[300px]

sm:w-[380px]
sm:h-[380px]

md:w-[470px]
md:h-[470px]

lg:w-[560px]
lg:h-[560px]

xl:w-[620px]
xl:h-[620px]
          "
        >
          {/* Atmosphere Glow */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2

              w-[80%]
              h-[80%]

              rounded-full
              bg-cyan-400/20
              blur-[110px]
              -z-10
            "
          />
<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
  <div className="absolute w-[78%] h-[78%] rounded-full border border-cyan-300/10" />
  <div className="absolute w-[88%] h-[88%] rounded-full border border-cyan-300/5" />
</div>
          {/* Earth Video */}
          <motion.video
            ref={earthRef}
            autoPlay
            muted
            loop
            playsInline
            className="cursor-pointer"
           whileHover={{
  scale: 1.04,
  y: -8,
  filter:
    "drop-shadow(0px 0px 45px rgba(56,189,248,.7))",
}}
            transition={{ duration: 0.35 }}
            className="w-full h-full object-contain pointer-events-none select-none"
          >
            <source src="/videos/map/earth.mov" type="video/mp4" />
          </motion.video>

          {/* Circular Click Area */}
         <button
onClick={() => {
  setLastAction("mapVisited");
  navigate("/maps");
}}
  aria-label="Explore Map"
  className="
    absolute
    left-1/2
    top-1/2
    -translate-x-1/2
    -translate-y-1/2

    w-[62%]
    h-[62%]

    rounded-full
    cursor-pointer
    bg-transparent
  "
/>
        </motion.div>
</div>
  {/* Your existing Earth motion.div goes here unchanged */}
<div
  className="
    w-[340px]
    shrink-0
    mt-6
    xl:mt-16
    xl:pl-10
    2xl:pl-14
  "
>
  <DiscoveryCard />
</div>
</div>
       {/* Earth */}
{/* Tablet & Mobile Layout */}
<div className="xl:hidden mt-12 flex flex-col items-center">

  {/* Earth */}
  <motion.div
    animate={{ y: [0, -8, 0] }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="
      relative
w-[290px]
h-[290px]

sm:w-[360px]
sm:h-[360px]

md:w-[470px]
md:h-[470px]

lg:w-[520px]
lg:h-[520px]
    "
  >
    {/* Glow */}
    <div
      className="
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2

        w-[80%]
        h-[80%]

        rounded-full
        bg-cyan-400/20
        blur-[90px]
        -z-10
      "
    />

    {/* Rings */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="absolute w-[78%] h-[78%] rounded-full border border-cyan-300/10" />
      <div className="absolute w-[88%] h-[88%] rounded-full border border-cyan-300/5" />
    </div>

    <motion.video
      ref={earthRef}
      autoPlay
      muted
      loop
      playsInline
      whileHover={{
        scale: 1.04,
        y: -8,
      }}
      className="w-full h-full object-contain pointer-events-none"
    >
      <source src="/videos/map/earth.mov" type="video/mp4" />
    </motion.video>
<button
  onClick={() => navigate("/maps")}
  className="
    absolute
    left-1/2
    top-1/2
    -translate-x-1/2
    -translate-y-1/2

    w-[62%]
    h-[62%]

    rounded-full
    cursor-pointer
    bg-transparent
  "
/>
  </motion.div>

  {/* Dino */}
  <div
  className="
    mt-8

    origin-top

    scale-[0.65]
    sm:scale-[0.75]
    md:scale-[0.9]
    lg:scale-100
  "
>
  <DinoGuide section="map" />
</div>

  {/* Discovery Card */}
  <div className="mt-10 w-full max-w-sm">
    <DiscoveryCard />
  </div>

</div>
        {/* Caption */}
        <motion.div
          animate={{
            y: [0, 8, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-4 flex flex-col items-center"
        >
          <span className="text-2xl text-cyan-300">↓</span>

          <motion.div
  animate={{ opacity: [0.5, 1, 0.5] }}
  transition={{ duration: 2.5, repeat: Infinity }}
  className="mt-10 flex flex-col items-center"
>
  <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_20px_#22d3ee]" />

  <p className="mt-4 text-cyan-200 text-sm tracking-[0.25em] uppercase">
    Begin Your Expedition
  </p>
</motion.div>
          
        </motion.div>
        
      </div>
      
    </section>
  );
}