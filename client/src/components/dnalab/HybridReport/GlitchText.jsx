import { useEffect, useState } from 'react';
import './GlitchText.css';

const GLITCH_CHARS = ['#', '%', '$', '█', '?', '*'];

function corrupt(text) {
  if (!text) return text;
  const index = Math.floor(Math.random() * text.length);
  const char = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
  return text.slice(0, index) + char + text.slice(index + 1);
}

/**
 * Renders text that occasionally glitches — one character corrupts
 * for well under 200ms, then reverts. Used for holographic status
 * readouts across the Hybrid Report panels. Rare and subtle by design.
 */
function GlitchText({ text, as: Tag = 'span', className = '', intervalMs = 6000 }) {
  const [display, setDisplay] = useState(text);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  useEffect(() => {
    let revertTimer;
    const interval = window.setInterval(() => {
      setDisplay(corrupt(text));
      setGlitching(true);
      revertTimer = window.setTimeout(() => {
        setDisplay(text);
        setGlitching(false);
      }, 160);
    }, intervalMs + Math.random() * 3000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(revertTimer);
    };
  }, [text, intervalMs]);

  return (
    <Tag className={`glitch-text ${glitching ? 'glitch-text--active' : ''} ${className}`}>
      {display}
    </Tag>
  );
}

export default GlitchText;