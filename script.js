const inputContainer = document.querySelector(".input-container");
const addTaskButton = document.querySelector(".add-button");
const pendingTaskContainer = document.querySelector("#pending-task-container");
const completedTaskContainer = document.querySelector("#completed-task-container");
const reset = document.querySelector(".reset");

// Retrieve tasks from local storage when page loads
document.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => {
        createTaskElement(task);
    });
});

// Event listener on addTaskButton
addTaskButton.addEventListener("click", addTask);
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
        addTask();
    }
});

// Event listener on reset button
reset.addEventListener("click", resetToDo);

// Add task function
function addTask() {
    if (inputContainer.value === "") {
        console.log("Input field is empty");
    } 
    
    else {
        // Text inside input field
        const toDoTask = inputContainer.value;

        // Create task object
        const task = {
            content: toDoTask,
            completed: false,
        };

        // Add task to local storage
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Create task element and append to the appropriate container
        createTaskElement(task);

        // Empty input field
        inputContainer.value = "";
    }
}

// Create task element and append to the appropriate container
function createTaskElement(task) {
    const { content, completed } = task;

    // Create elements
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const roundDivContainer = document.createElement("div");
    roundDivContainer.classList.add("round-div-container");

    const taskText = document.createElement("p");
    taskText.classList.add("text");
    taskText.innerText = content;

    const crossRoundDiv = document.createElement("div");
    crossRoundDiv.classList.add("cross-round-div");

    const crossButton = document.createElement("p");
    crossButton.innerText = "x";

    // Append the elements
    taskElement.appendChild(taskContent);
    taskElement.appendChild(crossRoundDiv);
    taskContent.appendChild(roundDivContainer);
    taskContent.appendChild(taskText);
    crossRoundDiv.appendChild(crossButton);

    // Add classes based on completion status
    if (completed) {
        roundDivContainer.classList.add("completed-round-div-container");
        taskText.classList.add("completed-text");
        completedTaskContainer.appendChild(taskElement);
    } 
    
    else {
        roundDivContainer.classList.add("pending-round-div-container");
        pendingTaskContainer.appendChild(taskElement);
    }

    // Event listeners on task elements
    roundDivContainer.addEventListener("click", switchTask);
    crossRoundDiv.addEventListener("click", removeFromList);
}

// Switch task function
function switchTask() {
    const task = this.closest(".task");
    const roundDivContainer = task.querySelector(".round-div-container");
    const taskText = task.querySelector(".text");

    // Toggle completion status
    roundDivContainer.classList.toggle("completed-round-div-container");
    roundDivContainer.classList.toggle("pending-round-div-container");
    taskText.classList.toggle("completed-text");
    taskText.classList.toggle("pending-task-text");

    // Move task element to the appropriate container
    if (roundDivContainer.classList.contains("completed-round-div-container")) {
        completedTaskContainer.appendChild(task);
    } 
    
    else {
        pendingTaskContainer.appendChild(task);
    }

    // Update completion status in local storage
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const taskIndex = Array.from(task.parentElement.children).indexOf(task);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task from list
function removeFromList() {
    const task = this.closest(".task");
    task.remove();

    // Remove task from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const taskIndex = Array.from(task.parentElement.children).indexOf(task);
    tasks.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Reset to-do list
function resetToDo() {
    // Remove all tasks from pending task container
    while (pendingTaskContainer.children.length > 1) {
    pendingTaskContainer.removeChild(pendingTaskContainer.children[1]);
    }

    // Remove all tasks from completed task container
    while (completedTaskContainer.children.length > 1) {
    completedTaskContainer.removeChild(completedTaskContainer.children[1]);
    }

    // Remove tasks from local storage
    localStorage.removeItem("tasks");

    // Empty input field
    inputContainer.value = "";
}
