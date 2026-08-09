import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

import { useGuide } from "../../../context/GuideContext";
import DinoGuide from "../../guide/DinoGuide";

import MissionCard from "./MissionCard";
import MissionPath from "./MissionPath";
import Ambient from "./Ambient";
import { missions } from "./missionsData";

export default function MiniGamesPreview() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  const { setCurrentPage, setLastAction } = useGuide();

  useEffect(() => {
    setCurrentPage("miniGamesPreview");
    setLastAction("");
  }, [setCurrentPage, setLastAction]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[1150px] overflow-hidden bg-[#07120c] md:min-h-[1250px] lg:min-h-[1350px]"
    >
      {/* BACKGROUND */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <video
          src="/videos/minigames/minigamesbg.mp4"
          poster="/images/minigames/training-map-bg.png"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full scale-105 object-cover"
        />

        {/* Main dark overlay */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Center glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(10,35,25,0.15) 20%, rgba(3,12,8,0.55) 70%, rgba(3,10,7,0.9) 100%)",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-[35%]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(3,10,7,0.95))",
          }}
        />

        {/* Top fade */}
        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{
            background:
              "linear-gradient(to bottom, rgba(3,10,7,0.75), transparent)",
          }}
        />
      </motion.div>

      {/* Ambient particles */}
      <Ambient />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 md:px-10 md:pt-28 lg:px-12 lg:pt-32">

        {/* HEADER */}
        <div className="mb-16 max-w-2xl lg:mb-24">
          <motion.span
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 block text-sm font-bold uppercase tracking-[0.35em] text-emerald-400"
          >
            Training Grounds
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-extrabold uppercase leading-[0.95] tracking-wide text-white md:text-6xl lg:text-7xl"
          >
            Choose Your
            <span className="block bg-gradient-to-r from-emerald-300 via-lime-300 to-amber-300 bg-clip-text text-transparent">
              Adventure
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-7 text-white/65 md:text-lg"
          >
            Travel through prehistoric worlds, solve mysteries,
            restore history and uncover fossils before entering
            the Paleora.
          </motion.p>
        </div>

        {/* MISSION PATH */}
        <div className="relative">

          {/* Connecting path */}
          <MissionPath />

          <div
            className="
              relative
              flex
              flex-col
              items-center
              gap-20
              lg:flex-row
              lg:items-start
              lg:justify-between
              lg:gap-8
            "
          >
            {missions.map((mission, index) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                index={index}
                onEnter={navigate}
              />
            ))}
          </div>
        </div>

        {/* DINO GUIDE
            Deliberately placed at the bottom.
            The extra section height is used here instead of leaving
            a random empty gap.
        */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="
            relative
            mt-20
            flex
            justify-center
            lg:mt-24
            lg:justify-end
            lg:pr-8
          "
        >
          <div className="relative z-30">
            <DinoGuide section="miniGames" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}