import { AnimatePresence, motion } from "framer-motion";

import {
  Check,
  Coins,
  LockKeyhole,
  X,
  Sparkles,
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

export default function ItemInspectModal({
  item,
  onClose,
  player,
  onBuy,
  onEquip,
}) {
  const purchased =
    item &&
    player.purchasedItems?.includes(item.id);

  const equipped =
    item &&
    player.equippedItems?.[
      item.category?.toLowerCase()
    ] === item.id;

  const canAfford =
    item && player.coins >= item.price;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          onClick={onClose}
          className="
            fixed
            inset-0
            z-[100]

            flex
            items-center
            justify-center

            p-4
            sm:p-6

            bg-black/75

            backdrop-blur-xl
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 35,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 20,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 22,
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              relative

              w-full
              max-w-4xl

              max-h-[90vh]
              overflow-y-auto

              rounded-[34px]

              bg-gradient-to-br
              from-[#082116]
              via-[#0B2519]
              to-[#13230D]

              border
              border-green-500/30

              shadow-[0_40px_120px_rgba(0,0,0,0.7)]

              overflow-hidden
            "
          >
            {/* BACKGROUND GLOW */}

            <div
              className="
                absolute
                -top-32
                -right-32

                w-96
                h-96

                rounded-full

                bg-green-500/15

                blur-[100px]

                pointer-events-none
              "
            />

            {/* CLOSE BUTTON */}

            <motion.button
              whileHover={{
                scale: 1.08,
                rotate: 5,
              }}
              whileTap={{
                scale: 0.92,
              }}
              onClick={onClose}
              className="
                absolute
                z-30

                top-5
                right-5

                w-12
                h-12

                rounded-2xl

                flex
                items-center
                justify-center

                bg-black/25

                border
                border-white/10

                text-white/70

                backdrop-blur-xl

                hover:text-white
              "
            >
              <X size={22} />
            </motion.button>

            {/* CONTENT */}

            <div
              className="
                relative
                z-10

                grid
                grid-cols-1
                lg:grid-cols-[0.9fr_1.1fr]

                gap-8

                p-6
                sm:p-8
                lg:p-10
              "
            >
              {/* IMAGE SIDE */}

              <div
                className="
                  relative

                  min-h-[330px]

                  rounded-[28px]

                  flex
                  items-center
                  justify-center

                  bg-green-500/5

                  border
                  border-green-500/20

                  overflow-hidden
                "
              >
                <div
                  className="
                    absolute

                    w-64
                    h-64

                    rounded-full

                    bg-green-400/15

                    blur-[70px]
                  "
                />

                <motion.img
                  initial={{
                    scale: 0.8,
                    rotate: -5,
                  }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 15,
                    delay: 0.1,
                  }}
                  whileHover={{
                    scale: 1.08,
                    rotate: 3,
                  }}
                  src={item.image}
                  alt={item.name}
                  className="
                    relative
                    z-10

                    w-[82%]
                    h-[82%]

                    max-h-[330px]

                    object-contain

                    drop-shadow-[0_30px_35px_rgba(0,0,0,0.5)]
                  "
                />

                {/* RARITY */}

                <div
                  className={`
                    absolute
                    z-20

                    top-5
                    left-5

                    px-4
                    py-2

                    rounded-full

                    border

                    text-sm
                    font-bold

                    ${rarityStyles[item.rarity]}
                  `}
                >
                  ✦ {item.rarity}
                </div>
              </div>

              {/* INFO SIDE */}

              <div
                className="
                  flex
                  flex-col
                  justify-center
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2

                    text-green-300

                    text-xs
                    font-bold

                    uppercase
                    tracking-[0.3em]

                    mb-5
                  "
                >
                  <Sparkles size={16} />

                  Dino Vault Discovery
                </div>

                <h2
                  className="
                    title-font

                    text-4xl
                    sm:text-5xl

                    leading-tight

                    mb-5
                  "
                >
                  {item.name}
                </h2>

                <p
                  className="
                    text-white/60

                    text-base
                    sm:text-lg

                    leading-relaxed

                    mb-8
                  "
                >
                  {item.description}
                </p>

                {/* PRICE BOX */}

                <div
                  className="
                    flex
                    items-center
                    justify-between

                    gap-4

                    px-5
                    py-5

                    rounded-2xl

                    bg-yellow-500/5

                    border
                    border-yellow-500/25

                    mb-4
                  "
                >
                  <span
                    className="
                      text-white/50
                      font-semibold
                    "
                  >
                    Fossil Coin Price
                  </span>

                  <div
                    className="
                      flex
                      items-center
                      gap-2

                      text-yellow-300

                      text-xl
                      font-bold
                    "
                  >
                    <Coins size={21} />

                    {item.price}
                  </div>
                </div>

                {/* BALANCE */}

                <p
                  className="
                    text-sm
                    text-white/45

                    mb-7
                  "
                >
                  Your balance:{" "}
                  <span
                    className="
                      text-yellow-300
                      font-bold
                    "
                  >
                    {player.coins} coins
                  </span>
                </p>

                {/* ACTION BUTTON */}

                {equipped ? (
                  <button
                    disabled
                    className="
                      w-full

                      py-4

                      rounded-2xl

                      flex
                      items-center
                      justify-center
                      gap-3

                      bg-cyan-500/10

                      border
                      border-cyan-400/30

                      text-cyan-200

                      text-base
                      font-bold
                    "
                  >
                    <Check size={20} />

                    Currently Equipped
                  </button>
                ) : purchased ? (
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    onClick={() => {
                      onEquip(item);
                      onClose();
                    }}
                    className="
                      w-full

                      py-4

                      rounded-2xl

                      bg-gradient-to-r
                      from-cyan-600
                      to-blue-500

                      text-white

                      text-base
                      font-bold

                      shadow-lg
                      shadow-cyan-500/20
                    "
                  >
                    Equip Item
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={
                      canAfford
                        ? {
                            scale: 1.02,
                          }
                        : undefined
                    }
                    whileTap={
                      canAfford
                        ? {
                            scale: 0.97,
                          }
                        : undefined
                    }
                    onClick={() => {
                      if (canAfford) {
                        onBuy(item);
                      }
                    }}
                    disabled={!canAfford}
                    className={`
                      w-full

                      py-4

                      rounded-2xl

                      flex
                      items-center
                      justify-center
                      gap-3

                      text-base
                      font-bold

                      transition

                      ${
                        canAfford
                          ? `
                            bg-gradient-to-r
                            from-green-600
                            to-emerald-500

                            text-white

                            shadow-lg
                            shadow-green-500/20
                          `
                          : `
                            bg-white/5

                            border
                            border-white/10

                            text-white/30

                            cursor-not-allowed
                          `
                      }
                    `}
                  >
                    {!canAfford ? (
                      <>
                        <LockKeyhole size={20} />

                        Need{" "}
                        {item.price - player.coins}{" "}
                        More Coins
                      </>
                    ) : (
                      <>
                        <Coins size={20} />

                        Unlock for {item.price} Coins
                      </>
                    )}
                  </motion.button>
                )}

                <p
                  className="
                    mt-4

                    text-center

                    text-xs
                    text-white/30
                  "
                >
                  🦖 Dino says this is probably safe.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}