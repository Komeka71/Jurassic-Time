import { useState } from 'react';
import SkipButton from './SkipButton';
import SkipAllButton from './SkipAllButton';
import SkipAllConfirmDialog from './SkipAllConfirmDialog';
import './SkipControls.css';

/**
 * Reusable skip control cluster for laboratory cinematics.
 * - "Skip" reuses the current screen's own completion handler.
 * - "Skip All" opens a confirmation dialog, then — only once
 *   confirmed — calls onSkipAll, which the page wires to its existing
 *   navigation function to jump straight to the Hybrid Report.
 *
 * Any cinematic screen can drop this in without duplicating skip
 * logic or dialog markup.
 */
function SkipControls({ visible, onSkip, onSkipAll }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!visible) return null;

  return (
    <>
      <div className="skip-controls">
        <SkipAllButton onClick={() => setConfirmOpen(true)} />
        <SkipButton onClick={onSkip} />
      </div>

      {confirmOpen && (
        <SkipAllConfirmDialog
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            setConfirmOpen(false);
            onSkipAll?.();
          }}
        />
      )}
    </>
  );
}

export default SkipControls;