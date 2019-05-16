// const trash = "https://image.flaticon.com/icons/svg/1214/1214428.svg";

// Add an event listener to the #add-task input field
// Only addTask if there is text in the input
// Remove the task text in the input once its added

document.getElementById('add-task').addEventListener('click', function() {
    let taskValue = document.getElementById('task-value').value;
    console.log(taskValue);
    addTask(taskValue);
})

////// TASK FUNCTIONS

// Create a function addTask

const addTask = taskValue => {
    let task = document.createElement('li');
    task.classList.add('task');
    task.classList.add('fill');
    // task.setAttribute('draggable', 'true');
    task.draggable = true;

    let taskContent = document.createElement('div');
    taskContent.classList.add("task-content");
    taskContent.innerText = taskValue;

    let trash = document.createElement('div');
    trash.classList.add('trash');
    trash.innerText = "X";

    task.appendChild(taskContent);
    task.appendChild(trash);

    let tasks = document.getElementById('tasks-added');
    tasks.prepend(task);
  }


// Create a function removeTask




////// DRAG & DROP

// Create a variable task to store the selected task


// Add an event listener dragstart to task



// Create a dragStart function


// Create a dragEnd function


// Create dropzones by selecting .dropzone


// Add eventlisteners to each dropzone


// Create a function dragEnter


// Create a function dragOver


// Create a function dragLeave


// Create a function dragLeave


// Create a function dragDrop














