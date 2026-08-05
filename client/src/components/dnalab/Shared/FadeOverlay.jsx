import './FadeOverlay.css';

/**
 * Full-viewport black overlay used to bridge screen transitions
 * ("rings collapse, fade to black, fade into Parent Selection").
 */
function FadeOverlay({ active }) {
  return <div className={`fade-overlay ${active ? 'fade-overlay--active' : ''}`} aria-hidden="true" />;
}

export default FadeOverlay;