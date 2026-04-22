/**
 * CYBER SLIDE V3 — HUD Component
 * V1 cyberpunk HUD + V2 move limit counter and timer countdown mode.
 */

import React from "react";
import { GameModes } from "../game/modes";

interface HUDProps {
  moves: number;
  time: number;
  isSoundOn: boolean;
  isLost: boolean;
  modes: GameModes;
  onShuffle: () => void;
  onRestart: () => void;
  onToggleSound: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** V2: display countdown if timer mode is on, else elapsed */
function getTimeDisplay(time: number, modes: GameModes): string {
  if (modes.timer) {
    const remaining = Math.max(0, 180 - time);
    return formatTime(remaining);
  }
  return formatTime(time);
}

const HUD: React.FC<HUDProps> = ({
  moves,
  time,
  isSoundOn,
  isLost,
  modes,
  onShuffle,
  onRestart,
  onToggleSound,
}) => {
  const movesLeft = modes.moveLimit ? Math.max(0, 200 - moves) : null;
  const timerDisplay = getTimeDisplay(time, modes);
  const timerDanger = modes.timer && (180 - time) <= 30;
  const moveDanger = modes.moveLimit && (200 - moves) <= 30;

  return (
    <div className="hud">
      {/* Stats Row */}
      <div className="hud-stats">
        {/* Moves / Moves Left */}
        <div className="stat-box">
          <span className="stat-label">
            {modes.moveLimit ? "MOVES LEFT" : "MOVES"}
          </span>
          <span className={`stat-value ${moveDanger ? "stat-danger" : ""}`}>
            {modes.moveLimit
              ? String(movesLeft!).padStart(3, "0")
              : String(moves).padStart(4, "0")}
          </span>
        </div>

        {/* Center title */}
        <div className="stat-box stat-box-center">
          <div className="stat-label">CYBER SLIDE V3</div>
          <div className="hud-subtitle">neon hardcore puzzle</div>
        </div>

        {/* Timer */}
        <div className="stat-box">
          <span className="stat-label">
            {modes.timer ? "TIME LEFT" : "TIME"}
          </span>
          <span className={`stat-value ${timerDanger ? "stat-danger" : ""}`}>
            {timerDisplay}
          </span>
        </div>
      </div>

      {/* Lost banner */}
      {isLost && (
        <div className="hud-lost-banner" aria-live="assertive">
          ✗ {modes.moveLimit && moves >= 200 ? "MOVE LIMIT REACHED" : "TIME'S UP"} — GAME OVER
        </div>
      )}

      {/* Button Row */}
      <div className="hud-buttons">
        <button className="hud-btn hud-btn-blue" onClick={onShuffle} aria-label="Shuffle puzzle">
          <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
          </svg>
          SHUFFLE
        </button>

        <button className="hud-btn hud-btn-pink" onClick={onRestart} aria-label="Restart game">
          <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          RESTART
        </button>

        <button
          className={`hud-btn ${isSoundOn ? "hud-btn-green" : "hud-btn-dim"}`}
          onClick={onToggleSound}
          aria-label={isSoundOn ? "Mute sound" : "Unmute sound"}
        >
          {isSoundOn ? (
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
          {isSoundOn ? "SOUND ON" : "MUTED"}
        </button>
      </div>

      {/* Instructions */}
      <div className="hud-instructions">
        <span>Click tiles adjacent to the empty cell · Arrow keys supported</span>
        <span className="hud-goal">Goal: arrange 1→25, empty at extra cell (bottom-right)</span>
      </div>
    </div>
  );
};

export default HUD;
