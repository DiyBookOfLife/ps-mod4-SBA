let savedForm = {};
// let addTask = document.getElementById("add-task-btn");
let form = document.getElementById('form'); 
let task = document.getElementById("task-name");
let category = document.getElementById("category");
let deadline = document.getElementById("deadline");
let status = document.getElementById("status");

// function to add name of task
function saveInput() {
  let taskValue = task.value;
  savedForm.name = taskValue;
  console.log(savedForm);
}

// function to add category
// function to add deadline
// function to add status

form.addEventListener("submit", function (e) {
    e.preventDefault();
    saveInput();
});
