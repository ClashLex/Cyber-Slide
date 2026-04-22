/**
 * CYBER SLIDE V3 — Puzzle Logic
 *
 * Merges V1 (full 26-cell board, immutable state, solvable shuffle, helpers)
 * with V2 (mode-aware move validation: lockedTiles, hardcoreShuffle, obstacles, oneWay).
 *
 * Board: array of length 26. board[i] = tile value (1–25) or 0 (empty).
 * Solved: board[0]=1 … board[24]=25, board[25]=0 (extra cell is empty).
 */

import { ADJACENCY, canMove } from "./graph";
import { GameModes } from "./modes";

export type Board = number[]; // length 26

export const SOLVED_BOARD: Board = [
   1,  2,  3,  4,  5,
   6,  7,  8,  9, 10,
  11, 12, 13, 14, 15,
  16, 17, 18, 19, 20,
  21, 22, 23, 24, 25,
  0, // cell 25 (extra) is empty in solved state
];

export const cloneBoard = (board: Board): Board => [...board];

export function findEmpty(board: Board): number {
  return board.indexOf(0);
}

export function isSolved(board: Board): boolean {
  return SOLVED_BOARD.every((val, idx) => board[idx] === val);
}

/**
 * Apply a move: slide the tile at `tileCell` into the empty space.
 * Returns a NEW board or null if the move is invalid.
 * V2 additions: respects lockedTiles and mode-aware canMove.
 */
export function applyMove(
  board: Board,
  tileCell: number,
  modes: GameModes
): Board | null {
  const emptyCell = findEmpty(board);

  // V2: lockedTiles — tile at index 5 cannot be moved
  if (modes.lockedTiles && tileCell === 5) return null;

  // V1 + V2: mode-aware adjacency check
  if (!canMove(tileCell, emptyCell, modes)) return null;

  const next = cloneBoard(board);
  next[emptyCell] = next[tileCell];
  next[tileCell] = 0;
  return next;
}

/**
 * Generate a solvable shuffled board using random walk from solved state.
 * V1: guaranteed solvable via random walk.
 * V2: hardcoreShuffle uses 300 moves, normal uses 150.
 */
export function generateShuffledBoard(
  modes: GameModes,
  customMoves?: number
): Board {
  const moveCount = customMoves ?? (modes.hardcoreShuffle ? 300 : 150);

  let board = cloneBoard(SOLVED_BOARD);
  let emptyCell = findEmpty(board);
  let lastEmpty = -1;

  for (let i = 0; i < moveCount; i++) {
    const allNeighbors = ADJACENCY.get(emptyCell)!;
    // Filter out last position (avoid reversal), obstacles, and oneWay constraints
    let candidates = allNeighbors.filter((n) => {
      if (n === lastEmpty) return false;
      if (modes.obstacles && n === 12) return false;
      if (modes.oneWay && n < emptyCell) return false;
      return true;
    });

    // Fallback to all neighbors if constraints eliminate all options
    if (candidates.length === 0) {
      candidates = allNeighbors.filter((n) => {
        if (modes.obstacles && n === 12) return false;
        return true;
      });
    }
    if (candidates.length === 0) candidates = allNeighbors;

    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    board[emptyCell] = board[chosen];
    board[chosen] = 0;
    lastEmpty = emptyCell;
    emptyCell = chosen;
  }

  if (isSolved(board)) return generateShuffledBoard(modes, moveCount);
  return board;
}

/** Get all cell indices adjacent to the empty cell (movable tiles). V1. */
export function getMovableCells(board: Board, modes: GameModes): number[] {
  const emptyCell = findEmpty(board);
  const neighbors = ADJACENCY.get(emptyCell) ?? [];
  return neighbors.filter((n) => {
    // Not locked
    if (modes.lockedTiles && n === 5) return false;
    // Obstacle cell itself can't be moved into empty
    if (modes.obstacles && emptyCell === 12) return false;
    // One-way
    if (modes.oneWay && n < emptyCell) return false;
    return true;
  });
}

/** Find which cell a given tile value is currently in. V1. */
export function findTile(board: Board, tileValue: number): number {
  return board.indexOf(tileValue);
}

/** Check move limit exceeded. V2. */
export function isMoveLimitExceeded(moves: number, modes: GameModes): boolean {
  return modes.moveLimit && moves >= 200;
}

/** Check if timer has run out. V2. */
export function isTimerExpired(time: number, modes: GameModes): boolean {
  return modes.timer && time >= 180;
}
