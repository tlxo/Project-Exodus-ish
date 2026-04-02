import type { GameState, Direction, Item } from './types';
import type { ParsedCommand } from './types';

const VALID_DIRECTIONS: Direction[] = ['north', 'south', 'east', 'west', 'up', 'down'];

function isDirection(s: string): s is Direction {
  return (VALID_DIRECTIONS as string[]).includes(s);
}

/** Split a (potentially multi-paragraph) string into individual output lines. */
function splitText(text: string): string[] {
  return text.split('\n');
}

function findItem(
  ids: string[],
  items: Record<string, Item>,
  noun: string,
): Item | undefined {
  return ids
    .map(id => items[id])
    .filter(Boolean)
    .find(
      item =>
        item.name.toLowerCase().includes(noun) ||
        item.aliases.some(a => noun.includes(a) || a.includes(noun)),
    );
}

/**
 * Build the room description lines.
 * @param full  When true always show the long description (e.g. LOOK command).
 *              When false use short description for previously visited rooms.
 */
function describeRoom(state: GameState, full: boolean): string[] {
  const room = state.rooms[state.currentRoomId];
  const showFull = full || !state.visitedRooms[room.id];
  const lines: string[] = [];

  lines.push('');
  lines.push(`\u2550\u2550 ${room.name} \u2550\u2550`);
  lines.push('');
  lines.push(...splitText(showFull ? room.description : room.shortDescription));

  // Takeable items present in the room
  const takeableHere = room.itemIds
    .map(id => state.items[id])
    .filter(item => item?.takeable);

  if (takeableHere.length > 0) {
    lines.push('');
    if (takeableHere.length === 1) {
      lines.push(`There is a ${takeableHere[0].name} here.`);
    } else {
      lines.push(`You can see: ${takeableHere.map(i => i.name).join(', ')}.`);
    }
  }

  // Exits
  const exits = Object.keys(room.exits);
  lines.push('');
  if (exits.length > 0) {
    lines.push(`Obvious exits: ${exits.join(', ')}.`);
  } else {
    lines.push('There are no obvious exits.');
  }

  return lines;
}

// Rotating "unknown command" flavour responses (index cycles with turn count)
const UNKNOWN_RESPONSES = [
  (cmd: string) => `"${cmd}" is not a recognised command. Try HELP.`,
  (cmd: string) => `The AI Pilot processes your input and responds: "That's not aligned with our core values." (You typed: ${cmd})`,
  (cmd: string) => `Command not recognised. Have you tried approaching "${cmd}" from an abundance mindset?`,
  (_cmd: string) => `That action has been sunset in favour of a more streamlined user journey. Try HELP.`,
  (cmd: string) => `"${cmd}"? We've pivoted away from that feature. Try HELP.`,
];

export function getInitialOutput(state: GameState): string[] {
  const divider = '\u2500'.repeat(50);
  return [
    '',
    '  S.S. DISRUPTOR \u2014 PASSENGER INCIDENT LOG',
    '  Entry 001 \u2014 Time Unknown',
    divider,
    '',
    'The emergency klaxon sounded at precisely 4:17 AM, during',
    "the founder's scheduled \"unstructured vision time.\"",
    '',
    'You are a passenger. A guest of the inaugural',
    '"Escape the Old Paradigm" luxury retreat.',
    'You paid a great deal of money to be here.',
    'You are beginning to regret this.',
    '',
    'The ship is not doing well. The AI Pilot has responded to',
    'all status queries with variations of "That\'s not a bug,',
    "it\u2019s a feature of your user journey.\u201d",
    '',
    'This is not reassuring.',
    '',
    divider,
    'Type HELP to see available commands.',
    ...describeRoom(state, true),
  ];
}

