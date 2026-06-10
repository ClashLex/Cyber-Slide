/**
 * CYBER SLIDE V3 — Tile Component
 * V1 cyberpunk neon tile + V2 obstacle and locked-tile visual states.
 */

import React, { memo, useRef, useEffect } from "react";
import { getTileGradient, getTileGlow } from "../utils/tileColors";

interface TileProps {
  value: number;
  cellIndex: number;
  isMovable: boolean;
  isLastMoved: boolean;
  isObstacle: boolean;
  isLockedByMode: boolean;
  onClick: () => void;
}

function getCSSGridPos(cellIndex: number): { col: number; row: number } {
  if (cellIndex === 25) return { col: 5, row: 6 };
  return {
    col: (cellIndex % 5) + 1,
    row: Math.floor(cellIndex / 5) + 1,
  };
}

const Tile: React.FC<TileProps> = memo(
  ({ value, cellIndex, isMovable, isLastMoved, isObstacle, isLockedByMode, onClick }) => {
    const { col, row } = getCSSGridPos(cellIndex);
    const prevPosRef = useRef<{ col: number; row: number } | null>(null);
    const tileRef = useRef<HTMLButtonElement | HTMLDivElement | null>(null);

    useEffect(() => {
      const prev = prevPosRef.current;
      const curr = { col, row };
      if (prev && (prev.col !== curr.col || prev.row !== curr.row) && tileRef.current) {
        const el = tileRef.current;
        const cellSize = el.offsetWidth;
        const gap = Math.round(cellSize * 0.07);
        const step = cellSize + gap;
        const dx = (prev.col - curr.col) * step;
        const dy = (prev.row - curr.row) * step;
        el.animate(
          [
            { transform: `translate(${dx}px, ${dy}px)`, easing: "ease-out" },
            { transform: "translate(0, 0)" },
          ],
          { duration: 180, fill: "none" }
        );
      }
      prevPosRef.current = curr;
    }, [col, row]);

    if (value === 0) {
      return (
        <div
          className="tile-empty"
          aria-label="Empty cell"
          style={{ gridColumn: col, gridRow: row }}
        />
      );
    }

    const gradient = getTileGradient(value);
    const glowColor = getTileGlow(value);

    if (isObstacle) {
      return (
        <div
          ref={tileRef as React.RefObject<HTMLDivElement>}
          className="tile tile-obstacle"
          aria-label={`Tile ${value} — obstacle cell`}
          style={{
            gridColumn: col,
            gridRow: row,
          }}
        >
          <span className="tile-shine" aria-hidden="true" />
          <span className="tile-number">{value}</span>
          <span className="tile-obstacle-icon" aria-hidden="true">⛔</span>
        </div>
      );
    }

    const extraClass = isLockedByMode
      ? "tile-mode-locked"
      : isMovable
      ? "tile-movable"
      : "tile-locked";

    return (
      <button
        ref={tileRef as React.RefObject<HTMLButtonElement>}
        className={["tile", extraClass, isLastMoved ? "tile-last-moved" : ""].join(" ")}
        onClick={onClick}
        aria-label={`Tile ${value}${isMovable ? ", movable" : ""}${isLockedByMode ? ", locked" : ""}`}
        tabIndex={isMovable ? 0 : -1}
        style={{
          background: gradient,
          gridColumn: col,
          gridRow: row,
        }}
      >
        <span className="tile-shine" aria-hidden="true" />
        <span className="tile-number">{value}</span>
        {isMovable && <span className="tile-movable-hint" aria-hidden="true" />}
        {isLockedByMode && <span className="tile-lock-icon" aria-hidden="true">🔒</span>}
      </button>
    );
  }
);

Tile.displayName = "Tile";
export default Tile;
