// // // // import { AnimatePresence, motion } from "framer-motion";

// // // // export default function SpeechBubble({ text }) {
// // // //   return (
// // // //     <AnimatePresence mode="wait">
// // // //       <motion.div
// // // //         key={text}
// // // //         initial={{
// // // //           opacity: 0,
// // // //           y: 12,
// // // //           scale: 0.9,
// // // //         }}
// // // //         animate={{
// // // //   opacity:1,
// // // //   scale:1,
// // // //   y:[0,-4,0],
// // // // }}
// // // //         exit={{
// // // //           opacity: 0,
// // // //           y: -8,
// // // //           scale: 0.95,
// // // //         }}
// // // //         transition={{
// // // //   opacity:{duration:.25},
// // // //   scale:{duration:.25},
// // // //   y:{
// // // //     repeat:Infinity,
// // // //     repeatType:"mirror",
// // // //     duration:2,
// // // //   },
// // // // }}
// // // //         className="
// // // //           relative
// // // //           bg-white/95
// // // //           backdrop-blur-md
// // // //           rounded-3xl
// // // //           px-6 py-4
// // // //           shadow-xl
// // // //           max-w-[210px]
// // // //           text-center
// // // //           text-base md:text-lg
// // // //           font-medium
// // // //           text-gray-800
// // // //           select-none
// // // //         "
// // // //       >
// // // //         {text}

// // // //        <div
// // // //   className="
// // // //     absolute
// // // //     left-[42%]
// // // //     -bottom-2
// // // //     h-4
// // // //     w-4
// // // //     rotate-45
// // // //     bg-white/95
// // // //   "
// // // // />
// // // //       </motion.div>
// // // //     </AnimatePresence>
// // // //   );
// // // // }



// // // import { AnimatePresence, motion } from "framer-motion";

// // // export default function SpeechBubble({ text }) {
// // //   return (
// // //     <motion.div
// // //       animate={{
// // //         y: [0, -4, 0],
// // //       }}
// // //       transition={{
// // //         y: {
// // //           repeat: Infinity,
// // //           repeatType: "mirror",
// // //           duration: 2,
// // //         },
// // //       }}
// // //     >
// // //       <AnimatePresence>
// // //         <motion.div
// // //           key={text}
// // //           initial={{
// // //             opacity: 0,
// // //             y: 12,
// // //             scale: 0.9,
// // //           }}
// // //           animate={{
// // //             opacity: 1,
// // //             y: 0,
// // //             scale: 1,
// // //           }}
// // //           exit={{
// // //             opacity: 0,
// // //             y: -8,
// // //             scale: 0.95,
// // //           }}
// // //           transition={{
// // //             duration: 0.25,
// // //           }}
// // //           className="
// // //             relative
// // //             bg-white/95
// // //             backdrop-blur-md
// // //             rounded-3xl
// // //             px-6 py-4
// // //             shadow-xl
// // //             max-w-[210px]
// // //             text-center
// // //             text-base md:text-lg
// // //             font-medium
// // //             text-gray-800
// // //             select-none
// // //           "
// // //         >
// // //           {text}

// // //           <div
// // //             className="
// // //               absolute
// // //               left-[42%]
// // //               -bottom-2
// // //               h-4
// // //               w-4
// // //               rotate-45
// // //               bg-white/95
// // //             "
// // //           />
// // //         </motion.div>
// // //       </AnimatePresence>
// // //     </motion.div>
// // //   );
// // // }



// // import { AnimatePresence, motion } from "framer-motion";

// // export default function SpeechBubble({ text }) {
// //   return (
// //     <motion.div
// //       animate={{
// //         y: [0, -4, 0],
// //       }}
// //       transition={{
// //         y: {
// //           duration: 2,
// //           repeat: Infinity,
// //           repeatType: "mirror",
// //         },
// //       }}
// //     >
// //       <AnimatePresence mode="sync">
// //         <motion.div
// //           key={text}
// //           initial={{
// //             opacity: 0,
// //             y: 12,
// //             scale: 0.9,
// //           }}
// //           animate={{
// //             opacity: 1,
// //             y: 0,
// //             scale: 1,
// //           }}
// //           exit={{
// //             opacity: 0,
// //             y: -10,
// //             scale: 0.95,
// //           }}
// //           transition={{
// //             duration: 0.28,
// //           }}
// //           className="
// //             relative

// //             w-[230px]
// //             min-h-[82px]

// //             rounded-[24px]

// //             bg-white/95
// //             backdrop-blur-xl

// //             border
// //             border-green-200/70

// //             shadow-2xl
// //             shadow-green-900/15

// //             px-6
// //             py-4

// //             text-center

// //             text-[16px]
// //             leading-7
// //             font-semibold

// //             text-gray-800

// //             select-none
// //           "
// //         >
// //           {text}

// //           <div
// //             className="
// //               absolute

// //               left-1/2
// //               -translate-x-1/2

// //               -bottom-[7px]

// //               h-4
// //               w-4

// //               rotate-45

