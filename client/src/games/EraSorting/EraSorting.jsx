import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import './EraSorting.css';
import { ERAS, DINOSAURS, pickRoster } from './dinosaurs';

// -----------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------
const GAME_SECONDS = 90;
const HINT_COUNT = 3;
const AUTO_PLACE_STAGGER_MS = 260; // delay between each auto-placed dino at timeout
const TIMESUP_PAUSE_MS = 2000; // pause on the "Time's Up!" overlay before auto-sorting begins
const FEEDBACK_MS = 650; // how long the shake / "try again" note stays visible

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

// -----------------------------------------------------------------------
// Stylized dinosaur silhouette icons (no external art assets required).
// Each is a simple, elegant single-path shape used consistently across
// the collectible cards — think museum signage, not a photo.
// -----------------------------------------------------------------------
function DinoSilhouette({ shape, className }) {
  const paths = {
    'theropod-small':
      'M8 78 C 6 66, 10 54, 18 48 C 14 40, 16 30, 24 26 C 22 20, 26 14, 34 15 C 42 16, 44 22, 42 27 C 52 24, 62 27, 66 36 C 74 34, 82 38, 83 46 C 84 52, 80 56, 74 56 C 76 62, 72 68, 65 68 L 63 82 L 57 82 L 58 70 C 50 71, 42 70, 36 66 C 32 70, 26 72, 20 70 L 18 82 L 12 82 L 14 68 C 10 66, 8 72, 8 78 Z',
    'theropod-large':
      'M6 82 C 4 68, 10 54, 20 48 C 15 38, 18 26, 28 22 C 26 14, 32 8, 41 10 C 50 12, 52 20, 49 26 C 62 22, 76 27, 80 39 C 90 37, 98 43, 97 52 C 96 59, 90 62, 84 60 C 87 67, 82 74, 74 73 L 71 90 L 64 90 L 66 76 C 56 78, 46 76, 39 71 C 34 76, 27 79, 19 76 L 17 90 L 10 90 L 13 74 C 8 71, 6 77, 6 82 Z',
    sauropod:
      'M4 70 C 3 60, 9 52, 18 50 C 14 44, 16 34, 24 30 C 20 20, 26 6, 36 4 C 44 3, 48 10, 44 16 C 40 20, 38 26, 42 32 C 54 30, 66 34, 74 42 C 84 40, 94 46, 92 56 C 90 64, 82 66, 76 62 C 78 68, 74 74, 67 73 L 65 88 L 59 88 L 61 75 C 50 77, 38 76, 30 71 C 26 75, 20 77, 14 74 L 12 88 L 6 88 L 9 72 C 5 70, 4 74, 4 70 Z',
    'sauropod-early':
      'M6 72 C 4 63, 10 55, 19 53 C 15 47, 17 38, 25 34 C 22 25, 27 13, 36 12 C 43 11, 46 18, 42 23 C 39 27, 38 32, 41 37 C 51 35, 61 39, 67 46 C 76 44, 84 50, 82 58 C 80 65, 73 67, 68 63 C 70 68, 66 73, 60 72 L 58 84 L 53 84 L 55 73 C 46 75, 37 74, 30 70 C 27 73, 22 75, 17 73 L 15 84 L 10 84 L 12 71 C 8 69, 6 75, 6 72 Z',
    stegosaur:
      'M4 76 C 3 66, 9 58, 18 56 L 20 46 L 26 52 L 30 42 L 35 50 L 40 38 L 45 50 L 51 40 L 55 52 L 61 44 L 63 55 C 73 55, 82 61, 84 70 C 92 70, 98 76, 96 84 L 90 84 C 89 80, 85 78, 81 79 L 78 90 L 72 90 L 74 80 C 62 83, 48 83, 37 80 C 33 84, 27 86, 21 84 L 19 90 L 13 90 L 16 82 C 9 80, 5 80, 4 76 Z',
    ceratopsian:
      'M10 80 C 8 70, 12 62, 20 59 C 16 52, 18 44, 25 41 C 22 33, 27 24, 36 23 C 40 17, 48 14, 55 18 C 62 14, 70 18, 70 26 C 78 27, 84 33, 83 41 C 91 42, 96 49, 93 57 C 91 63, 85 65, 80 62 C 82 68, 78 74, 71 73 L 69 88 L 63 88 L 65 75 C 55 77, 44 76, 36 71 C 32 75, 26 77, 20 75 L 18 88 L 12 88 L 15 73 C 10 71, 10 76, 10 80 Z',
  };
  return (
    <svg
      className={className}
      viewBox="0 0 100 92"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={paths[shape] || paths['theropod-small']} />
    </svg>
  );
}

