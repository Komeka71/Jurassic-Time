// import { AnimatePresence, motion } from "framer-motion";
// const isSafari =
//   /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// const ext = isSafari ? "mov" : "webm";
// const shopMoods = {
//   idle: {
//     video: `/videos/dino/shop-idle.${ext}`,
//     message: "👀 Psst... I found something strange in the fossil vault.",
//   },

//   shop: {
//     video: `/videos/dino/shop-dino.${ext}`,
//     message:
//       "🦖 Welcome to my shop! I definitely priced everything scientifically.",
//   },

//   excited: {
//     video: `/videos/dino/happyJumps.${ext}`,
//     message: "✨ OOOH! Good choice, Explorer! Dino approved!",
//   },

//   happy: {
//     video: `/videos/dino/loveHappy.${ext}`,
//     message: "💚 Hehe! Your expedition gear is getting better!",
//   },

//   celebrate: {
//     video: `/videos/dino/celebrate.${ext}`,
//     message:
//       "🎉 PURCHASE COMPLETE! The fossil economy survives another day!",
//   },

//   angry: {
//     video: `/videos/dino/angry.${ext}`,
//     message: "😤 HEY! You don't have enough fossil coins!",
//   },

//   thinking: {
//     video: `/videos/dino/thinking.${ext}`,
//     message: "🤔 Hmm... an interesting prehistoric financial decision.",
//   },

//   sad: {
//     video: `/videos/dino/sad.${ext}`,
//     message: "🥺 You closed it? I thought we were going shopping...",
//   },
// };

// export default function ShopDino({
//   mood = "idle",
//   message,
// }) {
//   const currentMood = shopMoods[mood] || shopMoods.idle;
//   const currentMessage = message || currentMood.message;

//   return (
//     <div
//       className="
//         relative

//         w-full
//         max-w-[340px]

//         flex
//         flex-col
//         items-center
//         justify-end
//       "
//     >
//       {/* ========================================
//           SPEECH BUBBLE
//       ======================================== */}

//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentMessage}
//           initial={{
//             opacity: 0,
//             scale: 0.88,
//             y: 12,
//           }}
//           animate={{
//             opacity: 1,
//             scale: 1,
//             y: 0,
//           }}
//           exit={{
//             opacity: 0,
//             scale: 0.92,
//             y: -8,
//           }}
//           transition={{
//             type: "spring",
//             stiffness: 180,
//             damping: 16,
//           }}
//           className="
//             relative
//             z-20

//             mb-[-10px]

//             w-[230px]
//             sm:w-[250px]

//             rounded-[22px]

//             border
//             border-green-300/20

//             bg-[#F4FFF7]

//             px-5
//             py-4

//             text-center
//             text-sm
//             font-semibold
//             leading-relaxed
//             text-[#12351F]

//             shadow-[0_18px_50px_rgba(0,0,0,0.35)]
//           "
//         >
//           {currentMessage}

//           <div
//             className="
//               absolute

//               -bottom-3
//               left-1/2

//               h-6
//               w-6

//               -translate-x-1/2
//               rotate-45

//               border-b
//               border-r
//               border-green-300/20

//               bg-[#F4FFF7]
//             "
//           />
//         </motion.div>
//       </AnimatePresence>

//       {/* ========================================
//           DINO GLOW
//       ======================================== */}

//       <motion.div
//         animate={{
//           scale: [1, 1.12, 1],
//           opacity: [0.2, 0.4, 0.2],
//         }}
//         transition={{
//           duration: 3,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//         className="
//           absolute

//           bottom-5

//           h-[250px]
//           w-[250px]

//           rounded-full

//           bg-green-400/20

//           blur-[75px]

//           pointer-events-none
//         "
//       />

//       {/* ========================================
//           DINO MOOD VIDEO
//       ======================================== */}

//       <AnimatePresence mode="wait">
//         <motion.video
//           key={currentMood.video}
//           initial={{
//             opacity: 0,
//             scale: 0.88,
//             y: 18,
//           }}
//           animate={{
//             opacity: 1,
//             scale: 1,
//             y: 0,
//           }}
//           exit={{
//             opacity: 0,
//             scale: 0.9,
//             y: 10,
//           }}
//           transition={{
//             duration: 0.3,
//           }}
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="
//             relative
//             z-10

//             w-[270px]
//             sm:w-[320px]
//             lg:w-[360px]

//             h-[300px]
//             sm:h-[340px]
//             lg:h-[380px]

//             object-contain

