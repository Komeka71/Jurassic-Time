import { ArrowLeft, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FloatingNavigation() {
  const navigate = useNavigate();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ================= BACK TO HOME ================= */}

      <motion.button
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        onClick={() => navigate("/")}
        className="
          fixed
          top-5
          left-5
          z-[120]
          group

          flex
          items-center
          gap-3

          rounded-xl
          border
          border-[#c79a4d66]

          bg-[#1a140f]/80
          backdrop-blur-xl

          px-4
          py-2.5

          shadow-[0_10px_30px_rgba(0,0,0,0.35)]

          transition-all
          duration-300

          hover:-translate-y-1
          hover:border-[#e0b86f]
          hover:bg-[#241913]
          hover:shadow-[0_0_22px_rgba(214,170,90,0.25)]
        "
      >
        {/* Brass Coin */}

        <div
          className="
            flex
            h-8
            w-8
            items-center
            justify-center

            rounded-full

            border
            border-[#d8b36b]

            bg-gradient-to-br
            from-[#b88945]
            via-[#7d5b2d]
            to-[#4d361c]

            text-sm
          "
        >
          🦴
        </div>

        <span className="text-sm font-medium text-[#f5e1b6]">
          Back
        </span>

        <ArrowLeft
          size={16}
          className="
            text-[#d8b36b]
            transition-transform
            duration-300
            group-hover:-translate-x-1
          "
        />
      </motion.button>

      {/* ================= BACK TO TOP ================= */}

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{
              opacity: 0,
              scale: 0.7,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
              y: 20,
            }}
            transition={{ duration: 0.3 }}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="
              fixed
              bottom-6
              right-6
              z-[120]

              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-xl

              border
              border-[#c79a4d66]

              bg-[#1a140f]/80
              backdrop-blur-xl

              text-[#f5e1b6]

              shadow-[0_10px_25px_rgba(0,0,0,0.35)]

              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-[#e0b86f]
              hover:bg-[#241913]
              hover:shadow-[0_0_20px_rgba(214,170,90,0.25)]
            "
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}