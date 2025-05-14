// DOM Elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const gif = document.getElementById("fun_gif");
const sound = document.getElementById("sound_ef");

// Key lưu trên Local Storage
const STORAGE_KEY = "todos";

// Load danh sách khi trang tải
document.addEventListener("DOMContentLoaded", loadTodos);

// Bắt sự kiện submit form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo(input.value);
  input.value = "";
});



// Thêm todo
function addTodo(text) {
  const todos = getTodos();
  const newTodo = { id: Date.now(), text };
  todos.push(newTodo);
  saveTodos(todos);
  renderTodos(todos);
}

// Lấy danh sách từ Local Storage
function getTodos() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Lưu danh sách vào Local Storage
function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// Xóa todo theo id
function deleteTodo(id) {
  let todos = getTodos();
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos(todos);
  renderTodos(todos);
}

// Hiển thị danh sách
function renderTodos(todos) {
  list.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    const btn = document.createElement("button");
    btn.textContent = "Xóa";
    btn.addEventListener("click", () => deleteTodo(todo.id));
    li.appendChild(btn);
    list.appendChild(li);
  });
}

// Hàm chạy khi tải trang
function loadTodos() {
  const todos = getTodos();
  renderTodos(todos);
}


//gif

gif.addEventListener("click", function (e) {
  gif.classList.add("rotate");
  e.preventDefault()
  sound.currentTime = 0;
  sound.play();
  gif.addEventListener(
    "transitionend",
    () => {
      gif.classList.remove("rotate");
      gif.classList.add("hidden");
    },
    { once: true }
  );
});

function showGifRandomly() {
  const container = document.querySelector('.gif_container');
  const W = window.innerWidth ;
  const H = window.innerHeight ;
  const x = Math.random() * (W  - gif.offsetWidth);
  const y = Math.random() * (H - gif.offsetHeight);
  gif.style.left = `${x}px`;
  gif.style.top  = `${y}px`;
  gif.classList.remove('hidden');
}

setInterval(showGifRandomly, 1500);
showGifRandomly();