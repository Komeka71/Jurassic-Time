import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuth } from "../context/AuthContext";
import clickSound from "../assets/sounds/click.mp3";
import coinSound from "../assets/sounds/coin.mp3";
import correctSound from "../assets/sounds/correct.mp3";
import discoverSound from "../assets/sounds/discover.mp3";
import equipSound from "../assets/sounds/equip.mp3";
// import jungleAmbience from "../assets/sounds/jungle-ambience.mp3";
import levelUpSound from "../assets/sounds/levelup.mp3";
import purchaseSound from "../assets/sounds/purchase.mp3";
import rewardSound from "../assets/sounds/reward.mp3";
import wrongSound from "../assets/sounds/wrong.mp3";
const AudioContext = createContext(null);

// const USER
const effectSources = {
  click: clickSound,
  coin: coinSound,
  correct: correctSound,
  discover: discoverSound,
  equip: equipSound,
  levelup: levelUpSound,
  purchase: purchaseSound,
  reward: rewardSound,
  wrong: wrongSound,
};

export function AudioProvider({ children }) {
const { user } = useAuth();
  const [musicEnabled, setMusicEnabled] =
    useState(true);

  const [effectsEnabled, setEffectsEnabled] =
    useState(true);

  const [preferencesLoaded, setPreferencesLoaded] =
    useState(false);


  const activeSoundsRef = useRef([]);
const backgroundMusicRef = useRef(null);

  /*
  ========================================
  LOAD SOUND PREFERENCES FROM BACKEND
  ========================================
  */

  useEffect(() => {

    const loadSoundPreferences = async () => {

      try {

if (!user) {
  setPreferencesLoaded(true);
  return;
}

const response = await fetch(
  `/api/user/${encodeURIComponent(user.username)}`
);


        if (!response.ok) {

          throw new Error(
            "Could not load sound preferences"
          );

        }


        const data = await response.json();


        const preferences =
          data.stats?.soundPreferences;


        if (preferences) {

          if (
            typeof preferences.music ===
            "boolean"
          ) {

            setMusicEnabled(
              preferences.music
            );

          }


          if (
            typeof preferences.effects ===
            "boolean"
          ) {

            setEffectsEnabled(
              preferences.effects
            );

          }

        }

      } catch (error) {

        console.error(
          "LOAD SOUND PREFERENCES ERROR:",
          error
        );

      } finally {

        setPreferencesLoaded(true);

      }

    };


    loadSoundPreferences();
}, [user]);
// useEffect(() => {
//   const music = new Audio(jungleAmbience);

//   music.loop = true;
//   music.volume = 0.35;

//   backgroundMusicRef.current = music;

//   return () => {
//     music.pause();
//     music.currentTime = 0;
//   };
// }, []);
useEffect(() => {
  if (!preferencesLoaded) return;

  const music = backgroundMusicRef.current;

  if (!music) return;

  if (musicEnabled) {
    music.play().catch(() => {});
  } else {
    music.pause();
  }
}, [musicEnabled, preferencesLoaded]);

useEffect(() => {
  return () => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current.currentTime = 0;
    }

    activeSoundsRef.current.forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });

    activeSoundsRef.current = [];
  };
}, []);
  /*
  ========================================
  PLAY SOUND EFFECT
  ========================================
  */

  const playEffect = (
    soundName,
    volume = 0.7
  ) => {

    /*
    Do not play sounds until the player's
    saved preferences have loaded.
    */

    if (!preferencesLoaded) {
      return;
    }


    if (!effectsEnabled) {
      return;
    }


    const source =
      effectSources[soundName];


    if (!source) {

      console.warn(
        `Unknown sound effect: ${soundName}`
      );

      return;

    }


    const audio =
      new Audio(source);


    audio.volume =
      Math.min(
        Math.max(volume, 0),
        1
      );


    activeSoundsRef.current.push(
      audio
    );


    const removeSound = () => {

      activeSoundsRef.current =
        activeSoundsRef.current.filter(
          (item) => item !== audio
        );

    };


    audio.addEventListener(
      "ended",
      removeSound
    );


    audio.addEventListener(
      "error",
      removeSound
    );


    audio
      .play()
      .catch((error) => {

        removeSound();


        console.warn(
          "Could not play sound:",
          error
        );

      });

  };


  /*
  ========================================
  TOGGLE MUSIC
  ========================================
  */

  const toggleMusic = () => {

    setMusicEnabled(
      (current) => !current
    );

  };


  /*
  ========================================
  TOGGLE EFFECTS
  ========================================
  */

  const toggleEffects = () => {

    setEffectsEnabled(
      (current) => !current
    );

  };


  /*
  ========================================
  APPLY SOUND PREFERENCES
  ========================================
  */

  const applySoundPreferences = (
    preferences
  ) => {

    if (!preferences) {
      return;
    }


    if (
      typeof preferences.music ===
      "boolean"
    ) {

      setMusicEnabled(
        preferences.music
      );

    }


    if (
      typeof preferences.effects ===
      "boolean"
    ) {

      setEffectsEnabled(
        preferences.effects
      );

    }

  };


  /*
  ========================================
  CONTEXT VALUE
  ========================================
  */

  const value = {

    musicEnabled,

    effectsEnabled,

    preferencesLoaded,

    playEffect,

    toggleMusic,

    toggleEffects,

    setMusicEnabled,

    setEffectsEnabled,

    applySoundPreferences,

  };


  return (

    <AudioContext.Provider
      value={value}
    >

      {children}

    </AudioContext.Provider>

  );

}


export function useAudio() {

  const context =
    useContext(AudioContext);


  if (!context) {

    throw new Error(
      "useAudio must be used inside AudioProvider"
    );

  }


  return context;

}