// components/chat/Chatbot.jsx
import { useState, useEffect, useRef } from "react";
import { useGuide } from "../../context/GuideContext";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleMore } from "lucide-react";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

// ---------------------------------------------------------------------------
// Dinosaur name helpers
//
// Different parts of the app set the "current dinosaur" using different
// formats: lowercase slugs from the Hero/Timeline ("trex", "brachiosaurus"),
// "earth" from the Map overview, or full species names from the Map sites
// and Research Hub discoveries ("Tyrannosaurus Rex", "Spinosaurus", ...).
// These helpers normalize all of that into one consistent, readable label so
// the guide never gets confused about "what is this dino".
// ---------------------------------------------------------------------------
const DINO_DISPLAY_OVERRIDES = {
  trex: "T-Rex",
  triceratops: "Triceratops",
  brachiosaurus: "Brachiosaurus",
  pteranodon: "Pteranodon",
  mosasaurus: "Mosasaurus",
  coelophysis: "Coelophysis",
};

function normalizeDinoKey(raw) {
  if (!raw) return "";
  return String(raw)
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
}

function formatDinoName(raw) {
  if (!raw) return "this dinosaur";

  const key = normalizeDinoKey(raw);
  if (DINO_DISPLAY_OVERRIDES[key]) return DINO_DISPLAY_OVERRIDES[key];

  // Title-case each word, preserving whatever spacing was already there.
  return String(raw)
    .split(" ")
    .map((word) =>
      word.length ? word[0].toUpperCase() + word.slice(1) : word
    )
    .join(" ");
}

const CURATED_SUGGESTIONS = {
  trex: [
    "🦖 How fast could it run?",
    "🦷 How strong was its bite?",
    "🥩 What did it eat?",
    "⚔️ Did it hunt alone?",
  ],
  triceratops: [
    "🦕 Why did it have horns?",
    "🌿 What did it eat?",
    "🛡️ How did it defend itself?",
    "🦖 Could it defeat a T-Rex?",
  ],
  brachiosaurus: [
    "🌿 What did it eat?",
    "📏 How tall was it?",
    "🦒 Why was its neck so long?",
    "🥚 How big were its eggs?",
  ],
  pteranodon: [
    "🪽 Could it really fly?",
    "🐟 What did it eat?",
    "🌊 Did it live near oceans?",
    "🦖 Was it actually a dinosaur?",
  ],
  mosasaurus: [
    "🌊 How fast could it swim?",
    "🦈 What did it hunt?",
    "📏 How large was it?",
    "🦎 Was it really a dinosaur?",
  ],
};

const CURATED_EXHIBIT_GREETINGS = {
  trex: "🦖 Welcome to the Tyrannosaurus rex exhibit! This apex predator ruled the Late Cretaceous. Ask me anything about its speed, bite, or hunting habits.",
  triceratops:
    "🦕 Welcome to the Triceratops exhibit! Discover how this giant herbivore used its horns and frill for defense and display.",
  brachiosaurus:
    "🌿 Welcome to the Brachiosaurus exhibit! One of the tallest dinosaurs ever to walk the Earth. Ask me about its size, diet, or lifestyle.",
  pteranodon:
    "🪽 Welcome to the Pteranodon exhibit! Although often mistaken for a dinosaur, it was actually a flying reptile. Ask me how it flew!",
  mosasaurus:
    "🌊 Welcome to the Mosasaurus exhibit! Dive into the oceans of the Late Cretaceous and learn about this giant marine reptile.",
};

const GENERIC_SUGGESTIONS = [
  "🦖 Tell me about dinosaurs",
  "🌍 Why did dinosaurs go extinct?",
  "🦴 Explain this skeleton",
  "🪶 Which dinosaurs had feathers?",
];

function getSuggestionsFor(rawDino) {
  const key = normalizeDinoKey(rawDino);

  if (!rawDino || key === "earth") return GENERIC_SUGGESTIONS;
  if (CURATED_SUGGESTIONS[key]) return CURATED_SUGGESTIONS[key];

  // Any dinosaur we don't have curated questions for (map sites, research
  // discoveries, etc.) still gets relevant, correctly-named suggestions.
  const name = formatDinoName(rawDino);
  return [
    `🦖 What did the ${name} eat?`,
    `📏 How big was the ${name}?`,
    `🦴 What makes the ${name} special?`,
    `🌍 When did it live?`,
  ];
}

function getExhibitGreetingFor(rawDino) {
  const key = normalizeDinoKey(rawDino);
  if (CURATED_EXHIBIT_GREETINGS[key]) return CURATED_EXHIBIT_GREETINGS[key];

  const name = formatDinoName(rawDino);
  return `👋 Welcome to the ${name} exhibit! Ask me anything about it.`;
}

// Adds an assistant message, but silently skips it if it would be an exact
// duplicate of the message already at the end of the conversation. This
// keeps the guide from repeating itself if an effect fires more than once
// for the same reason (e.g. React StrictMode's dev-only double effect run,
// or a context value settling a moment after mount).
function appendAssistantMessage(setMessages, text) {
  if (!text) return;

  setMessages((prev) => {
    const last = prev[prev.length - 1];
    if (last && last.role === "assistant" && last.text === text) {
      return prev;
    }
    return [...prev, { role: "assistant", text }];
  });
}

