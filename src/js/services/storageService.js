const STORAGE_KEY = 'todos';

/**
 * Reads and parses the stored todos.
 *
 * @returns {Array} The stored todos, or an empty array if none exist or parsing fails.
 */
function readStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

/**
 * Serializes and saves the provided todos to local storage.
 *
 * @param {Array} todos - The todos to persist.
 * @returns {void}
 */
function writeStore(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function getAll() {
  return readStore();
}

export function addTodo(text) {
  const todos = readStore();
  const todo = { id: Date.now(), text: text.trim(), completed: false };
  todos.push(todo);
  writeStore(todos);
  return todo;
}

export function toggleTodo(id) {
  const todos = readStore().map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  writeStore(todos);
  return todos;
}

export function deleteTodo(id) {
  const todos = readStore().filter((t) => t.id !== id);
  writeStore(todos);
  return todos;
}

export function clearCompleted() {
  const todos = readStore().filter((t) => !t.completed);
  writeStore(todos);
  return todos;
}
