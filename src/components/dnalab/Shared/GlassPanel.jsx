import './GlassPanel.css';

/**
 * Frosted-glass exhibition panel with brushed-metal frame and a soft
 * cyan scan-line sheen. Used as the structural container for both the
 * hologram introduction and the parent selection screen.
 */
function GlassPanel({ children, className = '', as: Tag = 'section', ...rest }) {
  return (
    <Tag className={`glass-panel ${className}`} {...rest}>
      <span className="glass-panel__scanline" aria-hidden="true" />
      <span className="glass-panel__corner glass-panel__corner--tl" aria-hidden="true" />
      <span className="glass-panel__corner glass-panel__corner--tr" aria-hidden="true" />
      <span className="glass-panel__corner glass-panel__corner--bl" aria-hidden="true" />
      <span className="glass-panel__corner glass-panel__corner--br" aria-hidden="true" />
      <div className="glass-panel__content">{children}</div>
    </Tag>
  );
}

export default GlassPanel;