export default function Chatbot({ personalization, page, userName }) {
  const [open, setOpen] = useState(false);
  const { currentPage, currentDinosaur, lastAction } = useGuide();

  // A page can pass its own identity explicitly so the guide's very first
  // welcome message never has to guess from shared context before that
  // context has caught up (see the mount-order race described in
  // appendAssistantMessage below). That prop is only used to seed the
  // INITIAL value, though — after mount, genuine changes to the shared
  // GuideContext (e.g. scrolling from Hero into the Quiz/Map/Research
  // preview sections) must still be picked up reactively.
  const [effectivePage, setEffectivePage] = useState(page || currentPage);

  useEffect(() => {
    if (currentPage && currentPage !== effectivePage) {
      setEffectivePage(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const displayName = userName || "Explorer";

  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);

  const getWelcomeMessage = () => {
    switch (effectivePage) {
      case "hero":
      case "home":
        return `👋 Welcome to the Paleora homepage, ${displayName}! I'm Paleo, your AI expedition guide. Try hovering over the skeleton for bone facts, or ask me anything about it.`;

      case "timeline":
      case "timelinePreview":
        return `⏳ Welcome to the Timeline, ${displayName}! Scroll through the eras to see who lived when — ask me what's special about any era or dinosaur you find.`;

      case "quiz":
      case "quizPreview":
        return `🧠 Ready for the Quiz Arena, ${displayName}? I'll give hints without spoiling the answers — good luck!`;

      case "map":
      case "mapPreview":
        return `🗺️ Welcome to the Map, ${displayName}! Click a glowing pin to explore a real fossil site — I can explain any discovery you find.`;

      case "research":
      case "researchPreview":
        return `🔬 Welcome to the Research Hub, ${displayName}! Browse discoveries, submit a journal entry, or ask me a real paleontology question.`;

      case "miniGames":
      case "miniGamesPreview":
        return `🎮 Ready to play, ${displayName}? I can explain the rules for any game — just ask.`;

      default:
        return `👋 Hello, ${displayName}! I'm Paleo, your AI dinosaur guide in Paleora.`;
    }
  };

  const previousDinosaur = useRef(currentDinosaur);
  const previousPage = useRef(null);
  const previousAction = useRef("");

  const suggestions = getSuggestionsFor(currentDinosaur);

  // Greet whenever the exhibit's dinosaur changes.
  useEffect(() => {
    if (previousDinosaur.current === currentDinosaur || !currentDinosaur) {
      return;
    }
    previousDinosaur.current = currentDinosaur;

    // "earth" represents the map overview, not a specific exhibit.
    if (normalizeDinoKey(currentDinosaur) === "earth") return;

    appendAssistantMessage(setMessages, getExhibitGreetingFor(currentDinosaur));
  }, [currentDinosaur]);

  // Greet whenever the guide is looking at a new page/section.
  useEffect(() => {
    if (previousPage.current === effectivePage) return;
    previousPage.current = effectivePage;

    appendAssistantMessage(setMessages, getWelcomeMessage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectivePage]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    // Show user's message immediately
    setMessages((prev) => [...prev, { role: "user", text }]);

    setTyping(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat` /*ll*/, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          currentDinosaur,
          dinosaurLabel: formatDinoName(currentDinosaur),

          page: effectivePage,
          userName,

          purpose:
            personalization?.purpose || personalization?.preferences?.purpose,

          interests:
            personalization?.interests ||
            personalization?.preferences?.interests,

          guide: personalization?.guide?.companion,

          hero: personalization?.hero?.dinosaur,
        }),
      });

      if (!res.ok) {
        throw new Error(`Chat request failed with status ${res.status}`);
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            data.reply ||
            "Hmm, I didn't quite catch that. Could you try asking again?",
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

  useEffect(() => {
    if (!lastAction) return;
    if (previousAction.current === lastAction) return;
    previousAction.current = lastAction;

    const reactions = {
      quizCompleted:
        "🎉 Nice work! You finished a quiz. Ready for another challenge?",
      discoveryOpened:
        "🔍 That's a fascinating fossil! Ask me if you'd like more details.",
      gameWon: "🏆 Great job! You're becoming a real paleontologist.",
      gameLost: "💪 Don't worry! Every fossil hunter improves with practice.",
      timelineVisited:
        "⏳ Every era tells a different story. Feel free to ask about anything you discover.",
      mapVisited:
        "🗺️ You've entered the prehistoric world map. I can explain any location you explore.",
      researchVisited:
        "🔬 Welcome to the research archive! I'm here if you have questions.",
      specimenChanged: `🦖 Excellent choice! Let's explore the ${formatDinoName(
        currentDinosaur
      )}.`,
    };

    const reactionText = reactions[lastAction];
    if (!reactionText) return;

    appendAssistantMessage(setMessages, reactionText);
  }, [lastAction, currentDinosaur]);

  const hasUserMessage = messages.some((msg) => msg.role === "user");

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
                showSuggestions={!hasUserMessage}
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
