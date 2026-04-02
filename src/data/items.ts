import type { Item } from '../engine/types';

export const ITEMS: Record<string, Item> = {
  kombucha_bottle: {
    id: 'kombucha_bottle',
    name: 'Kombucha Bottle',
    aliases: ['kombucha', 'bottle', 'drink', 'beverage'],
    description:
      "A glass bottle of \"Quantum Gut Flora\" kombucha, $47 per serving. The label reads: \"Disrupting the beverage paradigm, one live culture at a time.\" A secondary label adds: \"Not approved by the FDA, the EU, or basic common sense.\" You feel vaguely more productive just holding it.",
    takeable: true,
  },

  sunglasses: {
    id: 'sunglasses',
    name: 'Mirrored Sunglasses',
    aliases: ['sunglasses', 'glasses', 'shades', 'sunnies'],
    description:
      "Sleek mirrored sunglasses with \"MOVE FAST.\" etched on the left lens and \"BREAK THINGS.\" on the right. The brand name on the arm reads \"VISIONARY™\". They look ridiculous. They would almost certainly help with the blinding glare in the Transparency Suite.",
    takeable: true,
  },

  maintenance_manual: {
    id: 'maintenance_manual',
    name: 'Engagement Maintenance Manual',
    aliases: ['manual', 'book', 'guide', 'maintenance', 'engagement'],
    description:
      "A spiral-bound manual titled \"KEEPING THE VIBES INDEX UP: A Practical Guide to Metrics That Don't Mean Anything.\" Chapter 1: \"Blaming the Algorithm.\" Chapter 2: \"Blaming the Users.\" Chapter 3 is a full-page motivational poster of a cat hanging from a branch. There is no Chapter 4.",
    takeable: true,
  },

  emergency_pivot_lever: {
    id: 'emergency_pivot_lever',
    name: 'Emergency Pivot Lever',
    aliases: ['lever', 'red lever', 'pivot lever', 'emergency lever'],
    description:
      "A large red lever bolted to the console. The label reads: \"EMERGENCY PIVOT — In case of existential crisis, pivot to B2B SaaS.\" A secondary label reads: \"Also suitable for: market downturns, bad press, regulatory scrutiny, and Mondays.\" It is welded, bolted, and possibly also emotionally resistant to being moved.",
    takeable: false,
  },
};
