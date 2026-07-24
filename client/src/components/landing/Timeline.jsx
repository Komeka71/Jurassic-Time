
// import { useState, useRef } from "react";
// // import { useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import {
//   motion,
//   AnimatePresence,
// } from "framer-motion";
// import DinoGuide from "../guide/DinoGuide";

// const eras = [
//   {
//     id: 0,
//     name: "Triassic",
//     years: "252–201 Million Years Ago",
//     title: "The Rise of Dinosaurs",
//     description:
//       "The first true dinosaurs appeared while Pangaea still dominated the Earth.",
//     image: "/images/timeline/coelophysis.png",
//     video: "/videos/timeline/triassic.mp4",
//   },

//   {
//     id: 1,
//     name: "Jurassic",
//     years: "201–145 Million Years Ago",
//     title: "Age of Giants",
//     description:
//       "Towering sauropods and massive predators dominated lush prehistoric forests, making the Jurassic Period one of the most iconic chapters in Earth's history.",
//     image: "/images/timeline/branchiosaurus.png",
//     video: "/videos/timeline/jurassic.mp4",
//   },

//   {
//     id: 2,
//     name: "Cretaceous",
//     years: "145–66 Million Years Ago",
//     title: "The Last Dynasty",
//     description:
//       "The final age of the dinosaurs before the great extinction, home to the mighty Tyrannosaurus rex.",
//     image: "/images/timeline/trex.png",
//     video: "/videos/timeline/cretaceous.mp4",
//   },
// ];
// export default function Timeline() {
//   const [current, setCurrent] = useState(1);
// const [direction, setDirection] = useState(1);
// const videoRef = useRef(null);
// const prev = (current - 1 + eras.length) % eras.length;
// const next = (current + 1) % eras.length;

// const nextEra = () => {
//   setDirection(1);
//   setCurrent((c) => (c + 1) % eras.length);
// };

// const previousEra = () => {
//   setDirection(-1);
//   setCurrent((c) => (c - 1 + eras.length) % eras.length);
// };
//   return (
//     <section
    
//     style={{
// perspective:1500,
// }}
//       id="timeline"
//       className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-2 pb-8 overflow-hidden"
//     >{[...Array(12)].map((_, i) => (
//   <motion.div
//     key={i}
//     className="absolute w-2 h-2 rounded-full bg-amber-300/20"
//     initial={{
//       x: Math.random() * 1400,
//       y: 900,
//       opacity: 0,
//     }}
//     animate={{
//       y: -100,
//       opacity: [0, 1, 0],
//     }}
//     transition={{
//       duration: 8 + Math.random() * 6,
//       delay: i * 0.5,
//       repeat: Infinity,
//       ease: "linear",
//     }}
//   />
// ))}{/* Animated Background */}

// <AnimatePresence mode="wait">

//   <motion.video
//     ref={videoRef}
//     key={eras[current].video}
//     autoPlay
//     muted
//     loop
//     playsInline
//     onLoadedData={(e) => {
//       e.currentTarget.playbackRate = 0.55;
//     }}
//     className="
//       absolute
//       inset-0
//       w-full
//       h-full
//       object-cover
//       -z-20
//     "
//     initial={{
//       opacity: 0,
//       scale: 1.08,
//     }}
//   animate={{
//   opacity: 0.26,
//   scale: 1,
// }}
//     exit={{
//       opacity: 0,
//       scale: 1.05,
//     }}
//     transition={{
//       duration: 1.8,
//     }}
//   >

//     <source
//       src={eras[current].video}
//       type="video/mp4"
//     />

//   </motion.video>

// </AnimatePresence>

// {/* Dark Overlay */}

