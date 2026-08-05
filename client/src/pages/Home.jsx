import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
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

          initial={{ opacity:0,y:-40 }}

          animate={{ opacity:1,y:0 }}

          transition={{ duration:.8 }}

          className="
            title-font

            text-6xl

            md:text-8xl

            text-white

            drop-shadow-2xl
          "
        >

          Paleora

        </motion.h1>

        <motion.p

          initial={{ opacity:0 }}

          animate={{ opacity:1 }}

          transition={{ delay:.5 }}

          className="
            mt-4

            text-green-100

            text-xl

            max-w-xl
          "
        >

          Become the Ultimate Dinosaur Explorer

        </motion.p>

        <div className="my-8">

          <DinoGuide
            mood={mood}
            message="Welcome back Explorer!"
          />

        </div>

        <motion.button

          whileHover={{ scale:1.05 }}

          whileTap={{ scale:.95 }}

          onClick={()=>navigate("/map")}

          className="
            px-12

            py-5

            rounded-full

            bg-gradient-to-r

            from-green-500

            to-emerald-600

            text-2xl

            font-bold

            shadow-2xl

            hover:shadow-green-500/40

            transition-all
          "

        >

          🧭 Begin Expedition

        </motion.button>

      </div>

    </div>

  );

}