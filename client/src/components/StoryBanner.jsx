// import { motion } from "framer-motion";

// export default function StoryBanner({
//   expedition,
//   story,
// }) {
//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         y: -20,
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//       }}
//       transition={{
//         duration: .6,
//       }}
//       className="
//         mb-7
//         rounded-3xl
//         border
//         border-green-700/40
//         bg-gradient-to-r
//         from-[#163624]
//         via-[#11281B]
//         to-[#0C1914]
//         p-6
//         shadow-xl
//       "
//     >
//       <div
//         className="
//           uppercase
//           tracking-[.35em]
//           text-green-300
//           text-xs
//           font-bold
//           mb-3
//         "
//       >
//         {expedition}
//       </div>

//       <div
//         className="
//           text-xl
//           leading-8
//           text-gray-100
//         "
//       >
//         {story}
//       </div>
//     </motion.div>
//   );
// }



const themes = {
  1: {
    background:
      "bg-gradient-to-r from-[#123D25]/95 via-[#10321F]/95 to-[#071A10]/95",

    border: "border-green-600/40",

    shadow: "shadow-green-900/20",
  },

  2: {
    background:
      "bg-gradient-to-r from-[#49331A]/95 via-[#352515]/95 to-[#1D150C]/95",

    border: "border-amber-600/40",

    shadow: "shadow-amber-900/20",
  },

  3: {
    background:
      "bg-gradient-to-r from-[#4A1E14]/95 via-[#35150F]/95 to-[#1C0B08]/95",

    border: "border-red-600/40",

    shadow: "shadow-red-900/30",
  },

  4: {
    background:
      "bg-gradient-to-r from-[#16455C]/95 via-[#12384C]/95 to-[#091F2C]/95",

    border: "border-cyan-500/40",

    shadow: "shadow-cyan-900/30",
  },

  5: {
    background:
      "bg-gradient-to-r from-[#4A2A17]/95 via-[#342015]/95 to-[#1A110C]/95",

    border: "border-orange-500/40",

    shadow: "shadow-orange-900/30",
  },
};

export default function StoryBanner({
  story,
  level = 1,
}) {
  const theme = themes[level] || themes[1];

  if (!story) return null;

  return (
    <div
      className={`
        ${theme.background}
        ${theme.border}
        ${theme.shadow}

        border

        rounded-[24px]

        px-5
        sm:px-6

        py-4
        sm:py-5

        mb-6
        md:mb-8

        text-base
        sm:text-lg
        md:text-xl

        leading-relaxed

        text-white/95

        shadow-xl

        backdrop-blur-xl
      `}
    >
      {story}
    </div>
  );
}