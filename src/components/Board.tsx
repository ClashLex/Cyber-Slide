/**
 * CYBER SLIDE V3 — Board Component
 * V1 5×5+1 irregular grid renderer + V2 obstacle cell visual.
 */

import React from "react";
import Tile from "./Tile";
import { Board as BoardType } from "../game/puzzleLogic";
import { GameModes } from "../game/modes";

interface BoardProps {
  board: BoardType;
  movableCells: Set<number>;
  lastMovedCell: number | null;
  onTileClick: (cellIndex: number) => void;
  isWon: boolean;
  isLost: boolean;
  modes: GameModes;
}

const Board: React.FC<BoardProps> = ({
  board,
  movableCells,
  lastMovedCell,
  onTileClick,
  isWon,
  isLost,
  modes,
}) => {
  return (
    <div
      className={`puzzle-board ${isWon ? "board-won" : ""} ${isLost ? "board-lost" : ""}`}
      role="grid"
      aria-label="Sliding puzzle board"
    >
      {/* Grid lines overlay */}
      <div className="grid-lines" aria-hidden="true" />

      {/* Render all 26 cells */}
      {board.map((tileValue, cellIndex) => {
        // V2: obstacle cell — render as blocked cell
        const isObstacle = modes.obstacles && cellIndex === 12 && tileValue !== 0;
        // V2: locked tile visual
        const isLockedByMode = modes.lockedTiles && cellIndex === 5 && tileValue !== 0;

        return (
          <Tile
            key={cellIndex}
            value={tileValue}
            cellIndex={cellIndex}
            isMovable={movableCells.has(cellIndex) && tileValue !== 0 && !isObstacle}
            isLastMoved={lastMovedCell === cellIndex}
            isObstacle={isObstacle}
            isLockedByMode={isLockedByMode}
            onClick={() => onTileClick(cellIndex)}
          />
        );
      })}

      {/* Win overlay */}
      {isWon && (
        <div className="win-overlay" aria-live="polite">
          <div className="win-text">
            <span className="win-label">PUZZLE</span>
            <span className="win-label-2">SOLVED!</span>
          </div>
        </div>
      )}

      {/* Lost overlay */}
      {isLost && (
        <div className="win-overlay lost-overlay" aria-live="assertive">
          <div className="win-text">
            <span className="win-label lost-label">GAME</span>
            <span className="win-label-2 lost-label-2">OVER</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
