import { useEffect, useState } from 'react';

/**
 * Reveals `lines` one at a time according to each line's `delay` (ms
 * offset from the moment `active` becomes true), then calls
 * onComplete once `holdMs` has passed after the last line appears.
 * Generic enough to drive any "system log" style sequence.
 */
export function useSequentialReveal(lines, active, onComplete, holdMs = 900) {
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    if (!active) {
      setVisibleLines([]);
      return undefined;
    }

    const timers = lines.map((line) =>
      window.setTimeout(() => setVisibleLines((prev) => [...prev, line]), line.delay)
    );

    const lastDelay = lines.length ? lines[lines.length - 1].delay : 0;
    timers.push(window.setTimeout(() => onComplete?.(), lastDelay + holdMs));

    return () => timers.forEach(window.clearTimeout);
  }, [active, lines, onComplete, holdMs]);

  return visibleLines;
}