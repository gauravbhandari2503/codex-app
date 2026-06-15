# Project Context

## What this project is
A Vanilla JS **Todo List** application with a **Trending News** sidebar. Todos persist in `localStorage`. News data is loaded from a static JSON file (`src/data/news.json`) via a fetch-based API service.

## Tech stack
| Concern        | Choice                                      |
|----------------|---------------------------------------------|
| Language       | Vanilla JavaScript (ES Modules, no bundler) |
| Styling        | Plain CSS with custom properties (no framework) |
| Persistence    | `localStorage` via `storageService.js`      |
| News data      | `fetch('/data/news.json')` via `newsService.js` |
| Dev server     | `http-server` (serves `src/` on port 3300)  |

## Project structure
```
src/
├── index.html                    # Single HTML entry point
├── css/
│   └── styles.css                # All styles — design tokens + component styles
├── data/
│   └── news.json                 # Static news data (10 articles)
└── js/
    ├── app.js                    # Entry point — initializes components only
    ├── services/
    │   ├── storageService.js     # localStorage CRUD
    │   └── newsService.js        # fetch wrapper for news.json
    └── components/
        ├── todoList.js           # Todo UI — rendering + event handling
        └── newsSidebar.js        # News sidebar — rendering + loading states
```

## Architecture rules (apply everywhere)
- **Layered architecture**: services own data, components own DOM. No cross-layer leakage.
- **ES Modules only**: use `import`/`export`. No `<script>` tags without `type="module"`.
- **No third-party runtime dependencies**: only `devDependencies` (dev server) are allowed.
- **No inline styles**: all visual rules belong in `src/css/styles.css`.
- **No `var`**: use `const` by default, `let` only when reassignment is necessary.
- **Semantic HTML**: use the correct element for the role (`<article>`, `<aside>`, `<form>`, etc.).

## How to run
```bash
npm start     # serves src/ at http://localhost:3300 and opens browser
npm run dev   # same but disables caching (use during development)
```

## AGENTS.md inheritance in this project
Each subdirectory may contain an `AGENTS.md` or `AGENTS.override.md`:
- `AGENTS.md` **adds** folder-specific rules on top of the parent context.
- `AGENTS.override.md` **replaces** the nearest parent `AGENTS.md` for that folder's scope — the root `AGENTS.md` (this file) always remains active.
- `src/js/AGENTS.md` → general JS rules, inherited by `components/`.
- `src/js/services/AGENTS.override.md` → replaces `src/js/AGENTS.md` for `services/` only.