//             drop-shadow-[0_28px_30px_rgba(0,0,0,0.45)]

//             pointer-events-none
//             select-none
//           "
//         >
//           <source src={currentMood.video} />

//           Your browser does not support the video tag.
//         </motion.video>
//       </AnimatePresence>

//       {/* ========================================
//           FLOOR SHADOW
//       ======================================== */}

//       <motion.div
//         animate={{
//           scaleX: [1, 0.88, 1],
//           opacity: [0.35, 0.22, 0.35],
//         }}
//         transition={{
//           duration: 3,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//         className="
//           -mt-8

//           h-7
//           w-[190px]

//           rounded-full

//           bg-black/50

//           blur-xl
//         "
//       />
//     </div>
//   );
// }



import { AnimatePresence, motion } from "framer-motion";
import Avatar from "../components/Avatar";

const shopMoods = {
  idle: {
    message: "👀 Psst... I found something strange in the fossil vault.",
  },

  shop: {
    message:
      "🦖 Welcome to my shop! I definitely priced everything scientifically.",
  },

  excited: {
    message: "✨ OOOH! Good choice, Explorer! Dino approved!",
  },

  happy: {
    message: "💚 Hehe! Your expedition gear is getting better!",
  },

  happyJumps: {
    message: "✨ OOOH! Good choice, Explorer! Dino approved!",
  },

  loveHappy: {
    message: "💚 Hehe! Your expedition gear is getting better!",
  },

  celebrate: {
    message:
      "🎉 PURCHASE COMPLETE! The fossil economy survives another day!",
  },

  angry: {
    message: "😤 HEY! You don't have enough fossil coins!",
  },

  thinking: {
    message: "🤔 Hmm... an interesting prehistoric financial decision.",
  },

  confused: {
    message: "🤔 Hmm... something's not quite right.",
  },

  sad: {
    message: "🥺 You closed it? I thought we were going shopping...",
  },
};

export default function ShopDino({
  mood = "idle",
  message,
  companionId,
  companionName,
  equippedItems,
}) {
  const currentMood = shopMoods[mood] || shopMoods.idle;
  const currentMessage = message || currentMood.message;

  return (
    <div
      className="
        relative

        w-full
        max-w-[340px]

        flex
        flex-col
        items-center
        justify-end
      "
    >
      {/* ========================================
          SPEECH BUBBLE
      ======================================== */}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentMessage}
          initial={{
            opacity: 0,
            scale: 0.88,
            y: 12,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.92,
            y: -8,
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 16,
          }}
          className="
            relative
            z-20

            mb-[-10px]

            w-[230px]
            sm:w-[250px]

            rounded-[22px]

            border
            border-green-300/20

            bg-[#F4FFF7]

            px-5
            py-4

            text-center
            text-sm
            font-semibold
            leading-relaxed
            text-[#12351F]

            shadow-[0_18px_50px_rgba(0,0,0,0.35)]
          "
        >
          {currentMessage}

          <div
            className="
              absolute

              -bottom-3
              left-1/2

              h-6
              w-6

              -translate-x-1/2
              rotate-45

              border-b
              border-r
              border-green-300/20

              bg-[#F4FFF7]
            "
          />
        </motion.div>
      </AnimatePresence>

      {/* ========================================
          DINO GLOW
      ======================================== */}

      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute

          bottom-5

          h-[250px]
          w-[250px]

          rounded-full

          bg-green-400/20

          blur-[75px]

          pointer-events-none
        "
      />

      {/* ========================================
          DINO AVATAR
      ======================================== */}

      <motion.div
        key={`${companionId}-${JSON.stringify(equippedItems)}`}
        initial={{
          opacity: 0,
          scale: 0.88,
          y: 18,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="
          relative
          z-10

          w-[270px]
          sm:w-[320px]
          lg:w-[360px]

          h-[300px]
          sm:h-[340px]
          lg:h-[380px]

          drop-shadow-[0_28px_30px_rgba(0,0,0,0.45)]

          pointer-events-none
          select-none
        "
      >
        <Avatar
          companionId={companionId}
          companionName={companionName}
          equippedItems={equippedItems}
          size="100%"
        />
      </motion.div>

      {/* ========================================
          FLOOR SHADOW
      ======================================== */}

      <motion.div
        animate={{
          scaleX: [1, 0.88, 1],
          opacity: [0.35, 0.22, 0.35],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          -mt-8

          h-7
          w-[190px]

          rounded-full

          bg-black/50

          blur-xl
        "
      />
    </div>
  );
}