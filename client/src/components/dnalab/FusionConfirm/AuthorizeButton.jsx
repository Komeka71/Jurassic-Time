import './AuthorizeButton.css';

function AuthorizeButton({ onClick }) {
  return (
    <button type="button" className="authorize-button" onClick={onClick}>
      <span className="authorize-button__ring" aria-hidden="true" />
      <span className="authorize-button__glow" aria-hidden="true" />
      <span className="authorize-button__label">Authorize DNA Fusion</span>
    </button>
  );
}

export default AuthorizeButton;