/**
 * CYBER SLIDE — Tile Color System
 * Each tile (1–25) gets a unique cyberpunk neon color gradient.
 */

// 25 unique cyberpunk gradient combos
const TILE_GRADIENTS: string[] = [
  "linear-gradient(135deg, #f72585, #b5179e)", // 1 - hot pink → magenta
  "linear-gradient(135deg, #7209b7, #560bad)", // 2 - purple
  "linear-gradient(135deg, #3a0ca3, #4361ee)", // 3 - deep blue
  "linear-gradient(135deg, #4361ee, #4cc9f0)", // 4 - blue → cyan
  "linear-gradient(135deg, #00f5d4, #00bbf9)", // 5 - teal → sky
  "linear-gradient(135deg, #f72585, #7209b7)", // 6 - pink → purple
  "linear-gradient(135deg, #480ca8, #3a0ca3)", // 7 - violet
  "linear-gradient(135deg, #4cc9f0, #4361ee)", // 8 - sky → blue
  "linear-gradient(135deg, #f4d35e, #f95738)", // 9 - gold → red-orange
  "linear-gradient(135deg, #ee4266, #f72585)", // 10 - rose → pink
  "linear-gradient(135deg, #06d6a0, #118ab2)", // 11 - mint → teal
  "linear-gradient(135deg, #ffd166, #ef476f)", // 12 - yellow → coral
  "linear-gradient(135deg, #b5179e, #f72585)", // 13 - magenta
  "linear-gradient(135deg, #00b4d8, #0077b6)", // 14 - cyan → navy
  "linear-gradient(135deg, #90e0ef, #00b4d8)", // 15 - pale cyan
  "linear-gradient(135deg, #ff6b6b, #ee5a24)", // 16 - red-orange
  "linear-gradient(135deg, #a8ff78, #78ffd6)", // 17 - green → teal
  "linear-gradient(135deg, #6a3093, #a044ff)", // 18 - deep violet → neon purple
  "linear-gradient(135deg, #f7971e, #ffd200)", // 19 - amber → gold
  "linear-gradient(135deg, #11998e, #38ef7d)", // 20 - teal → lime
  "linear-gradient(135deg, #fc466b, #3f5efb)", // 21 - pink → indigo
  "linear-gradient(135deg, #c471ed, #f64f59)", // 22 - lavender → rose
  "linear-gradient(135deg, #43e97b, #38f9d7)", // 23 - green → aqua
  "linear-gradient(135deg, #fa709a, #fee140)", // 24 - pink → yellow
  "linear-gradient(135deg, #30cfd0, #330867)", // 25 - teal → dark purple
];

// Corresponding glow colors for border/shadow
const TILE_GLOWS: string[] = [
  "#f72585", "#7209b7", "#3a0ca3", "#4361ee", "#00f5d4",
  "#f72585", "#480ca8", "#4cc9f0", "#f4d35e", "#ee4266",
  "#06d6a0", "#ffd166", "#b5179e", "#00b4d8", "#90e0ef",
  "#ff6b6b", "#a8ff78", "#a044ff", "#f7971e", "#11998e",
  "#fc466b", "#c471ed", "#43e97b", "#fa709a", "#30cfd0",
];

export function getTileGradient(tileValue: number): string {
  if (tileValue < 1 || tileValue > 25) return "";
  return TILE_GRADIENTS[tileValue - 1];
}

export function getTileGlow(tileValue: number): string {
  if (tileValue < 1 || tileValue > 25) return "";
  return TILE_GLOWS[tileValue - 1];
}
