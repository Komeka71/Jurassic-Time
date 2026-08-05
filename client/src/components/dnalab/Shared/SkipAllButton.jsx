import './SkipAllButton.css';

/**
 * Reusable "Skip All" control for DNA Lab cinematics. Purely
 * presentational — opens a confirmation dialog is handled by
 * SkipControls, this component just renders the trigger.
 */
function SkipAllButton({ onClick }) {
  return (
    <button
      type="button"
      className="skip-all-button"
      onClick={onClick}
      aria-label="Skip all remaining cinematics"
    >
      Skip All <span className="skip-all-button__icon" aria-hidden="true">⏭</span>
    </button>
  );
}

export default SkipAllButton;