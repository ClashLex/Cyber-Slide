/**
 * CYBER SLIDE V3 — Main App Component
 * Full V1 cyberpunk UI + V2 game modes panel integrated.
 */

import React, { useEffect } from "react";
import Board from "./components/Board";
import HUD from "./components/HUD";
import WinModal from "./components/WinModal";
import ModePanel from "./components/ModePanel";
import { useGameState } from "./hooks/useGameState";
import "./styles/game.css";

const App: React.FC = () => {
  const {
    board,
    moves,
    time,
    isWon,
    isLost,
    isSoundOn,
    lastMovedCell,
    movableCells,
    modes,
    handleTileClick,
    handleKeyDown,
    shuffle,
    restart,
    toggleSound,
    toggleMode,
  } = useGameState();

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="app-root">
      {/* Animated background */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow bg-glow-1" aria-hidden="true" />
      <div className="bg-glow bg-glow-2" aria-hidden="true" />
      <div className="bg-glow bg-glow-3" aria-hidden="true" />

      {/* Scanline overlay */}
      <div className="scanlines" aria-hidden="true" />

      <main className="game-container">
        {/* Header */}
        <header className="game-header">
          <div className="header-logo">
            <span className="logo-cyber">CYBER</span>
            <span className="logo-slide">SLIDE</span>
          </div>
          <div className="header-tagline">
            <span className="header-tag-text">// V3 · 26-CELL HARDCORE NEON PUZZLE //</span>
          </div>
        </header>

        {/* HUD Panel */}
        <HUD
          moves={moves}
          time={time}
          isSoundOn={isSoundOn}
          isLost={isLost}
          modes={modes}
          onShuffle={shuffle}
          onRestart={restart}
          onToggleSound={toggleSound}
        />

        {/* Puzzle Board */}
        <div className="board-wrapper">
          <div className="board-container">
            <div className="corner corner-tl" aria-hidden="true" />
            <div className="corner corner-tr" aria-hidden="true" />
            <div className="corner corner-bl" aria-hidden="true" />
            <div className="corner corner-br" aria-hidden="true" />

            <Board
              board={board}
              movableCells={movableCells}
              lastMovedCell={lastMovedCell}
              onTileClick={handleTileClick}
              isWon={isWon}
              isLost={isLost}
              modes={modes}
            />
          </div>
        </div>

        {/* V2: Mode Panel */}
        <ModePanel modes={modes} onToggle={toggleMode} />

        {/* Footer */}
        <footer className="game-footer">
          <span className="footer-text">ARROW KEYS · CLICK · TAP</span>
          <span className="footer-sep">◈</span>
          <span className="footer-text">TILES 1→25 + EMPTY AT EXTRA CELL</span>
          <span className="footer-sep">◈</span>
          <span className="footer-text">V3</span>
        </footer>
      </main>

      {/* Win Modal */}
      {isWon && (
        <WinModal
          moves={moves}
          time={time}
          onRestart={restart}
          onShuffle={shuffle}
        />
      )}
    </div>
  );
};

export default App;
