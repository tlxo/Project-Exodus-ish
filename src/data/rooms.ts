import type { Room } from '../engine/types';

export const ROOMS: Record<string, Room> = {
  disruption_deck: {
    id: 'disruption_deck',
    name: 'The Disruption Deck',
    description: `The main deck of the S.S. Disruptor is a breathtaking monument to unexamined aesthetics.

Bean bag chairs are scattered across the floor at ergonomic intervals that somehow still wreck your back. A ring of standing desks surrounds a central "ideation zone" — a circle of astroturfed floor centred on a lava lamp the size of a small child.

The air smells faintly of kombucha and something called "Focus Mist™". An LED ticker scrolls motivational aphorisms across the wall in 96-point type: FAIL FAST. MOVE FAST. BREAK THINGS. (Especially fire codes.)

A polished plaque by the bulkhead door reads: Welcome aboard the S.S. Disruptor. Please leave your scarcity mindset at the airlock.`,

    shortDescription:
      "The Disruption Deck. Bean bags, standing desks, and a lava lamp the size of ambition. The ticker continues its affirmations.",

    exits: {
      north: 'monetization_engine',
      east: 'transparency_suite',
    },

    itemIds: ['kombucha_bottle'],

    examineTargets: {
      'lava lamp': "The lava lamp is enormous and deeply hypnotic. You stare into it for a full ten seconds before remembering you might be trapped on a malfunctioning luxury escape pod.",
      lava: "The lava lamp is enormous and deeply hypnotic. You stare into it for a full ten seconds before remembering you might be trapped on a malfunctioning luxury escape pod.",
      ticker:
        'Current quote: "IF YOU\'RE NOT DISRUPTING, YOU\'RE BEING DISRUPTED."\nPrevious quote: "YESTERDAY YOU SAID TOMORROW."\nQuote before that: "JUST DO IT (TERMS AND CONDITIONS APPLY)."',
      plaque:
        'The plaque reads: "Welcome aboard the S.S. Disruptor. Please leave your scarcity mindset at the airlock. Also your dignity."',
      'bean bag': 'You lower yourself experimentally into a beanbag chair. Your lower back files a formal complaint.',
      beanbag: 'You lower yourself experimentally into a beanbag chair. Your lower back files a formal complaint.',
      desk: 'The standing desks are calibrated to a height that seems designed for a species slightly taller than any known human.',
      'standing desk': 'The standing desks are calibrated to a height that seems designed for a species slightly taller than any known human.',
      sign: 'A small sign reads: "This space intentionally disrupted."',
      floor: 'Astroturf in the ideation zone. Polished carbon-look laminate everywhere else. The effect is: confused.',
      window: 'A small porthole. Outside: clouds, atmosphere, and an unsettling amount of altitude.',
      porthole: 'A small porthole. Outside: clouds, atmosphere, and an unsettling amount of altitude.',
    },
  },

  monetization_engine: {
    id: 'monetization_engine',
    name: 'The Monetization Engine',
    description: `The "engine room" is not what you expected.

There are no pistons. No fuel lines. No comforting mechanical hum of combustion. Instead, the walls are lined with monitors cycling through engagement metrics — follower counts, share ratios, a pulsing VIBES INDEX currently sitting at 34 and falling.

The sound you hear is not machinery. It is the aggregate white noise of ten thousand push notifications, harvested and looped.

At the centre of the room, a brushed aluminium console bears a single large red lever: EMERGENCY PIVOT. A sticky note beside it reads: "Last resort. (Also second resort. Also first resort tbh.)"

A maintenance manual sits on top of the console, lightly coffee-stained.`,

    shortDescription:
      "The Monetization Engine. Screens glow with dying metrics. The Vibes Index ticks downward. The lever waits.",

    exits: {
      south: 'disruption_deck',
      down: 'logic_gap',
    },

    itemIds: ['emergency_pivot_lever', 'maintenance_manual'],

    examineTargets: {
      screens:
        'The screens display: Engagement Rate: ↓2.3%. Follower Count: [REDACTED]. Vibes Index: 34 and falling. One screen is exclusively showing a spinning beach ball. It has been doing this for some time.',
      screen:
        'The screens display: Engagement Rate: ↓2.3%. Follower Count: [REDACTED]. Vibes Index: 34 and falling. One screen is exclusively showing a spinning beach ball. It has been doing this for some time.',
      metrics:
        'Follower Count: [REDACTED BY LEGAL DEPT.]. Vibes Index: 34. Growth Potential: "Unlimited" (per pitch deck). Actual Growth: not currently displayed.',
      console:
        'A sleek aluminium console. The lever is the only control. Everything else appears to be decorative, which, now that you think about it, explains a lot.',
      'sticky note':
        '"Last resort. (Also second resort. Also first resort tbh.)"\nBelow, in smaller writing: "If this doesn\'t work, blame the market conditions."',
      note: '"Last resort. (Also second resort. Also first resort tbh.)"\nBelow, in smaller writing: "If this doesn\'t work, blame the market conditions."',
      hole: 'A ragged opening in the floor. No stairs. No ladder. No sign that anyone considered this a problem worth solving.',
      floor: 'There is a hole in the floor. It leads down. Its existence has apparently been logged, categorised, and deprioritised.',
    },
  },

  transparency_suite: {
    id: 'transparency_suite',
    name: "The 'Transparency' Suite",
    description: `Every surface — floor, walls, ceiling — is flawless, crystal-clear glass.

The effect is breathtaking and immediately terrifying. You can see clouds drifting far below through the floor. The sun blazes through the transparent hull, heating the room to a temperature that the ship's brochure describes as "aggressively sunny." Everything in here is either melting slightly or reflecting light at angles that assault your retinas directly.

A frosted-glass sign on the far wall reads: WE HAVE NOTHING TO HIDE.

Beneath it, in text visible only when the sun hits it at a specific angle (which is constantly, because there are no blinds): *subject to NDA, terms of service, and the reasonable expectations of our shareholders.

A pair of mirrored sunglasses rest on a slowly warping perspex side table.`,

    shortDescription:
      "The Transparency Suite. All glass. Sun at maximum intensity. The sign still claims there is nothing to hide.",

    exits: {
      west: 'disruption_deck',
    },

    itemIds: ['sunglasses'],

    examineTargets: {
      sign: 'The large sign reads: "WE HAVE NOTHING TO HIDE."\nThe fine print: "*subject to NDA, terms of service, and the reasonable expectations of our shareholders. Nothing to hide does not constitute an admission of anything to hide."',
      'fine print': '"Nothing to hide does not constitute an admission of anything to hide." You marvel at this sentence.',
      floor: 'You look down through the glass floor at drifting clouds, far below. Your knees have opinions about this. They are filing them now.',
      ceiling: 'The transparent ceiling offers an unobstructed view of the sun\'s furious surface. This does not help.',
      wall: 'The glass walls. You can see everything. Everything can see you. We have nothing to hide.',
      walls: 'The glass walls. You can see everything. Everything can see you. We have nothing to hide.',
      sun: 'You glance toward the sun. You immediately regret this. Your retinas are now filing a worker\'s compensation claim.',
      table: 'A perspex side table, warped slightly by the accumulated heat. The sunglasses are balanced on its surface, somehow intact.',
      'side table': 'A perspex side table, warped slightly by the accumulated heat. The sunglasses are balanced on its surface, somehow intact.',
    },
  },

  logic_gap: {
    id: 'logic_gap',
    name: 'The Logic Gap',
    description: `You carefully lower yourself through the hole — there are no stairs, which the developers apparently have strong feelings about — and drop into a cramped maintenance corridor beneath the Monetization Engine.

The corridor is lit by a faint blue glow emanating from somewhere deeper in the ship. Its origin is not visible from here. The glow pulses with the slow, patient rhythm of a loading indicator that has been loading for a very long time.

The walls are covered entirely in sticky notes. They all say some variation of KNOWN ISSUE, WORKS AS INTENDED, and BY DESIGN (DO NOT FIX).

A laminated sign at eye level reads: "The Logic Gap: A Feature of the User Journey™."

The way back up requires some undignified climbing.`,

    shortDescription:
      "The Logic Gap. Sticky notes wall-to-wall. The blue glow persists, unhurried, from somewhere further in.",

    exits: {
      up: 'monetization_engine',
    },

    itemIds: [],

    examineTargets: {
      'sticky notes':
        'A representative sample: "KNOWN BUG — WON\'T FIX." "WORKS AS INTENDED." "ACTUALLY A FEATURE." "TODO: DOCUMENT AS FEATURE." "BY DESIGN." "USERS SHOULD ADAPT." "WORKING AS DESIGNED (SEE: INTENDED DESIGN)." "NOT A BUG (SEE PREVIOUS NOTE)."',
      'sticky note':
        'A representative sample: "KNOWN BUG — WON\'T FIX." "WORKS AS INTENDED." "ACTUALLY A FEATURE." "TODO: DOCUMENT AS FEATURE." "BY DESIGN." "USERS SHOULD ADAPT."',
      notes:
        'A representative sample: "KNOWN BUG — WON\'T FIX." "WORKS AS INTENDED." "ACTUALLY A FEATURE." "TODO: DOCUMENT AS FEATURE." "BY DESIGN." "USERS SHOULD ADAPT."',
      sign: '"The Logic Gap: A Feature of the User Journey™."\nBelow that: "Estimated repair time: Q3." (The date on the sign is from several years ago. The Q3 in question has passed.)',
      glow: 'The blue glow pulses from somewhere further down the corridor, beyond the reach of your current vision. It has the quality of something that is definitely still loading.',
      'blue glow': 'The blue glow pulses from somewhere further down the corridor, beyond the reach of your current vision. It has the quality of something that is definitely still loading.',
      light: 'The blue glow pulses from somewhere further down the corridor. Patient. Expectant.',
      corridor: 'The maintenance corridor extends further into the ship, narrowing slightly. The glow intensifies in that direction. The sticky notes thin out.',
      hole: 'The opening in the ceiling through which you descended. No ladder. No handholds. Getting back up will require commitment.',
      ceiling: 'The opening in the ceiling through which you descended. No ladder. No handholds. Getting back up will require commitment.',
    },
  },
};
