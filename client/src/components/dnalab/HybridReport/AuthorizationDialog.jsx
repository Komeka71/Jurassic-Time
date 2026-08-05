import GlassPanel from '../Shared/GlassPanel';
import { AUTHORIZATION_DIALOG } from '../../../data/hybridReport';
import './AuthorizationDialog.css';

function AuthorizationDialog({ onYes, onNo }) {
  return (
    <div className="authorization-overlay">
      <GlassPanel
        className="authorization-dialog"
        as="div"
        role="alertdialog"
        aria-label={AUTHORIZATION_DIALOG.title}
      >
        <p className="authorization-dialog__title">{AUTHORIZATION_DIALOG.title}</p>
        <p className="authorization-dialog__question">{AUTHORIZATION_DIALOG.question}</p>

        <div className="authorization-dialog__actions">
          <button
            type="button"
            className="authorization-dialog__btn authorization-dialog__btn--yes"
            onClick={onYes}
          >
            {AUTHORIZATION_DIALOG.yesLabel}
          </button>
          <button
            type="button"
            className="authorization-dialog__btn authorization-dialog__btn--no"
            onClick={onNo}
          >
            {AUTHORIZATION_DIALOG.noLabel}
          </button>
        </div>
      </GlassPanel>
    </div>
  );
}

export default AuthorizationDialog;