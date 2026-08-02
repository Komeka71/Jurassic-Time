import GlassPanel from '../Shared/GlassPanel';
import ParticleField from '../Shared/ParticleField';
import './HologramPanel.css';

/**
 * The floating holographic glass panel introducing the simulation.
 * Purely presentational — copy lives here since it never changes.
 */
function HologramPanel() {
  return (
    <GlassPanel className="hologram-panel" aria-label="Laboratory briefing">
      <ParticleField count={14} />
      <p className="hologram-panel__eyebrow">Museum Simulation Program</p>
      <h1 className="hologram-panel__title">Genetics Research Laboratory</h1>

      <p className="hologram-panel__greeting">Welcome, Researcher.</p>

      <div className="hologram-panel__objective">
        <span className="hologram-panel__objective-label">Today&rsquo;s Objective</span>
        <p>
          Combine prehistoric DNA to create a fictional hybrid organism.
        </p>
      </div>

      <p className="hologram-panel__footnote">
        All experiments are simulations designed for educational purposes.
      </p>
    </GlassPanel>
  );
}

export default HologramPanel;
