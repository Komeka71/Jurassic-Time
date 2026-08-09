import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  ChevronRight,
  ChevronLeft,
  X,
  Loader2,
  Pause,
  Play,
  PartyPopper,
  RotateCcw,
  MapPin,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Gauge,
} from "lucide-react";
import { useAudioGuide } from "./AudioGuideContext.jsx";
import { useGuide } from "../../context/GuideContext"; // adjust path to match actual location relative to this file

const clip = (text, max = 150) => {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max).trim()}…` : text;
};

// Every id below matches a real section id rendered in MuseumPage.jsx —
// this is what keeps the tour from jumping to nowhere or stalling.
function buildSteps(museum) {
  const collection = museum.collections?.[0];
  const exhibit = museum.featuredExhibits?.[0];

  return [
    {
      id: "hero",
      label: "Welcome",
      meta: "Introduction",
      caption: `Begin a guided journey through ${museum.name}.`,
      image: museum.heroImage,
    },
    {
      id: "about",
      label: "About the Institution",
      meta: "About",
      caption: clip(museum.about),
      image: museum.heroImage,
    },
    {
      id: "history",
      label: "How It Came To Be",
      meta: "History",
      caption: clip(museum.history),
      image: museum.gallery?.[0] || museum.heroImage,
    },
    {
      id: "collections",
      label: collection?.title || "Collections",
      meta: "Collections",
      caption: clip(collection?.description) || "Discover rare fossils preserved for scientific research.",
      image: collection?.image || museum.heroImage,
    },
    {
      id: "featured-exhibit",
      label: exhibit?.name || "Featured Exhibit",
      meta: exhibit?.age || "Featured Exhibit",
      caption: clip(exhibit?.discoveryStory) || "Meet the museum's most iconic fossil discovery.",
      image: exhibit?.image || museum.heroImage,
    },
    {
      id: "timeline",
      label: "Discovery Through Time",
      meta: "Timeline",
      caption:
        clip(museum.timeline?.[museum.timeline.length - 1]?.event) ||
        "Travel across millions of years of dinosaur history.",
      image: museum.gallery?.[1] || museum.heroImage,
    },
    {
      id: "gallery",
      label: "Gallery",
      meta: "Gallery",
      caption: "Explore breathtaking museum galleries from every angle.",
      image: museum.gallery?.[2] || museum.heroImage,
    },
    {
      id: "visit-information",
      label: "Plan Your Visit",
      meta: museum.visitInfo?.hours || "Visit Information",
      caption: clip(museum.visitInfo?.tip) || "Everything you need before planning your visit.",
      image: museum.heroImage,
    },
  ];
}

// idle -> loading -> touring -> complete -> (idle | touring on restart)
export default function VirtualTour({ museum, stepDuration = 7000 }) {
  const steps = useMemo(() => buildSteps(museum), [museum]);

  const {
    audioRef,
    isPlaying,
    isBuffering,
    progress,
    duration,
    currentTime,
    playbackRate,
    togglePlay,
    skipBy,
    cyclePlaybackRate,
    setTourActive,
  } = useAudioGuide();

  // Drives DinoGuide's position (right normally, left while the tour overlay is open)
  const { setTourActive: setGuideTourActive } = useGuide();

  const [phase, setPhase] = useState("idle");
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const loadingTimerRef = useRef(null);

  const clearTimer = () => timerRef.current && clearTimeout(timerRef.current);
  const clearLoadingTimer = () => loadingTimerRef.current && clearTimeout(loadingTimerRef.current);

  const isTouring = phase === "touring";
  const isLoading = phase === "loading";
  const isComplete = phase === "complete";
  const isOverlayOpen = isTouring || isLoading || isComplete;

  // Let the floating audio guide button (AudioGuideContext) AND the
  // DinoGuide toggle (GuideContext) know to step aside while the
  // immersive overlay (with its own transport controls) is open.
  useEffect(() => {
    setTourActive(isOverlayOpen);
    setGuideTourActive(isOverlayOpen);
    return () => {
      setTourActive(false);
      setGuideTourActive(false);
    };
  }, [isOverlayOpen, setTourActive, setGuideTourActive]);

  const goToStep = useCallback(
    (index, dir = 1) => {
      const step = steps[index];
      if (!step) return;
      setDirection(dir);
      setZoom(1);
      const el = document.getElementById(step.id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setStepIndex(index);
    },
    [steps]
  );

  // Auto-advance while touring, unless the visitor has paused it.
  useEffect(() => {
    if (phase !== "touring" || isPaused) return;
    clearTimer();
    timerRef.current = setTimeout(() => {
      if (stepIndex >= steps.length - 1) {
        setPhase("complete");
      } else {
        goToStep(stepIndex + 1, 1);
      }
    }, stepDuration);
    return clearTimer;
  }, [phase, isPaused, stepIndex, steps.length, stepDuration, goToStep]);

  useEffect(() => () => {
    clearTimer();
    clearLoadingTimer();
  }, []);

  // Keyboard controls while the immersive tour is open.
  useEffect(() => {
    if (!isTouring) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") nextStep();
      else if (e.key === "ArrowLeft") prevStep();
      else if (e.key === "Escape") closeTour();
      else if (e.key === " ") {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouring, stepIndex]);

  // Sync document fullscreen state (in case the visitor presses Esc, etc.)
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const beginTouring = () => {
    setIsPaused(false);
    setZoom(1);
    setPhase("touring");
    goToStep(0, 1);
  };

  const startTour = () => {
    if (phase === "loading") return;
    clearLoadingTimer();
    setStepIndex(0);
    setPhase("loading");
    // A deliberate cinematic beat so the tour opens like a title card
    // rather than an abrupt jump-cut into the first stop.
    loadingTimerRef.current = setTimeout(beginTouring, 1400);
  };

  const restartTour = () => startTour();

  const closeTour = () => {
    clearTimer();
    clearLoadingTimer();
    setIsPaused(false);
    setZoom(1);
    setPhase("idle");
    if (document.fullscreenElement) document.exitFullscreen?.();
  };

  const finishTour = () => {
    clearTimer();
    setPhase("complete");
  };

  const nextStep = () => {
    if (stepIndex >= steps.length - 1) finishTour();
    else goToStep(stepIndex + 1, 1);
  };

  const prevStep = () => {
    if (stepIndex <= 0) return;
    goToStep(stepIndex - 1, -1);
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch {}
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const formatTime = (t) => {
    if (!isFinite(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const step = steps[stepIndex];

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 24 : -24 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -24 : 24 }),
  };

  return (
    <>
      {/* START TRIGGER — idle state only */}
      {phase === "idle" && (
        <motion.button
          onClick={startTour}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="fixed bottom-8 left-8 z-50 flex items-center gap-3 rounded-full border border-white/10 bg-black/70 py-2.5 pl-2.5 pr-6 text-white shadow-[0_20px_60px_rgba(0,0,0,.45)] backdrop-blur-xl"
        >
          <span
            className="h-9 w-9 rounded-full bg-cover bg-center ring-2 ring-amber-400/50"
            style={{ backgroundImage: `url(${museum.thumbnail || museum.heroImage})` }}
          />
          <span className="flex flex-col items-start leading-tight">
            <span className="flex items-center gap-2 font-medium">
              <Compass size={15} className="text-amber-400" />
              Start Museum Tour
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
              {steps.length} guided stops
            </span>
          </span>
        </motion.button>
      )}

      {/* IMMERSIVE OVERLAY — loading / touring / complete */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9998] overflow-hidden bg-black"
          >
            {/* Backdrop imagery */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isComplete ? "complete-bg" : step.id}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: isLoading ? 1.1 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${step.image})`,
                  transform: `scale(${zoom})`,
                  transition: "transform 0.4s ease-out",
                }}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/25 to-black/85" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

            {/* ---------------- LOADING ---------------- */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
                >
                  <motion.p
                    initial={{ opacity: 0, letterSpacing: "0.1em" }}
                    animate={{ opacity: 1, letterSpacing: "0.5em" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-xs font-semibold uppercase text-amber-300"
                  >
                    Virtual Tour
                  </motion.p>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mt-4 font-display text-3xl sm:text-4xl"
                  >
                    {museum.name}
                  </motion.h2>
                  <div className="mt-8 flex items-center gap-2 text-white/60">
                    <Loader2 size={16} className="animate-spin text-amber-400" />
                    <span className="text-xs uppercase tracking-[0.3em]">Preparing your tour</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ---------------- TOURING ---------------- */}
            {isTouring && (
              <>
                {/* Top progress + controls */}
                <div className="absolute inset-x-0 top-0 p-4 sm:p-6">
                  <div className="flex gap-1.5">
                    {steps.map((s, i) => (
                      <div key={s.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/20">
                        {i < stepIndex && <div className="h-full w-full bg-amber-400" />}
                        {i === stepIndex && (
                          <motion.div
                            key={`${stepIndex}-${isPaused}`}
                            className="h-full bg-amber-400"
                            initial={{ width: isPaused ? "45%" : "0%" }}
                            animate={{ width: isPaused ? "45%" : "100%" }}
                            transition={isPaused ? { duration: 0 } : { duration: stepDuration / 1000, ease: "linear" }}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-white backdrop-blur-md">
                      <MapPin size={13} className="text-amber-400" />
                      <span className="truncate text-xs font-medium sm:text-sm">
                        {museum.name} · {museum.city}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 p-1.5 backdrop-blur-md">
                      <button
                        onClick={() => setIsPaused((p) => !p)}
                        aria-label={isPaused ? "Resume tour" : "Pause tour"}
                        className="rounded-full p-2 text-white transition hover:bg-white/10"
                      >
                        {isPaused ? <Play size={14} /> : <Pause size={14} />}
                      </button>
                      <button
                        onClick={toggleFullscreen}
                        aria-label="Toggle fullscreen"
                        className="hidden rounded-full p-2 text-white transition hover:bg-white/10 sm:block"
                      >
                        {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                      </button>
                      <button
                        onClick={closeTour}
                        aria-label="Exit tour"
                        className="rounded-full p-2 text-white transition hover:bg-white/10"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Zoom controls */}
                <div className="absolute right-4 top-28 z-10 hidden flex-col gap-1.5 rounded-full border border-white/15 bg-black/40 p-1.5 backdrop-blur-md sm:flex sm:right-6">
                  <button
                    onClick={() => setZoom((z) => Math.min(z + 0.15, 1.6))}
                    aria-label="Zoom in"
                    className="rounded-full p-2 text-white transition hover:bg-white/10"
                  >
                    <ZoomIn size={14} />
                  </button>
                  <button
                    onClick={() => setZoom((z) => Math.max(z - 0.15, 1))}
                    aria-label="Zoom out"
                    className="rounded-full p-2 text-white transition hover:bg-white/10"
                  >
                    <ZoomOut size={14} />
                  </button>
                </div>

                {/* Bottom-left fullscreen (mobile-visible) + step arrows */}
                <div className="absolute bottom-6 left-4 z-10 flex items-center gap-2 sm:left-6">
                  <button
                    onClick={toggleFullscreen}
                    aria-label="Toggle fullscreen"
                    className="rounded-full border border-white/15 bg-black/40 p-3 text-white backdrop-blur-md transition hover:bg-white/10 sm:hidden"
                  >
                    {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                  </button>
                </div>

                {/* Bottom-center prev/next stop pill */}
                <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-black/40 p-1.5 text-white backdrop-blur-md sm:flex">
                  <button
                    onClick={prevStep}
                    disabled={stepIndex === 0}
                    aria-label="Previous stop"
                    className="rounded-full p-2.5 transition hover:bg-white/10 disabled:opacity-30"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="px-2 text-xs tabular-nums text-white/60">
                    {stepIndex + 1} / {steps.length}
                  </span>
                  <button
                    onClick={nextStep}
                    aria-label="Next stop"
                    className="rounded-full bg-amber-400 p-2.5 text-black transition hover:scale-105"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Info + audio-guide card, bottom right */}
                <div className="absolute inset-x-4 bottom-24 z-10 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[360px]">
                  <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/55 shadow-[0_20px_60px_rgba(0,0,0,.5)] backdrop-blur-2xl">
                    <div className="p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-300/80">
                        Stop {stepIndex + 1} of {steps.length} · {step.meta}
                      </p>

                      <div className="relative mt-2 min-h-[86px] overflow-hidden">
                        <AnimatePresence mode="wait" custom={direction}>
                          <motion.div
                            key={stepIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <h3 className="font-display text-xl text-white">{step.label}</h3>
                            <p className="mt-1.5 text-sm leading-6 text-white/70">{step.caption}</p>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <p className="mt-3 text-[11px] italic text-white/40">
                        {museum.name} · {museum.city}, {museum.country}
                      </p>
                    </div>

                    {/* Embedded audio-guide transport — same track as the floating button */}
                    <div className="border-t border-white/10 bg-black/30 px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => skipBy(-10)}
                          aria-label="Back 10 seconds"
                          className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                        >
                          <SkipBack size={15} />
                        </button>

                        <button
                          onClick={togglePlay}
                          disabled={isBuffering}
                          aria-label={isPlaying ? "Pause narration" : "Play narration"}
                          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-black shadow-lg shadow-amber-500/30 transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                        >
                          {isBuffering ? (
                            <Loader2 size={15} className="animate-spin" />
                          ) : isPlaying ? (
                            <Pause size={15} />
                          ) : (
                            <Play size={15} className="ml-0.5" />
                          )}
                        </button>

                        <button
                          onClick={() => skipBy(10)}
                          aria-label="Forward 10 seconds"
                          className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                        >
                          <SkipForward size={15} />
                        </button>

                        <span className="ml-1 min-w-[72px] text-[11px] tabular-nums text-white/50">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>

                        <div className="ml-auto flex items-center gap-1">
                          <button
                            onClick={cyclePlaybackRate}
                            aria-label="Change playback speed"
                            className="flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
                          >
                            <Gauge size={13} />
                            {playbackRate}x
                          </button>
                          <button
                            onClick={toggleMute}
                            aria-label={isMuted ? "Unmute" : "Mute"}
                            className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                          >
                            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="h-full bg-amber-400" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ---------------- COMPLETE ---------------- */}
            <AnimatePresence>
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400/15">
                    <PartyPopper size={26} className="text-amber-300" />
                  </div>
                  <h2 className="mt-5 font-display text-3xl">Tour Complete</h2>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
                    You've made it through every stop at {museum.name}.
                  </p>
                  <div className="mt-8 flex items-center gap-3">
                    <button
                      onClick={closeTour}
                      className="rounded-full border border-white/15 px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:bg-white/10 hover:text-white"
                    >
                      Close
                    </button>
                    <button
                      onClick={restartTour}
                      className="flex items-center gap-2 rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-black transition hover:scale-105"
                    >
                      <RotateCcw size={14} />
                      Restart Tour
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}