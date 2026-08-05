import GlassPanel from './GlassPanel';
import './SkipAllConfirmDialog.css';

const TITLE = 'Skip Remaining Cinematics?';
const BODY =
  'This will immediately generate the hybrid report and skip all remaining laboratory cinematics.';

function SkipAllConfirmDialog({ onCancel, onConfirm }) {
  return (
    <div className="skip-all-overlay">
      <GlassPanel
        className="skip-all-dialog"
        as="div"
        role="alertdialog"
        aria-label={TITLE}
      >
        <p className="skip-all-dialog__title">{TITLE}</p>
        <p className="skip-all-dialog__body">{BODY}</p>

        <div className="skip-all-dialog__actions">
          <button
            type="button"
            className="skip-all-dialog__btn skip-all-dialog__btn--cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="skip-all-dialog__btn skip-all-dialog__btn--confirm"
            onClick={onConfirm}
          >
            Skip All
          </button>
        </div>
      </GlassPanel>
    </div>
  );
}

export default SkipAllConfirmDialog;