import BackgroundLayer from '../Shared/BackgroundLayer';
import HologramPanel from '../Hologram/HologramPanel';
import ActivationOrb from '../Hologram/ActivationOrb';
import './ResearchWing.css';

/**
 * Screen 1: the entrance to the research wing. A massive laboratory
 * door forms the backdrop; a floating hologram briefs the researcher
 * and the activation orb begins the experiment.
 */
function ResearchWing({ onBeginExperiment }) {
  return (
    <BackgroundLayer
      src="/assets/dnalab/research-door.webp"
      alt="Sealed research laboratory door"
    >
      <div className="research-wing">
        <HologramPanel />
        <ActivationOrb onActivate={onBeginExperiment} label="Begin Experiment" />
      </div>
    </BackgroundLayer>
  );
}

export default ResearchWing;
