# Codex Example Todo App

A small vanilla JavaScript todo list app with a trending news sidebar. Todos are saved in `localStorage`, and news items are loaded from a static JSON file.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3300` in your browser.

## Project Structure

```text
src/
  index.html
  css/styles.css
  data/news.json
  js/
    app.js
    components/
    services/
```

## Scripts

- `npm start` - serve the app on port 3300
- `npm run dev` - serve the app with caching disabled
