import GlassPanel from '../Shared/GlassPanel';
import { PROCEED_NOTIFICATION } from '../../../data/hybridReport';
import './ProceedNotification.css';

function ProceedNotification({ onProceed }) {
  return (
    <GlassPanel
      className="proceed-notification"
      as="div"
      role="alertdialog"
      aria-label={PROCEED_NOTIFICATION.title}
    >
      <p className="proceed-notification__title">{PROCEED_NOTIFICATION.title}</p>
      <p className="proceed-notification__message">{PROCEED_NOTIFICATION.message}</p>
      <button type="button" className="proceed-notification__button" onClick={onProceed}>
        {PROCEED_NOTIFICATION.buttonLabel}
      </button>
    </GlassPanel>
  );
}

export default ProceedNotification;