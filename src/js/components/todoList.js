import { getAll, addTodo, toggleTodo, deleteTodo, clearCompleted } from '../services/storageService.js';

let currentFilter = 'all';

function formatDate() {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getFilteredTodos(todos) {
  if (currentFilter === 'active') return todos.filter((t) => !t.completed);
  if (currentFilter === 'completed') return todos.filter((t) => t.completed);
  return todos;
}

function createTodoItem(todo) {
  const li = document.createElement('li');
  li.className = `todo-item${todo.completed ? ' completed' : ''}`;
  li.dataset.id = todo.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;
  checkbox.setAttribute('aria-label', `Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`);

  const span = document.createElement('span');
  span.className = 'todo-item-text';
  span.textContent = todo.text;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'todo-item-delete';
  deleteBtn.innerHTML = '&times;';
  deleteBtn.setAttribute('aria-label', `Delete "${todo.text}"`);

  li.append(checkbox, span, deleteBtn);
  return li;
}

function renderList(listEl, countEl) {
  const todos = getAll();
  const filtered = getFilteredTodos(todos);

  listEl.innerHTML = '';

  if (filtered.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'todo-empty';
    empty.textContent = currentFilter === 'completed'
      ? 'No completed tasks yet.'
      : currentFilter === 'active'
      ? 'No active tasks. Well done!'
      : 'No tasks yet. Add one above!';
    listEl.appendChild(empty);
  } else {
    filtered.forEach((todo) => listEl.appendChild(createTodoItem(todo)));
  }

  const activeCount = todos.filter((t) => !t.completed).length;
  countEl.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

export function initTodoList() {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const listEl = document.getElementById('todo-list');
  const countEl = document.getElementById('todo-count');
  const clearBtn = document.getElementById('clear-completed');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function refresh() {
    renderList(listEl, countEl);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addTodo(text);
    input.value = '';
    refresh();
  });

  listEl.addEventListener('change', (e) => {
    if (e.target.type !== 'checkbox') return;
    const id = Number(e.target.closest('.todo-item').dataset.id);
    toggleTodo(id);
    refresh();
  });

  listEl.addEventListener('click', (e) => {
    if (!e.target.classList.contains('todo-item-delete')) return;
    const id = Number(e.target.closest('.todo-item').dataset.id);
    deleteTodo(id);
    refresh();
  });

  clearBtn.addEventListener('click', () => {
    clearCompleted();
    refresh();
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      refresh();
    });
  });

  refresh();
}
