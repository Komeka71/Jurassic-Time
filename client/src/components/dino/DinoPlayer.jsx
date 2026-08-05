const isSafari =
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const ext = isSafari ? "mov" : "webm";

const videos = {
  wave: `/videos/dino/wave.${ext}`,

  idle: `/videos/dino/idle.${ext}`,
  standing: `/videos/dino/standing.${ext}`,

  happy: `/videos/dino/loveHappy.${ext}`,
  angry: `/videos/dino/angry.${ext}`,
  celebrate: `/videos/dino/celebrate.${ext}`,

  thinking: `/videos/dino/thinking.${ext}`,
  sad: `/videos/dino/sad.${ext}`,
  shushing: `/videos/dino/shushing.${ext}`,
  lookingAround: `/videos/dino/lookingAround.${ext}`,

  walkingRight: `/videos/dino/walkingRight.${ext}`,
  pointingRight: `/videos/dino/pointingRight.${ext}`,

  roar: `/videos/dino/angry.${ext}`,

  sleep: `/videos/dino/sleep.${ext}`,
  wakeup: `/videos/dino/wakeup.${ext}`,

  happyJumps: `/videos/dino/happyJumps.${ext}`,

  eating: `/videos/dino/eating.${ext}`,

  loveHappy: `/videos/dino/loveHappy.${ext}`,
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