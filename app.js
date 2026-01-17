// store all tasks here
let tasks = [];

// grab form elements
let form = document.getElementById("form");
let taskInput = document.getElementById("task-name");
let deadlineInput = document.getElementById("deadline");
let clearBtn = document.getElementById("clear-tasks-btn");

// category checkboxes
let workCategory = document.getElementById("category-work");
let homeCategory = document.getElementById("category-home");
let personalCategory = document.getElementById("category-personal");

// status radios
let inProgressStatus = document.getElementById("status-in-progress");
let completedStatus = document.getElementById("status-completed");

// task list
let taskList = document.getElementById("taskList");

// filters
let filterInProgress = document.getElementById("filter-in-progress");
let filterCompleted = document.getElementById("filter-completed");
let filterOverdue = document.getElementById("filter-overdue");

// load saved tasks on refresh
window.addEventListener("load", function () {
  let savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    checkOverdueTasks();
    displayTasks(tasks);
  }
});

// handle form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let categoryValue = "";

  if (workCategory.checked) {
    categoryValue = "Work";
  } else if (homeCategory.checked) {
    categoryValue = "Home";
  } else if (personalCategory.checked) {
    categoryValue = "Personal";
  }

  let statusValue = "In Progress";
  if (completedStatus.checked) {
    statusValue = "Completed";
  }

  if (
    taskInput.value === "" ||
    deadlineInput.value === "" ||
    categoryValue === ""
  ) {
    alert("Please fill out all fields");
    return;
  }

  let newTask = {
    name: taskInput.value,
    category: categoryValue,
    deadline: deadlineInput.value,
    status: statusValue
  };

  tasks.push(newTask);
  saveTasks();
  checkOverdueTasks();
  displayTasks(tasks);
  form.reset();
});

// show tasks on the page
function displayTasks(taskArray) {
  taskList.innerHTML = "";

  for (let i = 0; i < taskArray.length; i++) {
    let li = document.createElement("li");

    li.innerHTML =
      "<strong>" + taskArray[i].name + "</strong><br>" +
      "Category: " + taskArray[i].category + "<br>" +
      "Deadline: " + taskArray[i].deadline + "<br>" +
      "Status: " + taskArray[i].status + "<br>" +
      "<button onclick='markCompleted(" + i + ")'>Mark as completed</button>";

    taskList.appendChild(li);
  }
}

// update task status manually
function markCompleted(index) {
  tasks[index].status = "Completed";
  saveTasks();
  displayTasks(tasks);
}

// automatically mark overdue tasks
function checkOverdueTasks() {
  let today = new Date().toISOString().split("T")[0];

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].deadline < today && tasks[i].status !== "Completed") {
      tasks[i].status = "Overdue";
    }
  }

  saveTasks();
}

// filter tasks
filterInProgress.addEventListener("change", applyFilters);
filterCompleted.addEventListener("change", applyFilters);
filterOverdue.addEventListener("change", applyFilters);

function applyFilters() {
  let filteredTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    if (
      (filterInProgress.checked && tasks[i].status === "In Progress") ||
      (filterCompleted.checked && tasks[i].status === "Completed") ||
      (filterOverdue.checked && tasks[i].status === "Overdue") ||
      (!filterInProgress.checked &&
        !filterCompleted.checked &&
        !filterOverdue.checked)
    ) {
      filteredTasks.push(tasks[i]);
    }
  }

  displayTasks(filteredTasks);
}

// save to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear all task btn 
clearBtn.addEventListener("click", function () {
  tasks = [];
  localStorage.removeItem("tasks");
  taskList.innerHTML = "";
});