const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const themeToggle = document.getElementById('theme-toggle');

// Theme Management
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Web Component for a single to-do item
class TodoItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        li {
          padding: 15px;
          background-color: var(--root-bg, #fff);
          color: var(--text-color, #333);
          border-bottom: 1px solid var(--input-border, #ddd);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color 0.2s, color 0.2s;
        }
        li:hover {
            background-color: var(--item-hover, #f9f9f9);
        }
        li.completed {
            text-decoration: line-through;
            color: #aaa;
        }
      </style>
      <li>
        <slot></slot>
      </li>
    `;

    const li = this.shadowRoot.querySelector('li');
    li.addEventListener('click', () => {
      this.remove();
    });
  }
}

customElements.define('todo-item', TodoItem);

function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText === '') {
    return; // Don't add empty tasks
  }

  const todoItem = document.createElement('todo-item');
  todoItem.textContent = taskText;
  todoList.appendChild(todoItem);

  todoInput.value = ''; // Clear the input field
  todoInput.focus();
}

addButton.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});
