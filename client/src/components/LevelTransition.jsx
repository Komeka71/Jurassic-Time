import { useEffect } from "react";

export default function LevelTransition({
  video,
  title,
  subtitle,
  onFinish,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">

      <video
        src={video}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative text-center text-white">

        <p className="uppercase tracking-[0.5em] text-green-300 mb-4">
          NEW EXPEDITION
        </p>

        <h1 className="text-6xl font-bold mb-3">
          {title}
        </h1>

        <p className="text-2xl text-green-100">
          {subtitle}
        </p>

      </div>

    </div>
  );
}