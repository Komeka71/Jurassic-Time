import { createContext, useContext, useEffect, useRef, useState } from "react";

const AudioGuideCtx = createContext(null);

/**
 * Owns the single <audio> element for a museum page. Both the floating
 * Audio Guide button and the immersive Virtual Tour's embedded transport
 * controls read/drive this same context, so there is never more than one
 * narration track playing and both surfaces always agree on its state.
 */
export function AudioGuideProvider({ src, children }) {
  const audioRef = useRef(null);
  const autoplayHandled = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRateState] = useState(1);
  const [tourActive, setTourActive] = useState(false);

  useEffect(() => {
    autoplayHandled.current = false;
    setIsPlaying(false);
    setHasPlayedOnce(false);
    setIsBuffering(true);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setPlaybackRateState(1);
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
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
    const onPause = () => setIsPlaying(false);
    const onEnd = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnd);
    };
  }, [src]);

  // Auto-play a single pass the moment the page is entered. Browsers block
  // unmuted autoplay without a gesture, so we try immediately, then fall
  // back to the very first tap/click/key anywhere on the page. Either way
  // this fires once — after that, playback is entirely button-controlled.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;

    const attemptAutoplay = async () => {
      if (autoplayHandled.current) return;
      try {
        await audio.play();
        autoplayHandled.current = true;
        removeGestureListeners();
      } catch {
        // Blocked — wait for the first real interaction below.
      }
    };

    const onFirstGesture = () => {
      if (autoplayHandled.current) return;
      attemptAutoplay();
    };

    const removeGestureListeners = () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
    };

    attemptAutoplay();
    window.addEventListener("pointerdown", onFirstGesture);
    window.addEventListener("keydown", onFirstGesture);

    return removeGestureListeners;
  }, [src]);

  const togglePlay = async () => {
    autoplayHandled.current = true;
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch {}
    }
  };

  const seekTo = (pct) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = (pct / 100) * duration;
    setProgress(pct);
  };

  const skipBy = (seconds) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = Math.min(Math.max(audio.currentTime + seconds, 0), duration);
  };

  const cyclePlaybackRate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const rates = [1, 1.25, 1.5, 0.75];
    const next = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    audio.playbackRate = next;
    setPlaybackRateState(next);
  };

  const value = {
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
  };

  return (
    <AudioGuideCtx.Provider value={value}>
      <audio ref={audioRef} src={src} preload="auto" />
      {children}
    </AudioGuideCtx.Provider>
  );
}

export function useAudioGuide() {
  const ctx = useContext(AudioGuideCtx);
  if (!ctx) {
    throw new Error("useAudioGuide must be used within an AudioGuideProvider");
  }
  return ctx;
}
