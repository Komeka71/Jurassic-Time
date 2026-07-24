

import { useCallback, useEffect, useRef, useState } from "react";

import DinoPlayer from "./DinoPlayer";
import SpeechBubble from "./SpeechBubble";

import {
  getRandomIdleBehaviour,
  getRandomClickReaction,
  loopStates,
} from "./behaviourEngine";

import { getRandomMessage } from "./messages";

export default function DinoGuide({
  controlled = false,
  mood: controlledMood = "idle",
  message: controlledMessage = "",
  disableClick = false,
}) {  /*
  =====================================
  STATE
  =====================================
  */

  const [mood, setMood] = useState("idle");

  const [message, setMessage] = useState(
    "Welcome to PaleoVerse!"
  );

  /*
  =====================================
  REFS
  =====================================
  */

  const sleeping = useRef(false);

  const busy = useRef(false);

  const hasWelcomed = useRef(false);

  const lastInteraction = useRef(Date.now());

  const clickTimeout = useRef(null);

  const lastClick = useRef(0);

  const wakeupSequence = useRef(false);
const lastControlledMood = useRef("");
  /*
  =====================================
  PLAY
  =====================================
  */

  const play = useCallback(
    (
      nextMood,
      customMessage = null,
      force = false
    ) => {
      if (busy.current && !force) return;

      busy.current = !loopStates.includes(nextMood);

      setMood(nextMood);

      setMessage(
        customMessage ||
          getRandomMessage(nextMood)
      );
    },
    []
  );

  /*
  =====================================
  INITIAL GREETING
  =====================================
  */

useEffect(() => {
  if (controlled) return;

  if (hasWelcomed.current) return;

  hasWelcomed.current = true;

  play("wave", "Welcome to PaleoVerse!");
}, [play, controlled]);

  /*
  =====================================
  SLEEP TIMER
  =====================================
  */

  useEffect(() => {
    if (controlled) return;
    const timer = setInterval(() => {
      if (sleeping.current) return;

      if (busy.current) return;

      const inactive =
        Date.now() -
        lastInteraction.current;

      if (inactive > 30000) {
        sleeping.current = true;

        play("sleep");
      }
    }, 1000);

    return () => clearInterval(timer);
}, [play, controlled]);
  /*
  =====================================
  AMBIENT LIFE
  =====================================
  */

  useEffect(() => {
    if (controlled) return;
    const timer = setInterval(() => {
      if (sleeping.current) return;

      if (busy.current) return;

      if (
        mood !== "idle" &&
        mood !== "standing"
      )
        return;

      if (Math.random() < 0.35) {
        play(getRandomIdleBehaviour());
      }
    }, 12000);

    return () => clearInterval(timer);
}, [mood, play, controlled]);
  /*
  =====================================
  USER INTERACTION
  =====================================
  */

  const interact = () => {
    lastInteraction.current = Date.now();

    if (sleeping.current) {
      sleeping.current = false;
      // play(wakeupSequence,null,false);
    }
  };
//   const interact = () => {
//   lastInteraction.current = Date.now();
// };
    /*
  =====================================
  VIDEO FINISHED
  =====================================
  */

  const handleVideoEnded = (finishedMood) => {
if (controlled) {
  busy.current = false;

  if (loopStates.includes(finishedMood)) return;

  const next = getRandomIdleBehaviour();

  setTimeout(() => {
    play(next, controlledMessage, true);
  }, 50);

  return;
}
    // Sleep loops forever
    if (finishedMood === "sleep") return;

    /*
    -------------------------
    Wakeup sequence
    -------------------------
    sleep
      ↓
    wakeup
      ↓
    lookingAround
      ↓
    wave
      ↓
    idle
    */

    if (finishedMood === "wakeup") {
  wakeupSequence.current = false;

  // Play a random behaviour only AFTER wakeup finishes
  play(getRandomIdleBehaviour());

  return;
}

    // if (finishedMood === "lookingAround") {
    //   if (wakeupSequence.current) {
    //     play("wave");
    //   } else {
    //     play(getRandomIdleBehaviour());
    //   }
    //   return;
    // }

    // if (finishedMood === "wave") {
    //   wakeupSequence.current = false;
    //   play("idle");
    //   return;
    // }
if (finishedMood === "lookingAround") {
  play(getRandomIdleBehaviour());
  return;
}
    /*
    -------------------------
    Walking
    -------------------------
    */

    if (finishedMood === "walkingRight") {
      play("lookingAround");
      return;
    }

    /*
    -------------------------
    Return to idle behaviours
    -------------------------
    */

    const returnToIdle = [
      "thinking",
      "happy",
      "happyJumps",
      "loveHappy",
      "celebrate",
      "angry",
      "sad",
      "shushing",
      "roar",
      "eating",
      "pointingRight",
      "camp",
    ];

    if (returnToIdle.includes(finishedMood)) {
      play(getRandomIdleBehaviour());
      return;
    }

    /*
    -------------------------
    Looping moods
    -------------------------
    */

    if (
      finishedMood === "idle" ||
      finishedMood === "standing"
    ) {
      play(getRandomIdleBehaviour());
      return;
    }

    play("idle");
  };

  /*
  =====================================
  CLICK
  =====================================
  */

  const handleClick = () => {
if (controlled || disableClick) return;
    // Wake from sleep immediately
    if (sleeping.current) {
      sleeping.current = false;
      play("wakeup", null, true);
      return;
    }
    interact();

    const now = Date.now();

    // Double click
    if (now - lastClick.current < 300) {
      clearTimeout(clickTimeout.current);

      lastClick.current = 0;

      const angryPool = [
        "angry",
        "shushing",
        "roar",
      ];

      play(
        angryPool[
          Math.floor(
            Math.random() * angryPool.length
          )
        ],
        null,
        true
      );

      return;
    }

    lastClick.current = now;

    clickTimeout.current = setTimeout(() => {
      play(
        getRandomClickReaction(),
        null,
        true
      );
    }, 300);
  };
useEffect(() => {
  if (!controlled) return;

  if (controlledMood !== lastControlledMood.current) {
    lastControlledMood.current = controlledMood;
    play(controlledMood, controlledMessage, true);
  } else {
    setMessage(controlledMessage);
  }
}, [controlled, controlledMood, controlledMessage, play]);
 /*
  =====================================
  RENDER
  =====================================
  */

  return (
    <div
      className="relative inline-block cursor-pointer select-none"
      onClick={handleClick}
    >
      <div
        className="
          absolute
          left-1/2
-translate-x-1/2
-top-16
          z-20
          absolute
        "
      >
        <SpeechBubble text={message} />
      </div>

      <DinoPlayer
        mood={mood}
        onEnded={handleVideoEnded}
      />
    </div>
  );
}

