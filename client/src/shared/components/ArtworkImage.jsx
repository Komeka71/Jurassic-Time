import React, { useEffect, useState } from 'react';

// ArtworkImage
// ------------
// Tries to load a real image for a given subject id, trying each
// extension in turn (webp -> png -> jpg by default). If none load —
// or no id is given — it renders the supplied SVG `fallback` instead,
// so the UI never shows a broken-image icon.
//
// This component is presentation-agnostic: pass whatever `className`
// / `fallbackClassName` your game's stylesheet already defines. It
// doesn't know anything about dinosaurs specifically, so any mini-game
// can reuse it for its own subject artwork (eras, fossils, etc).
//
// Usage:
//   <ArtworkImage
//     id="trex"
//     alt="Tyrannosaurus rex"
//     basePath="/assets/dinosaurs"
//     className="result-card__art"
//     fallbackClassName="result-card__art result-card__art--fallback"
//     fallback={<TrexIllustration className="result-card__art-illustration" />}
//   />

const DEFAULT_EXTENSIONS = ['webp', 'png', 'jpg'];

export default function ArtworkImage({
  id,
  alt = '',
  basePath = '',
  extensions = DEFAULT_EXTENSIONS,
  fallback = null,
  className = '',
  fallbackClassName = '',
}) {
  const [attempt, setAttempt] = useState(0);

  // Reset the attempt counter whenever the subject changes so a new
  // artwork always gets a fresh chance at the real image.
  useEffect(() => {
    setAttempt(0);
  }, [id, basePath]);

  const hasCandidate = Boolean(id) && attempt < extensions.length;

  if (!hasCandidate) {
    return (
      <div className={fallbackClassName || className} role="img" aria-label={alt}>
        {fallback}
      </div>
    );
  }

  const src = `${basePath}/${id}.${extensions[attempt]}`;

  return (
    <img
      key={src}
      src={src}
      alt={alt}
      className={className}
      onError={() => setAttempt((a) => a + 1)}
    />
  );
}