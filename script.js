let taskData = {};

const todo = document.querySelector("#to-do");
const progress = document.querySelector("#in-progress");
const done = document.querySelector("#done");
const columns = [todo, progress, done];

let draggedTask = null;

const task = document.querySelectorAll(".task");

task.forEach((task) => {
  task.addEventListener("drag", (e) => {
    draggedTask = task;
  });
});

progress.addEventListener("dragenter", (e) => {
  progress.classList.add("hover-over");
});

progress.addEventListener("dragleave", (e) => {
  progress.classList.remove("hover-over");
});

function addDragEventCol(col) {
  col.addEventListener("dragenter", (e) => {
    e.preventDefault();
    col.classList.add("hover-over");
  });
  col.addEventListener("dragleave", (e) => {
    e.preventDefault();
    col.classList.remove("hover-over");
  });

  col.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  col.addEventListener("drop", (e) => {
    e.preventDefault();
    col.appendChild(draggedTask);
    col.classList.remove("hover-over");

    columns.forEach((col) => {
      const task = col.querySelectorAll(".task");
      const count = col.querySelector(".right");
      const todoTasks = todo.document.querySelectorAll(".task");
      count.innerText = task.length;
    });
  });
}

addDragEventCol(todo);
addDragEventCol(progress);
addDragEventCol(done);

// Modal
const toggleModalBtn = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");
const addNewTask = document.querySelector("#add-new-task");

toggleModalBtn.addEventListener("click", () => {
  modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

addNewTask.addEventListener("click", () => {
  const taskTitle = document.querySelector("#task-title").value;
  const taskDescription = document.querySelector("#task-description").value;

  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");

  div.innerHTML = `
  <h2>${taskTitle}</h2>
  <p>${taskDescription}</p>
  <button>Delete</button>
  `;

  todo.appendChild(div);

  div.addEventListener("drag", (e) => {
    draggedTask = div;
  });

  modal.classList.remove("active");
});
