document.getElementById('add-task').addEventListener('click', function() {
    let taskValue = document.getElementById('task-value').value;
    if (taskValue) addTask(taskValue);
    document.getElementById('task-value').value = '';
});

const addTask = (taskValue) => {
    let task = document.createElement('li');
    task.classList.add('task');

    let taskContent = document.createElement('div');
    taskContent.classList.add('task-content');
    taskContent.innerText = taskValue;
    

    let trash = document.createElement('div');
    trash.classList.add('trash');
    trash.innerText = 'X';
    trash.addEventListener('click', removeTask);

    task.appendChild(taskContent);
    task.appendChild(trash);

    let tasks = document.getElementById('tasks-added');
    tasks.appendChild(task)
}

const removeTask = () => {
    alert("Task has been removed");
}