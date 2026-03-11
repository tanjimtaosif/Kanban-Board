let taskData = {};

const todo = document.querySelector("#to-do");
const progress = document.querySelector("#in-progress");
const done = document.querySelector("#done");
const columns = [todo, progress, done];

let draggedTask = null;

// --- FIX START: Loading Logic ---
if (localStorage.getItem("taskData")) {
  const data = JSON.parse(localStorage.getItem("taskData")); // Fixed key name
  taskData = data; // Sync the variable with stored data

  for (const col in data) {
    const column = document.querySelector(`#${col}`);
    const count = column.querySelector(".right"); // Get the counter element

    data[col].forEach((task) => {
      const div = document.createElement("div");
      div.classList.add("task");
      div.setAttribute("draggable", "true");
      div.innerHTML = `
      <h2>${task.title}</h2>
      <p>${task.desc}</p>
      <button>Delete</button>
      `;
      column.appendChild(div);

      div.addEventListener("dragstart", (e) => {
        draggedTask = div;
      });
    });

    // Update counter on reload
    if (count) count.innerText = data[col].length;
  }
}
// --- FIX END ---

// Initial listener for any tasks already in HTML
const task = document.querySelectorAll(".task");
task.forEach((task) => {
  task.addEventListener("dragstart", (e) => {
    draggedTask = task;
  });
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

    columns.forEach((column) => {
      const tasksInCol = column.querySelectorAll(".task");
      const count = column.querySelector(".right");

      taskData[column.id] = Array.from(tasksInCol).map((t) => {
        return {
          title: t.querySelector("h2").innerText,
          desc: t.querySelector("p").innerText,
        };
      });

      if (count) count.innerText = tasksInCol.length;
    });

    localStorage.setItem("taskData", JSON.stringify(taskData));
  });
}

addDragEventCol(todo);
addDragEventCol(progress);
addDragEventCol(done);

// Modal Logic
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

  columns.forEach((col) => {
    const tasksInCol = col.querySelectorAll(".task");
    const count = col.querySelector(".right");

    taskData[col.id] = Array.from(tasksInCol).map((t) => {
      return {
        title: t.querySelector("h2").innerText,
        desc: t.querySelector("p").innerText,
      };
    });

    if (count) count.innerText = tasksInCol.length;
  });

  localStorage.setItem("taskData", JSON.stringify(taskData));

  div.addEventListener("dragstart", (e) => {
    draggedTask = div;
  });

  modal.classList.remove("active");
});
