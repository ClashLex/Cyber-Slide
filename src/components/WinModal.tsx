import React, { useEffect, useState } from "react";
import { GameModes, MODE_LABELS } from "../game/modes";

interface WinModalProps {
  moves: number;
  time: number;
  modes: GameModes;
  onRestart: () => void;
  onShuffle: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function getRating(moves: number, time: number): { stars: number; label: string } {
  if (moves <= 60 && time <= 90) return { stars: 3, label: "LEGENDARY" };
  if (moves <= 120 && time <= 180) return { stars: 2, label: "ELITE" };
  return { stars: 1, label: "HACKER" };
}

const WinModal: React.FC<WinModalProps> = ({ moves, time, modes, onRestart, onShuffle }) => {
  const [visible, setVisible] = useState(false);
  const { stars, label } = getRating(moves, time);

  useEffect(() => {
    // Slight delay for entry animation
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleShareX = () => {
    const activeModes = Object.keys(modes)
      .filter((k) => modes[k as keyof GameModes])
      .map((k) => MODE_LABELS[k as keyof GameModes].label);

    const modesText = activeModes.length > 0 ? activeModes.join(" + ") : "STANDARD";
    const tweetText = `⚡ I solved the CYBER SLIDE Neon Sliding Puzzle! ⚡\n\n◈ Rating: ${label} [${stars} Stars]\n◈ Moves: ${moves}\n◈ Time: ${formatTime(time)}\n◈ Modes: ${modesText}\n\nPlay the challenge here:\nhttps://clashlex.github.io/Cyber-Slide`;

    const shareUrl = `https://x.com/intent/post?text=${encodeURIComponent(tweetText)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`win-modal-backdrop ${visible ? "win-modal-visible" : ""}`} role="dialog" aria-modal="true" aria-label="Puzzle solved">
      {/* Particle burst */}
      <div className="win-particles" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="win-particle"
            style={{
              "--angle": `${(i / 20) * 360}deg`,
              "--delay": `${(i * 0.05).toFixed(2)}s`,
              "--color": `hsl(${(i / 20) * 360}, 100%, 65%)`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className={`win-modal ${visible ? "win-modal-enter" : ""}`}>
        {/* Scanlines */}
        <div className="win-scanlines" aria-hidden="true" />

        <div className="win-modal-content">
          {/* Title */}
          <div className="win-title-wrap">
            <div className="win-glitch" data-text="SOLVED!">SOLVED!</div>
            <div className="win-subtitle">PUZZLE COMPLETE</div>
          </div>

          {/* Rating */}
          <div className="win-rating">
            <div className="win-rating-label">{label}</div>
            <div className="win-stars">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className={`win-star ${i < stars ? "win-star-active" : "win-star-dim"}`}
                  style={{ animationDelay: `${0.2 + i * 0.15}s` }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="win-stats">
            <div className="win-stat">
              <span className="win-stat-label">MOVES</span>
              <span className="win-stat-value">{moves}</span>
            </div>
            <div className="win-stat-divider" />
            <div className="win-stat">
              <span className="win-stat-label">TIME</span>
              <span className="win-stat-value">{formatTime(time)}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="win-buttons">
            <button className="win-btn win-btn-primary" onClick={onShuffle}>
              PLAY AGAIN
            </button>
            <button className="win-btn win-btn-secondary" onClick={onRestart}>
              NEW GAME
            </button>
            <button className="win-btn win-btn-share" onClick={handleShareX}>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: "middle", marginRight: "4px" }}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              SHARE ON X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinModal;
