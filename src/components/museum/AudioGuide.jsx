import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, X, RotateCcw } from "lucide-react";
import { useAudioGuide } from "./AudioGuideContext.jsx";

export default function AudioGuide({
  museumName = "Official Museum Audio Guide",
  subtitle = "",
}) {
  const {
    isPlaying,
    hasPlayedOnce,
    isBuffering,
    progress,
    duration,
    currentTime,
    togglePlay,
    seekTo,
    tourActive,
  } = useAudioGuide();

  const [isOpen, setIsOpen] = useState(false);

  const handleSeek = (e) => seekTo(Number(e.target.value));

  const formatTime = (t) => {
    if (!isFinite(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  const finished = hasPlayedOnce && !isPlaying && progress === 0 && currentTime === 0;

  // The immersive tour has its own embedded transport controls — hide this
  // floating surface while it's active so there's only ever one play button.
  if (tourActive) return null;

  return (
    <>
      {/* Floating "orb" — creative pill-on-hover audio guide launcher */}
      <div className="group fixed top-24 right-5 z-[9999] flex items-center justify-end">
        <div
          className={`mr-[-10px] max-w-0 overflow-hidden whitespace-nowrap rounded-full py-2.5 pl-4 pr-7 text-[11px] font-semibold uppercase tracking-[0.2em] opacity-0 shadow-xl transition-all duration-300 ease-out group-hover:mr-2 group-hover:max-w-[180px] group-hover:opacity-100 ${
            hasPlayedOnce ? "bg-[#141210] text-white-300" : "bg-white/10 text-white backdrop-blur-xl"
          }`}
        >
          {isPlaying ? "Now narrating…" : finished ? "Replay guide" : "Audio guide"}
        </div>

        <motion.button
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle audio guide"
          className={`relative h-14 w-14 shrink-0 rounded-full border shadow-2xl backdrop-blur-xl transition-colors duration-500 ${
            hasPlayedOnce
              ? "border-amber-400/40 bg-[#141210] text-white-300"
              : "border-white/25 bg-white/10 text-white"
          }`}
        >
          {/* Idle attention pulse, before it's ever been played */}
          {!hasPlayedOnce && (
            <span className="absolute inset-0 animate-ping rounded-full bg-amber-300/25" />
          )}

          {/* Rotating "vinyl" ring while narrating */}
          {isPlaying && (
            <span className="absolute inset-[-5px] animate-[spin_5s_linear_infinite] rounded-full border-2 border-dashed border-amber-300/50" />
          )}

          <span className="relative z-10 flex h-full w-full flex-col items-center justify-center">
            {isPlaying ? (
              <span className="flex h-5 items-end gap-[2px]">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-amber-300"
                    animate={{ height: ["35%", "100%", "45%"] }}
                    transition={{ duration: 0.8 + i * 0.15, repeat: Infinity, repeatType: "mirror" }}
                  />
                ))}
              </span>
            ) : finished ? (
              <>
                <RotateCcw size={16} className="text-white-300" />
                <span className="mt-1 text-[8px] font-semibold uppercase tracking-widest text-white-300">
                  Replay
                </span>
              </>
            ) : (
              <>
                <Volume2 size={18} className={hasPlayedOnce ? "text-amber-300" : "text-white"} />
                <span
                  className={`mt-1 text-[8px] font-semibold uppercase tracking-widest ${
                    hasPlayedOnce ? "text-amber-300" : "text-white"
                  }`}
                >
                  Guide
                </span>
              </>
            )}
          </span>
        </motion.button>
      </div>

      {/* Audio Player Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-40 right-6 z-[9999] w-[90vw] max-w-96 rounded-3xl border border-amber-500/20 bg-[#171411]/95 p-6 shadow-2xl backdrop-blur-2xl"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-white/5 p-2 text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              <X size={16} />
            </button>

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white-400">
              Official Audio Guide
            </p>

            <h3 className="mt-3 text-2xl font-bold text-white">{museumName}</h3>

            {subtitle && <p className="mt-2 text-sm text-gray-300">{subtitle}</p>}

            <div
              className={`mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 transition-colors ${
                isBuffering
                  ? "border-white/10 bg-white/5"
                  : isPlaying
                  ? "border-emerald-500/20 bg-emerald-500/10"
                  : "border-amber-500/20 bg-amber-500/10"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isBuffering ? "bg-white/40 animate-pulse" : isPlaying ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                }`}
              />
              <span
                className={`text-[11px] uppercase tracking-[0.2em] ${
                  isBuffering ? "text-white/50" : isPlaying ? "text-emerald-300" : "text-amber-300"
                }`}
              >
                {isBuffering ? "Loading narration" : isPlaying ? "Now playing" : finished ? "Guide complete" : "Narration ready"}
              </span>
            </div>

            <div className="my-8 flex h-10 items-end justify-center gap-1">
              {Array.from({ length: 16 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="w-1 rounded-full bg-amber-300"
                  animate={isPlaying ? { height: ["25%", "80%", "45%", "100%", "35%"] } : { height: "15%" }}
                  transition={{
                    duration: 1.1 + (i % 4) * 0.15,
                    repeat: isPlaying ? Infinity : 0,
                    repeatType: "mirror",
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                disabled={isBuffering}
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-white shadow-lg shadow-amber-500/30 transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {isPlaying ? (
                  <Pause size={18} className="text-white" />
                ) : finished ? (
                  <RotateCcw size={16} className="text-white" />
                ) : (
                  <Play size={18} className="ml-0.5 text-white" />
                )}
              </button>

              <div className="flex-1">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={handleSeek}
                  className="h-1 w-full cursor-pointer accent-amber-400"
                />
                <div className="mt-2 flex justify-between text-xs text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-gray-500">
              🎧 Best experienced with headphones
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
