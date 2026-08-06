import { useEffect, useRef, useState } from 'react';
import SkipControls from './SkipControls';
import './cinematicVideo.css';

// How long the skip controls wait before appearing, to avoid accidental clicks.
const SKIP_BUTTON_DELAY_MS = 1000;

/**
 * Fullscreen placeholder cinematic used across the DNA Lab (extraction,
 * analysis, fusion, emergency, reveal). Autoplays, no controls, covers
 * the viewport, fades in on mount and fades out before calling
 * onComplete(). If the placeholder asset isn't present yet, falls back
 * to a timed advance so the flow never gets stuck. SkipControls appear
 * after a short delay: "Skip" reuses the same advance() handler as
 * natural playback end, and "Skip All" (after confirmation) reuses the
 * page's existing navigation via onSkipAll to jump straight to the
 * Hybrid Report.
 */
function CinematicVideo({ src, onComplete, onSkipAll }) {
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const advancedRef = useRef(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSkip(true), SKIP_BUTTON_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const advance = () => {
    if (advancedRef.current) return;
    advancedRef.current = true;
    setShowSkip(false);
    setVisible(false);
    window.setTimeout(() => onComplete?.(), 500);
  };

  const handleEnded = () => advance();

  const handleError = () => {
    // Placeholder cinematic not present yet — don't block the experience.
    window.setTimeout(advance, 2500);
  };

  const handleSkip = () => {
    videoRef.current?.pause();
    advance();
  };

  const handleSkipAll = () => {
    videoRef.current?.pause();
    onSkipAll?.();
  };

  return (
    <div className={`cinematic-video ${visible ? 'cinematic-video--visible' : ''}`}>
      <video
        ref={videoRef}
        className="cinematic-video__el"
        src={src}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        onError={handleError}
      />
      <SkipControls visible={showSkip} onSkip={handleSkip} onSkipAll={handleSkipAll} />
    </div>
  );
}

export default CinematicVideo;