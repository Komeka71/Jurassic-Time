// components/chat/Chatbot.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleMore } from "lucide-react";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function Chatbot({
  currentDinosaur,
}) {
  const [open, setOpen] = useState(false);
const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
  {
    role: "assistant",
    text:
      "Hello Explorer! 👋 I'm Paleo, your AI museum guide. Ask me anything about dinosaurs, fossils, evolution or the specimen you're viewing.",
  },
]);
const previousDinosaur = useRef(currentDinosaur);
const suggestionMap = {
  "T-Rex": [
    "🦖 How fast could it run?",
    "🦷 How strong was its bite?",
    "🥩 What did it eat?",
    "⚔️ Did it hunt alone?",
  ],

  Triceratops: [
    "🦕 Why did it have horns?",
    "🌿 What did it eat?",
    "🛡️ How did it defend itself?",
    "🦖 Could it defeat a T-Rex?",
  ],

  Brachiosaurus: [
    "🌿 What did it eat?",
    "📏 How tall was it?",
    "🦒 Why was its neck so long?",
    "🥚 How big were its eggs?",
  ],

  Pteranodon: [
    "🪽 Could it really fly?",
    "🐟 What did it eat?",
    "🌊 Did it live near oceans?",
    "🦖 Was it actually a dinosaur?",
  ],

  Mosasaurus: [
    "🌊 How fast could it swim?",
    "🦈 What did it hunt?",
    "📏 How large was it?",
    "🦎 Was it really a dinosaur?",
  ],
};
const exhibitGreetings = {
  "T-Rex":
    "🦖 Welcome to the Tyrannosaurus rex exhibit! This apex predator ruled the Late Cretaceous. Ask me anything about its speed, bite, or hunting habits.",

  Triceratops:
    "🦕 Welcome to the Triceratops exhibit! Discover how this giant herbivore used its horns and frill for defense and display.",

  Brachiosaurus:
    "🌿 Welcome to the Brachiosaurus exhibit! One of the tallest dinosaurs ever to walk the Earth. Ask me about its size, diet, or lifestyle.",

  Pteranodon:
    "🪽 Welcome to the Pteranodon exhibit! Although often mistaken for a dinosaur, it was actually a flying reptile. Ask me how it flew!",

  Mosasaurus:
    "🌊 Welcome to the Mosasaurus exhibit! Dive into the oceans of the Late Cretaceous and learn about this giant marine reptile.",
};
const suggestions =
  suggestionMap[currentDinosaur] ?? [
    "🦖 Tell me about dinosaurs",
    "🌍 Why did dinosaurs go extinct?",
    "🦴 Explain this skeleton",
    "🪶 Which dinosaurs had feathers?",
  ];
useEffect(() => {
  if (previousDinosaur.current === currentDinosaur) return;

  previousDinosaur.current = currentDinosaur;

  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      text:
        exhibitGreetings[currentDinosaur] ??
        `👋 Welcome to the ${currentDinosaur} exhibit!`,
    },
  ]);
}, [currentDinosaur]);
const handleSend = async (text) => {
  if (!text.trim()) return;

  // Show user's message immediately
  setMessages((prev) => [
    ...prev,
    {
      role: "user",
      text,
    },
  ]);

  setTyping(true);

  try {
    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  message: text,
  currentDinosaur,
}),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: data.reply,
      },
    ]);
  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: "Sorry, something went wrong. Please try again.",
      },
    ]);
  } finally {
    setTyping(false);
  }
};

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            fixed
            bottom-8
            right-8
            z-50

            w-14
            h-14

            rounded-full

            bg-[#101617]/95
            backdrop-blur-xl

            border
            border-emerald-500/20

            flex
            items-center
            justify-center

            shadow-[0_0_35px_rgba(16,185,129,.15)]

            hover:scale-105
            hover:border-emerald-400
            hover:shadow-[0_0_55px_rgba(16,185,129,.30)]

            transition-all
            duration-300
          "
        >
          <MessageCircleMore
            size={26}
            strokeWidth={2.2}
            className="text-emerald-400"
          />
        </button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            transition={{
  type: "spring",
  stiffness: 320,
  damping: 28,
}}
            className="
              fixed
              bottom-4
left-1/2
-translate-x-1/2

md:bottom-6

xl:right-6
xl:left-auto
xl:translate-x-0
xl:bottom-24

              w-[calc(100vw-2rem)]
max-w-[440px]

h-[75vh]
max-h-[620px]
rounded-[30px]
lg:rounded-[34px]
              bg-[#0B1113]/88
             backdrop-blur-2xl
              border
              border-white/10

              shadow-[0_25px_90px_rgba(0,0,0,.65)]

              overflow-hidden

              z-50

              flex
              flex-col
            "
          >
            <ChatHeader onClose={() => setOpen(false)} />

            <div className="flex-1 min-h-0">
              <ChatMessages
  messages={messages}
  typing={typing}
  suggestions={suggestions}
  onSuggestionClick={handleSend}
/>
            </div>

            <ChatInput onSend={handleSend} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}