import { useRef } from "react";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  Eye,
  LockKeyhole,
  MapPin,
} from "lucide-react";

/*
========================================
RARITY STYLES
========================================
*/

const rarityStyles = {
  Common:
    "bg-green-500/10 border-green-500/30 text-green-300",

  Rare:
    "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",

  Epic:
    "bg-purple-500/10 border-purple-500/30 text-purple-300",

  Legendary:
    "bg-orange-500/10 border-orange-500/30 text-orange-300",
};

/*
========================================
COLLECTION CARD
========================================
*/

export default function CollectionCard({
  dinosaur,
  index = 0,
  discovered = false,
  onInspect,
}) {
  const cardRef = useRef(null);

  /*
  ========================================
  PARALLAX VALUES
  ========================================
  */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 180,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 180,
    damping: 20,
  });

  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    [7, -7]
  );

  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-7, 7]
  );

  const imageX = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-12, 12]
  );

  const imageY = useTransform(
    smoothY,
    [-0.5, 0.5],
    [-8, 8]
  );

  const glowX = useTransform(
    smoothX,
    [-0.5, 0.5],
    ["20%", "80%"]
  );

  const glowY = useTransform(
    smoothY,
    [-0.5, 0.5],
    ["20%", "80%"]
  );

  /*
  ========================================
  MOUSE MOVE
  ========================================
  */

  const handleMouseMove = (event) => {
    if (!cardRef.current) {
      return;
    }

    const rectangle =
      cardRef.current.getBoundingClientRect();

    const x =
      (event.clientX - rectangle.left) /
        rectangle.width -
      0.5;

    const y =
      (event.clientY - rectangle.top) /
        rectangle.height -
      0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  /*
  ========================================
  MOUSE LEAVE
  ========================================
  */

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  /*
  ========================================
  CARD CLICK
  ========================================
  */

  const handleCardClick = () => {
    if (onInspect) {
      onInspect(dinosaur);
    }
  };

  /*
  ========================================
  LOCKED DINOSAUR
  ========================================
  */

  if (!discovered) {
    return (
      <motion.article
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: index * 0.06,
        }}
        whileHover={{
          y: -5,
        }}
        whileTap={{
          scale: 0.985,
        }}
        onClick={handleCardClick}
        className="
          group

          relative

          min-h-[460px]

          rounded-[30px]

          overflow-hidden

          bg-[#091710]/95

          border
          border-white/[0.07]

          p-5

          shadow-[0_20px_60px_rgba(0,0,0,0.3)]

          cursor-pointer

          transition
        "
      >
        {/* LOCKED PATTERN */}

        <div
          className="
            absolute
            inset-0

            opacity-[0.035]

            bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)]

            bg-[size:18px_18px]

            pointer-events-none
          "
        />

        {/* LOCKED HOVER GLOW */}

        <div
          className="
            absolute
            inset-0

            bg-red-500/0

            group-hover:bg-red-500/[0.025]

            transition

            pointer-events-none
          "
        />

        {/* IMAGE AREA */}

        <div
          className="
            relative

            h-[245px]

            rounded-[24px]

            overflow-hidden

            flex
            items-center
            justify-center

            bg-black/30

            border
            border-white/[0.06]
          "
        >
          {/* DARK GLOW */}

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute

              w-44
              h-44

              rounded-full

              bg-green-500/10

              blur-[60px]
            "
          />

          {/* SILHOUETTE */}

          <img
            src={dinosaur.image}
            alt=""
            className="
              relative
              z-10

              w-[82%]
              h-[82%]

              object-contain

              brightness-0
              opacity-20

              blur-[1px]

              select-none
              pointer-events-none
            "
          />

          {/* LOCK */}

          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            whileHover={{
              scale: 1.08,
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              z-20

              w-16
              h-16

              rounded-[22px]

              flex
              items-center
              justify-center

              bg-black/60

              border
              border-white/10

              backdrop-blur-xl

              text-white/55

              shadow-2xl

              group-hover:text-white/75
              group-hover:border-white/20

              transition
            "
          >
            <LockKeyhole size={27} />
          </motion.div>

          {/* UNKNOWN BADGE */}

          <div
            className="
              absolute
              z-20

              top-4
              right-4

              px-3
              py-1.5

              rounded-full

              bg-white/5

              border
              border-white/10

              text-[11px]
              font-bold

              uppercase
              tracking-[0.15em]

              text-white/35
            "
          >
            Undiscovered
          </div>
        </div>

        {/* LOCKED INFO */}

        <div className="pt-6">
          <p
            className="
              text-xs

              uppercase
              tracking-[0.25em]

              text-white/25

              mb-3
            "
          >
            Unknown Species
          </p>

          <h3
            className="
              title-font

              text-3xl

              text-white/45
            "
          >
            ???
          </h3>

          <p
            className="
              mt-3

              min-h-[44px]

              text-sm
              leading-relaxed

              text-white/30
            "
          >
            Complete more expeditions to uncover this
            prehistoric species.
          </p>

          {/* LEVEL REQUIREMENT */}

          <div
            className="
              mt-5

              flex
              items-center
              justify-between

              px-4
              py-3

              rounded-2xl

              bg-white/[0.03]

              border
              border-white/[0.07]

              group-hover:border-white/10

              transition
            "
          >
            <span
              className="
                text-xs

                text-white/35
              "
            >
              Discovery Requirement
            </span>

            <span
              className="
                text-sm
                font-bold

                text-white/50
              "
            >
              Level {dinosaur.discoveredAtLevel}
            </span>
          </div>
        </div>
      </motion.article>
    );
  }

  /*
  ========================================
  DISCOVERED DINOSAUR
  ========================================
  */

  return (
    <motion.article
      ref={cardRef}
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.06,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        y: -7,
      }}
      whileTap={{
        scale: 0.985,
      }}
      className="
        group

        relative

        min-h-[460px]

        rounded-[30px]

        overflow-hidden

        bg-[#0D2117]/95

        border
        border-green-500/20

        p-5

        shadow-[0_20px_60px_rgba(0,0,0,0.35)]

        cursor-pointer

        will-change-transform
      "
    >
      {/* MOVING GLOW */}

      <motion.div
        style={{
          left: glowX,
          top: glowY,
        }}
        className="
          absolute

          w-48
          h-48

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-green-400/15

          blur-[60px]

          pointer-events-none
        "
      />

      {/* IMAGE AREA */}

      <div
        className="
          relative

          h-[245px]

          rounded-[24px]

          overflow-hidden

          flex
          items-center
          justify-center

          bg-gradient-to-br
          from-green-500/10
          to-cyan-500/5

          border
          border-white/[0.06]
        "
        style={{
          transform: "translateZ(20px)",
        }}
      >
        {/* IMAGE SHADOW */}

        <motion.div
          style={{
            x: imageX,
            y: imageY,
          }}
          className="
            absolute

            bottom-7

            w-[60%]
            h-7

            rounded-full

            bg-black/50

            blur-xl
          "
        />

        {/* DINO IMAGE */}

        <motion.img
          src={dinosaur.image}
          alt={dinosaur.name}
          style={{
            x: imageX,
            y: imageY,
            transform: "translateZ(55px)",
          }}
          whileHover={{
            scale: 1.1,
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 16,
          }}
          className="
            relative
            z-10

            w-[88%]
            h-[88%]

            object-contain

            drop-shadow-[0_24px_30px_rgba(0,0,0,0.5)]

            select-none
            pointer-events-none

            will-change-transform
          "
        />

        {/* RARITY */}

        <div
          style={{
            transform: "translateZ(70px)",
          }}
          className={`
            absolute
            z-20

            top-4
            right-4

            px-3
            py-1.5

            rounded-full

            border

            text-xs
            font-bold

            ${rarityStyles[dinosaur.rarity]}
          `}
        >
          ✦ {dinosaur.rarity}
        </div>
      </div>

      {/* DINO INFO */}

      <div
        className="
          relative

          pt-6
        "
        style={{
          transform: "translateZ(30px)",
        }}
      >
        <p
          className="
            text-xs

            uppercase
            tracking-[0.25em]

            text-green-300/50

            mb-2
          "
        >
          {dinosaur.era}
        </p>

        <h3
          className="
            title-font

            text-3xl

            text-white
          "
        >
          {dinosaur.name}
        </h3>

        <p
          className="
            mt-1

            text-sm

            text-green-200/50
          "
        >
          {dinosaur.nickname}
        </p>

        {/* BOTTOM */}

        <div
          className="
            mt-5

            flex
            items-center
            justify-between

            gap-3
          "
        >
          <div
            className="
              flex
              items-center
              gap-2

              min-w-0

              text-sm

              text-white/45
            "
          >
            <MapPin
              size={16}
              className="
                shrink-0

                text-green-300/60
              "
            />

            <span className="truncate">
              {dinosaur.location}
            </span>
          </div>

          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            className="
              shrink-0

              w-11
              h-11

              rounded-xl

              flex
              items-center
              justify-center

              bg-green-500/10

              border
              border-green-500/20

              text-green-300
            "
          >
            <Eye size={18} />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}