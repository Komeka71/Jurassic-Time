import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function CartAnimation({
  itemCount = 0,
  isReacting = false,
  onClick,
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: isReacting
          ? [1, 1.18, 0.92, 1.08, 1]
          : 1,
        rotate: isReacting
          ? [0, -10, 10, -6, 0]
          : 0,
      }}
      transition={
        isReacting
          ? {
              duration: 0.8,
              ease: "easeInOut",
            }
          : {
              type: "spring",
              stiffness: 220,
              damping: 18,
            }
      }
      whileHover={{
        scale: 1.08,
        y: -4,
      }}
      whileTap={{
        scale: 0.92,
      }}
      className="
        fixed
        right-5
        sm:right-7
        lg:right-10

        bottom-5
        sm:bottom-7
        lg:bottom-10

        z-[70]

        w-16
        h-16

        rounded-[22px]

        flex
        items-center
        justify-center

        bg-[#0B2117]/95

        border
        border-green-500/30

        text-green-300

        backdrop-blur-xl

        shadow-[0_20px_60px_rgba(0,0,0,0.55)]

        cursor-pointer
      "
      aria-label="Open explorer pack"
    >
      {/* GLOW */}

      <motion.div
        animate={
          isReacting
            ? {
                scale: [1, 1.8, 1],
                opacity: [0.15, 0.5, 0.15],
              }
            : {
                scale: [1, 1.15, 1],
                opacity: [0.1, 0.2, 0.1],
              }
        }
        transition={{
          duration: isReacting ? 0.8 : 3,
          repeat: isReacting ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          inset-0

          rounded-[22px]

          bg-green-400/20

          blur-xl

          pointer-events-none
        "
      />

      {/* CART */}

      <motion.div
        animate={
          isReacting
            ? {
                y: [0, -7, 0],
              }
            : {}
        }
        transition={{
          duration: 0.5,
        }}
        className="
          relative
          z-10
        "
      >
        <ShoppingCart size={27} />
      </motion.div>

      {/* ITEM COUNT */}

      {itemCount > 0 && (
        <motion.div
          key={itemCount}
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 16,
          }}
          className="
            absolute
            z-20

            -top-2
            -right-2

            min-w-7
            h-7

            px-2

            rounded-full

            flex
            items-center
            justify-center

            bg-green-500

            border-2
            border-[#06130D]

            text-[#04130B]

            text-xs
            font-black

            shadow-lg
          "
        >
          {itemCount}
        </motion.div>
      )}

      {/* PURCHASE SPARKS */}

      {isReacting && (
        <>
          <motion.span
            initial={{
              opacity: 0,
              scale: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5],
              x: -35,
              y: -35,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              absolute

              text-yellow-300

              pointer-events-none
            "
          >
            ✦
          </motion.span>

          <motion.span
            initial={{
              opacity: 0,
              scale: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0.5],
              x: 35,
              y: -30,
            }}
            transition={{
              duration: 0.8,
              delay: 0.08,
            }}
            className="
              absolute

              text-green-300

              pointer-events-none
            "
          >
            ✦
          </motion.span>

          <motion.span
            initial={{
              opacity: 0,
              scale: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5],
              x: -30,
              y: 30,
            }}
            transition={{
              duration: 0.8,
              delay: 0.14,
            }}
            className="
              absolute

              text-cyan-300

              pointer-events-none
            "
          >
            ✦
          </motion.span>
        </>
      )}
    </motion.button>
  );
}