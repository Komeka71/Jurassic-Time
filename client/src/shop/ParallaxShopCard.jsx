import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  Check,
  Coins,
  LockKeyhole,
} from "lucide-react";

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

export default function ParallaxShopCard({
  item,
  index,
  purchased,
  equipped,
  canAfford,
  onInspect,
  onBuy,
  onEquip,
}) {
  const cardRef = useRef(null);

  // --------------------------------------------------
  // PARALLAX
  // --------------------------------------------------

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [10, -10]),
    {
      stiffness: 180,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
    {
      stiffness: 180,
      damping: 20,
    }
  );

  const glowX = useTransform(
    mouseX,
    [-0.5, 0.5],
    ["20%", "80%"]
  );

  const glowY = useTransform(
    mouseY,
    [-0.5, 0.5],
    ["20%", "80%"]
  );

  // --------------------------------------------------
  // MOUSE MOVE
  // --------------------------------------------------

  const handleMouseMove = (event) => {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // --------------------------------------------------
  // BUTTON ACTION
  // --------------------------------------------------

  const handleButtonClick = (event) => {
    // Don't let the card's onClick fire.
    event.stopPropagation();

    // Already equipped → unequip
    if (equipped) {
      onEquip?.(item);
      return;
    }

    // Purchased → equip
    if (purchased) {
      onEquip?.(item);
      return;
    }

    // Not purchased but affordable → buy
    if (canAfford) {
      onBuy?.(item);
      return;
    }

    // Not affordable → do absolutely nothing
  };

  // --------------------------------------------------
  // BUTTON STATE
  // --------------------------------------------------

  const buttonClasses = equipped
    ? `
      bg-red-500/10
      border
      border-red-500/30
      text-red-300
      hover:bg-red-500/20
      hover:border-red-400/40
      cursor-pointer
    `
    : purchased
      ? `
        bg-cyan-500
        text-[#06130D]
        hover:bg-cyan-400
        cursor-pointer
      `
      : canAfford
        ? `
          bg-green-500
          text-[#06130D]
          hover:bg-green-400
          cursor-pointer
        `
        : `
          bg-white/5
          border
          border-white/10
          text-white/35
          cursor-not-allowed
          opacity-70
        `;

  return (
    <motion.div
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
        delay: index * 0.05,
        duration: 0.4,
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onInspect?.(item)}
      className="
        group
        relative
        rounded-[28px]
        bg-[#0E2117]/90
        border
        border-green-500/20
        p-5
        overflow-hidden
        shadow-[0_20px_60px_rgba(0,0,0,0.3)]
        cursor-pointer
        will-change-transform
      "
    >
      {/* ==========================================
          MOVING GLOW
      ========================================== */}

      <motion.div
        style={{
          left: glowX,
          top: glowY,
        }}
        className="
          absolute
          w-56
          h-56
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-green-400/10
          blur-[70px]
          pointer-events-none
        "
      />

      {/* ==========================================
          ITEM PREVIEW
      ========================================== */}

      <div
        style={{
          transform: "translateZ(35px)",
        }}
        className="
          relative
          h-44
          rounded-[22px]
          flex
          items-center
          justify-center
          bg-gradient-to-br
          from-green-500/10
          to-cyan-500/5
          border
          border-white/5
          overflow-hidden
        "
      >
        <motion.img
          src={item.image}
          alt={item.name}
          whileHover={{
            scale: 1.12,
            rotate: 4,
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 16,
          }}
          draggable={false}
          className="
            w-[78%]
            h-[78%]
            object-contain
            drop-shadow-[0_18px_25px_rgba(0,0,0,0.35)]
            select-none
            pointer-events-none
          "
        />

        {/* RARITY */}

        <div
          className={`
            absolute
            top-3
            right-3
            px-3
            py-1.5
            rounded-full
            border
            text-xs
            font-bold
            ${rarityStyles[item.rarity] || rarityStyles.Common}
          `}
        >
          {item.rarity}
        </div>
      </div>

      {/* ==========================================
          ITEM INFO
      ========================================== */}

      <div
        style={{
          transform: "translateZ(25px)",
        }}
        className="
          relative
          pt-5
        "
      >
        {/* CATEGORY */}

        <p
          className="
            text-xs
            uppercase
            tracking-[0.2em]
            text-green-300/50
            mb-2
          "
        >
          {item.category}
        </p>

        {/* NAME */}

        <h3
          className="
            text-xl
            font-bold
            mb-2
            text-white
          "
        >
          {item.name}
        </h3>

        {/* DESCRIPTION */}

        <p
          className="
            min-h-[48px]
            text-sm
            leading-relaxed
            text-white/55
          "
        >
          {item.description}
        </p>

        {/* ==========================================
            CARD BOTTOM
        ========================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            mt-5
          "
        >
          {/* PRICE */}

          <div
            className="
              flex
              items-center
              gap-2
              text-yellow-300
              font-bold
            "
          >
            <Coins size={18} />

            <span>
              {item.price}
            </span>
          </div>

          {/* ========================================
              SHOP ACTION BUTTON
          ======================================== */}

          <motion.button
            type="button"
            whileHover={
              !(!canAfford && !purchased && !equipped)
                ? {
                    scale: 1.04,
                    y: -1,
                  }
                : undefined
            }
            whileTap={
              !(!canAfford && !purchased && !equipped)
                ? {
                    scale: 0.95,
                  }
                : undefined
            }
            onClick={handleButtonClick}
            disabled={
              !canAfford &&
              !purchased &&
              !equipped
            }
            className={`
              min-w-[118px]
              px-4
              py-2.5
              rounded-xl
              flex
              items-center
              justify-center
              gap-2
              text-sm
              font-bold
              transition-all
              duration-200
              ${buttonClasses}
            `}
          >
            {/* EQUIPPED */}

            {equipped ? (
              <>
                <Check size={16} />
                Unequip
              </>
            ) : purchased ? (
              /* PURCHASED */

              <>
                <Check size={16} />
                Equip
              </>
            ) : canAfford ? (
              /* CAN AFFORD */

              <>
                <Coins size={16} />
                Buy
              </>
            ) : (
              /* CANNOT AFFORD */

              <>
                <LockKeyhole size={16} />
                Need Coins
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}