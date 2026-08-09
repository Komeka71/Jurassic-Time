// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Compass } from "lucide-react";
// import DinoGuide from "../components/DinoGuide";

// export default function Home() {

//   const navigate = useNavigate();

//   const [mood, setMood] = useState("wave");

//   useEffect(() => {

//     const timer = setTimeout(() => {
//       setMood("idle");
//     }, 4500);

//     return () => clearTimeout(timer);

//   }, []);

//   return (

//     <div className="relative min-h-screen overflow-hidden">

//       {/* Background Video */}

//       <video
//         autoPlay
//         muted
//         loop
//         playsInline
//         className="
//           absolute
//           inset-0
//           w-full
//           h-full
//           object-cover
//         "
//       >
//         <source src="/videos/home/intro.mp4" type="video/mp4" />
//       </video>

//       {/* Dark Overlay */}

//       <div className="absolute inset-0 bg-black/45" />

//       {/* Leaves */}

//       {/* <FloatingLeaves /> */}

//       {/* Content */}

//       <div
//         className="
//           relative
//           z-20

//           min-h-screen

//           flex

//           flex-col

//           items-center

//           justify-center

//           text-center

//           px-6
//         "
//       >

//         <motion.h1

//           initial={{ opacity:0,y:-40 }}

//           animate={{ opacity:1,y:0 }}

//           transition={{ duration:.8 }}

//           className="
//             title-font

//             text-6xl

//             md:text-8xl

//             text-white

//             drop-shadow-2xl
//           "
//         >

//           Paleora

//         </motion.h1>

//         <motion.p

//           initial={{ opacity:0 }}

//           animate={{ opacity:1 }}

//           transition={{ delay:.5 }}

//           className="
//             mt-4

//             text-green-100

//             text-xl

//             max-w-xl
//           "
//         >

//           Become the Ultimate Dinosaur Explorer

//         </motion.p>

//         <div className="my-8">

//           <DinoGuide
//             mood={mood}
//             message="Welcome back Explorer!"
//           />

//         </div>

//      <motion.button
// whileHover={{
// scale:1.05,
// backdropFilter:"blur(20px)"
// }}
// whileTap={{scale:.95}}
// onClick={()=>navigate("/map")}
// className="
// group

// px-14
// py-5

// rounded-full

// bg-white/10
// backdrop-blur-xl

// border
// border-white/30

// text-white
// font-semibold
// text-xl

// shadow-[0_8px_30px_rgba(0,0,0,.35)]
// "
// >

// <span className="flex items-center gap-3">
//     <Compass size={24} />
//     Begin Expedition
// </span>

// </motion.button>

//       </div>

//     </div>

//   );

// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import DinoGuide from "../components/DinoGuide";

export default function Home() {
  const navigate = useNavigate();
  const [mood, setMood] = useState("wave");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMood("idle");
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/home/intro.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Leaves */}
      {/* <FloatingLeaves /> */}

      {/* Content */}
      <div
        className="
          relative
          z-20
          min-h-screen
          flex
          flex-col
          items-center
          justify-center
          text-center
          px-6
        "
      >
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="title-font text-6xl md:text-8xl text-white drop-shadow-2xl"
        >
          Paleora
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-green-100 text-xl max-w-xl"
        >
          Become the Ultimate Dinosaur Explorer
        </motion.p>

        <div className="my-8">
          <DinoGuide mood={mood} message="Welcome back Explorer!" />
        </div>

        <motion.button
          whileHover={{ scale: 1.05, backdropFilter: "blur(20px)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/map")}
          className="
            group
            px-14
            py-5
            rounded-full
            bg-white/10
            backdrop-blur-xl
            border
            border-white/30
            text-white
            font-semibold
            text-xl
            shadow-[0_8px_30px_rgba(0,0,0,.35)]
          "
        >
          <span className="flex items-center gap-3">
            <Compass size={24} />
            Begin Expedition
          </span>
        </motion.button>
      </div>
    </div>
  );
}