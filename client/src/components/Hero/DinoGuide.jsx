// export default function DinoGuide() {
//   return (
//     <div className="flex flex-col items-center">

//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="w-40 pointer-events-none select-none"
//       >
//         <source
//           src="/videos/dino/idle.mov"
//           type="video/mp4"
//         />
//       </video>

//       <p className="mt-3 text-white/70 text-sm text-center">
//         Need help exploring?
//       </p>

//     </div>
//   );
// }


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
          src="/videos/dino/idle.mov"
          type="video/mp4"
        />
      </video>

      <p className="mt-3 text-white/70 text-sm text-center">
        Need help exploring?
      </p>
    </div>
  );
}