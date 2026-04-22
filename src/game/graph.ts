/**
 * CYBER SLIDE V3 — Graph Definition
 *
 * Board has 26 cells:
 *   - Cells 0–24: 5×5 grid (row-major order). Cell (r,c) = r*5 + c
 *   - Cell 25: extra cell attached ONLY to cell 24 (bottom-right corner)
 *
 * V3 merges:
 *   - V1: dynamic adjacency map builder, irregular 26th cell
 *   - V2: mode-aware neighbor filtering (oneWay, obstacles)
 */

import { GameModes } from "./modes";

export const TOTAL_CELLS = 26;
export const EMPTY_TILE = 0;

/** Build the static neighbor map for the irregular board (V1) */
function buildAdjacency(): Map<number, number[]> {
  const adj = new Map<number, number[]>();

  for (let i = 0; i < TOTAL_CELLS; i++) {
    adj.set(i, []);
  }

  const addEdge = (a: number, b: number) => {
    adj.get(a)!.push(b);
    adj.get(b)!.push(a);
  };

  // 5×5 grid edges
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const idx = r * 5 + c;
      if (c < 4) addEdge(idx, idx + 1); // right
      if (r < 4) addEdge(idx, idx + 5); // down
    }
  }

  // Extra cell 25 connects only to cell 24
  addEdge(24, 25);

  return adj;
}

export const ADJACENCY = buildAdjacency();

/**
 * Get neighbors of a cell, filtered by active modes (V2 additions).
 * @param cellIndex - the cell to get neighbors for
 * @param modes - active game modes
 */
export function getNeighbors(cellIndex: number, modes: GameModes): number[] {
  let neighbors = [...(ADJACENCY.get(cellIndex) ?? [])];

  // V2: One-way mode — can only slide into higher-indexed empty cells
  // (i.e., neighbors with a smaller index can't be the empty target)
  if (modes.oneWay) {
    neighbors = neighbors.filter((n) => n > cellIndex);
  }

  // V2: Obstacles mode — cell 12 is permanently blocked
  if (modes.obstacles) {
    neighbors = neighbors.filter((n) => n !== 12);
  }

  return neighbors;
}

/**
 * Check whether a tile at `tileCell` can slide into `emptyCell`,
 * respecting active modes.
 */
export function canMove(
  tileCell: number,
  emptyCell: number,
  modes: GameModes
): boolean {
  // Get neighbors of emptyCell — a tile can move if it is a neighbor of empty
  // But for oneWay, we check neighbors of tileCell (the tile slides toward higher index)
  if (modes.oneWay) {
    // In oneWay mode, a tile can only move if the empty cell has a HIGHER index
    if (emptyCell < tileCell) return false;
  }

  // Check standard adjacency (ignoring oneWay direction since we checked above)
  const baseNeighbors = ADJACENCY.get(emptyCell) ?? [];
  if (!baseNeighbors.includes(tileCell)) return false;

  // Obstacle: if the empty cell is cell 12, it's blocked (can't slide into it)
  if (modes.obstacles && emptyCell === 12) return false;

  return true;
}

/** Get grid position for CSS rendering (V1) */
export function getCellPosition(cellIndex: number): { row: number; col: number } {
  if (cellIndex === 25) return { row: 5, col: 4 };
  return { row: Math.floor(cellIndex / 5), col: cellIndex % 5 };
}
