/**
 * CYBER SLIDE V3 — Mode Panel Component
 * Renders the V2 mode toggles with full V1 cyberpunk styling.
 */

import React from "react";
import { GameModes, MODE_LABELS } from "../game/modes";

interface ModePanelProps {
  modes: GameModes;
  onToggle: (key: keyof GameModes) => void;
}

const ModePanel: React.FC<ModePanelProps> = ({ modes, onToggle }) => {
  return (
    <div className="mode-panel">
      <div className="mode-panel-title">
        <span className="mode-panel-icon">⚡</span>
        HARDCORE MODES
        <span className="mode-panel-icon">⚡</span>
      </div>
      <div className="mode-grid">
        {(Object.keys(modes) as (keyof GameModes)[]).map((key) => {
          const active = modes[key];
          const meta = MODE_LABELS[key];
          return (
            <button
              key={key}
              className={`mode-btn ${active ? "mode-btn-active" : "mode-btn-off"}`}
              style={active ? ({ "--mode-color": meta.color } as React.CSSProperties) : undefined}
              onClick={() => onToggle(key)}
              aria-pressed={active}
              title={meta.desc}
            >
              <span className="mode-btn-indicator" aria-hidden="true" />
              <span className="mode-btn-label">{meta.label}</span>
              <span className="mode-btn-desc">{meta.desc}</span>
            </button>
          );
        })}
      </div>
      <div className="mode-warning">
        {Object.values(modes).some(Boolean)
          ? "⚠ Modes active — puzzle reshuffled"
          : "All modes off — standard play"}
      </div>
    </div>
  );
};

export default ModePanel;
