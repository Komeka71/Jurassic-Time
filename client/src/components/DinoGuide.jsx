import { useCallback, useEffect, useRef, useState } from "react";

import DinoPlayer from "./dino/DinoPlayer";
import SpeechBubble from "./SpeechBubble";

const randomIdleMoods = [
  {
    mood: "lookingAround",
    message: "👀 Hmm... what's hiding over there?",
  },
  {
    mood: "eating",
    message: "🍰 Just a tiny explorer snack...",
  },
  {
    mood: "shushing",
    message: "🤫 Shhh... I think I heard something.",
  },
  {
    mood: "pointingRight",
    message: "👉 Look! Something's over there!",
  },
  {
    mood: "wave",
    message: "👋 Still with me, Explorer?",
  },
  {
    mood: "standing",
    message: "🌿 What a beautiful expedition...",
  },
];

export default function DinoGuide({
  mood = "idle",
  message = "Hi Explorer! 👋 Ready to discover dinosaurs?",
  level=1,
}) {
  const [displayMood, setDisplayMood] = useState(mood);

  const [displayMessage, setDisplayMessage] =
    useState(message);

  const sleeping = useRef(false);

  const clickCount = useRef(0);

  const sleepTimer = useRef(null);

  const idleTimer = useRef(null);

  const latestMessage = useRef(message);

  const currentMood = useRef(mood);

  /*
  ========================================
  KEEP LATEST VALUES
  ========================================
  */

  useEffect(() => {
    latestMessage.current = message;
  }, [message]);

  useEffect(() => {
    currentMood.current = displayMood;
  }, [displayMood]);

  /*
  ========================================
  CLEAR TIMERS
  ========================================
  */

  const clearTimers = useCallback(() => {
    clearTimeout(sleepTimer.current);
    clearTimeout(idleTimer.current);
  }, []);

  /*
  ========================================
  START SLEEP TIMER
  ========================================
  */

  const startSleepTimer = useCallback(() => {
    clearTimeout(sleepTimer.current);

    sleepTimer.current = setTimeout(() => {
      sleeping.current = true;

      clearTimeout(idleTimer.current);

      setDisplayMood("sleep");

      setDisplayMessage("😴 Zzz...");
    }, 35000);
  }, []);

  /*
  ========================================
  RANDOM IDLE BEHAVIOUR
  ========================================
  */

  const startIdleTimer = useCallback(() => {
    clearTimeout(idleTimer.current);

    const randomDelay =
      12000 + Math.random() * 6000;

    idleTimer.current = setTimeout(() => {
      if (sleeping.current) return;

      if (currentMood.current !== "idle") {
        return;
      }

      const randomIndex = Math.floor(
        Math.random() * randomIdleMoods.length
      );

      const behaviour =
        randomIdleMoods[randomIndex];

      setDisplayMood(behaviour.mood);

      setDisplayMessage(behaviour.message);
    }, randomDelay);
  }, []);

  /*
  ========================================
  RETURN TO IDLE
  ========================================
  */

  const returnToIdle = useCallback(() => {
    sleeping.current = false;

    setDisplayMood("idle");

    setDisplayMessage(latestMessage.current);

    startIdleTimer();

    startSleepTimer();
  }, [startIdleTimer, startSleepTimer]);

  /*
  ========================================
  QUIZ MOOD CHANGE
  ========================================
  */

  useEffect(() => {
    clearTimers();

    sleeping.current = false;

    setDisplayMood(mood);

    setDisplayMessage(message);

    if (mood === "idle") {
      startIdleTimer();
    }

    startSleepTimer();

    return clearTimers;
  }, [
    mood,
    message,
    clearTimers,
    startIdleTimer,
    startSleepTimer,
  ]);

  /*
  ========================================
  VIDEO FINISHED
  ========================================
  */

  const handleVideoEnded = (finishedMood) => {
    /*
    WAKEUP CHAIN
    */

    if (finishedMood === "wakeup") {
      setDisplayMood("wave");

      setDisplayMessage(
        "👋 I'm awake! Let's continue!"
      );

      return;
    }

    /*
    CORRECT ANSWER CHAIN
    */

    if (finishedMood === "happyJumps") {
      setDisplayMood("loveHappy");

      setDisplayMessage(
        "💚 Dino-tastic! Great answer!"
      );

      return;
    }

    /*
    EXPEDITION CELEBRATION
    */

    if (finishedMood === "celebrate") {
      setDisplayMood("loveHappy");

      setDisplayMessage(
        "💚 What an amazing expedition!"
      );

      return;
    }

    /*
    WRONG ANSWER CHAIN
    */

    if (finishedMood === "sad") {
      setDisplayMood("shushing");

      setDisplayMessage(
        "🤫 Don't worry... our secret."
      );

      return;
    }

    /*
    WALKING CHAIN
    */

    if (finishedMood === "walkingRight") {
      setDisplayMood("lookingAround");

      setDisplayMessage(
        "🔎 Let's investigate this place!"
      );

      return;
    }

    /*
    QUIZ LOOKING AROUND CHAIN
    */

    if (
      finishedMood === "lookingAround" &&
      mood === "lookingAround"
    ) {
      setDisplayMood("pointingRight");

      setDisplayMessage(
        "👀 I think our next discovery is over there!"
      );

      return;
    }

    /*
    ALL OTHER ONE-TIME VIDEOS
    */

    returnToIdle();
  };

  /*
  ========================================
  DINO CLICK
  ========================================
  */

  const handleClick = () => {
    clearTimers();

    /*
    WAKE SLEEPING DINO
    */

    if (sleeping.current) {
      sleeping.current = false;

      setDisplayMood("wakeup");

      setDisplayMessage("😄 Oh! I'm awake!");

      return;
    }

    clickCount.current += 1;

    /*
    CLICK 10
    */

    if (clickCount.current >= 10) {
      clickCount.current = 0;

      setDisplayMood("eating");

      setDisplayMessage("🍰 Snack break!");

      return;
    }

    /*
    CLICK 5
    */

    if (clickCount.current === 5) {
      setDisplayMood("roar");

      setDisplayMessage("🦖 ROAAARR!");

      return;
    }

    /*
    CLICK 3
    */

    if (clickCount.current === 3) {
      setDisplayMood("angry");

      setDisplayMessage(
        "😤 Hey! I'm trying to help!"
      );

      return;
    }

    /*
    NORMAL CLICK
    */

    setDisplayMood("happy");

    setDisplayMessage(
      "🦖 Hehe! That tickles!"
    );
  };

  /*
  ========================================
  CLEANUP
  ========================================
  */

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  return (
    <div className="relative inline-block">
      {/* SPEECH BUBBLE */}

      <div
        className="
          absolute
          left-[55%]
          -translate-x-1/2
          -top-8
          z-30
        "
      >
        <SpeechBubble
  text={displayMessage}
  level={level}
/>
      </div>

      {/* DINO */}

      <div onClick={handleClick}>
        <DinoPlayer
          mood={displayMood}
          onEnded={handleVideoEnded}
        />
      </div>
    </div>
  );
}