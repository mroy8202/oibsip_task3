const inputContainer = document.querySelector(".input-container");
const addTaskButton = document.querySelector(".add-button");
const pendingTaskContainer = document.querySelector("#pending-task-container");
const completedTaskContainer = document.querySelector("#completed-task-container");
const informationContainer = document.querySelector("#information-container");

// event listener on addTaskButton
addTaskButton.addEventListener('click', addTask);
document.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        addTask();
    }
});

// addTask function
function addTask() {
    if(inputContainer.value === "") {
        console.log("Input field is empty");
        saveTaskData();
    }

    else {
        // text inside input field
        const toDoTask = inputContainer.value;
        // console.log(toDoTask);

        // creating element and adding classes
        const task = document.createElement('div');
        task.classList.add("task");

        const taskContent = document.createElement('div');
        taskContent.classList.add("task-content");

        const roundDivContainer = document.createElement('div');
        roundDivContainer.classList.add("round-div-container", "pending-round-div-container");

        const taskText = document.createElement('p');
        taskText.classList.add("text", "pending-task-text");
        taskText.innerText = toDoTask;

        const crossRoundDiv = document.createElement('div');
        crossRoundDiv.classList.add("cross-round-div");

        const crossButton = document.createElement('p');
        crossButton.innerText = "x";

        // append the elements
        pendingTaskContainer.appendChild(task);
        task.appendChild(taskContent);
        task.appendChild(crossRoundDiv);
        taskContent.appendChild(roundDivContainer);
        taskContent.appendChild(taskText);
        crossRoundDiv.appendChild(crossButton);

        // empty input field
        inputContainer.value = "";

        // event listeners on pending tasks
        roundDivContainer.addEventListener('click', switchTask);
        crossRoundDiv.addEventListener('click', removeFromList);

        saveTaskData();
    }
}

// switch task function
function switchTask() {
    const task = this.closest('.task');
    const roundDivContainer = task.querySelector(".round-div-container");
    const taskText = task.querySelector(".text");
    
    // clicked on pending task
    if(roundDivContainer.classList.contains("pending-round-div-container")) {
        roundDivContainer.classList.remove('pending-round-div-container');
        roundDivContainer.classList.add('completed-round-div-container');
        taskText.classList.add('completed-text');
        taskText.classList.remove('pending-task-text');
        completedTaskContainer.appendChild(task);
        saveTaskData();
    }

    // clicked on completed task
    else {
        roundDivContainer.classList.remove('completed-round-div-container');
        roundDivContainer.classList.add('pending-round-div-container');
        taskText.classList.remove('completed-text');
        taskText.classList.add('pending-task-text');
        pendingTaskContainer.appendChild(task);
        roundDivContainer.removeChild(tickMark);
        saveTaskData();
    }
}

// removeFromList function
function removeFromList() {
    const task = this.closest('.task');
    task.remove();
    saveTaskData();
}

const reset = document.querySelector(".reset");
reset.addEventListener('click', resetToDo);

function resetToDo() {
    // remove all tasks from pending task container if there are any
    while(pendingTaskContainer.children.length > 1) {
        pendingTaskContainer.removeChild(pendingTaskContainer.children[1]);
    }

    // remove all tasks from completed task if there are any
    while(completedTaskContainer.children.length > 1) {
        completedTaskContainer.removeChild(completedTaskContainer.children[1]);
    }

    // remove text from input field if any
    inputContainer.value = "";
    saveTaskData();
}


// save data on local storage
function saveTaskData() {
    localStorage.setItem("data", informationContainer.innerHTML);
}

// show saved data
// function showTaskData() {
//     informationContainer.innerHTML = localStorage.getItem("data");
// }

// showTaskData();