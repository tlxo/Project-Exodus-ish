import { useReducer, useCallback } from 'react';
import type { OutputLine, GameState } from '../engine/types';
import { parseInput } from '../engine/parser';
import { processCommand, getInitialOutput } from '../engine/engine';
import { createInitialState } from '../data/initialState';

// ---------------------------------------------------------------------------
// State shape
// ---------------------------------------------------------------------------

interface GameHookState {
  gameState: GameState;
  outputLines: OutputLine[];
  /** Monotonically increasing counter used for stable React keys. */
  nextId: number;
}

type Action =
  | { type: 'SUBMIT'; input: string }
  | { type: 'NEW_GAME' };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeOutputLines(
  texts: string[],
  type: OutputLine['type'],
  startId: number,
): OutputLine[] {
  return texts.map((text, i) => ({ id: startId + i, type, text }));
}

function buildInitialHookState(): GameHookState {
  const gameState = createInitialState();
  const texts = getInitialOutput(gameState);
  const outputLines = makeOutputLines(texts, 'output', 0);
  return { gameState, outputLines, nextId: outputLines.length };
}

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function reducer(state: GameHookState, action: Action): GameHookState {
  switch (action.type) {
    case 'SUBMIT': {
      const trimmed = action.input.trim();
      if (!trimmed) return state;

      let id = state.nextId;

      const inputLine: OutputLine = { id: id++, type: 'input', text: `> ${trimmed}` };
      const command = parseInput(trimmed);
      const { state: newGameState, output } = processCommand(command, state.gameState);
      const outputLines = makeOutputLines(output, 'output', id);
      id += outputLines.length;

      return {
        gameState: newGameState,
        outputLines: [...state.outputLines, inputLine, ...outputLines],
        nextId: id,
      };
    }

    case 'NEW_GAME': {
      return buildInitialHookState();
    }

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useGame() {
  const [state, dispatch] = useReducer(reducer, undefined, buildInitialHookState);

  const submitCommand = useCallback((input: string) => {
    dispatch({ type: 'SUBMIT', input });
  }, []);

  const newGame = useCallback(() => {
    dispatch({ type: 'NEW_GAME' });
  }, []);

  return {
    outputLines: state.outputLines,
    gameOver: state.gameState.gameOver,
    musicEnabled: state.gameState.musicEnabled,
    submitCommand,
    newGame,
  };
}
