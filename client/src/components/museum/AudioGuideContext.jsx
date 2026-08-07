import { createContext, useContext, useEffect, useRef, useState } from "react";

const AudioGuideCtx = createContext(null);

/**
 * Shared audio controller for the museum pages.
 * One audio element is shared between the floating guide
 * and the immersive virtual tour.
 */
export function AudioGuideProvider({ src, children }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [tourActive, setTourActive] = useState(false);

  // Reset whenever museum changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    audio.volume = 0.45;
    audio.playbackRate = 1;

    setIsPlaying(false);
    setHasPlayedOnce(false);
    setIsBuffering(true);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setPlaybackRate(1);
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const onLoaded = () => {
      setDuration(audio.duration || 0);
      setIsBuffering(false);
    };

    const onWaiting = () => setIsBuffering(true);

    const onCanPlay = () => setIsBuffering(false);

    const onPlay = () => {
      setIsPlaying(true);
      setHasPlayedOnce(true);
    };

    const onPause = () => {
      setIsPlaying(false);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setProgress(0);
      audio.currentTime = 0;
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);

      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [src]);

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const seekTo = (percent) => {
    const audio = audioRef.current;

    if (!audio || !duration) return;

    audio.currentTime = (percent / 100) * duration;
  };

  const skipBy = (seconds) => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = Math.min(
      Math.max(audio.currentTime + seconds, 0),
      duration
    );
  };

  const cyclePlaybackRate = () => {
    const audio = audioRef.current;

    if (!audio) return;

    const rates = [1, 1.25, 1.5, 0.75];

    const next =
      rates[(rates.indexOf(playbackRate) + 1) % rates.length];

    audio.playbackRate = next;
    setPlaybackRate(next);
  };

  return (
    <AudioGuideCtx.Provider
      value={{
        audioRef,
        isPlaying,
        hasPlayedOnce,
        isBuffering,
        progress,
        duration,
        currentTime,
        playbackRate,
        togglePlay,
        seekTo,
        skipBy,
        cyclePlaybackRate,
        tourActive,
        setTourActive,
      }}
    >
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
      />

      {children}
    </AudioGuideCtx.Provider>
  );
}

export function useAudioGuide() {
  const ctx = useContext(AudioGuideCtx);

  if (!ctx) {
    throw new Error(
      "useAudioGuide must be used within AudioGuideProvider"
    );
  }

  return ctx;
}