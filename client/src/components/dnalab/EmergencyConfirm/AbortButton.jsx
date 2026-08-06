import './AbortButton.css';

function AbortButton({ onClick }) {
  return (
    <button type="button" className="abort-button" onClick={onClick}>
      <span className="abort-button__ring" aria-hidden="true" />
      <span className="abort-button__glow" aria-hidden="true" />
      <span className="abort-button__label">Abort Experiment</span>
    </button>
  );
}

export default AbortButton;