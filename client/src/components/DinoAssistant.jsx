const videos = {
  idle: "/videos/dino/idle.mov",
  happy: "/videos/dino/happy.mov",
  celebrate: "/videos/dino/celebrate.mov",
  angry: "/videos/dino/angry.mov",
  sad: "/videos/dino/sad.mov",
  thinking: "/videos/dino/thinking.mov",
  wave: "/videos/dino/wave.mov",
};

export default function DinoAssistant({
  mood = "idle",
  message = "Hello Explorer!",
}) {
  return (
    <div className="relative flex flex-col items-center">

      <div
        className="
        relative
        bg-white
        rounded-[26px]
        px-6
        py-4
        text-gray-800
        text-center
        font-semibold
        shadow-2xl
        max-w-[250px]
        mb-4
        animate-fadeIn
        "
      >
        {message}

        <div className="absolute left-1/2 -bottom-3 w-6 h-6 bg-white rotate-45 -translate-x-1/2" />
      </div>

      <video
        key={mood}
        autoPlay
        muted
        playsInline
        className="w-52 md:w-60 drop-shadow-[0_20px_60px_rgba(0,255,120,.35)]"
      >
        <source
          src={videos[mood] || videos.idle}
          type="video/mp4"
        />
      </video>
    </div>
  );
}