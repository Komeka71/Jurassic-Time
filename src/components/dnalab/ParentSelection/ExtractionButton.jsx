import './ExtractionButton.css';

function ExtractionButton({ disabled, onStart }) {
  const handleClick = () => {
    if (disabled) return;
    // Phase 1 scope ends here — extraction logic arrives in a later phase.
    console.log('Extraction Started');
    onStart?.();
  };

  return (
    <button
      type="button"
      className="extraction-btn"
      disabled={disabled}
      onClick={handleClick}
    >
      <span className="extraction-btn__glow" aria-hidden="true" />
      <span className="extraction-btn__label">Start Extraction</span>
    </button>
  );
}

export default ExtractionButton;
