import GlassPanel from '../Shared/GlassPanel';
import './HoloPanel.css';

function HoloPanel({ title, children, align = 'left', className = '' }) {
  return (
    <GlassPanel
      as="aside"
      className={`holo-panel holo-panel--${align} ${className}`}
      aria-label={title}
    >
      <span className="holo-panel__sweep" aria-hidden="true" />
      <div className="holo-panel__led" aria-hidden="true" />
      <h3 className="holo-panel__title">{title}</h3>
      <div className="holo-panel__body">{children}</div>
    </GlassPanel>
  );
}

export default HoloPanel;