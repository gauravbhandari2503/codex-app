# Services Override — src/js/services/

## What this override does
This file **replaces** `src/js/AGENTS.md` for everything inside `src/js/services/`. The root `AGENTS.md` still applies.

Services are a pure **data layer**. They have different rules from components and those differences are intentional — services must be portable, testable, and completely decoupled from the browser UI.

## The key difference from src/js/AGENTS.md
`src/js/AGENTS.md` permits components to own the DOM, manage event listeners, and render state. **None of that is allowed here.** A service must work identically whether called from a browser component or a Node.js test script.

## Hard rules for services

### No DOM access
Services must never reference `document`, `window` (except `localStorage`), or any browser rendering API. If you need to reflect a result in the UI, return the data and let the calling component handle rendering.

```js
// wrong — DOM access in a service
export function addTodo(text) {
  const li = document.createElement('li'); // ❌
  ...
}

// correct — return data, component renders it
export function addTodo(text) {
  const todos = readStore();
  const todo = { id: Date.now(), text: text.trim(), completed: false };
  todos.push(todo);
  writeStore(todos);
  return todo; // ✅
}
```

### Named exports only — no side effects at module level
Every public function must be a named export. No logic should run when the module is first imported — only `const` declarations for configuration (e.g. `STORAGE_KEY`, `NEWS_URL`) are permitted at the top level.

### Services must not import from components
The dependency direction is one-way: `components → services`. A service importing from `components/` is a circular dependency and is forbidden.

### Throw errors — do not swallow them
Services must throw on failure so the calling component can decide how to present the error state. Never `console.error` and return `null` silently.

```js
// wrong
export async function fetchNews() {
  try {
    const res = await fetch(NEWS_URL);
    return res.json();
  } catch (e) {
    console.error(e); // ❌ caller gets undefined
  }
}

// correct
export async function fetchNews() {
  const response = await fetch(NEWS_URL);
  if (!response.ok) throw new Error(`Failed to fetch news: ${response.status}`); // ✅
  return response.json();
}
```

### Pure data transforms
Service functions that transform data (filter, map, sort) must be pure — same input always produces the same output, no side effects.

### One responsibility per service file
- `storageService.js` → `localStorage` CRUD for todos only.
- `newsService.js` → fetching and returning raw news data only.

Do not add unrelated logic to an existing service file. Create a new service file if a new data concern arises.
