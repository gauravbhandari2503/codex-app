# CSS Rules — src/css/

## Scope
This file governs all work inside `src/css/`. It adds to the root `AGENTS.md` rules.

## Single file policy
All styles live in **`styles.css`**. Do not create additional `.css` files or use `<style>` tags in HTML.

## Design tokens first
Every color, spacing, radius, shadow, and transition **must** be defined as a CSS custom property in the `:root` block at the top of `styles.css`. Never hard-code a raw value (e.g. `#4f46e5`, `8px`, `150ms`) outside of `:root`.

```css
/* correct */
border-radius: var(--radius);

/* wrong */
border-radius: 8px;
```

## Naming convention
Use flat, semantic class names that describe the role, not the appearance:
- `.todo-item` not `.blue-box`
- `.news-card-title` not `.bold-text`
- `.btn-primary` not `.indigo-button`

## Selector specificity
- Keep specificity as low as possible. Prefer single class selectors.
- Never use `!important`.
- Never target elements by tag alone (e.g. `div { }`) outside of the reset block.

## Responsive design
- Use a single `@media (max-width: 720px)` breakpoint at the bottom of the file.
- The layout switches from two-column (main + sidebar) to single-column at this breakpoint.
- Do not add additional breakpoints without explicit instruction.

## State classes
Dynamic state is expressed via classes toggled by JS, not by inline `style` attributes:
- `.completed` on a `.todo-item`
- `.active` on a `.filter-btn`

## What not to do
- Do not use CSS-in-JS, Tailwind utility classes, or any external CSS library.
- Do not add vendor prefixes manually — only `-webkit-` prefixes that have no standard equivalent are acceptable.
