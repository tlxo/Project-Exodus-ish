import type { ParsedCommand, Verb } from './types';

// Maps bare direction words to canonical direction strings
const DIRECTION_MAP: Record<string, string> = {
  n: 'north', s: 'south', e: 'east', w: 'west', u: 'up', d: 'down',
  north: 'north', south: 'south', east: 'east',
  west: 'west', up: 'up', down: 'down',
};

const BARE_DIRECTIONS = new Set(Object.keys(DIRECTION_MAP));

// Maps first-token aliases to canonical verbs
const VERB_MAP: Record<string, Verb> = {
  look: 'look', l: 'look',
  go: 'go', move: 'go', walk: 'go', run: 'go', enter: 'go',
  examine: 'examine', x: 'examine', inspect: 'examine',
  read: 'examine', check: 'examine', describe: 'examine',
  take: 'take', get: 'take', grab: 'take',
  drop: 'drop', put: 'drop', leave: 'drop', discard: 'drop',
  inventory: 'inventory', i: 'inventory', inv: 'inventory',
  help: 'help', '?': 'help',
  quit: 'quit', q: 'quit',
};

export function parseInput(raw: string): ParsedCommand {
  const trimmed = raw.trim();
  const lower = trimmed.toLowerCase();
  const tokens = lower.split(/\s+/).filter(Boolean);

  if (tokens.length === 0) {
    return { verb: 'unknown', noun: null, raw: trimmed };
  }

  const first = tokens[0];

  // Bare direction word → go <direction>
  if (BARE_DIRECTIONS.has(first)) {
    return { verb: 'go', noun: DIRECTION_MAP[first] ?? first, raw: trimmed };
  }

  const verb = VERB_MAP[first] ?? 'unknown';
  const rest = tokens.slice(1);

  // "go <dir>"
  if (verb === 'go') {
    if (rest.length === 0) return { verb: 'go', noun: null, raw: trimmed };
    const dir = DIRECTION_MAP[rest[0]] ?? rest.join(' ');
    return { verb: 'go', noun: dir, raw: trimmed };
  }

  // "look at <thing>" → examine <thing>
  if (verb === 'look' && rest[0] === 'at' && rest.length > 1) {
    return { verb: 'examine', noun: rest.slice(1).join(' '), raw: trimmed };
  }

  // "pick up <thing>" → take <thing>
  if (first === 'pick' && rest[0] === 'up') {
    const noun = rest.slice(1).join(' ') || null;
    return { verb: 'take', noun, raw: trimmed };
  }

  // "put down <thing>" → drop <thing>
  if (first === 'put' && rest[0] === 'down') {
    const noun = rest.slice(1).join(' ') || null;
    return { verb: 'drop', noun, raw: trimmed };
  }

  const noun = rest.length > 0 ? rest.join(' ') : null;
  return { verb, noun, raw: trimmed };
}
