// import { useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, useScroll, useTransform } from "framer-motion";

// import { useGuide } from "../../../context/GuideContext";
// import DinoGuide from "../../guide/DinoGuide";

// import MissionCard from "./MissionCard";
// import MissionPath from "./MissionPath";
// import Ambient from "./Ambient";
// import ExpeditionProgress from "./ExpeditionProgress";
// import DailyBonusCard from "./DailyBonusCard";
// import RewardsPanel from "./RewardsPanel";
// import { missions } from "./missionsData";

// export default function MiniGamesPreview({
//   currentRank = "Explorer",
//   rewards = { gems: 120, coins: 2450, bones: 8, xp: 850 },
//   onClaimDailyBonus,
// }) {
//   const navigate = useNavigate();
//   const sectionRef = useRef(null);

//   const { setCurrentPage, setLastAction } = useGuide();

// useEffect(() => {
//   setCurrentPage("miniGamesPreview");
//   setLastAction("");
// }, [setCurrentPage, setLastAction]);

//   // Background parallax
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"],
//   });

//   const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative overflow-hidden bg-[#07120c]"
//     >
//       {/* Atmospheric fade */}
//       <div
//         className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28"
//         style={{
//           background:
//             "linear-gradient(to bottom, #06151A 0%, rgba(6,21,26,0.4) 45%, transparent 100%)",
//         }}
//       />

//       {/* Background */}
//       <motion.div
//         className="absolute inset-0 z-0"
//         style={{ y: bgY }}
//       >
//         <video
//           src="/videos/minigames/minigamesbg.mp4"
//           poster="/images/minigames/training-map-bg.png"
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="h-full w-full scale-105 object-cover"
//         />

//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "radial-gradient(ellipse at center, rgba(4,10,6,0.25) 30%, rgba(4,10,6,0.72) 78%, rgba(4,10,6,0.95) 100%)",
//           }}
//         />

//         <div className="absolute inset-0 bg-black/35" />

//         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#07120c] mix-blend-multiply" />

//         <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 via-transparent to-emerald-900/10" />
//       </motion.div>

//       <Ambient />

//       <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 md:py-20">

//         {/* Floating Dino */}
// {/* Floating Dino */}
// {/* <div
//   className="
//     hidden
//     xl:block

//     absolute

// right-[-140px]
//     bottom-60

//     2xl:right-4
//     2xl:bottom-52

//     z-30

//     origin-bottom-right

//     scale-[1.05]
//     2xl:scale-[0.95]
//   "
// >
//   <DinoGuide section="miniGames" />
// </div> */}
// {/* Floating Dino */}
// <div
//   className="
//     hidden
//     lg:block

//     absolute

//     right-[-35px]
//     bottom-[22rem]

//     xl:right-[-90px]
//     xl:bottom-60

//     2xl:right-[-40px]
//     2xl:bottom-56

//     z-30

//     origin-bottom-right

//     scale-[1.1]
//     lg:scale-[1.06]
//     xl:scale-[1.05]
//     2xl:scale-100
//   "
// >
//   <DinoGuide section="miniGames" />
// </div>
//         {/* Header */}
// <div className="mb-12 flex flex-col items-center xl:items-start gap-3 text-center xl:text-left md:mb-16 xl:pr-[320px]">
//           <motion.span
//             initial={{ opacity: 0, y: -10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-400 md:text-sm"
//           >
//             Training Grounds
//           </motion.span>

//           <motion.h2
//             initial={{ opacity: 0, y: 15 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.1 }}
//             className="text-4xl font-extrabold uppercase tracking-wide md:text-6xl"
//           >
//             <span className="block text-white">
//               Choose Your
//             </span>

//             <span className="block bg-gradient-to-r from-emerald-300 via-amber-200 to-orange-300 bg-clip-text text-transparent">
//               Adventure
//             </span>
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2 }}
//             className="max-w-xl text-sm text-white/60 md:text-base"
//           >
//             Travel through prehistoric worlds, solve mysteries,
//             restore history and uncover fossils before entering
//             the Paleora.
//           </motion.p>
//         </div>

//         {/* Missions */}
//         <div className="relative flex flex-col items-center gap-20 py-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
//           <MissionPath />

//           {missions.map((mission, index) => (
//             <MissionCard
//               key={mission.id}
//               mission={mission}
//               index={index}
//               onEnter={navigate}
//             />
//           ))}
//         </div>

//         {/* Bottom HUD */}
//         <div className="mt-56 grid grid-cols-1 gap-4 md:mt-60 md:grid-cols-3 md:gap-5">
//           <ExpeditionProgress currentRank={currentRank} />

//           <DailyBonusCard onClaim={onClaimDailyBonus} />

//           <RewardsPanel {...rewards} />
//         </div>
//       </div>
//     </section>
//   );
// }

import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

import { useGuide } from "../../../context/GuideContext";
import DinoGuide from "../../guide/DinoGuide";

import MissionCard from "./MissionCard";
import MissionPath from "./MissionPath";
import Ambient from "./Ambient";
import ExpeditionProgress from "./ExpeditionProgress";
import DailyBonusCard from "./DailyBonusCard";
import RewardsPanel from "./RewardsPanel";
import { missions } from "./missionsData";

export default function MiniGamesPreview({
  currentRank = "Explorer",
  rewards = { gems: 120, coins: 2450, bones: 8, xp: 850 },
  onClaimDailyBonus,
}) {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  const { setCurrentPage, setLastAction } = useGuide();

  useEffect(() => {
    setCurrentPage("miniGamesPreview");
    setLastAction("");
  }, [setCurrentPage, setLastAction]);

  // Background parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      id="mini-games"
      ref={sectionRef}
    >
      {/* Atmospheric fade */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28"
        style={{
          background:
            "linear-gradient(to bottom, #06151A 0%, rgba(6,21,26,0.4) 45%, transparent 100%)",
        }}
      />

      {/* Background */}
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

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(4,10,6,0.25) 30%, rgba(4,10,6,0.72) 78%, rgba(4,10,6,0.95) 100%)",
          }}
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#07120c] mix-blend-multiply" />

        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 via-transparent to-emerald-900/10" />
      </motion.div>

      <Ambient />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 md:py-20">
        {/* Floating Dino */}
        {/* Your existing Floating Dino code stays here */}

        {/* Heading */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold uppercase tracking-wide md:text-6xl"
          >
            <span className="block text-white">
              Choose Your
            </span>

            <span className="block bg-gradient-to-r from-emerald-300 via-amber-200 to-orange-300 bg-clip-text text-transparent">
              Adventure
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-sm text-white/60 md:text-base"
          >
            Travel through prehistoric worlds, solve mysteries,
            restore history and uncover fossils before entering
            the Paleora.
          </motion.p>
        </div>

        {/* Missions */}
        <div className="relative flex flex-col items-center gap-20 py-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
          <MissionPath />

          {missions.map((mission, index) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              index={index}
              onEnter={navigate}
            />
          ))}
        </div>

        {/* Bottom HUD */}
        <div className="mt-56 grid grid-cols-1 gap-4 md:mt-60 md:grid-cols-3 md:gap-5">
          <ExpeditionProgress currentRank={currentRank} />

          <DailyBonusCard onClaim={onClaimDailyBonus} />

          <RewardsPanel {...rewards} />
        </div>
      </div>
    </section>
  );
}