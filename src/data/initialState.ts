import type { GameState } from '../engine/types';
import { ROOMS } from './rooms';
import { ITEMS } from './items';

/**
 * Returns a fresh deep copy of the initial game state.
 * Call this each time a new game is started to avoid shared mutable state.
 */
export function createInitialState(): GameState {
  // Deep-copy room itemIds arrays so they can be mutated independently
  const rooms = Object.fromEntries(
    Object.entries(ROOMS).map(([id, room]) => [id, { ...room, itemIds: [...room.itemIds] }]),
  );

  return {
    currentRoomId: 'disruption_deck',
    inventory: [],
    rooms,
    items: { ...ITEMS },
    visitedRooms: {},
    flags: {},
    turns: 0,
    gameOver: false,
    musicEnabled: true,
  };
}
