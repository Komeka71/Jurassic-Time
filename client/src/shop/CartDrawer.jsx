import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Coins,
  PackageOpen,
  ShoppingBag,
  X,
} from "lucide-react";

export default function CartDrawer({
  open,
  onClose,
  items = [],
  player,
  onEquip,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}

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

              z-[80]

              bg-black/70

              backdrop-blur-md
            "
          />

          {/* DRAWER */}

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
              stiffness: 240,
              damping: 28,
            }}
            className="
              fixed

              top-0
              right-0
              bottom-0

              z-[90]

              w-full
              sm:w-[440px]

              bg-[#071A11]/95

              border-l
              border-green-500/20

              backdrop-blur-2xl

              shadow-[-30px_0_100px_rgba(0,0,0,0.55)]

              flex
              flex-col
            "
          >
            {/* HEADER */}

            <div
              className="
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

                    mb-2
                  "
                >
                  <ShoppingBag size={15} />

                  Explorer Inventory
                </div>

                <h2
                  className="
                    title-font

                    text-3xl

                    text-white
                  "
                >
                  My Dino Pack
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
                "
              >
                <X size={21} />
              </motion.button>
            </div>

            {/* COIN BALANCE */}

            <div
              className="
                mx-6
                mt-5

                px-5
                py-4

                rounded-2xl

                flex
                items-center
                justify-between

                bg-yellow-500/5

                border
                border-yellow-500/20
              "
            >
              <span className="text-white/50">
                Fossil Coin Balance
              </span>

              <div
                className="
                  flex
                  items-center
                  gap-2

                  text-yellow-300

                  font-black
                "
              >
                <Coins size={19} />

                {player?.coins || 0}
              </div>
            </div>

            {/* ITEMS */}

            <div
              className="
                flex-1

                overflow-y-auto

                px-6
                py-6
              "
            >
              {items.length === 0 ? (
                <div
                  className="
                    h-full

                    flex
                    flex-col
                    items-center
                    justify-center

                    text-center

                    px-8
                  "
                >
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
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

                      mb-6
                    "
                  >
                    <PackageOpen size={34} />
                  </motion.div>

                  <h3
                    className="
                      title-font

                      text-2xl

                      mb-3
                    "
                  >
                    Your pack is empty.
                  </h3>

                  <p
                    className="
                      max-w-[280px]

                      text-sm
                      leading-relaxed

                      text-white/45
                    "
                  >
                    Dino says you should probably collect
                    something before the next expedition.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => {
                    const equipped =
                      player?.equippedItems?.[
                        item.category?.toLowerCase()
                      ] === item.id;

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
                        className="
                          group

                          flex
                          items-center
                          gap-4

                          p-4

                          rounded-[24px]

                          bg-[#0D2518]

                          border
                          border-green-500/15

                          transition

                          hover:border-green-500/30
                        "
                      >
                        {/* IMAGE */}

                        <div
                          className="
                            w-24
                            h-24

                            shrink-0

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
                            className="
                              w-[82%]
                              h-[82%]

                              object-contain

                              drop-shadow-[0_12px_18px_rgba(0,0,0,0.4)]
                            "
                          />
                        </div>

                        {/* INFO */}

                        <div
                          className="
                            flex-1
                            min-w-0
                          "
                        >
                          <p
                            className="
                              text-[10px]

                              uppercase
                              tracking-[0.2em]

                              text-green-300/50

                              mb-1
                            "
                          >
                            {item.category}
                          </p>

                          <h3
                            className="
                              font-bold

                              text-lg

                              truncate
                            "
                          >
                            {item.name}
                          </h3>

                          <div
                            className="
                              flex
                              items-center
                              gap-2

                              mt-2

                              text-yellow-300

                              text-sm
                              font-bold
                            "
                          >
                            <Coins size={15} />

                            {item.price}
                          </div>
                        </div>

                        {/* EQUIP */}

                        {equipped ? (
                          <div
                            className="
                              w-11
                              h-11

                              shrink-0

                              rounded-xl

                              flex
                              items-center
                              justify-center

                              bg-cyan-500/15

                              border
                              border-cyan-400/30

                              text-cyan-300
                            "
                            title="Equipped"
                          >
                            <Check size={19} />
                          </div>
                        ) : (
                          <motion.button
                            whileHover={{
                              scale: 1.05,
                            }}
                            whileTap={{
                              scale: 0.95,
                            }}
                            onClick={() =>
                              onEquip(item)
                            }
                            className="
                              shrink-0

                              px-4
                              py-2.5

                              rounded-xl

                              bg-gradient-to-r
                              from-cyan-600
                              to-blue-500

                              text-sm
                              font-bold
                            "
                          >
                            Equip
                          </motion.button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* FOOTER */}

            <div
              className="
                px-6
                py-5

                border-t
                border-green-500/20

                bg-black/10
              "
            >
              <p
                className="
                  text-center

                  text-xs

                  text-white/35
                "
              >
                🦖 Dino counted {items.length}{" "}
                {items.length === 1 ? "treasure" : "treasures"} in
                your pack.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}