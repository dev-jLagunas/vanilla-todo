//CSS Import
import "./style.scss";

//Dom Elements
const body = document.body;
const themeSwitchIcon = document.querySelector(".theme-icon");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelectorAll("input[name='filter']");
const listLength = document.getElementById("list-length");
const clearAllBtn = document.querySelector(".clearall-btn");

//Get Local Storage
let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
taskList.forEach((task) => createTaskItem(task));

//Event Listeners
themeSwitchIcon.addEventListener("click", () => {
  const isLightMode = body.classList.toggle("light-theme");
  themeSwitchIcon.src = isLightMode
    ? "/public/icon-moon.svg"
    : "/public/sun.svg";
  themeSwitchIcon.alt = isLightMode ? "Dark Icon" : "Light Icon";
});
todoForm.addEventListener("submit", handleItemSubmit);
filterOptions.forEach((btn) => {
  btn.addEventListener("change", filterTodoItems);
});

clearAllBtn.addEventListener("click", deleteCompletedTasks);

//Functions
function handleItemSubmit(event) {
  event.preventDefault();
  const newTask = todoInput.value;
  createTaskItem({ name: newTask, completed: false });
  todoInput.value = "";
  updateLocalStorage();
  updateListLength();
}

function createTaskItem(task) {
  //Create List Item
  const listItem = document.createElement("li");
  listItem.classList.add("list-item");

  //Create Span
  const styleSpan = document.createElement("span");

  //Add task text to span
  styleSpan.innerText = task.name;

  //Append styleSpan to listItem
  listItem.appendChild(styleSpan);

  if (task.completed) {
    listItem.firstElementChild.classList.add("completed");
  }

  //Create Completed Button
  const completedBtn = document.createElement("i");
  completedBtn.className = "fa-regular fa-circle";
  completedBtn.addEventListener("click", () => {
    listItem.firstElementChild.classList.toggle("completed");
    if (listItem.firstElementChild.classList.contains("completed")) {
      completedBtn.classList.remove("fa-regular", "fa-circle");
      completedBtn.classList.add("fa-solid", "fa-circle-check");
    } else {
      completedBtn.classList.remove("fa-solid", "fa-circle-check");
      completedBtn.classList.add("fa-regular", "fa-circle");
    }
    updateLocalStorage();
    updateListLength();
  });

  //Create Delete Button
  const deleteBtn = document.createElement("i");
  deleteBtn.className = "fas fa-times";
  deleteBtn.addEventListener("click", () => {
    listItem.remove();
    updateLocalStorage();
    updateListLength();
  });

  //Prepend/Append Elements
  styleSpan.prepend(completedBtn);
  listItem.appendChild(deleteBtn);
  todoList.appendChild(listItem);
}

//Update Local Storage
function updateLocalStorage() {
  const tasks = Array.from(document.querySelectorAll("li")).map((liEl) => ({
    name: liEl.innerText,
    completed: liEl.firstElementChild.classList.contains("completed"),
  }));

  localStorage.setItem("taskList", JSON.stringify(tasks));
}

//Filter Tasks
function filterTodoItems(event) {
  const filter = event.target.value;
  const todoItems = Array.from(todoList.children);
  todoItems.forEach((item) => {
    switch (filter) {
      case "all":
        item.style.display = "flex";
        break;
      case "completed":
        if (item.firstElementChild.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "active":
        if (!item.firstElementChild.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}

//Update List Length
function updateListLength() {
  let count = 0;
  for (let item of todoList.children) {
    if (!item.firstElementChild.classList.contains("completed")) {
      count++;
    }
  }

  listLength.innerText = count;
}

//Delete Completed Tasks
function deleteCompletedTasks() {
  const todoItems = Array.from(todoList.children);
  todoItems.forEach((item) => {
    if (item.firstElementChild.classList.contains("completed")) {
      item.remove();
    }
  });
  updateLocalStorage();
  updateListLength();
}

updateListLength();
