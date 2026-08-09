// /**
//  * Lightweight, stylized dinosaur silhouettes used as placeholders inside
//  * each era card. These are intentionally simple flat shapes — the goal is
//  * to establish silhouette + composition now; a production illustration or
//  * photo can drop in later without changing layout.
//  */

// const silhouettes = {
//   // Triassic: small, agile, early bipedal dinosaur (e.g. Coelophysis-like)
//   triassic: (
//     <path
//       d="M18 78
//          C 16 70, 22 62, 30 60
//          C 28 54, 32 46, 40 44
//          C 44 36, 54 30, 62 32
//          C 68 24, 80 22, 86 28
//          C 92 24, 100 26, 100 32
//          C 96 34, 92 36, 90 40
//          C 96 42, 100 48, 98 54
//          C 92 52, 86 52, 82 56
//          C 84 64, 82 74, 76 80
//          L 72 80 L 74 66
//          C 68 68, 62 68, 58 64
//          C 54 70, 50 76, 44 78
//          L 40 78 L 44 66
//          C 36 66, 28 70, 24 78 Z"
//     />
//   ),
//   // Jurassic: long-necked sauropod (e.g. Brachiosaurus-like)
//   jurassic: (
//     <path
//       d="M8 86
//          C 10 76, 18 70, 28 70
//          C 26 62, 30 54, 38 52
//          C 40 38, 46 22, 54 10
//          C 58 6, 64 8, 64 14
//          C 58 22, 54 34, 54 46
//          C 66 44, 80 46, 90 52
//          C 98 50, 108 54, 110 62
//          C 104 62, 98 64, 94 68
//          C 96 74, 92 80, 84 82
//          L 80 82 L 82 70
//          C 72 72, 62 70, 54 64
//          C 46 68, 40 68, 34 64
//          C 30 70, 26 76, 20 80
//          L 16 80 L 20 70
//          C 14 72, 10 78, 8 86 Z"
//     />
//   ),
//   // Cretaceous: large bipedal predator (e.g. Tyrannosaurus-like)
//   cretaceous: (
//     <path
//       d="M10 84
//          C 12 74, 20 68, 28 68
//          L 26 58
//          C 34 50, 44 44, 54 42
//          C 58 32, 66 24, 76 22
//          C 82 16, 92 16, 96 22
//          C 100 20, 104 22, 104 26
//          C 98 28, 92 30, 88 34
//          C 92 38, 92 44, 88 48
//          C 82 46, 76 48, 72 52
//          C 76 58, 76 66, 72 72
//          L 66 72 L 68 60
//          C 60 62, 52 60, 46 56
//          C 42 64, 38 72, 30 76
//          L 24 76 L 28 66
//          C 20 68, 14 74, 12 84 Z"
//     />
//   ),
// }

// function DinoSilhouette({ era, className }) {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 120 96"
//       fill="currentColor"
//       xmlns="http://www.w3.org/2000/svg"
//       aria-hidden="true"
//     >
//       {silhouettes[era] ?? silhouettes.jurassic}
//     </svg>
//   )
// }

// export default DinoSilhouette


function DinoSilhouette({ era, className }) {
  return (
    <img
      src={`/icons/${era}.png`}
      alt={`${era} icon`}
      className={className}
      draggable={false}
    />
  )
}

export default DinoSilhouette