// <div
//   className="
//     absolute
//     inset-0
//     bg-gradient-to-b
//     from-[#041208]/80
//     via-[#041208]/60
//     to-[#041208]/70
//     -z-10
//   "
// /><motion.div
//   animate={{
//     x: [-100, 100, -100],
//   }}
//   transition={{
//     duration: 30,
//     repeat: Infinity,
//     ease: "linear",
//   }}
//   className="
//     absolute
//     bottom-0
//     left-0
//     w-[140%]
//     h-72
//     bg-white/5
//     blur-[120px]
//     -z-10
//   "
// />
//       {/* Heading */}
//       <motion.div
//   initial={{ opacity: 0, y: 40 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   viewport={{ once: true }}
//   transition={{ duration: 0.8 }}
//   className="text-center mb-0"
// >
//         <p className="uppercase tracking-[0.4em] text-amber-400 text-sm font-semibold">
//           Through Time
//         </p>

//         <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">
//           Journey Through The Ages
//         </h2>

//         <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
//           Experience the rise of the dinosaurs across three iconic eras before
//           diving into the complete prehistoric timeline.
//         </p>
//      </motion.div>

//       {/* Carousel */}
//       {/* Carousel */}
// <div className="relative -mt-8 w-full max-w-7xl h-[650px] flex items-center justify-center overflow-hidden">

//   {/* Left Arrow */}
//   <button
//    onClick={previousEra}
//     className="absolute left-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 cursor-pointer rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-amber-500 hover:text-black transition"
//   >
//     <ChevronLeft className="mx-auto" />
//   </button>

//   {/* Right Arrow */}
//   <button
//    onClick={nextEra}
//     className="absolute cursor-pointer right-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-amber-500 hover:text-black transition"
//   >
//     <ChevronRight className="mx-auto" />
//   </button>

// {/* LEFT */}

// <motion.div
//   key={eras[prev].id}
//   layout
//   animate={{
//   x: current === 0 ? -350 : -430,
//   scale: 0.72,
//   opacity: 0.35,
//   rotate: -4,
// }}

// transition={{
//   type: "spring",
//   stiffness: 120,
//   damping: 16,
// }}
//   className="absolute z-10"
// >

//   <img
//     src={eras[prev].image}
//     className="w-56 scale-x-[-1]"
//     alt=""
//   />

//   <p className="text-center text-gray-500 mt-2">
//     {eras[prev].name}
//   </p>

// </motion.div>



// {/* CENTER */}

// <AnimatePresence mode="wait" custom={direction}>

// <motion.div

//   key={eras[current].id}

//   custom={direction}

//   initial={{
//     x: direction > 0 ? 500 : -500,
//     scale: 0.65,
//     opacity: 0,
//   }}
// whileHover={{
//     scale:1.1
// }}
//   animate={{
//   x:0,
//   scale:1.08,
//   opacity:1,
// }}

// transition={{
//   type:"spring",
//   stiffness:120,
//   damping:18,
// }}

//   exit={{
//     x: direction > 0 ? -500 : 500,
//     scale: 0.65,
//     opacity: 0,
//   }}

//   className="absolute z-20 -mt-32"
// >

//  <motion.img
//   src={eras[current].image}
//   alt=""
//   animate={{
//     scale: [1.08, 1.11, 1.08],
//     y: [0, -6, 0],
//     rotate: [0, 0.5, 0],
//   }}
//   transition={{
//     duration: 5,
//     repeat: Infinity,
//     ease: "easeInOut",
//   }}
//   className="
// w-[90vw]
// max-w-[650px]

//     object-contain
// drop-shadow-[0_0_28px_rgba(255,220,0,.18)]
//   "
// />
//   <motion.div

// initial={{
// opacity:0,
// }}

// animate={{
// opacity:1,
// }}

// className="
// absolute
// left-1/2
// top-1/2
// -translate-x-1/2
// -translate-y-1/2
// w-[320px]
// h-[320px]
// rounded-full
// bg-amber-300/4
// blur-[60px]
// -z-10
// "
// />

// </motion.div>

// </AnimatePresence>



// {/* RIGHT */}

// <motion.div

//   key={eras[next].id}

//   layout

//  animate={{
//   x: current === 2 ? 350 : 430,
//   scale: 0.72,
//   opacity: 0.35,
//   rotate: 4,
// }}

