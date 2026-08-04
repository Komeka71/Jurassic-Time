import { motion } from "framer-motion";

export default function WaxSealButton({
  disabled,
  loading,
  onClick,
}) {
  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.03 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      transition={{
        type: "spring",
        stiffness: 220,
      }}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        relative
        w-full
        overflow-hidden
        rounded-[32px]
        border
        px-6
        py-7
        transition-all
        ${
          disabled || loading
            ? "border-[#5d4630] bg-[#2b1c14] opacity-60 cursor-not-allowed"
            : "border-[#8d5e32] bg-gradient-to-b from-[#4f1d18] to-[#32110f] shadow-[0_20px_45px_rgba(0,0,0,.45)]"
        }
      `}
    >
      {/* Glow */}

      {!disabled && !loading && (
        <motion.div
          animate={{
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle,#ffcf7b40,transparent_70%)]
          "
        />
      )}

      <div className="relative z-10 flex flex-col items-center">

        {/* Wax Seal */}

        <motion.img
          animate={
            !disabled && !loading
              ? { rotate: [-2, 2, -2] }
              : {}
          }
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          src="/images/research/WaxSeal.png"
          alt="Wax Seal"
          className="mb-2 w-24 drop-shadow-xl"
        />

        <h3 className="text-xl font-bold text-[#f7e4c2]">
          {loading
            ? "Archiving Discovery..."
            : "Seal Expedition Record"}
        </h3>

        <p className="mt-2 max-w-xs text-center text-sm leading-6 text-[#d2b089]">
          {loading
            ? "Submitting your discovery to the Paleora Museum..."
            : "Submit this discovery to the Paleora Museum Archive for community review and verification."}
        </p>

        {loading ? (
          <span
            className="
              mt-6
              rounded-full
              bg-[#d7901f]
              px-5
              py-2
              text-sm
              font-semibold
              text-black
            "
          >
            Archiving...
          </span>
        ) : !disabled ? (
          <span
            className="
              mt-6
              rounded-full
              bg-[#d7901f]
              px-5
              py-2
              text-sm
              font-semibold
              text-black
            "
          >
            Ready to Archive
          </span>
        ) : (
          <span
            className="
              mt-6
              rounded-full
              border
              border-[#6f5234]
              px-5
              py-2
              text-sm
              text-[#b89667]
            "
          >
            Complete Research Checklist
          </span>
        )}

      </div>
    </motion.button>
  );
}