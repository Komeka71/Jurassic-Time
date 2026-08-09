import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import './EraSorting.css';
import { ERAS, DINOSAURS, pickRoster } from './dinosaurs';
import HomeButton from '../../components/Homebtn.jsx';
import DinoGuide from '../../components/guide/DinoGuide'; // adjust path to match actual location relative to this file
import { useGuide } from '../../context/GuideContext'; // adjust path to match actual location relative to this file
import { useNavigate } from 'react-router-dom';

// ... (all the same GAME_SECONDS / HINT_COUNT / formatTime / DinoSilhouette /
// AmbientScene / IntroOverlay / TimesUpOverlay / EndScreen / DinoCard /
// DropZone code stays exactly as you have it — unchanged) ...

export default function EraSorting() {
  const navigate = useNavigate();
  const { setCurrentPage, setLastAction } = useGuide();

  useEffect(() => {
    setCurrentPage('eraSorting');
  }, [setCurrentPage]);

  const onNavigateGames = () => {
    navigate('/#mini-games');
  };
  // phase: 'intro' | 'playing' | 'timesup' | 'won' | 'timeout'
  const [phase, setPhase] = useState('intro');
  const [introClosing, setIntroClosing] = useState(false);

  const [roster, setRoster] = useState(() => pickRoster());
  const [order, setOrder] = useState(() => roster.map((d) => d.id));
  const [placements, setPlacements] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [dragOverEra, setDragOverEra] = useState(null);
  const [cardFeedback, setCardFeedback] = useState({});

  const [secondsLeft, setSecondsLeft] = useState(GAME_SECONDS);
  const [hintsLeft, setHintsLeft] = useState(HINT_COUNT);
  const [hintZone, setHintZone] = useState(null);
  const [locked, setLocked] = useState(false);

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

  useEffect(() => {
    if (phase === 'playing' && !locked && score === roster.length) {
      clearInterval(timerRef.current);
      setLastAction('eraSortingWon');
      setPhase('won');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, phase, roster, locked]);

  const timeoutStartedRef = useRef(false);
  const pendingTimersRef = useRef([]);

  useEffect(() => {
    if (phase === 'playing' && secondsLeft === 0 && !timeoutStartedRef.current) {
      timeoutStartedRef.current = true;
      setLocked(true);
      setPhase('timesup');

      const pauseTimer = setTimeout(() => {
        setPhase('playing');
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
          setLastAction('eraSortingTimeout');
          setPhase('timeout');
        }, totalDelay);
        pendingTimersRef.current.push(finalTimer);
      }, TIMESUP_PAUSE_MS);

      pendingTimersRef.current.push(pauseTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, phase]);

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
        setLastAction('eraSortingCorrect');
      } else {
        flashFeedback(dinoId, 'wrong');
        setLastAction('eraSortingWrong');
      }
      setSelectedId(null);
      setDragOverEra(null);
    },
    [dinoById, locked, placements, flashFeedback, setLastAction]
  );

  const handleDragStart = (e, dinoId) => {
    if (locked) return;
    e.dataTransfer.setData('text/plain', dinoId);
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleDragEnd = () => setDragOverEra(null);

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

  const handleTrayWheel = (e) => {
    const el = trayRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }
  };

  const useHint = () => {
    if (hintsLeft <= 0 || locked || remainingIds.length === 0) return;
    const targetId = remainingIds[Math.floor(Math.random() * remainingIds.length)];
    const dino = dinoById[targetId];
    setHintsLeft((h) => h - 1);
    setHintZone(dino.era);
    flashFeedback(targetId, 'hint', 2200);
    setTimeout(() => setHintZone(null), 2200);
  };

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

      <HomeButton onClick={() => navigate('/')} />

      <nav className="es-nav"></nav>

      <header className="es-header">
        <h1 className="es-header__title">Era Sorting</h1>
        <p className="es-header__subtitle">
          Drag each dinosaur into the correct geological era.
        </p>
      </header>

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

      {/* DinoGuide — bottom-right, raised well above the fixed card tray.
          Only shown during active/intro play; hidden during timesup/won/
          timeout overlays so it doesn't sit on top of the modal. */}
      {(phase === 'intro' || phase === 'playing') && (
        <div
          className="
            fixed
            bottom-28
            right-4
            md:bottom-32
            md:right-6
            z-[9999]
            scale-[0.55]
            md:scale-[0.65]
            origin-bottom-right
          "
        >
          <DinoGuide section="eraSorting" />
        </div>
      )}
    </div>
  );
}