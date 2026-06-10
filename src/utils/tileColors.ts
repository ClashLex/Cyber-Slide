/**
 * CYBER SLIDE — Tile Color System (Neo-Brutalist Refactor)
 * Saturated flat retro colors with maximum readability.
 */

const TILE_COLORS: string[] = [
  "#FF6B6B", // 1 - Coral Red
  "#FFD23F", // 2 - Sun Yellow
  "#4CCD99", // 3 - Mint Green
  "#0ABDE3", // 4 - Electric Cyan
  "#A55EEA", // 5 - Bright Purple
  "#FFA07A", // 6 - Pastel Orange
  "#9C88FF", // 7 - Lavender Blue
  "#4CD137", // 8 - Lime Green
  "#00A8FF", // 9 - Sky Blue
  "#ECCC68", // 10 - Honey Yellow
  "#FF7F50", // 11 - Coral Orange
  "#FF6B81", // 12 - Wild Rose Pink
  "#70A1FF", // 13 - Periwinkle Blue
  "#2ED573", // 14 - Emerald
  "#FFBE76", // 15 - Warm Peach
  "#FF7675", // 16 - Soft Red
  "#FDCB6E", // 17 - Mustard Gold
  "#A29BFE", // 18 - Slate Purple
  "#55EFC4", // 19 - Seafoam
  "#FFEAA7", // 20 - Lemon Cream
  "#FAB1A0", // 21 - Soft Salmon
  "#81ECEC", // 22 - Aqua Cyan
  "#FF9FF3", // 23 - Light Rose Pink
  "#FECA57", // 24 - Honey Amber
  "#54A0FF", // 25 - Cobalt Blue
];

export function getTileGradient(tileValue: number): string {
  if (tileValue < 1 || tileValue > 25) return "#FFFFFF";
  return TILE_COLORS[tileValue - 1];
}

export function getTileGlow(tileValue: number): string {
  // Return flat shadow color (black)
  return "#000000";
}
