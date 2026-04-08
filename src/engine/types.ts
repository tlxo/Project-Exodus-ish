export type Direction = 'north' | 'south' | 'east' | 'west' | 'up' | 'down';

export type Verb =
  | 'go'
  | 'look'
  | 'examine'
  | 'take'
  | 'drop'
  | 'inventory'
  | 'help'
  | 'quit'
  | 'unknown';

export interface ParsedCommand {
  verb: Verb;
  /** Normalised lowercase noun phrase, or null if none provided. */
  noun: string | null;
  raw: string;
}

export interface Item {
  id: string;
  name: string;
  /** Lower-case words the parser should recognise as referring to this item. */
  aliases: string[];
  description: string;
  /** Text shown in the room description when this item is present, in lieu of the generic listing. */
  roomDescription?: string;
  takeable: boolean;
}

export interface Room {
  id: string;
  name: string;
  /** Full description shown on first visit and when LOOK is typed. */
  description: string;
  /** Brief description shown when re-entering a visited room. */
  shortDescription: string;
  exits: Partial<Record<Direction, string>>;
  /** IDs of items currently present in this room (mutable during play). */
  itemIds: string[];
  /**
   * Keyword → description map for fixtures and scenery that can be EXAMINEd
   * but not taken. Keys are lower-case; partial matching is used.
   */
  examineTargets?: Record<string, string>;
}

export interface GameState {
  currentRoomId: string;
  inventory: string[];
  /** Master copy of all room state (item locations etc. mutate here). */
  rooms: Record<string, Room>;
  /** Item definitions — treated as read-only during play. */
  items: Record<string, Item>;
  /** Rooms the player has already entered at least once. */
  visitedRooms: Record<string, boolean>;
  /** Arbitrary boolean flags for puzzle/narrative state. */
  flags: Record<string, boolean>;
  turns: number;
  gameOver: boolean;
}

export interface OutputLine {
  id: number;
  type: 'input' | 'output' | 'system';
  text: string;
}
