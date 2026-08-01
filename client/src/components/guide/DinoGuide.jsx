
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
  section = "default",
  controlled = false,
  mood: controlledMood = "idle",
  message: controlledMessage = "",
  disableClick = false,
}) { /*
  =====================================
  STATE
  =====================================
  */

  const [mood, setMood] = useState("idle");

  const [message, setMessage] = useState(
    "Welcome to PaleoVerse!"
  );

  // NEW: bumps by 1 every time play() runs, even if the mood picked
  // is identical to the current one. DinoPlayer uses this in its
  // video key so it always remounts/reloads the clip -> no more
  // "video ends and just sits there frozen" bug.
  const [playToken, setPlayToken] = useState(0);

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
      console.log("▶ PLAY", nextMood);
      if (busy.current && !force) return;

      busy.current = !loopStates.includes(nextMood);

      setMood(nextMood);

      // Always increment, even for a repeated mood, so the video
      // is guaranteed to remount and play from the start.
      setPlayToken((t) => t + 1);

      setMessage(
        customMessage ||
          getRandomMessage(nextMood, section)
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
  !["idle", "standing", "lookingAround"].includes(mood)
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
  console.log("✅ ENDED", finishedMood);
  // Animation has finished, allow the next one.
  busy.current = false;

  // Controlled mode
  if (controlled) {
    if (loopStates.includes(finishedMood)) return;

    setTimeout(() => {
      play(getRandomIdleBehaviour(), controlledMessage, true);
    }, 50);

    return;
  }

  // Sleep loops forever until clicked
  if (finishedMood === "sleep") return;

  // Wakeup finished -> resume life
  if (finishedMood === "wakeup") {
    wakeupSequence.current = false;

    setTimeout(() => {
      play(getRandomIdleBehaviour());
    }, 50);

    return;
  }

  // Walking finishes by looking around once
  if (finishedMood === "walkingRight") {
    setTimeout(() => {
      play("lookingAround");
    }, 50);

    return;
  }

  // Looking around finishes by returning to idle behaviours
  if (finishedMood === "lookingAround") {
    setTimeout(() => {
      play(getRandomIdleBehaviour());
    }, 50);

    return;
  }

  // One-shot animations
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
  ];

  if (returnToIdle.includes(finishedMood)) {
    setTimeout(() => {
      play(getRandomIdleBehaviour());
    }, 50);

    return;
  }

  // Loop moods can occasionally branch out
  if (finishedMood === "idle" || finishedMood === "standing") {
    if (Math.random() < 0.35) {
      setTimeout(() => {
        play(getRandomIdleBehaviour());
      }, 50);
    }

    return;
  }

  // Safety fallback
  setTimeout(() => {
    play("idle");
  }, 50);
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
        playToken={playToken}
        onEnded={handleVideoEnded}
      />
    </div>
  );
}
