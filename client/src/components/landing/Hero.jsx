// import { motion } from "framer-motion";
import { useState } from "react";
import Atmosphere from "./Atmosphere";
import AnatomyViewer from "../Hero/AnatomyViewer";
import SpecimenSelector from "./SpecimenSelector";
import ExplorerPanel from "../Hero/ExplorerPanel";
import { useRef, useEffect } from "react";
import DinoGuide from "../guide/DinoGuide";
import Chatbot from "../chat/Chatbot";
import dinosaurData from "../../data/dinosaurData";
import { AnimatePresence, motion } from "framer-motion";

export default function Hero() {
  const [selectedDino, setSelectedDino] = useState("trex");
const [hoveredPart, setHoveredPart] = useState(null);
const [selectedPart, setSelectedPart] = useState(null);
  // const [selectedDinosaur, setSelectedDinosaur] = useState("T-Rex");
const guideRef = useRef(null);
const videoRef = useRef(null);
const currentInfo = dinosaurData[selectedDino];
const dinoNames = {
  trex: "T-Rex",
  triceratops: "Triceratops",
  brachiosaurus: "Brachiosaurus",
  // pteranodon: "Pteranodon",
  mosasaurus: "Mosasaurus",
};
useEffect(() => {
  if (videoRef.current) {
    videoRef.current.playbackRate = 0.45; // 45% speed
  }
}, []);
console.log("Selected Part:", selectedPart);

return (
    <section
      id="hero"
    className="
relative
min-h-screen
xl:h-screen
overflow-hidden
"
    >
      {/* Background Video */}
      {/* const videoRef = useRef(null); */}

<video
  ref={videoRef}
  autoPlay
  muted
  loop
  playsInline
  className="
  absolute
  inset-0
  h-full
  w-full
  object-cover
  scale-105
  blur-[2px]
  saturate-75
  brightness-75
"
>
  <source
    src="/videos/home/Lost-Valley.mp4"
    type="video/mp4"
  />
</video>

<div
  className="absolute inset-0"
  style={{
    background:
      "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.45) 100%)",
  }}
/>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 h-64 w-full bg-gradient-to-t from-[#050805] via-[#08110b]/70 to-transparent" />

      {/* Atmosphere */}
      <Atmosphere />

      {/* Hero Content */}
      {/* Hero Content */}
<div
className="
relative
z-20

flex
flex-col
items-center

min-h-screen
xl:h-full

justify-start
xl:justify-center

pt-24
md:pt-28
xl:pt-6

px-4
sm:px-6
md:px-8
lg:px-10
xl:pl-10
xl:pr-14
"
>
  <div
 className="
flex
flex-col

lg:flex-row

items-center
lg:items-start

justify-center

gap-8
md:gap-10
lg:gap-12
xl:gap-20

w-full
max-w-[1700px]
"
>
    {/* LEFT */}

    <div
     className="
flex
flex-col
items-center

w-full
lg:flex-1

translate-x-0
lg:translate-x-6
xl:translate-x-14
"
    >
      <AnimatePresence mode="wait">
  <motion.div
    key={selectedDino}
    initial={{
      opacity: 0,
      y: 15,
      scale: 0.98,
    }}
    animate={{
      opacity: 1,
      y: 0,
      scale: 1,
    }}
    exit={{
      opacity: 0,
      y: -15,
      scale: 1.02,
    }}
    transition={{
      duration: 0.35,
      ease: "easeInOut",
    }}
  >
    <AnatomyViewer
      dinosaur={selectedDino}
      hoveredPart={hoveredPart}
      setHoveredPart={setHoveredPart}
      setSelectedPart={setSelectedPart}
    />
  </motion.div>
</AnimatePresence>
<div
  className="
    mt-4
    xl:mt-6

    xl:-translate-x-6
  "
>
        <SpecimenSelector
          selected={selectedDino}
          onSelect={setSelectedDino}
        />
      </div>
    </div>

    {/* RIGHT */}

    <div
     className="
w-full
lg:w-[420px]
xl:w-auto

mt-8
lg:mt-6
xl:mt-12

mr-0

flex
justify-center
"
    >
    <AnimatePresence mode="wait">
  <motion.div
    key={selectedDino}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{
      duration: 0.3,
      ease: "easeInOut",
    }}
  >



    <ExplorerPanel
      dinosaur={selectedDino}
      info={currentInfo}
      activePart={selectedPart}
    />
  </motion.div>
</AnimatePresence>
    </div>
  </div>
</div>
{/* Dino Guide */}
{/* <div
  className="
    fixed
    bottom-4
    left-4

    md:bottom-6
    md:left-8

    xl:absolute
    xl:left-[30px]
    xl:bottom-6

    z-40
    scale-80
    origin-bottom-left
  "
> */}
 
<div
  className="
absolute
left-4
bottom-4

md:left-8
md:bottom-6

xl:left-[30px]
xl:bottom-6

z-40

origin-bottom-left

scale-[0.9]
xl:scale-[1.2]
2xl:scale-[1.05]
"
>
 
 
 
  {/* Ground Glow */}
  <div
    className="
      absolute
      bottom-2
      left-1/2
      -translate-x-1/2

      w-56
      h-20

      rounded-full
      bg-green-400/25
      blur-3xl
      pointer-events-none
      -z-10
    "
  />

  <DinoGuide />
</div>
{/* Scroll Indicator */}
{/* <motion.div ...></motion.div> */}
      {/* Scroll Indicator */}
      {/* <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
       className="
hidden
md:flex

absolute
bottom-8
xl:bottom-12

left-1/2
z-30
-translate-x-1/2
flex-col
items-center
"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.45em] text-white/80">
          Scroll
        </p>

        <div className="text-3xl text-green-300">
          ↓
        </div>
      </motion.div> */}
  <Chatbot currentDinosaur={dinoNames[selectedDino]} />
    </section>
  );
}