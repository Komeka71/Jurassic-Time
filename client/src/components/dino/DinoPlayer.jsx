const videos = {
  wave: "/videos/dino/wave.mov",

  idle: "/videos/dino/idle.mov",
  standing: "/videos/dino/standing.mov",

  happy: "/videos/dino/loveHappy.mov",
  angry: "/videos/dino/angry.mov",
  celebrate: "/videos/dino/celebrate.mov",

  thinking: "/videos/dino/thinking.mov",
  sad: "/videos/dino/sad.mov",
  shushing: "/videos/dino/shushing.mov",
  lookingAround: "/videos/dino/lookingAround.mov",

  walkingRight: "/videos/dino/walkingRight.mov",
  pointingRight: "/videos/dino/pointingRight.mov",

  roar: "/videos/dino/angry.mov",

  sleep: "/videos/dino/sleep.mov",
  wakeup: "/videos/dino/wakeup.mov",

  happyJumps: "/videos/dino/happyJumps.mov",

  eating: "/videos/dino/eating.mov",

  loveHappy: "/videos/dino/loveHappy.mov",
};

const loopingMoods = [
  "idle",
  "standing",
  "sleep",
];

export default function DinoPlayer({
  mood = "idle",
  onEnded,
}) {
  const src = videos[mood] || videos.idle;

  const shouldLoop = loopingMoods.includes(mood);

  return (
    <video
      key={mood}
      src={src}
      autoPlay
      muted
      playsInline
      loop={shouldLoop}
      onEnded={() => {
        if (!shouldLoop) {
          onEnded?.(mood);
        }
      }}
      className="
        w-[180px]
        h-[190px]

        sm:w-[220px]
        sm:h-[230px]

        md:w-[260px]
        md:h-[270px]

        lg:w-[430px]
        lg:h-[440px]

        xl:w-[500px]
        xl:h-[520px]

        object-contain

        drop-shadow-[0_15px_35px_rgba(0,0,0,0.45)]

        pointer-events-auto
        cursor-pointer
        select-none
      "
    />
  );
}