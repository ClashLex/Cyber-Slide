/**
 * CYBER SLIDE V3 — Game Modes
 * Toggleable hardcore mode flags from V2, integrated into V1 engine.
 */

export interface GameModes {
  moveLimit: boolean;    // cap moves at 200
  timer: boolean;        // show live countdown timer (180s)
  obstacles: boolean;    // cell 12 is blocked (obstacle cell)
  lockedTiles: boolean;  // tile at index 5 is locked and cannot move
  oneWay: boolean;       // tiles can only slide to higher-indexed cells
  hardcoreShuffle: boolean; // 300-move shuffle vs 150-move normal
}

export const DEFAULT_MODES: GameModes = {
  moveLimit: false,
  timer: false,
  obstacles: false,
  lockedTiles: false,
  oneWay: false,
  hardcoreShuffle: false,
};

export const MODE_LABELS: Record<keyof GameModes, { label: string; desc: string; color: string }> = {
  moveLimit:      { label: "MOVE LIMIT",    desc: "200 moves max",           color: "#ffd166" },
  timer:          { label: "TIMER",         desc: "180 sec countdown",       color: "#f72585" },
  obstacles:      { label: "OBSTACLES",     desc: "Cell 12 is blocked",      color: "#ff6b6b" },
  lockedTiles:    { label: "LOCKED TILE",   desc: "Tile 5 can't move",       color: "#a044ff" },
  oneWay:         { label: "ONE-WAY",       desc: "Only slide forward",      color: "#00f5d4" },
  hardcoreShuffle:{ label: "HARDCORE",      desc: "300-step shuffle",        color: "#f95738" },
};
