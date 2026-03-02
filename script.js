const todo = document.querySelector("#to-do");
const progress = document.querySelector("#in-progress");
const done = document.querySelector("#done");

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

function addDragEvent(col) {
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
  });
}

addDragEvent(todo);
addDragEvent(progress);
addDragEvent(done);
