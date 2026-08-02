// Placeholder content for the Final Hybrid Report. Values are static
// display data — no computation, no persistence.

export const EXPERIMENT_INFO = {
  experimentNumber: '#001',
  fusionId: 'FX-7734-K',
  compatibility: '91%',
  researchNotes: 'Genome fusion stable. Neural response patterns irregular.',
};

export const THREAT_INFO = {
  threatLevel: 'Elevated',
  containmentStatus: 'Secure',
  classification: 'Restricted — Class IV',
  behavior: 'Dormant',
  genomeStability: '94%',
  riskAssessment: 'Moderate',
};

export const PROCEED_NOTIFICATION = {
  title: 'Further Authorization Required',
  message: 'Final containment protocol awaiting approval.',
  buttonLabel: 'Proceed',
};

export const AUTHORIZATION_DIALOG = {
  title: 'Final Containment Authorization',
  question: 'Should this organism ever leave containment?',
  yesLabel: 'Yes — Release Organism',
  noLabel: 'No — Maintain Containment',
};

export const OUTCOME_YES_SEQUENCE = [
  { id: 1, text: 'Containment Doors...', delay: 400 },
  { id: 2, text: 'Unlocking...', delay: 1500 },
  { id: 3, text: 'Containment Breach Detected...', delay: 2800 },
  { id: 4, text: 'Emergency Response Failed...', delay: 4100 },
  { id: 5, text: 'Life Signs Lost...', delay: 5400 },
];

export const OUTCOME_NO_SEQUENCE = [
  { id: 1, text: 'Containment Doors...', delay: 400 },
  { id: 2, text: 'Remain Locked.', delay: 1500 },
  { id: 3, text: 'Containment Stable.', delay: 2600 },
  { id: 4, text: 'Experiment Archived.', delay: 3700 },
];

export const OUTCOME_YES_RESULT = {
  label: 'Outcome',
  headline: 'You Did Not Survive.',
  buttonLabel: 'Begin New Experiment',
};

export const OUTCOME_NO_RESULT = {
  label: 'Outcome',
  headline: 'You Survived.',
  subtext: 'The organism remains classified.',
  buttonLabel: 'Begin New Experiment',
};

// How long the viewer observes the hybrid before the notification fades in.
export const INITIAL_VIEWING_MS = 3600;

// Hold time after the last sequence line before the outcome result appears.
export const OUTCOME_RESULT_DELAY_MS = 900;