<div align="center">

# ⚡ CyberSlide

**A neon-styled sliding puzzle game built with React + Vite + TypeScript.**

[![Live Demo](https://img.shields.io/badge/▶_Live_Demo-CyberSlide-00f5d4?style=for-the-badge&logo=github)](https://clashlex.github.io/Cyber-Slide)
[![License](https://img.shields.io/badge/License-MIT-7209b7?style=for-the-badge)](LICENSE)
[![Built with Vite](https://img.shields.io/badge/Built_with-Vite-f72585?style=for-the-badge&logo=vite)](https://vitejs.dev)

</div>

---

## 🎮 Overview

CyberSlide is a classic sliding puzzle wrapped in a cyberpunk neon aesthetic. Slide tiles into order — fast, clean, and replayable.

**Goal:** Arrange tiles 1→25 in order, with the empty cell at the extra bottom-right position.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧩 Sliding Puzzle | Classic 5×5 + 1 irregular cell mechanic |
| ⚡ Hardcore Modes | 5 toggleable modes (obstacles, locked tiles, timer, and more) |
| 🎯 Move Limit | Optional 200-move cap for extra challenge |
| ⏱️ Countdown Timer | Optional 180-second race mode |
| 🔊 Sound Effects | Procedural audio via Web Audio API — no external files |
| 🎨 Neo-Brutalist UI | Stark block borders, flat drop shadows, and high-contrast styling |
| ⌨️ Keyboard Support | Full arrow key navigation |
| 🏆 Win Rating | LEGENDARY / ELITE / HACKER based on moves + time |

---

## 🛠️ Tech Stack

- **React 19** — UI & component architecture
- **TypeScript** — Full type safety
- **Vite** — Dev server & build tool
- **TailwindCSS** — Utility styling
- **Web Audio API** — Procedural sound effects
- **gh-pages** — GitHub Pages deployment

---

## 📂 Project Structure

```
puzzle-v3/
├── src/
│   ├── components/
│   │   ├── Board.tsx        # Grid renderer, obstacle/lost overlays
│   │   ├── Tile.tsx         # Individual tile with FLIP animation
│   │   ├── HUD.tsx          # Moves, timer, control buttons
│   │   ├── ModePanel.tsx    # Hardcore mode toggles
│   │   └── WinModal.tsx     # Win screen with star rating
│   │
│   ├── game/
│   │   ├── puzzleLogic.ts   # Board state, shuffle, move validation
│   │   ├── modes.ts         # Mode definitions and metadata
│   │   ├── graph.ts         # Adjacency map, mode-aware neighbor filtering
│   │   └── sounds.ts        # Web Audio procedural sound effects
│   │
│   ├── hooks/
│   │   └── useGameState.ts  # All game state, timer, keyboard, modes
│   │
│   ├── utils/
│   │   ├── cn.ts            # Class name utility
│   │   └── tileColors.ts    # 25 unique neon tile gradients
│   │
│   ├── styles/
│   │   └── game.css         # Full cyberpunk stylesheet
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Clone the repo
git clone https://github.com/ClashLex/Cyber-Slide.git
cd Cyber-Slide

# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### GitHub Pages config

Ensure `package.json` has:

```json
"homepage": "https://clashlex.github.io/Cyber-Slide"
```

---

## ⚡ Hardcore Modes

Toggle any combination from the in-game Mode Panel. Activating a mode auto-reshuffles the board.

| Mode | Effect |
|---|---|
| **Move Limit** | Game over after 200 moves |
| **Timer** | 180-second countdown |
| **Obstacles** | Cell 12 is permanently blocked |
| **Locked Tile** | Tile at cell index 5 cannot be moved |
| **Hardcore Shuffle** | 300-step shuffle instead of 150 |

---

## 🗺️ Roadmap

- [ ] Leaderboard / scoring system
- [ ] Theme customization
- [ ] Additional puzzle grid sizes
- [ ] Mobile swipe gestures
- [ ] AI solver / hint system
- [ ] Background music toggle

---

## 🤝 Contributing

Pull requests are welcome.

```bash
# 1. Fork the repo
# 2. Create your branch
git checkout -b feature/your-feature

# 3. Commit your changes
git commit -m "feat: add your feature"

# 4. Push and open a PR
git push origin feature/your-feature
```

---

## 📜 License

[![License](https://img.shields.io/badge/License-MIT-7209b7?style=for-the-badge)](LICENCE) 

---

<div align="center">

Built with ⚡ in Termux &nbsp;·&nbsp; by [ClashLex](https://github.com/ClashLex)

</div>



