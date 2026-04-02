# Exodus-ish

Ran terminal command:  cd /Users/toni/Projects/Project-Exodus-ish && npm run dev 2>&1

Completed: *Verify dev server runs clean* (7/7)

Running clean at **http://localhost:5173**. Here's what was built:

---

**Stack:** React 19 + TypeScript + Vite. No runtime dependencies beyond React itself — the engine is pure TS functions, which makes a future React Native port straightforward.

**Project layout:**
```
src/
  engine/
    types.ts       — all interfaces (GameState, Room, Item, OutputLine, …)
    parser.ts      — tokenises input → ParsedCommand (verb + noun)
    engine.ts      — pure processCommand() + getInitialOutput()
  data/
    rooms.ts       — 4 rooms with full/short descriptions + examine targets
    items.ts       — 4 items (3 takeable, 1 fixture)
    initialState.ts — createInitialState() factory (always a fresh deep copy)
  hooks/
    useGame.ts     — useReducer wrapper; exposes outputLines, submitCommand, newGame
  screens/
    TitleScreen    — logo + blinking "PRESS ENTER" prompt
    GameScreen     — scrolling output + sticky input bar
```

**Parser supports:** `n/s/e/w/u/d`, `go <dir>`, `look/l`, `examine/x`, `look at <thing>`, `take/get/grab`, `pick up`, `drop`, `put down`, `inventory/i`, `help/?`, `quit/q`. Arrow keys cycle command history.

**The 4 starting rooms:** Disruption Deck → Monetization Engine → Logic Gap (down), and Disruption Deck → Transparency Suite (east). Each has a dozen+ examine targets, rotating flavour responses for unknown commands, and first-visit vs. revisit descriptions.