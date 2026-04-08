# Exodus-ish

A Text Adventure Aboard the S.S. Disruptor
https://project-exodus-ish.netlify.app/

---

Runs locally at: **http://localhost:5173**. 
Start with: npm run dev 2>&1

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

---

## Deploying to Netlify

A `netlify.toml` is included at the project root with the build config and an SPA redirect rule.

**Via Netlify UI (recommended)**
1. Push the repo to GitHub, GitLab, or Bitbucket.
2. In Netlify: **Add new site → Import an existing project** and select the repo.
3. Build settings are picked up automatically from `netlify.toml` — no manual configuration needed.
4. Click **Deploy site**.

Every subsequent push to the default branch triggers a new deploy automatically.

**Via Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify init        # link or create a Netlify site
netlify deploy --build --prod
```

**Build settings** (defined in `netlify.toml`):
| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |

No environment variables are required.