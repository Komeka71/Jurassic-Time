import HoloPanel from './HoloPanel';
import FieldRow from './FieldRow';
import { THREAT_INFO } from '../../../data/hybridReport';

function RightPanel() {
  return (
    <HoloPanel title="Containment Assessment" align="right" className="right-panel">
      <FieldRow label="Threat Level" value={THREAT_INFO.threatLevel} />
      <FieldRow label="Containment Status" value={THREAT_INFO.containmentStatus} />
      <FieldRow label="Classification" value={THREAT_INFO.classification} />
      <FieldRow label="Behavior" value={THREAT_INFO.behavior} />
      <FieldRow label="Genome Stability" value={THREAT_INFO.genomeStability} />
      <FieldRow label="Risk Assessment" value={THREAT_INFO.riskAssessment} />
    </HoloPanel>
  );
}

export default RightPanel;