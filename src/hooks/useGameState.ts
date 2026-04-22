/**
 * CYBER SLIDE V3 — Game State Hook
 * V1 full state management + V2 mode-awareness throughout.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Board,
  generateShuffledBoard,
  applyMove,
  isSolved,
  findEmpty,
  getMovableCells,
  isMoveLimitExceeded,
  isTimerExpired,
} from "../game/puzzleLogic";
import { playSlide, playError, playWin, playShuffle } from "../game/sounds";
import { GameModes, DEFAULT_MODES } from "../game/modes";

export interface GameState {
  board: Board;
  moves: number;
  time: number;
  isWon: boolean;
  isLost: boolean;
  isSoundOn: boolean;
  lastMovedCell: number | null;
  movableCells: Set<number>;
  emptyCell: number;
  modes: GameModes;
  handleTileClick: (cellIndex: number) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  shuffle: () => void;
  restart: () => void;
  toggleSound: () => void;
  toggleMode: (key: keyof GameModes) => void;
}

export function useGameState(): GameState {
  const [modes, setModes] = useState<GameModes>(DEFAULT_MODES);
  const [board, setBoard] = useState<Board>(() => generateShuffledBoard(DEFAULT_MODES));
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [lastMovedCell, setLastMovedCell] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isRunning = useRef(false);

  const emptyCell = findEmpty(board);
  const movableCells = new Set(getMovableCells(board, modes));

  const startTimer = useCallback(() => {
    if (isRunning.current) return;
    isRunning.current = true;
    timerRef.current = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    isRunning.current = false;
  }, []);

  useEffect(() => () => stopTimer(), [stopTimer]);

  // V2: timer countdown — if timer mode is on, check for expiry
  useEffect(() => {
    if (isTimerExpired(time, modes) && !isWon && !isLost) {
      stopTimer();
      setIsLost(true);
    }
  }, [time, modes, isWon, isLost, stopTimer]);

  const handleTileClick = useCallback(
    (cellIndex: number) => {
      if (isWon || isLost) return;
      if (board[cellIndex] === 0) return;

      // V2: move limit check
      if (isMoveLimitExceeded(moves, modes)) {
        if (isSoundOn) playError();
        setIsLost(true);
        stopTimer();
        return;
      }

      const newBoard = applyMove(board, cellIndex, modes);
      if (!newBoard) {
        if (isSoundOn) playError();
        return;
      }

      if (!isRunning.current) startTimer();

      if (isSoundOn) playSlide();
      setLastMovedCell(findEmpty(board));
      setBoard(newBoard);
      setMoves((m) => {
        const next = m + 1;
        // V2: check move limit after incrementing
        if (modes.moveLimit && next >= 200) {
          stopTimer();
          setIsLost(true);
        }
        return next;
      });

      if (isSolved(newBoard)) {
        stopTimer();
        setIsWon(true);
        if (isSoundOn) playWin();
      }
    },
    [board, isWon, isLost, isSoundOn, modes, moves, startTimer, stopTimer]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isWon || isLost) return;
      let targetCell = -1;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          {
            const below = emptyCell + 5;
            if (below < 25 && movableCells.has(below)) targetCell = below;
            if (emptyCell === 24 && movableCells.has(25)) targetCell = 25;
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          {
            const above = emptyCell - 5;
            if (above >= 0 && movableCells.has(above)) targetCell = above;
          }
          break;
        case "ArrowLeft":
          e.preventDefault();
          {
            const right = emptyCell + 1;
            if (right % 5 !== 0 && movableCells.has(right)) targetCell = right;
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          {
            if (emptyCell % 5 !== 0) {
              const left = emptyCell - 1;
              if (movableCells.has(left)) targetCell = left;
            }
          }
          break;
      }

      if (targetCell >= 0) handleTileClick(targetCell);
    },
    [emptyCell, movableCells, handleTileClick, isWon, isLost]
  );

  const shuffle = useCallback(() => {
    stopTimer();
    if (isSoundOn) playShuffle();
    setBoard(generateShuffledBoard(modes));
    setMoves(0);
    setTime(0);
    setIsWon(false);
    setIsLost(false);
    setLastMovedCell(null);
    isRunning.current = false;
  }, [isSoundOn, modes, stopTimer]);

  const restart = useCallback(() => {
    stopTimer();
    if (isSoundOn) playShuffle();
    setBoard(generateShuffledBoard(modes));
    setMoves(0);
    setTime(0);
    setIsWon(false);
    setIsLost(false);
    setLastMovedCell(null);
    isRunning.current = false;
  }, [isSoundOn, modes, stopTimer]);

  const toggleSound = useCallback(() => setIsSoundOn((s) => !s), []);

  // V2: toggle a game mode, reshuffle automatically
  const toggleMode = useCallback(
    (key: keyof GameModes) => {
      stopTimer();
      setModes((prev) => {
        const next = { ...prev, [key]: !prev[key] };
        // Re-shuffle with new modes
        setTimeout(() => {
          if (isSoundOn) playShuffle();
          setBoard(generateShuffledBoard(next));
          setMoves(0);
          setTime(0);
          setIsWon(false);
          setIsLost(false);
          setLastMovedCell(null);
          isRunning.current = false;
        }, 0);
        return next;
      });
    },
    [isSoundOn, stopTimer]
  );

  return {
    board,
    moves,
    time,
    isWon,
    isLost,
    isSoundOn,
    lastMovedCell,
    movableCells,
    emptyCell,
    modes,
    handleTileClick,
    handleKeyDown,
    shuffle,
    restart,
    toggleSound,
    toggleMode,
  };
}