export function processCommand(
  command: ParsedCommand,
  state: GameState,
): { state: GameState; output: string[] } {
  let s = { ...state, turns: state.turns + 1 };
  const output: string[] = [];
  const room = s.rooms[s.currentRoomId];

  switch (command.verb) {
    case 'look': {
      output.push(...describeRoom(s, true));
      break;
    }

    case 'go': {
      if (!command.noun || !isDirection(command.noun)) {
        output.push('Go where? Try a direction: NORTH, SOUTH, EAST, WEST, UP, DOWN.');
        break;
      }
      const dir = command.noun as Direction;
      const nextId = room.exits[dir];
      if (!nextId) {
        output.push("You can't go that way.");
        break;
      }
      // Mark current room visited before leaving
      s = {
        ...s,
        visitedRooms: { ...s.visitedRooms, [s.currentRoomId]: true },
        currentRoomId: nextId,
      };
      output.push(...describeRoom(s, false));
      break;
    }

    case 'examine': {
      if (!command.noun) {
        output.push('What do you want to examine?');
        break;
      }
      const noun = command.noun;

      // 1. Room examine targets (scenery / fixtures)
      const targets = room.examineTargets ?? {};
      const matchedKey = Object.keys(targets).find(
        k => noun.includes(k) || k.includes(noun),
      );
      if (matchedKey) {
        output.push(...splitText(targets[matchedKey]));
        break;
      }

      // 2. Items in the room
      const roomItem = findItem(room.itemIds, s.items, noun);
      if (roomItem) {
        output.push(...splitText(roomItem.description));
        break;
      }

      // 3. Items in inventory
      const invItem = findItem(s.inventory, s.items, noun);
      if (invItem) {
        output.push(...splitText(invItem.description));
        break;
      }

      // 4. Generic fallback
      output.push(`You don't see any "${command.noun}" here.`);
      break;
    }

    case 'take': {
      if (!command.noun) {
        output.push('Take what?');
        break;
      }
      const target = findItem(room.itemIds, s.items, command.noun);
      if (!target) {
        const alreadyHeld = findItem(s.inventory, s.items, command.noun);
        output.push(
          alreadyHeld ? "You're already carrying that." : `You don't see any "${command.noun}" here.`,
        );
        break;
      }
      if (!target.takeable) {
        output.push(`The ${target.name} doesn't budge. Some things are too disrupted to move.`);
        break;
      }
      const updatedRoom = {
        ...room,
        itemIds: room.itemIds.filter(id => id !== target.id),
      };
      s = {
        ...s,
        inventory: [...s.inventory, target.id],
        rooms: { ...s.rooms, [room.id]: updatedRoom },
      };
      output.push(`You pick up the ${target.name}.`);
      break;
    }

    case 'drop': {
      if (!command.noun) {
        output.push('Drop what?');
        break;
      }
      const target = findItem(s.inventory, s.items, command.noun);
      if (!target) {
        output.push(`You're not carrying any "${command.noun}".`);
        break;
      }
      const updatedRoom = {
        ...room,
        itemIds: [...room.itemIds, target.id],
      };
      s = {
        ...s,
        inventory: s.inventory.filter(id => id !== target.id),
        rooms: { ...s.rooms, [room.id]: updatedRoom },
      };
      output.push(`You set down the ${target.name}.`);
      break;
    }

    case 'inventory': {
      if (s.inventory.length === 0) {
        output.push(
          "You are empty-handed. Your pockets are as vacant as a disrupted pivot.",
        );
      } else {
        output.push('You are carrying:');
        for (const id of s.inventory) {
          const item = s.items[id];
          if (item) output.push(`  \u2022 ${item.name}`);
        }
      }
      break;
    }

    case 'help': {
      output.push(
        'Available commands:',
        '  LOOK  (L)             \u2014 Describe your surroundings',
        '  GO [direction]        \u2014 Move (NORTH, SOUTH, EAST, WEST, UP, DOWN)',
        '  [direction]           \u2014 Shorthand: N, S, E, W, U, D',
        '  EXAMINE [thing]  (X)  \u2014 Inspect something closely',
        '  TAKE [item]           \u2014 Pick up an item',
        '  DROP [item]           \u2014 Leave an item behind',
        '  INVENTORY  (I)        \u2014 List what you are carrying',
        '  HELP  (?)             \u2014 Show this message',
        '  QUIT  (Q)             \u2014 End the simulation',
      );
      break;
    }

    case 'quit': {
      output.push(
        '',
        'You initiate the escape pod\'s "Graceful Exit Protocol."',
        'It plays a fifteen-second outro jingle and displays a Net Promoter Score survey.',
        '',
        'Session terminated.',
      );
      s = { ...s, gameOver: true };
      break;
    }

    case 'unknown':
    default: {
      const respFn = UNKNOWN_RESPONSES[s.turns % UNKNOWN_RESPONSES.length];
      output.push(respFn(command.raw || '???'));
      break;
    }
  }

  // Mark the current room as visited at end of each turn
  s = { ...s, visitedRooms: { ...s.visitedRooms, [s.currentRoomId]: true } };

  return { state: s, output };
}
