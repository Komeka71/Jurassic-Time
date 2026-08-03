// import { motion } from "framer-motion";

// export default function AcademyButton() {
//   return (
//     <motion.button
//       whileHover={{ scale: 1.03, y: -2 }}
//       whileTap={{ scale: 0.98 }}
//       transition={{ duration: 0.25 }}
//       className="
//         group
//         relative

//         w-[88vw]
//         max-w-[340px]

//         sm:w-[390px]
//         lg:w-[420px]

//         h-[56px]
//         sm:h-[66px]
//         lg:h-[72px]

//         rounded-full
//         overflow-hidden

//         border
//         border-cyan-300/30

//         bg-gradient-to-r
//         from-cyan-500/20
//         via-emerald-400/18
//         to-cyan-500/20

//         backdrop-blur-xl

//         shadow-[0_0_30px_rgba(34,211,238,.22)]

//         transition-all
//         duration-300

//         hover:shadow-[0_0_45px_rgba(34,211,238,.35)]
//       "
//     >
//       {/* Hover Glow */}
//       <div
//         className="
//           absolute
//           inset-0

//           opacity-0
//           group-hover:opacity-100

//           transition-opacity

//           bg-gradient-to-r
//           from-cyan-400/10
//           via-white/10
//           to-cyan-400/10
//         "
//       />

//       {/* Subtitle */}
//       <p
//         className="
//           relative

//           pt-1.5
//           sm:pt-2

//           text-[7px]
//           sm:text-[9px]
//           lg:text-[10px]

//           tracking-[0.3em]
//           lg:tracking-[0.45em]

//           uppercase
//           text-cyan-200
//         "
//       >
//         EXPLORE
//       </p>

//       {/* Title */}
//       <div
//         className="
//           relative

//           mt-0.5

//           flex
//           items-center
//           justify-center

//           px-3
//           sm:px-4
//         "
//       >
//         <h2
//           className="
//             text-[17px]
//             sm:text-xl
//             lg:text-2xl

//             font-bold
//             text-white

//             text-center
//             leading-none
//           " 
//         >
//           ENTER ACADEMY
//         </h2>
//       </div>
//     </motion.button>
//   );
// }



import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AcademyButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate("/home")}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="
        group
        relative

        w-[88vw]
        max-w-[340px]

        sm:w-[390px]
        lg:w-[420px]

        h-[56px]
        sm:h-[66px]
        lg:h-[72px]

        rounded-full
        overflow-hidden

        border
        border-cyan-300/30

        bg-gradient-to-r
        from-cyan-500/20
        via-emerald-400/18
        to-cyan-500/20

        backdrop-blur-xl

        shadow-[0_0_30px_rgba(34,211,238,.22)]

        transition-all
        duration-300

        hover:shadow-[0_0_45px_rgba(34,211,238,.35)]
      "
    >
      {/* Hover Glow */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity
          bg-gradient-to-r
          from-cyan-400/10
          via-white/10
          to-cyan-400/10
        "
      />

      {/* Subtitle */}
      <p
        className="
          relative
          pt-1.5
          sm:pt-2
          text-[7px]
          sm:text-[9px]
          lg:text-[10px]
          tracking-[0.3em]
          lg:tracking-[0.45em]
          uppercase
          text-cyan-200
        "
      >
        EXPLORE
      </p>

      {/* Title */}
      <div
        className="
          relative
          mt-0.5
          flex
          items-center
          justify-center
          px-3
          sm:px-4
        "
      >
        <h2
          className="
            text-[17px]
            sm:text-xl
            lg:text-2xl
            font-bold
            text-white
            text-center
            leading-none
          "
        >
          ENTER ACADEMY
        </h2>
      </div>
    </motion.button>
  );
}