// -----------------------------------------------------------------------
// Ambient scene: layered fog, drifting clouds, and floating light motes.
// Purely decorative, purely CSS-driven.
// -----------------------------------------------------------------------
function AmbientScene() {
  return (
    <div className="es-scene" aria-hidden="true">
      <div className="es-sky" />
      <div className="es-ridge es-ridge--back" />
      <div className="es-ridge es-ridge--mid" />
      <div className="es-cloud es-cloud--1" />
      <div className="es-cloud es-cloud--2" />
      <div className="es-cloud es-cloud--3" />
      <div className="es-fog es-fog--1" />
      <div className="es-fog es-fog--2" />
      <div className="es-particles">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className={`es-mote es-mote--${(i % 6) + 1}`} />
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// Intro overlay
// -----------------------------------------------------------------------
function IntroOverlay({ onStart, closing }) {
  return (
    <div className={`es-overlay ${closing ? 'es-overlay--closing' : ''}`}>
      <div className="es-modal">
        <span className="es-modal__eyebrow">Museum Without Walls</span>
        <h1 className="es-modal__title">Era Sorting</h1>
        <p className="es-modal__subtitle">
          Every dinosaur belongs to a specific geological era. Restore the
          museum records by placing each dinosaur into the correct era
          before time runs out.
        </p>

        <div className="es-modal__stats">
          <div className="es-stat">
            <span className="es-stat__icon">🦖</span>
            <span className="es-stat__label">Difficulty</span>
            <span className="es-stat__value">Easy</span>
          </div>
          <div className="es-stat">
            <span className="es-stat__icon">⏳</span>
            <span className="es-stat__label">Time Limit</span>
            <span className="es-stat__value">90 seconds</span>
          </div>
          <div className="es-stat">
            <span className="es-stat__icon">💡</span>
            <span className="es-stat__label">Hints</span>
            <span className="es-stat__value">3</span>
          </div>
        </div>

        <div className="es-howto">
          <h2 className="es-howto__title">How to Play</h2>
          <ul className="es-howto__list">
            <li>
              <span className="es-howto__icon">🖱️</span>
              Drag each dinosaur card into the era where it lived.
            </li>
            <li>
              <span className="es-howto__icon">🦖</span>
              Sort dinosaurs into Triassic, Jurassic, or Cretaceous.
            </li>
            <li>
              <span className="es-howto__icon">💡</span>
              Use up to 3 hints if you get stuck.
            </li>
            <li>
              <span className="es-howto__icon">⏳</span>
              Finish before the timer reaches zero.
            </li>
            <li>
              <span className="es-howto__icon">📚</span>
              If time runs out, the correct answers will be revealed so you
              can learn.
            </li>
          </ul>
        </div>

        <button className="es-btn es-btn--primary es-btn--large" onClick={onStart}>
          Start Expedition
        </button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// Brief "Time's Up!" transition — shown for a beat before the remaining
// dinosaurs auto-sort, so the moment reads as educational, not punishing.
// -----------------------------------------------------------------------
function TimesUpOverlay() {
  return (
    <div className="es-overlay es-overlay--dim">
      <div className="es-modal es-modal--timesup">
        <h1 className="es-modal__title es-modal__title--caps">⏰ Time’s Up!</h1>
        <p className="es-modal__subtitle es-modal__subtitle--tight">Don’t worry!</p>
        <p className="es-modal__subtitle es-modal__subtitle--tight">Let’s restore the museum records.</p>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// End screen (win or timeout)
// -----------------------------------------------------------------------
function EndScreen({ status, score, total, timeRemaining, roster, placements, onRestart, onBackToGames }) {
  const isWin = status === 'won';

  return (
    <div className="es-overlay">
      <div className="es-modal es-modal--end">
        <span className="es-modal__eyebrow">{isWin ? 'Expedition Complete' : 'Expedition Paused'}</span>
        <h1 className="es-modal__title">{isWin ? '🎉 Excellent!' : '⏰ Time’s Up!'}</h1>
        <p className="es-modal__subtitle">
          {isWin
            ? 'You correctly sorted every dinosaur.'
            : 'The remaining specimens have been placed for you.'}
        </p>

        <div className="es-modal__stats">
          {isWin && (
            <div className="es-stat">
              <span className="es-stat__icon">⏳</span>
              <span className="es-stat__label">Time Remaining</span>
              <span className="es-stat__value">{formatTime(timeRemaining)}</span>
            </div>
          )}
          <div className="es-stat">
            <span className="es-stat__icon">⭐</span>
            <span className="es-stat__label">Score</span>
            <span className="es-stat__value">
              {score} / {total}
            </span>
          </div>
        </div>

        {!isWin && (
          <div className="es-recap">
            <h2 className="es-recap__title">📚 Correct Eras</h2>
            <div className="es-recap__grid">
              {ERAS.map((era) => (
                <div key={era.id} className="es-recap__col">
                  <span className="es-recap__era" style={{ color: era.glow }}>
                    {era.label}
                  </span>
                  <ul>
                    {roster
                      .filter((d) => d.era === era.id)
                      .map((d) => (
                        <li key={d.id} className={placements[d.id]?.correct ? 'is-correct' : 'is-missed'}>
                          {d.name}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="es-modal__actions">
          <button className="es-btn es-btn--primary" onClick={onRestart}>
            {isWin ? 'Restart' : 'Play Again'}
          </button>
          <button className="es-btn es-btn--ghost" onClick={onBackToGames}>
            Back to Mini Games
          </button>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// Dinosaur card
// -----------------------------------------------------------------------
function DinoCard({ dino, isSelected, feedback, draggable, onSelect, onDragStart, onDragEnd }) {
  return (
    <div
      className={[
        'es-card',
        isSelected ? 'is-selected' : '',
        feedback === 'wrong' ? 'is-wrong' : '',
        feedback === 'hint' ? 'is-hinted' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      draggable={draggable}
      onDragStart={(e) => onDragStart(e, dino.id)}
      onDragEnd={onDragEnd}
      onClick={() => onSelect(dino.id)}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`${dino.name}, drag or select then choose an era`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(dino.id);
        }
      }}
    >
      <div className="es-card__art">
        <DinoSilhouette shape={dino.silhouette} className="es-card__silhouette" />
      </div>
      <span className="es-card__name">{dino.name}</span>
      {feedback === 'wrong' && <span className="es-card__note">Try Again</span>}
    </div>
  );
}

// -----------------------------------------------------------------------
// Drop zone (one per era)
// -----------------------------------------------------------------------
function DropZone({ era, placedDinos, isPulsing, isDragTarget, onDragOver, onDrop, onClick }) {
  return (
    <div
      className={[
        'es-zone',
        `es-zone--${era.id}`,
        isPulsing ? 'is-pulsing' : '',
        isDragTarget ? 'is-drag-over' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        '--zone-from': era.terrainFrom,
        '--zone-to': era.terrainTo,
        '--zone-glow': era.glow,
        '--zone-glow-soft': era.glowSoft,
      }}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver(era.id);
      }}
      onDragLeave={() => onDragOver(null)}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(era.id, e);
      }}
      onClick={() => onClick(era.id)}
    >
      <div className="es-zone__terrain" />
      <div className="es-zone__header">
        <span className="es-zone__label">{era.label}</span>
        <span className="es-zone__range">{era.range}</span>
      </div>

      <div className="es-zone__placed">
        {placedDinos.map((d) => (
          <div key={d.id} className="es-zone__badge" title={d.name}>
            <DinoSilhouette shape={d.silhouette} className="es-zone__badge-icon" />
          </div>
        ))}
      </div>

      <span className="es-zone__tagline">{era.tagline}</span>
    </div>
  );
}

// -----------------------------------------------------------------------
// Main component
// -----------------------------------------------------------------------
export default function EraSorting({ onNavigateHome, onNavigateGames }) {
  // phase: 'intro' | 'playing' | 'timesup' | 'won' | 'timeout'
  const [phase, setPhase] = useState('intro');
  const [introClosing, setIntroClosing] = useState(false);

  // roster: this playthrough's random 10-dinosaur selection, redrawn on restart.
  const [roster, setRoster] = useState(() => pickRoster());
  const [order, setOrder] = useState(() => roster.map((d) => d.id));
  // placements: { [dinoId]: { era: 'triassic', correct: true } }
  const [placements, setPlacements] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [dragOverEra, setDragOverEra] = useState(null);
  const [cardFeedback, setCardFeedback] = useState({}); // dinoId -> 'wrong' | 'hint'

  const [secondsLeft, setSecondsLeft] = useState(GAME_SECONDS);
  const [hintsLeft, setHintsLeft] = useState(HINT_COUNT);
  const [hintZone, setHintZone] = useState(null); // era id currently pulsing from a hint
  const [locked, setLocked] = useState(false); // true while auto-resolving at timeout

  const timerRef = useRef(null);
  const feedbackTimers = useRef({});
  const trayRef = useRef(null);

  const dinoById = useMemo(() => Object.fromEntries(DINOSAURS.map((d) => [d.id, d])), []);
  const score = useMemo(
    () => Object.values(placements).filter((p) => p.correct).length,
    [placements]
  );
  const remainingIds = useMemo(
    () => order.filter((id) => !placements[id]),
    [order, placements]
  );

  // --- Timer ---
  useEffect(() => {
    if (phase !== 'playing') return undefined;
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  // --- Win detection ---
  // `!locked` matters here: while the timeout auto-sort is running, phase is
  // briefly 'playing' again so the board is visible, and score naturally
  // reaches roster.length once the last card lands. Without this guard that
  // would trigger the win screen instead of the intended timeout recap.
  useEffect(() => {
    if (phase === 'playing' && !locked && score === roster.length) {
      clearInterval(timerRef.current);
      setPhase('won');
    }
  }, [score, phase, roster, locked]);

  // --- Timeout: show a "Time's Up!" beat, then auto-place remaining with a
  //     stagger, then show the recap. Keeps the moment educational, not abrupt.
  //     Guarded by a ref (not just `phase`) because this effect itself changes
  //     `phase` mid-sequence — depending on `phase` alone would cause the
  //     effect to re-fire and cancel its own pending timers. ---
  const timeoutStartedRef = useRef(false);
  const pendingTimersRef = useRef([]);

  useEffect(() => {
    if (phase === 'playing' && secondsLeft === 0 && !timeoutStartedRef.current) {
      timeoutStartedRef.current = true;
      setLocked(true);
      setPhase('timesup');

      const pauseTimer = setTimeout(() => {
        setPhase('playing'); // reveal the board so the auto-sort is visible, not hidden behind the overlay
        const missing = order.filter((id) => !placements[id]);
        missing.forEach((id, i) => {
          const t = setTimeout(() => {
            setPlacements((prev) => ({
              ...prev,
              [id]: { era: dinoById[id].era, correct: true, auto: true },
            }));
          }, i * AUTO_PLACE_STAGGER_MS);
          pendingTimersRef.current.push(t);
        });
        const totalDelay = missing.length * AUTO_PLACE_STAGGER_MS + 500;
        const finalTimer = setTimeout(() => {
          setLocked(false);
          setPhase('timeout');
        }, totalDelay);
        pendingTimersRef.current.push(finalTimer);
      }, TIMESUP_PAUSE_MS);

      pendingTimersRef.current.push(pauseTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, phase]);

  // cleanup any pending timers on unmount
  useEffect(() => {
    return () => {
      Object.values(feedbackTimers.current).forEach(clearTimeout);
      pendingTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  const flashFeedback = useCallback((dinoId, kind, ms = FEEDBACK_MS) => {
    setCardFeedback((prev) => ({ ...prev, [dinoId]: kind }));
    clearTimeout(feedbackTimers.current[dinoId]);
    feedbackTimers.current[dinoId] = setTimeout(() => {
      setCardFeedback((prev) => {
        const next = { ...prev };
        delete next[dinoId];
        return next;
      });
    }, ms);
  }, []);

  const attemptPlacement = useCallback(
    (dinoId, eraId) => {
      if (locked || !dinoId || placements[dinoId]) return;
      const dino = dinoById[dinoId];
      if (dino.era === eraId) {
        setPlacements((prev) => ({ ...prev, [dinoId]: { era: eraId, correct: true } }));
        setHintZone(null);
      } else {
        flashFeedback(dinoId, 'wrong');
      }
      setSelectedId(null);
      setDragOverEra(null);
    },
    [dinoById, locked, placements, flashFeedback]
  );

  // --- Drag handlers (desktop) ---
  const handleDragStart = (e, dinoId) => {
    if (locked) return;
    e.dataTransfer.setData('text/plain', dinoId);
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleDragEnd = () => setDragOverEra(null);

  // --- Tap-to-select fallback (touch / accessibility friendly) ---
  const handleSelect = (dinoId) => {
    if (locked || placements[dinoId]) return;
    setSelectedId((prev) => (prev === dinoId ? null : dinoId));
  };

  const handleZoneClick = (eraId) => {
    if (selectedId) attemptPlacement(selectedId, eraId);
  };

  const handleZoneDrop = (eraId, e) => {
    const dinoId = e?.dataTransfer?.getData('text/plain');
    if (dinoId) attemptPlacement(dinoId, eraId);
  };

  // Lets a regular vertical mouse wheel scroll the single-row card tray
  // horizontally — only when the tray actually overflows, so the page's
  // normal vertical scroll is left alone otherwise.
  const handleTrayWheel = (e) => {
    const el = trayRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  };

  // --- Hint ---
  const useHint = () => {
    if (hintsLeft <= 0 || locked || remainingIds.length === 0) return;
    const targetId = remainingIds[Math.floor(Math.random() * remainingIds.length)];
    const dino = dinoById[targetId];
    setHintsLeft((h) => h - 1);
    setHintZone(dino.era);
    flashFeedback(targetId, 'hint', 2200);
    setTimeout(() => setHintZone(null), 2200);
  };

  // --- Lifecycle actions ---
  const startGame = () => {
    setIntroClosing(true);
    setTimeout(() => {
      setPhase('playing');
      setIntroClosing(false);
    }, 420);
  };

  const restart = () => {
    pendingTimersRef.current.forEach(clearTimeout);
    pendingTimersRef.current = [];
    timeoutStartedRef.current = false;

    const freshRoster = pickRoster();
    setRoster(freshRoster);
    setOrder(freshRoster.map((d) => d.id));
    setPlacements({});
    setSelectedId(null);
    setDragOverEra(null);
    setCardFeedback({});
    setSecondsLeft(GAME_SECONDS);
    setHintsLeft(HINT_COUNT);
    setHintZone(null);
    setLocked(false);
    setPhase('playing');
  };

  const placedByEra = (eraId) =>
    order
      .filter((id) => placements[id]?.era === eraId)
      .map((id) => dinoById[id]);

  const isLowTime = secondsLeft <= 15 && phase === 'playing';

  return (
    <div className="es-root">
      <AmbientScene />

      {/* Navigation */}
      <nav className="es-nav">
        <button className="es-nav__link" onClick={onNavigateHome}>
          <span className="es-nav__arrow">←</span> Back to Home
        </button>
        <button className="es-nav__link" onClick={onNavigateGames}>
          Mini Games <span className="es-nav__arrow">→</span>
        </button>
      </nav>

      {/* Header */}
      <header className="es-header">
        <h1 className="es-header__title">Era Sorting</h1>
        <p className="es-header__subtitle">
          Drag each dinosaur into the correct geological era.
        </p>
      </header>

      {/* HUD */}
      <div className="es-hud">
        <div className="es-hud__left">
          <button
            className="es-chip es-chip--hint"
            onClick={useHint}
            disabled={hintsLeft <= 0 || locked || phase !== 'playing'}
          >
            💡 Hint <span className="es-chip__count">({hintsLeft})</span>
          </button>
        </div>
        <div className="es-hud__center">
          <div className={`es-chip es-chip--timer ${isLowTime ? 'is-low' : ''}`}>
            ⏳ {formatTime(secondsLeft)}
          </div>
        </div>
        <div className="es-hud__right">
          <div className="es-chip es-chip--score">
            ⭐ {score} / {roster.length}
          </div>
        </div>
      </div>

      {/* Drop zones */}
      <main className="es-board">
        {ERAS.map((era) => (
          <DropZone
            key={era.id}
            era={era}
            placedDinos={placedByEra(era.id)}
            isPulsing={hintZone === era.id}
            isDragTarget={dragOverEra === era.id}
            onDragOver={(id) => setDragOverEra(id)}
            onDrop={handleZoneDrop}
            onClick={handleZoneClick}
          />
        ))}
      </main>

      {/* Card tray */}
      <div className="es-tray">
        <div className="es-tray__scroller" ref={trayRef} onWheel={handleTrayWheel}>
          {order
            .filter((id) => !placements[id])
            .map((id) => (
              <DinoCard
                key={id}
                dino={dinoById[id]}
                isSelected={selectedId === id}
                feedback={cardFeedback[id]}
                draggable={!locked}
                onSelect={handleSelect}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            ))}
          {remainingIds.length === 0 && phase === 'playing' && (
            <p className="es-tray__empty">All specimens placed — nicely done.</p>
          )}
        </div>
      </div>

      {/* Overlays */}
      {phase === 'intro' && <IntroOverlay onStart={startGame} closing={introClosing} />}
      {phase === 'timesup' && <TimesUpOverlay />}
      {(phase === 'won' || phase === 'timeout') && (
        <EndScreen
          status={phase}
          score={score}
          total={roster.length}
          timeRemaining={secondsLeft}
          roster={roster}
          placements={placements}
          onRestart={restart}
          onBackToGames={onNavigateGames}
        />
      )}
    </div>
  );
}