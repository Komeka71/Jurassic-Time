

const isSafari =
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const ext = isSafari ? "mov" : "webm";
export default function DinoGuide() {
  return (
    <div className="flex flex-col items-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-40 pointer-events-none select-none"
      >
       <source
  src={`/videos/dino/idle.${ext}`}
  type={
    isSafari
      ? 'video/mp4; codecs="hvc1"'
      : "video/webm"
  }
/>
      </video>

      <p className="mt-3 text-white/70 text-sm text-center">
        Need help exploring?
      </p>
    </div>
  );
}