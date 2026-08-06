import { useCallback, useMemo, useState } from 'react';

export const PARENT_SLOTS = {
  A: 'A',
  B: 'B',
};

/**
 * Manages Parent A / Parent B specimen selection for the extraction flow.
 *
 * Rules:
 * - A specimen cannot occupy both slots at once.
 * - Selecting an already-selected specimen again clears that slot.
 * - Selecting a new specimen fills Parent A first, then Parent B.
 * - Once both slots are filled, selecting a new specimen replaces
 *   whichever slot currently holds a specimen not being re-selected
 *   is not allowed — the user must clear a slot first by clicking it.
 */
export function useParentSelection() {
  const [parentA, setParentA] = useState(null);
  const [parentB, setParentB] = useState(null);

  const toggleSpecimen = useCallback(
    (specimen) => {
      if (!specimen || specimen.status === 'locked') return;

      const isCurrentlyA = parentA?.id === specimen.id;
      const isCurrentlyB = parentB?.id === specimen.id;

      if (isCurrentlyA) {
        setParentA(null);
        return;
      }
      if (isCurrentlyB) {
        setParentB(null);
        return;
      }
      if (!parentA) {
        setParentA(specimen);
        return;
      }
      if (!parentB) {
        setParentB(specimen);
        return;
      }
      // Both slots full and specimen not part of the pair: ignore.
      // (User must clear a slot first, keeping selection intentional.)
    },
    [parentA, parentB]
  );

  const clearSelection = useCallback(() => {
    setParentA(null);
    setParentB(null);
  }, []);

  const isSelected = useCallback(
    (specimenId) => parentA?.id === specimenId || parentB?.id === specimenId,
    [parentA, parentB]
  );

  const isComplete = useMemo(() => Boolean(parentA && parentB), [parentA, parentB]);

  return {
    parentA,
    parentB,
    toggleSpecimen,
    clearSelection,
    isSelected,
    isComplete,
  };
}
