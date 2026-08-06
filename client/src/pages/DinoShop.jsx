import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import CartAnimation from "../shop/CartAnimation";
import CartDrawer from "../shop/CartDrawer";
import ShopDino from "../pages/ShopDino";
import { useAuth } from "../context/AuthContext";
import { Coins, Menu } from "lucide-react";

import SideMenu from "../components/SideMenu";

import shopItems from "../data/shopItems";

import ShopHero from "../shop/ShopHero";
import ItemInspectModal from "../shop/ItemInspectModal";
import ParallaxShopCard from "../shop/ParallaxShopCard";


/*
========================================
API CONFIG
========================================
*/

const API_URL = "http://localhost:3000";

// const USERNAME = user?.username;

/*
========================================
CATEGORIES
========================================
*/

const categories = [
  "All",
  "Gear",
  "Dino",
  "Relic",
];


/*
========================================
DEFAULT PLAYER
========================================
*/
const defaultPlayer = {
  username: "",

  coins: 0,

  level: 1,

  purchasedItems: [],

  equippedItems: {},
};

/*
========================================
DINO SHOP
========================================
*/

export default function DinoShop() {

  /*
  ========================================
  STATE
  ========================================
  */
 const { user } = useAuth();
const USERNAME = user?.username;
  const [menuOpen, setMenuOpen] =
    useState(false);


  const [cartOpen, setCartOpen] =
    useState(false);


  const [category, setCategory] =
    useState("All");


  const [
    showCartAnimation,
    setShowCartAnimation,
  ] = useState(false);


  const [
    purchaseInProgress,
    setPurchaseInProgress,
  ] = useState(false);


  const [
    equipInProgress,
    setEquipInProgress,
  ] = useState(false);


  const [
    loadingPlayer,
    setLoadingPlayer,
  ] = useState(true);


  const [
    dinoMood,
    setDinoMood,
  ] = useState("shop");


  const [
    dinoMessage,
    setDinoMessage,
  ] = useState(
    "🦖 Welcome to my shop! I definitely priced everything scientifically."
  );


  const [
    selectedItem,
    setSelectedItem,
  ] = useState(null);


  const [
    player,
    setPlayer,
  ] = useState(defaultPlayer);


  /*
  ========================================
  DINO REACTION
  ========================================
  */

  const reactDino = (
    mood,
    message,
    resetAfter = 3500
  ) => {

    setDinoMood(mood);

    setDinoMessage(message);


    if (resetAfter) {

      setTimeout(() => {

        setDinoMood("idle");


        setDinoMessage(
          "👀 Psst... I found something strange in the fossil vault."
        );

      }, resetAfter);

    }

  };


  /*
  ========================================
  LOAD PLAYER FROM BACKEND
  ========================================
  */

  useEffect(() => {

    let ignore = false;


    const loadPlayer = async () => {

      try {

        setLoadingPlayer(true);


if (!user) {
  setLoadingPlayer(false);
  return;
}

const response = await fetch(
  `${API_URL}/api/user/${user.username}`
);

        if (!response.ok) {

          throw new Error(
            "Could not load player data"
          );

        }


        const data = await response.json();


        if (ignore) {

          return;

        }


        setPlayer({
          ...defaultPlayer,

          ...(data.stats || {}),

          purchasedItems:
            data.stats?.purchasedItems || [],

          equippedItems:
            data.stats?.equippedItems || {},
        });


        reactDino(
          "shop",
          "🦖 Shop records loaded! The fossil accountant approves.",
          2500
        );

      }

      catch (error) {

        console.error(
          "LOAD SHOP PLAYER ERROR:",
          error
        );


        if (!ignore) {

          reactDino(
            "confused",
            "🤔 Hmm... I lost the shop records. Is the expedition server awake?",
            0
          );

        }

      }

      finally {

        if (!ignore) {

          setLoadingPlayer(false);

        }

      }

    };


    loadPlayer();


    return () => {

      ignore = true;

    };
}, [user]);

  /*
  ========================================
  FEATURED ITEM
  ========================================
  */

  const featuredItem =
    shopItems.find(
      (item) => item.featured
    ) || shopItems[0];


  /*
  ========================================
  FILTER ITEMS
  ========================================
  */

  const filteredItems =
    category === "All"
      ? shopItems
      : shopItems.filter(
          (item) =>
            item.category?.toLowerCase() ===
            category.toLowerCase()
        );


  /*
  ========================================
  PURCHASED SHOP ITEMS
  ========================================
  */

  const purchasedShopItems =
    shopItems.filter((item) =>
      player.purchasedItems?.includes(
        item.id
      )
    );


  /*
  ========================================
  PURCHASE CHECK
  ========================================
  */

  const isPurchased = (itemId) =>
    player.purchasedItems?.includes(
      itemId
    );


  /*
  ========================================
  EQUIPPED CHECK
  ========================================
  */

  const isEquipped = (item) =>
    player.equippedItems?.[
      item.category?.toLowerCase()
    ] === item.id;


  /*
  ========================================
  BUY ITEM
  ========================================
  */

  const buyItem = async (item) => {
if (!user) {
  reactDino(
    "confused",
    "🔒 Login to save purchases and use your coins."
  );

  return;
}
    if (
      purchaseInProgress ||
      loadingPlayer
    ) {

      return;

    }


    if (isPurchased(item.id)) {

      reactDino(
        "happy",
        "🦖 You already own that! My memory is excellent. Usually."
      );


      return;

    }


    if (player.coins < item.price) {

      reactDino(
        "angry",
        `😤 You need ${
          item.price - player.coins
        } more fossil coins!`
      );


      return;

    }


    try {

      setPurchaseInProgress(true);


      setSelectedItem(null);


      /*
      ========================================
      DINO PURCHASE REACTION
      ========================================
      */

      reactDino(
        "happyJumps",
        `✨ OOOH! ${item.name}?! Excellent prehistoric taste.`,
        0
      );


      setShowCartAnimation(true);


      /*
      ========================================
      BUY THROUGH BACKEND
      ========================================
      */
const response = await fetch(
  `${API_URL}/api/user/${user.username}/shop/buy`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            itemId: item.id,
          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Purchase failed"
        );

      }


      /*
      ========================================
      SYNC PLAYER WITH MONGODB RESPONSE
      ========================================
      */

      setPlayer({
        ...defaultPlayer,

        ...(data.stats || {}),

        purchasedItems:
          data.stats?.purchasedItems || [],

        equippedItems:
          data.stats?.equippedItems || {},
      });


      /*
      ========================================
      PURCHASE SUCCESS
      ========================================
      */

      reactDino(
        "celebrate",
        "🎉 PURCHASE COMPLETE! The fossil economy survives another day!"
      );

    }

    catch (error) {

      console.error(
        "BUY SHOP ITEM ERROR:",
        error
      );


      const message =
        error.message ||
        "Purchase failed";


      if (
        message
          .toLowerCase()
          .includes("not enough")
      ) {

        reactDino(
          "angry",
          "😤 Not enough fossil coins! Back to the expedition!"
        );

      }

      else if (
        message
          .toLowerCase()
          .includes("already purchased")
      ) {

        reactDino(
          "happy",
          "🦖 You already own that treasure!"
        );

      }

      else {

        reactDino(
          "confused",
          `🤔 Shop problem: ${message}`
        );

      }

    }

    finally {

      setTimeout(() => {

        setShowCartAnimation(false);

      }, 1400);


      setTimeout(() => {

        setPurchaseInProgress(false);

      }, 1800);

    }

  };


  /*
  ========================================
  EQUIP ITEM
  ========================================
  */

  const equipItem = async (item) => {
if (!user) {
  reactDino(
    "confused",
    "🔒 Login to equip purchased items."
  );

  return;
}
    if (
      !item ||
      equipInProgress ||
      loadingPlayer
    ) {

      return;

    }


    if (!isPurchased(item.id)) {

      reactDino(
        "confused",
        "🤔 We should probably own that before wearing it."
      );


      return;

    }


    if (isEquipped(item)) {

      reactDino(
        "happy",
        `💚 ${item.name} is already equipped!`
      );


      return;

    }


    try {

      setEquipInProgress(true);


      reactDino(
        "thinking",
        `🤔 Equipping ${item.name}... prehistoric fashion is serious business.`,
        0
      );


      /*
      ========================================
      EQUIP THROUGH BACKEND
      ========================================
      */
const response = await fetch(
  `${API_URL}/api/user/${user.username}/shop/equip`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            itemId: item.id,
          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Could not equip item"
        );

      }


      /*
      ========================================
      SYNC PLAYER WITH MONGODB RESPONSE
      ========================================
      */

      setPlayer({
        ...defaultPlayer,

        ...(data.stats || {}),

        purchasedItems:
          data.stats?.purchasedItems || [],

        equippedItems:
          data.stats?.equippedItems || {},
      });


      /*
      ========================================
      EQUIP SUCCESS
      ========================================
      */

      reactDino(
        "happyJumps",
        `💚 ${item.name} equipped! Looking extremely expedition-ready.`
      );

    }

    catch (error) {

      console.error(
        "EQUIP SHOP ITEM ERROR:",
        error
      );


      reactDino(
        "confused",
        `🤔 I couldn't equip that. ${error.message}`
      );

    }

    finally {

      setEquipInProgress(false);

    }

  };


  /*
  ========================================
  UI
  ========================================
  */

  return (

    <div
      className="
        relative

        min-h-screen

        bg-[#06130D]

        text-white
      "
    >

      {/* ========================================
          CART ANIMATION
      ======================================== */}

      <CartAnimation
        itemCount={
          player.purchasedItems?.length || 0
        }

        isReacting={
          showCartAnimation
        }

        onClick={() => {

          setCartOpen(true);


          reactDino(
            "happy",

            `🛒 You have ${
              player.purchasedItems?.length || 0
            } treasures in your Dino Pack!`
          );

        }}
      />


      {/* ========================================
          BACKGROUND
      ======================================== */}

      <div
        className="
          fixed
          inset-0

          bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_35%)]

          pointer-events-none
        "
      />


      <div
        className="
          fixed

          -top-40
          right-10

          w-[500px]
          h-[500px]

          rounded-full

          bg-green-500/10

          blur-[160px]

          pointer-events-none
        "
      />


      {/* ========================================
          SIDE MENU
      ======================================== */}

      <SideMenu
        open={menuOpen}

        onClose={() =>
          setMenuOpen(false)
        }

        level={player.level || 1}
      />


      {/* ========================================
          HEADER
      ======================================== */}

      <header
        className="
          relative
          z-20

          sticky
          top-0

          min-h-20

          px-4
          sm:px-6
          lg:px-10

          flex
          items-center
          justify-between

          bg-[#081A12]/90

          backdrop-blur-2xl

          border-b
          border-green-500/20
        "
      >

        {/* HEADER LEFT */}

        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          <motion.button
            whileHover={{
              scale: 1.08,
            }}

            whileTap={{
              scale: 0.92,
            }}

            onClick={() =>
              setMenuOpen(true)
            }

            className="
              w-12
              h-12

              rounded-2xl

              flex
              items-center
              justify-center

              bg-green-500/10

              border
              border-green-500/30
            "
          >

            <Menu size={22} />

          </motion.button>


          <div>

            <h1
              className="
                title-font

                text-2xl
                sm:text-3xl
              "
            >
              Dino Shop
            </h1>


            <p
              className="
                hidden
                sm:block

                text-xs

                uppercase
                tracking-[0.25em]

                text-green-300/60
              "
            >
              Prehistoric Supplies
            </p>

          </div>

        </div>


        {/* COINS */}

        <motion.div
          key={player.coins}

          initial={{
            scale: 1.15,
          }}

          animate={{
            scale: 1,
          }}

          className="
            flex
            items-center
            gap-3

            px-5
            py-3

            rounded-2xl

            bg-[#14271D]

            border
            border-yellow-500/30
          "
        >

          <Coins
            size={21}
            color="#FFD54F"
          />


          <span
            className="
              font-bold
              text-lg
            "
          >
            {loadingPlayer
              ? "..."
              : player.coins}
          </span>

        </motion.div>

      </header>


      {/* ========================================
          CONTENT
      ======================================== */}

      <main
        className="
          relative
          z-10

          max-w-[1400px]

          mx-auto

          px-4
          sm:px-6
          lg:px-10

          py-10
        "
      >

        {/* ========================================
            SHOP HERO + DINO
        ======================================== */}

        <div
          className="
            relative

            grid
            grid-cols-1

            lg:grid-cols-[1fr_360px]

            items-end

            gap-6

            mb-10
          "
        >

          <ShopHero
            item={featuredItem}

            onViewItem={(item) => {

              setSelectedItem(item);


              reactDino(
                "thinking",

                `🤔 ${item.name}... a fascinating prehistoric financial decision.`
              );

            }}
          />


          <div
            className="
              hidden
              lg:flex

              items-end
              justify-center

              min-h-[430px]
            "
          >

            <ShopDino
              mood={dinoMood}

              message={dinoMessage}
            />

          </div>

        </div>


        {/* ========================================
            CATEGORIES
        ======================================== */}

        <div
          className="
            flex
            gap-3

            overflow-x-auto

            pb-3
            mb-8
          "
        >

          {categories.map((item) => (

            <motion.button
              key={item}

              whileTap={{
                scale: 0.96,
              }}

              onClick={() => {

                setCategory(item);


                const messages = {

                  All:
                    "👀 Everything?! Bold strategy, Explorer.",

                  Gear:
                    "🎒 Gear! Very useful for not getting eaten.",

                  Dino:
                    "🦖 DINO SECTION! Objectively the best section.",

                  Relic:
                    "🏺 Ancient relics... please don't lick them.",

                };


                reactDino(
                  item === "Dino"
                    ? "loveHappy"
                    : "shop",

                  messages[item]
                );

              }}

              className={`
                shrink-0

                px-5
                py-3

                rounded-2xl

                font-semibold

                border

                transition

                ${
                  category === item
                    ? `
                      bg-green-500

                      border-green-300

                      text-[#07130D]

                      shadow-lg
                      shadow-green-500/20
                    `
                    : `
                      bg-white/5

                      border-white/10

                      text-white/65

                      hover:text-white

                      hover:border-green-500/30
                    `
                }
              `}
            >

              {item}

            </motion.button>

          ))}

        </div>


        {/* ========================================
            SHOP GRID
        ======================================== */}

        <div
          className="
            grid

            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4

            gap-5

            w-full
          "
        >

          {filteredItems.map(
            (item, index) => (

              <ParallaxShopCard
                key={item.id}

                item={item}

                index={index}

                purchased={
                  isPurchased(item.id)
                }

                equipped={
                  isEquipped(item)
                }

                canAfford={
                  !loadingPlayer &&
                  player.coins >= item.price
                }

                onInspect={(
                  selectedItem
                ) => {

                  setSelectedItem(
                    selectedItem
                  );


                  reactDino(
                    "thinking",

                    `🤔 ${selectedItem.name}... Dino is evaluating the scientific necessity.`
                  );

                }}

                onBuy={buyItem}

                onEquip={equipItem}
              />

            )
          )}

        </div>

      </main>


      {/* ========================================
          ITEM INSPECT MODAL
      ======================================== */}

      <ItemInspectModal
        item={selectedItem}

        onClose={() =>
          setSelectedItem(null)
        }

        player={player}

        onBuy={buyItem}

        onEquip={equipItem}
      />


      {/* ========================================
          CART DRAWER
      ======================================== */}

      <CartDrawer
        open={cartOpen}

        onClose={() =>
          setCartOpen(false)
        }

        items={purchasedShopItems}

        player={player}

        onEquip={equipItem}
      />

    </div>

  );

}