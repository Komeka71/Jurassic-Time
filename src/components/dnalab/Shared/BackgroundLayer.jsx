import './BackgroundLayer.css';

/**
 * Full-viewport static background image with a cinematic darkening
 * overlay so foreground glass panels stay readable. The image itself
 * is a plain <img>, not a CSS background — per the DNA Lab art
 * direction, backgrounds are imported image assets, never CSS
 * gradients/canvas/SVG.
 */
function BackgroundLayer({ src, alt = '', children }) {
  return (
    <div className="bg-layer">
      <img
        className="bg-layer__image"
        src={src}
        alt={alt}
        onError={(e) => {
          e.currentTarget.style.visibility = 'hidden';
        }}
      />
      <div className="bg-layer__overlay" aria-hidden="true" />
      <div className="bg-layer__vignette" aria-hidden="true" />
      <div className="bg-layer__content">{children}</div>
    </div>
  );
}

export default BackgroundLayer;
