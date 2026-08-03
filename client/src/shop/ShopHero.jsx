import { motion } from "framer-motion";
import { Coins, Sparkles } from "lucide-react";

export default function ShopHero({
  item,
  onViewItem,
}) {
  if (!item) {
    return null;
  }

  return (
    <section
      className="
        relative
        overflow-hidden

        rounded-[36px]

        border
        border-green-500/20

        bg-[#071B12]/90

        shadow-[0_30px_100px_rgba(0,0,0,0.45)]

        min-h-[430px]

        px-6
        sm:px-8
        lg:px-12

        py-8
        lg:py-12
      "
    >
      {/* ========================================
          BACKGROUND GLOWS
      ======================================== */}

      <div
        className="
          absolute
          -left-24
          top-10

          w-[350px]
          h-[350px]

          rounded-full

          bg-green-500/10

          blur-[110px]

          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -right-20
          -bottom-20

          w-[420px]
          h-[420px]

          rounded-full

          bg-amber-500/10

          blur-[120px]

          pointer-events-none
        "
      />

      {/* ========================================
          CONTENT
      ======================================== */}

      <div
        className="
          relative
          z-10

          grid
          grid-cols-1
          md:grid-cols-[1.15fr_0.85fr]

          gap-8
          lg:gap-12

          items-center

          min-h-[330px]
        "
      >
        {/* ========================================
            SHOP TEXT
        ======================================== */}

        <div>
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              inline-flex
              items-center
              gap-2

              text-green-300

              text-xs
              font-bold

              uppercase
              tracking-[0.3em]
            "
          >
            <Sparkles size={16} />

            Dino's Secret Pick
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="
              title-font

              mt-5

              text-4xl
              sm:text-5xl
              lg:text-6xl

              leading-[1]

              text-white
            "
          >
            Something ancient

            <span className="text-green-400">
              {" "}
              is waiting.
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="
              mt-6

              max-w-[520px]

              text-white/55

              text-base
              sm:text-lg

              leading-relaxed
            "
          >
            My tiny explorer friend found this hidden
            deep inside the prehistoric supply vault.
            He insists it's definitely not moving.
          </motion.p>

          <motion.button
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
            whileHover={{
              scale: 1.04,
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() => onViewItem(item)}
            className="
              mt-8

              inline-flex
              items-center
              gap-3

              rounded-2xl

              bg-green-500

              px-6
              py-3.5

              font-bold
              text-[#04130B]

              shadow-[0_15px_40px_rgba(34,197,94,0.25)]

              transition
            "
          >
            Inspect Dino's Pick

            <span>→</span>
          </motion.button>
        </div>

        {/* ========================================
            FEATURED ITEM
        ======================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            rotate: 3,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 120,
          }}
          className="
            relative

            flex
            justify-center
            items-center

            min-h-[300px]
            sm:min-h-[350px]
          "
        >
          {/* ITEM GLOW */}

          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute

              w-[240px]
              h-[240px]

              sm:w-[280px]
              sm:h-[280px]

              rounded-full

              bg-amber-400/20

              blur-[70px]

              pointer-events-none
            "
          />

          {/* ITEM IMAGE */}

          <motion.img
            src={item.image}
            alt={item.name}
            animate={{
              y: [0, -14, 0],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              relative
              z-10

              w-[220px]
              sm:w-[270px]
              lg:w-[310px]

              h-[220px]
              sm:h-[270px]
              lg:h-[310px]

              object-contain

              drop-shadow-[0_30px_35px_rgba(0,0,0,0.5)]
            "
          />

          {/* RARITY */}

          <div
            className="
              absolute
              z-20

              top-2
              right-2

              rounded-full

              border
              border-amber-400/30

              bg-amber-400/10

              px-4
              py-2

              text-sm
              font-bold
              text-amber-300
            "
          >
            ✦ {item.rarity}
          </div>

          {/* PRICE */}

          <div
            className="
              absolute
              z-20

              bottom-2
              left-1/2
              -translate-x-1/2

              flex
              items-center
              gap-2

              rounded-2xl

              border
              border-yellow-500/20

              bg-black/40

              backdrop-blur-xl

              px-5
              py-3

              font-bold
              text-yellow-300
            "
          >
            <Coins size={20} />

            {item.price}
          </div>
        </motion.div>
      </div>
    </section>
  );
}