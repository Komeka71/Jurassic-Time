import { useEffect, useRef } from "react";
import { videos } from "./videoMap";

export default function DinoPlayer({
  mood = "idle",
  onEnded,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.load();

    const playPromise = videoRef.current.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [mood]);

  return (
    <video
  key={mood}
  ref={videoRef}
  muted
  playsInline
  autoPlay
  preload="auto"
  src={videos[mood] || videos.idle}
  onEnded={() => onEnded?.(mood)}
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