// //               bg-white/95

// //               border-r
// //               border-b
// //               border-green-200/70
// //             "
// //           />
// //         </motion.div>
// //       </AnimatePresence>
// //     </motion.div>
// //   );
// // }



// import { AnimatePresence, motion } from "framer-motion";

// export default function SpeechBubble({ text }) {
//   return (
//     <motion.div
//       animate={{
//         y: [0, -4, 0],
//       }}
//       transition={{
//         y: {
//           duration: 2,
//           repeat: Infinity,
//           repeatType: "mirror",
//         },
//       }}
//     >
//       <AnimatePresence mode="sync">
//         <motion.div
//           key={text}
//           initial={{
//             opacity: 0,
//             y: 14,
//             scale: 0.92,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             rotate: [0, 0.5, -0.5, 0],
//           }}
//           exit={{
//             opacity: 0,
//             y: -10,
//             scale: 0.95,
//           }}
//           transition={{
//             opacity: {
//               duration: 0.25,
//             },
//             scale: {
//               duration: 0.25,
//             },
//             y: {
//               duration: 0.25,
//             },
//             rotate: {
//               duration: 5,
//               repeat: Infinity,
//             },
//           }}
//           className="
//             relative

//             w-[245px]
//             min-h-[88px]

//             overflow-hidden

//             rounded-[26px]

//             bg-gradient-to-br
//             from-white
//             via-white/95
//             to-green-50

//             backdrop-blur-2xl

//             border
//             border-green-300/70

//             shadow-[0_18px_40px_rgba(0,0,0,0.22)]
//             ring-1
//             ring-white/50

//             px-6
//             py-4

//             select-none
//           "
//         >
//           {/* Gloss Highlight */}
//           <div
//             className="
//               absolute
//               inset-0
//               rounded-[26px]

//               bg-gradient-to-br
//               from-white/70
//               via-transparent
//               to-transparent

//               pointer-events-none
//             "
//           />

//           {/* Soft Green Glow */}
//           <div
//             className="
//               absolute
//               inset-0

//               rounded-[26px]

//               shadow-[inset_0_0_30px_rgba(34,197,94,0.08)]

//               pointer-events-none
//             "
//           />

//           {/* Green Status Dot */}
//           <div
//             className="
//               absolute
//               top-4
//               left-4

//               h-2.5
//               w-2.5

//               rounded-full

//               bg-green-500

//               shadow-[0_0_10px_rgba(34,197,94,0.9)]
//             "
//           />

//           {/* Message */}
//           <p
//             className="
//               relative
//               z-10

//               text-center

//               text-[16px]
//               leading-7
//               font-semibold

//               tracking-[0.01em]

//               text-[#233223]
//             "
//           >
//             {text}
//           </p>

//           {/* Pointer */}
//           <div
//             className="
//               absolute

//               left-1/2
//               -translate-x-1/2

//               -bottom-[8px]

//               h-[18px]
//               w-[18px]

//               rotate-45

//               bg-gradient-to-br
//               from-white
//               to-green-50

//               border-r
//               border-b
//               border-green-300/70

//               shadow-sm
//             "
//           />
//         </motion.div>
//       </AnimatePresence>
//     </motion.div>
//   );
// }

import { AnimatePresence, motion } from "framer-motion";

export default function SpeechBubble({ text }) {
  return (
    <motion.div
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
        },
      }}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={text}
          initial={{
            opacity: 0,
            y: 12,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -10,
            scale: 0.96,
          }}
          transition={{
            duration: 0.28,
          }}
          className="
            relative

            w-[205px]
            min-h-[68px]

            overflow-hidden

            rounded-[24px]

            bg-[#0d1710]/95
            backdrop-blur-2xl

            border
            border-green-700/40

            shadow-[0_12px_35px_rgba(0,0,0,.45)]
            shadow-green-900/20

            px-4
            py-3

            select-none
          "
        >
          {/* Glow */}
          <div
            className="
              absolute
              inset-0

              rounded-[24px]

              bg-gradient-to-br
              from-green-500/5
              via-transparent
              to-transparent
            "
          />

          {/* Top Highlight */}
          <div
            className="
              absolute
              top-0
              left-0

              h-[1px]
              w-full

              bg-gradient-to-r
              from-transparent
              via-green-300/60
              to-transparent
            "
          />

          {/* Green Status Dot */}
          <div
            className="
              absolute
              top-3
              left-3

              h-2
              w-2

              rounded-full

              bg-green-400

              shadow-[0_0_10px_rgba(74,222,128,.9)]
            "
          />

          {/* Text */}
          <p
            className="
              relative
              z-10

              text-center

              text-[13px]
              leading-5

              font-medium

              text-green-50
            "
          >
            {text}
          </p>

          {/* Pointer */}
          <div
            className="
              absolute

              left-1/2
              -translate-x-1/2

              -bottom-[8px]

              h-[18px]
              w-[18px]

              rotate-45

              bg-[#0d1710]

              border-r
              border-b
              border-green-700/40
            "
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}