const isSafari =
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const ext = isSafari ? "mov" : "webm";

const videos = {
  idle: `/videos/dino/idle.${ext}`,
  happy: `/videos/dino/happy.${ext}`,
  celebrate: `/videos/dino/celebrate.${ext}`,
  angry: `/videos/dino/angry.${ext}`,
  sad: `/videos/dino/sad.${ext}`,
  thinking: `/videos/dino/thinking.${ext}`,
  wave: `/videos/dino/wave.${ext}`,
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
  type={
    isSafari
      ? 'video/mp4; codecs="hvc1"'
      : "video/webm"
  }
/>
      </video>
    </div>
  );
}