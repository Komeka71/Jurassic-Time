import { AnimatePresence, motion } from "framer-motion";

import {
  Check,
  Coins,
  PackageOpen,
  ShoppingCart,
  X,
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

export default function ShopCartDrawer({
  open,
  onClose,
  items = [],
  player,
  onEquip,
  isEquipped,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ========================================
              BACKDROP
          ======================================== */}

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
            transition={{
              duration: 0.25,
            }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-[80]

              bg-black/70

              backdrop-blur-sm
            "
          />

          {/* ========================================
              CART DRAWER
          ======================================== */}

          <motion.aside
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
            }}
            className="
              fixed
              z-[90]

              top-0
              right-0

              h-screen

              w-full
              sm:w-[460px]

              bg-[#071A11]

              border-l
              border-green-500/20

              shadow-[-30px_0_100px_rgba(0,0,0,0.55)]

              flex
              flex-col

              overflow-hidden
            "
          >
            {/* BACKGROUND GLOW */}

            <div
              className="
                absolute

                -top-28
                -right-28

                w-[350px]
                h-[350px]

                rounded-full

                bg-green-500/10

                blur-[100px]

                pointer-events-none
              "
            />

            {/* ========================================
                HEADER
            ======================================== */}

            <div
              className="
                relative
                z-10

                flex
                items-center
                justify-between

                px-6
                py-6

                border-b
                border-green-500/20
              "
            >
              <div>
                <div
                  className="
                    flex
                    items-center
                    gap-2

                    text-green-300

                    text-xs
                    font-bold

                    uppercase
                    tracking-[0.25em]
                  "
                >
                  <ShoppingCart size={15} />

                  Explorer Pack
                </div>

                <h2
                  className="
                    title-font

                    mt-2

                    text-3xl
                    text-white
                  "
                >
                  My Discoveries
                </h2>
              </div>

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
                  w-11
                  h-11

                  rounded-2xl

                  flex
                  items-center
                  justify-center

                  bg-white/5

                  border
                  border-white/10

                  text-white/70

                  hover:text-white
                  hover:border-green-500/30

                  transition
                "
                aria-label="Close explorer pack"
              >
                <X size={21} />
              </motion.button>
            </div>

            {/* ========================================
                DINO MESSAGE
            ======================================== */}

            <div
              className="
                relative
                z-10

                mx-6
                mt-5

                rounded-2xl

                border
                border-green-500/20

                bg-green-500/5

                px-5
                py-4
              "
            >
              <p
                className="
                  text-sm
                  leading-relaxed

                  text-green-100/75
                "
              >
                🦖 Look at all our shiny discoveries!
                Don't forget to equip your favourites.
              </p>
            </div>

            {/* ========================================
                ITEMS
            ======================================== */}

            <div
              className="
                relative
                z-10

                flex-1

                overflow-y-auto

                px-6
                py-5
              "
            >
              {items.length === 0 ? (
                /* ========================================
                   EMPTY CART
                ======================================== */

                <div
                  className="
                    min-h-[420px]

                    flex
                    flex-col
                    items-center
                    justify-center

                    text-center
                  "
                >
                  <motion.div
                    initial={{
                      scale: 0.8,
                      rotate: -8,
                    }}
                    animate={{
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                    }}
                    className="
                      w-20
                      h-20

                      rounded-[28px]

                      flex
                      items-center
                      justify-center

                      bg-green-500/10

                      border
                      border-green-500/20

                      text-green-300
                    "
                  >
                    <PackageOpen size={34} />
                  </motion.div>

                  <h3
                    className="
                      title-font

                      mt-5

                      text-2xl
                      text-white
                    "
                  >
                    The pack is empty.
                  </h3>

                  <p
                    className="
                      mt-2

                      max-w-[280px]

                      text-sm
                      leading-relaxed

                      text-white/45
                    "
                  >
                    Explore the prehistoric market and
                    collect something suspiciously ancient.
                  </p>

                  <motion.button
                    whileHover={{
                      scale: 1.04,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    onClick={onClose}
                    className="
                      mt-6

                      rounded-xl

                      bg-green-500

                      px-5
                      py-3

                      font-bold
                      text-[#04130B]
                    "
                  >
                    Explore Shop
                  </motion.button>
                </div>
              ) : (
                /* ========================================
                   PURCHASED ITEMS
                ======================================== */

                <div className="space-y-4">
                  {items.map((item, index) => {
                    const equipped = isEquipped(item);

                    return (
                      <motion.div
                        key={item.id}
                        initial={{
                          opacity: 0,
                          x: 30,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: index * 0.06,
                        }}
                        whileHover={{
                          x: -3,
                        }}
                        className="
                          relative

                          flex
                          gap-4

                          rounded-[24px]

                          bg-[#0D2418]

                          border
                          border-green-500/15

                          p-4

                          overflow-hidden

                          transition
                        "
                      >
                        {/* ITEM IMAGE */}

                        <div
                          className="
                            relative

                            shrink-0

                            w-24
                            h-24

                            rounded-[20px]

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
                            className="
                              w-[82%]
                              h-[82%]

                              object-contain

                              drop-shadow-[0_12px_18px_rgba(0,0,0,0.4)]
                            "
                          />
                        </div>

                        {/* ITEM INFO */}

                        <div
                          className="
                            min-w-0
                            flex-1
                          "
                        >
                          <div
                            className="
                              flex
                              items-start
                              justify-between

                              gap-2
                            "
                          >
                            <div className="min-w-0">
                              <h3
                                className="
                                  font-bold
                                  text-white

                                  truncate
                                "
                              >
                                {item.name}
                              </h3>

                              <div
                                className={`
                                  inline-flex

                                  mt-2

                                  rounded-full

                                  border

                                  px-2.5
                                  py-1

                                  text-[10px]
                                  font-bold

                                  ${rarityStyles[item.rarity]}
                                `}
                              >
                                {item.rarity}
                              </div>
                            </div>

                            <div
                              className="
                                flex
                                items-center
                                gap-1.5

                                shrink-0

                                text-yellow-300

                                text-sm
                                font-bold
                              "
                            >
                              <Coins size={15} />

                              {item.price}
                            </div>
                          </div>

                          {/* EQUIP BUTTON */}

                          <div className="mt-3">
                            {equipped ? (
                              <div
                                className="
                                  inline-flex
                                  items-center
                                  gap-2

                                  rounded-xl

                                  bg-cyan-500/10

                                  border
                                  border-cyan-400/25

                                  px-4
                                  py-2

                                  text-sm
                                  font-bold
                                  text-cyan-200
                                "
                              >
                                <Check size={16} />

                                Equipped
                              </div>
                            ) : (
                              <motion.button
                                whileHover={{
                                  scale: 1.03,
                                }}
                                whileTap={{
                                  scale: 0.96,
                                }}
                                onClick={() =>
                                  onEquip(item)
                                }
                                className="
                                  rounded-xl

                                  bg-gradient-to-r
                                  from-cyan-600
                                  to-blue-500

                                  px-4
                                  py-2

                                  text-sm
                                  font-bold
                                  text-white
                                "
                              >
                                Equip Item
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ========================================
                FOOTER
            ======================================== */}

            <div
              className="
                relative
                z-10

                border-t
                border-green-500/20

                bg-[#081D13]/95

                px-6
                py-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <div>
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.2em]

                      text-white/35
                    "
                  >
                    Items Owned
                  </p>

                  <p
                    className="
                      mt-1

                      text-xl
                      font-bold
                      text-white
                    "
                  >
                    {items.length}
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.2em]

                      text-white/35
                    "
                  >
                    Fossil Balance
                  </p>

                  <div
                    className="
                      mt-1

                      flex
                      items-center
                      justify-end
                      gap-2

                      text-xl
                      font-bold
                      text-yellow-300
                    "
                  >
                    <Coins size={19} />

                    {player?.coins || 0}
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}