// transition={{
//   type: "spring",
//   stiffness: 120,
//   damping: 16,
// }}
//   // transition={{
//   //   type:"spring",
//   //   stiffness:110,
//   //   damping:18,
//   // }}

//   className="absolute z-10"
// >

//   <img
//     src={eras[next].image}
//     className="w-56"
//     alt=""
//   />

//   <p className="text-center text-gray-500 mt-2">
//     {eras[next].name}
//   </p>

// </motion.div>
// </div>

//       {/* Era Info */}
//   <AnimatePresence mode="wait">

// <motion.div

// key={eras[current].id}

// initial={{
// opacity:0,
// y:25
// }}

// animate={{
// opacity:1,
// y:0
// }}

// exit={{
// opacity:0,
// y:-25
// }}

// transition={{
// duration:.65,
// ease:"easeOut"
// }}

// className="-mt-40 text-center max-w-2xl"
// >

//         <p className="uppercase tracking-[0.3em] text-amber-400 text-sm">
//           {eras[current].years}
//         </p>

//         <h3 className="text-4xl font-bold text-white mt-3">
//           {eras[current].title}
//         </h3>

//         <p className="mt-6 text-lg text-gray-300 leading-8">
//           {eras[current].description}
//         </p>

// </motion.div>

// </AnimatePresence>

//       {/* CTA */}
//      <motion.button
//   whileHover={{
//     scale: 1.05,
//     y: -3,
//   }}
//   whileTap={{
//     scale: 0.97,
//   }}
//   className="
//     mt-6
//     px-8
//     py-4
//     rounded-full
//     bg-amber-500
//     hover:bg-amber-400
//     transition-all
//     duration-300
//     text-black
//     font-semibold
//     shadow-[0_0_30px_rgba(255,190,0,.4)]
//   "
// >
//   Explore Timeline →
// </motion.button>
// <div
//   className="
//     absolute
//     bottom-8
//     right-8

//     z-40
//     scale-80
//     origin-bottom-right
//   "
// >
//   <div
//     className="
//       absolute
//       bottom-2
//       left-1/2
//       -translate-x-1/2

//       w-56
//       h-20

//       rounded-full
//       bg-green-400/25
//       blur-3xl
//       pointer-events-none
//       -z-10
//     "
//   />

//   <DinoGuide />
// </div>
//     </section>
//   );
// }

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DinoGuide from "../guide/DinoGuide";

const eras = [
  {
    id: 0,
    name: "Triassic",
    years: "252–201 Million Years Ago",
    title: "The Rise of Dinosaurs",
    description:
      "The first true dinosaurs appeared while Pangaea still dominated the Earth.",
    image: "/images/timeline/coelophysis.png",
    video: "/videos/timeline/triassic.mp4",
  },
  {
    id: 1,
    name: "Jurassic",
    years: "201–145 Million Years Ago",
    title: "Age of Giants",
    description:
      "Towering sauropods and massive predators dominated lush prehistoric forests, making the Jurassic Period one of the most iconic chapters in Earth's history.",
    image: "/images/timeline/branchiosaurus.png",
    video: "/videos/timeline/jurassic.mp4",
  },
  {
    id: 2,
    name: "Cretaceous",
    years: "145–66 Million Years Ago",
    title: "The Last Dynasty",
    description:
      "The final age of the dinosaurs before the great extinction, home to the mighty Tyrannosaurus rex.",
    image: "/images/timeline/trex.png",
    video: "/videos/timeline/cretaceous.mp4",
  },
];

