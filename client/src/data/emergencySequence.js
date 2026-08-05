// Timed message sequence shown after the researcher clicks
// "Abort Experiment" on the Emergency Confirmation screen. Delays are
// offsets (ms) from the moment the abort attempt begins.

export const ABORT_PHASE_ONE = [
  { id: 1, text: 'Abort Request Received...', delay: 300, tone: 'neutral' },
  { id: 2, text: 'Verifying...', delay: 1300, tone: 'neutral' },
  { id: 3, text: 'Containment Systems Responding...', delay: 2300, tone: 'neutral' },
];

// Brief pause between the "verifying" beats and the failure result.
export const ABORT_PAUSE_MS = 1200;

export const ABORT_PHASE_TWO = [
  { id: 4, text: 'Abort Failed', delay: 700, tone: 'danger' },
  { id: 5, text: 'DNA Fusion Sequence Irreversible', delay: 1500, tone: 'danger' },
  { id: 6, text: 'Containment Lock Engaged', delay: 2300, tone: 'danger' },
  { id: 7, text: 'Emergency Override Denied', delay: 3100, tone: 'danger' },
];

// How long the final message holds on screen before auto-advancing
// to the reveal video.
export const ABORT_SEQUENCE_HOLD_MS = 1800;