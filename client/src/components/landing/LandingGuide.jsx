import { motion } from "framer-motion";

export default function LandingGuide() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{
        opacity: 1,
        x: 0,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 1 },
        x: { duration: 1 },
        y: {
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        },
      }}
      className="relative flex flex-col items-center"
    >
      {/* Glass Card */}
      <div className="relative rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl">

        {/* Dino Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-[340px] lg:w-[430px] object-contain drop-shadow-2xl"
        >
          {/* Change this to whichever animation you want */}
          <source
            src="/videos/dino/idle.mp4"
            type="video/mp4"
          />
        </video>

        {/* Speech Bubble */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: [0, -3, 0],
          }}
          transition={{
            delay: 0.8,
            duration: 0.6,
            y: {
              repeat: Infinity,
              duration: 2.5,
            },
          }}
          className="
            absolute
            -top-5
            left-1/2
            -translate-x-1/2
            rounded-2xl
            bg-white
            px-5
            py-3
            text-sm
            font-medium
            text-black
            shadow-xl
            whitespace-nowrap
          "
        >
          👋 Welcome, Explorer!
        </motion.div>
      </div>

      <motion.p
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        className="mt-5 text-green-200 text-center"
      >
        Your AI Expedition Guide
      </motion.p>
    </motion.div>
  );
}