export default function Timeline() {
  const [current, setCurrent] = useState(1);
  const [direction, setDirection] = useState(1);

  const videoRef = useRef(null);

  const prev = (current - 1 + eras.length) % eras.length;
  const next = (current + 1) % eras.length;

  const nextEra = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % eras.length);
  };

  const previousEra = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + eras.length) % eras.length);
  };

  return (
    <section
      id="timeline"
      style={{ perspective: 1500 }}
      className="
relative
min-h-screen
overflow-hidden

flex
flex-col
items-center
justify-center

px-5
sm:px-6
md:px-8

pt-10
sm:pt-12
md:pt-2

pb-10
md:pb-8
"
    >
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-amber-300/20"
          initial={{
            x: Math.random() * 1400,
            y: 900,
            opacity: 0,
          }}
          animate={{
            y: -100,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <AnimatePresence mode="wait">
        <motion.video
          ref={videoRef}
          key={eras[current].video}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={(e) => {
            e.currentTarget.playbackRate = 0.55;
          }}
          className="
absolute
inset-0
w-full
h-full
object-cover
-z-20
"
          initial={{
            opacity: 0,
            scale: 1.08,
          }}
          animate={{
            opacity: 0.26,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.05,
          }}
          transition={{
            duration: 1.8,
          }}
        >
          <source
            src={eras[current].video}
            type="video/mp4"
          />
        </motion.video>
      </AnimatePresence>

      <div
        className="
absolute
inset-0
bg-gradient-to-b
from-[#041208]/80
via-[#041208]/60
to-[#041208]/70
-z-10
"
      />

      <motion.div
        animate={{
          x: [-100, 100, -100],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
absolute
bottom-0
left-0
w-[140%]
h-72
bg-white/5
blur-[120px]
-z-10
"
      />

      {/* Heading */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
text-center

mb-8
md:mb-0

px-2
"
      >
        <p className="uppercase tracking-[0.4em] text-amber-400 text-sm font-semibold">
          Through Time
        </p>

        <h2
          className="
text-3xl
sm:text-4xl
md:text-5xl

font-bold
mt-4
text-white
"
        >
          Journey Through The Ages
        </h2>

        <p
          className="
mt-5

mx-auto

max-w-md
sm:max-w-xl
md:max-w-2xl

text-base
md:text-lg

text-gray-300
leading-8
"
        >
          Experience the rise of the dinosaurs across three iconic eras before
          diving into the complete prehistoric timeline.
        </p>
      </motion.div>

      {/* ========================= CAROUSEL START ========================= */}

      <div
        className="
relative

w-full
max-w-7xl

h-[360px]
sm:h-[460px]
md:h-[650px]

flex
items-center
justify-center

overflow-hidden

mt-0
md:-mt-8
"
      >




        {/*  */}
  {/* Left Arrow */}
          {/* Left Arrow */}

        <button
          onClick={previousEra}
          className="
absolute

left-2
sm:left-4
md:left-6

top-1/2
-translate-y-1/2

z-40

w-10
h-10

sm:w-12
sm:h-12

md:w-14
md:h-14

cursor-pointer
rounded-full

bg-white/10
backdrop-blur-md
border
border-white/10

hover:bg-amber-500
hover:text-black

transition
"
        >
          <ChevronLeft className="mx-auto" />
        </button>

        {/* Right Arrow */}

        <button
          onClick={nextEra}
          className="
absolute

right-2
sm:right-4
md:right-6

top-1/2
-translate-y-1/2

z-40

w-10
h-10

sm:w-12
sm:h-12

md:w-14
md:h-14

cursor-pointer
rounded-full

bg-white/10
backdrop-blur-md
border
border-white/10

hover:bg-amber-500
hover:text-black

transition
"
        >
          <ChevronRight className="mx-auto" />
        </button>

        {/* LEFT DINOSAUR */}

        <motion.div
          key={eras[prev].id}
          layout
          animate={{
            x: current === 0 ? -350 : -430,
            scale: 0.72,
            opacity: 0.35,
            rotate: -4,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 16,
          }}
          className="absolute z-10 hidden md:block"
        >
          <img
            src={eras[prev].image}
            className="w-56 scale-x-[-1]"
            alt=""
          />

          <p className="text-center text-gray-500 mt-2">
            {eras[prev].name}
          </p>
        </motion.div>

        {/* CENTER */}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={eras[current].id}
            custom={direction}
            initial={{
              x: direction > 0 ? 500 : -500,
              scale: 0.65,
              opacity: 0,
            }}
            whileHover={{
              scale: 1.1,
            }}
            animate={{
              x: 0,
              scale: 1.08,
              opacity: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
            }}
            exit={{
              x: direction > 0 ? -500 : 500,
              scale: 0.65,
              opacity: 0,
            }}
            className="
absolute

mt-0
sm:-mt-10
md:-mt-32

z-20
"
          >
            <motion.img
              src={eras[current].image}
              alt=""
              animate={{
                scale: [1.08, 1.11, 1.08],
                y: [0, -6, 0],
                rotate: [0, 0.5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
w-[82vw]
sm:w-[72vw]
md:w-[90vw]

max-w-[300px]
sm:max-w-[450px]
md:max-w-[650px]

object-contain

drop-shadow-[0_0_28px_rgba(255,220,0,.18)]
"
            />

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="
absolute

left-1/2
top-1/2

-translate-x-1/2
-translate-y-1/2

w-[180px]
h-[180px]

sm:w-[240px]
sm:h-[240px]

md:w-[320px]
md:h-[320px]

rounded-full
bg-amber-300/4
blur-[60px]
-z-10
"
            />
          </motion.div>
        </AnimatePresence>

        {/* RIGHT DINOSAUR */}

        <motion.div
          key={eras[next].id}
          layout
          animate={{
            x: current === 2 ? 350 : 430,
            scale: 0.72,
            opacity: 0.35,
            rotate: 4,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 16,
          }}
          className="absolute z-10 hidden md:block"
        >
          <img
            src={eras[next].image}
            className="w-56"
            alt=""
          />

          <p className="text-center text-gray-500 mt-2">
            {eras[next].name}
          </p>
        </motion.div>

      </div>





        {/* ===================== ERA INFO ===================== */}

      <AnimatePresence mode="wait">
        <motion.div
          key={eras[current].id}
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -25,
          }}
          transition={{
            duration: 0.65,
            ease: "easeOut",
          }}
          className="
text-center

mt-6
sm:mt-2
md:-mt-40

max-w-md
sm:max-w-xl
md:max-w-2xl

px-5
"
        >
          <p
            className="
uppercase
tracking-[0.3em]

text-amber-400

text-xs
sm:text-sm
"
          >
            {eras[current].years}
          </p>

          <h3
            className="
mt-3

text-3xl
sm:text-4xl
md:text-4xl

font-bold
text-white
"
          >
            {eras[current].title}
          </h3>

          <p
            className="
mt-5

text-base
md:text-lg

leading-7
md:leading-8

text-gray-300
"
          >
            {eras[current].description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* ===================== CTA ===================== */}

      <motion.button
        whileHover={{
          scale: 1.05,
          y: -3,
        }}
        whileTap={{
          scale: 0.97,
        }}
        className="
mt-8
md:mt-6

px-6
py-3

md:px-8
md:py-4

rounded-full

bg-amber-500
hover:bg-amber-400

transition-all
duration-300

text-black
font-semibold

shadow-[0_0_30px_rgba(255,190,0,.4)]
"
      >
        Explore Timeline →
      </motion.button>

      {/* ===================== DINO GUIDE ===================== */}

      {/* Desktop */}

    <div
  className="
hidden
lg:block

absolute

bottom-8
right-8

z-40

origin-bottom-right

scale-[0.9]
xl:scale-[1.2]
2xl:scale-[1.05]
"
>
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

      {/* Tablet & Mobile */}

      <div
        className="
flex
lg:hidden

justify-center

w-full

mt-8
"
      >
        <div className="relative scale-75 sm:scale-90 ">
          <div
            className="
absolute

bottom-2
left-1/2

-translate-x-1/2

w-48
h-16

rounded-full

bg-green-400/25

blur-3xl

pointer-events-none

-z-10
"
          />

          <DinoGuide />
        </div>
      </div><div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#020612]" />
          </section>
  );
}