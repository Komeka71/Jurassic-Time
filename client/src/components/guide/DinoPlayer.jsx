// import { useRef, useCallback } from "react";
import { videos } from "./videoMap";
import { loopStates } from "./behaviourEngine";
import { useEffect, useRef, useCallback } from "react";
export default function DinoPlayer({

  mood = "idle",
  // Bumps on every play() call in DinoGuide, even for a repeated mood,
  // so the video key below always changes -> guaranteed fresh element.
  playToken = 0,
  onEnded,
}) {
  const videoRef = useRef(null);

  // Guards against firing onEnded twice for the same video (once from
  // the real "ended" event, once from our manual timeupdate fallback).
  const firedEnded = useRef(false);

  // "loop" moods (idle, standing, sleep) should play forever on their own
  // until something else interrupts them.
  const isLoopMood = loopStates.includes(mood);

const fireEndedOnce = useCallback(() => {
  console.log("🎬 VIDEO FINISHED", mood);

  if (firedEnded.current) return;
  firedEnded.current = true;
  onEnded?.(mood);
}, [mood, onEnded]);

  // Let the native `autoPlay` attribute do the initial kick-off (the
  // key change already guarantees a brand new <video> element + fresh
  // load every time), and nudge play() again once Safari/Chrome tell
  // us the video is actually ready.
  const handleCanPlay = () => {
    const playPromise = videoRef.current?.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  };

  // SAFARI FIX #2:
  // Some .mv exports (especially screen recordings) have variable
  // frame-rate metadata that confuses Safari's own end-of-video
  // detection - the video visually stops, but Safari never actually
  // fires the "ended" event, so our code never hears about it and the
  // dino just sits there frozen forever with no way to recover.
  //
  // As a safety net, we watch playback progress ourselves. Once
  // currentTime gets within ~150ms of duration, we treat it as
  // finished ourselves, regardless of whether Safari's "ended" event
  // ever shows up.
  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video || isLoopMood) return;
    if (!isFinite(video.duration) || video.duration === 0) return;

    if (video.currentTime >= video.duration - 0.15) {
      fireEndedOnce();
    }
  };
useEffect(() => {
  firedEnded.current = false;
}, [mood, playToken]);
  return (
    <video
      // mood + playToken together guarantee a fresh <video> element
      // every single play() call, even for a repeated mood.
      key={`${mood}-${playToken}`}
      ref={videoRef}
      muted
      playsInline
      autoPlay
      loop={isLoopMood}
      preload="auto"
      src={videos[mood] || videos.idle}
      onCanPlay={handleCanPlay}
      onEnded={fireEndedOnce}
      onTimeUpdate={handleTimeUpdate}
      className="
  w-56
md:w-64
xl:w-72

  select-none
  pointer-events-none

  drop-shadow-[0_18px_50px_rgba(0,255,120,.25)]
"
    />
  );
}
