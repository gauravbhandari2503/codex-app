# JS Rules — src/js/

## Scope
These rules apply to **all files under `src/js/`** including `components/`. They add to the root `AGENTS.md`.

> **Note for `services/`:** `src/js/services/AGENTS.override.md` replaces this file's rules for that folder. The service layer has different, stricter constraints that are incompatible with some component conventions below.

## Module structure
- Every file is an ES Module. Always use named exports — no default exports.
- Import paths must be relative and include the `.js` extension:
  ```js
  import { initTodoList } from './components/todoList.js';
  ```

## Component conventions (applies to `components/`)
- Each component exports a single `init*` function (e.g. `initTodoList`, `initNewsSidebar`).
- Components **own the DOM**: they query elements, attach listeners, and render markup.
- Components **call services** for data. They never access `localStorage` or `fetch` directly.
- Use **event delegation** on a container element instead of attaching listeners to individual items.
- Build DOM nodes with `document.createElement` — do not use `innerHTML` for dynamic user content (XSS risk). `innerHTML` is acceptable only for trusted static markup like icons.

## State management
- There is no global state object. Components derive current state by calling the relevant service on each render cycle.
- No module-level mutable variables except where a component needs to track ephemeral UI state (e.g. the active filter in `todoList.js`).

## Error handling
- Components should handle errors gracefully and render a user-visible error state — do not let async errors go silently.
- Use `try/catch` around `await` calls in components.

## Code style
- `const` by default; `let` only when the variable is reassigned.
- Arrow functions for callbacks; named `function` declarations for exported functions.
- No comments unless the reason is non-obvious. Do not describe what the code does — describe *why* if it is surprising.
