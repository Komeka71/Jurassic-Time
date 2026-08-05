import BackgroundLayer from '../Shared/BackgroundLayer';
import GlassPanel from '../Shared/GlassPanel';
import ParticleField from '../Shared/ParticleField';
import AuthorizeButton from './AuthorizeButton';
import './FusionConfirmScreen.css';

/**
 * Stage: fusionConfirm. A classified confirmation terminal — not a
 * website modal — gating entry into the (irreversible) fusion sequence.
 */
function FusionConfirmScreen({ onAuthorize }) {
  return (
    <BackgroundLayer
      src="/assets/dnalab/fusion-background.webp"
      alt="DNA fusion authorization terminal"
    >
      <GlassPanel className="fusion-confirm" as="section" aria-label="DNA fusion authorization">
        <ParticleField count={16} />
        <p className="fusion-confirm__eyebrow">Restricted Terminal</p>
        <h2 className="fusion-confirm__title">DNA Fusion Sequence</h2>

        <div className="fusion-confirm__warning">
          <span className="fusion-confirm__warning-label">Warning</span>
          <p>Once DNA Fusion begins, the process cannot be reversed.</p>
        </div>

        <AuthorizeButton onClick={onAuthorize} />
      </GlassPanel>
    </BackgroundLayer>
  );
}

export default FusionConfirmScreen;