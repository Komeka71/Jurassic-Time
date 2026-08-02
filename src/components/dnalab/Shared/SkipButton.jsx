import './SkipButton.css';

/**
 * Reusable skip control for DNA Lab cinematics. Purely presentational
 * — the parent (CinematicVideo) decides when to show/hide it and
 * reuses its own completion handler on click, so skipping and natural
 * playback end behave identically.
 */
function SkipButton({ onClick }) {
  return (
    <button type="button" className="skip-button" onClick={onClick} aria-label="Skip cinematic">
      Skip <span className="skip-button__icon" aria-hidden="true">▶</span>
    </button>
  );
}

export default SkipButton;