
let localState, task, prevState, nextState,value;

const BACKLOG_BLOCK = "tasks-added-backlog";
const TODO_BLOCK = "tasks-added-todo";
const REVIEW_BLOCK = "tasks-added-review";
const DONE_BLOCK = "tasks-added-done";

const trash = "https://image.flaticon.com/icons/svg/1214/1214428.svg";


window.addEventListener("load", () => {

    if (localStorage.getItem("state") === null)  //for initial rendering 
    {
        localStorage.setItem("state", JSON.stringify({
            backlog: [],
            todo: [],
            review: [],
            done:[]
        }))
    }

    localState = JSON.parse(localStorage.getItem("state"));
    
    //checking if we have already some data stored , then we are rendering 
    if ( localState.backlog && localState.backlog.length > 0)
    {
        localState.backlog.forEach(element => {
            addTask(element, false,BACKLOG_BLOCK);
        });
    }

    if ( localState.todo && localState.todo.length > 0)
    {
        localState.todo.forEach(element => {
            addTask(element, false,TODO_BLOCK);
        });
    }
    
    if ( localState.review && localState.review.length > 0)
    {
        localState.review.forEach(element => {
            addTask(element, false,REVIEW_BLOCK);
        });
    }

    if ( localState.done && localState.done.length > 0)
    {
        localState.done.forEach(element => {
            addTask(element, false,DONE_BLOCK);
        });
    }
    
    
    
})

document.getElementById('add-task').addEventListener('click', function () {
    
    let taskValue = document.getElementById('task-value').value;
    if (taskValue) addTask(taskValue,true,BACKLOG_BLOCK); //using boolean to check is it the first time 
    document.getElementById('task-value').value = '';

});

const addTask = (taskValue, shouldLog, block) => {
    
    let task = document.createElement('li');
    task.classList.add('task');
    task.classList.add('fill');
    task.setAttribute("draggable", "true");
    task.setAttribute("data-value", taskValue);

    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);

    let taskContent = document.createElement('div');
    taskContent.classList.add('task-content');
    taskContent.innerText = taskValue;
    
    let trash = document.createElement('div');
    trash.classList.add('trash');
    trash.innerText = "X";
    trash.dataset.value = taskValue;
    trash.addEventListener('click', removeTask);

    task.appendChild(taskContent);
    task.appendChild(trash);

    let tasks = document.getElementById(block);
    tasks.insertBefore(task, tasks.childNodes[0]);

    if (shouldLog) {
        let updateState = localState;
        updateState = {
            ...updateState,
            backlog: [...updateState.backlog, taskValue]
        };
        localState = updateState;
        localStorage.setItem("state", JSON.stringify(localState));
    }
}

const removeTask = (event) => {
    let tasks = event.target.parentNode.parentNode;
    let task = event.target.parentNode;
    tasks.removeChild(task);  // removing from ui 


    //removing from state
    const blockToBeRemovedFrom = tasks.parentNode.dataset.block;
    const itemToBeDeleted = event.target.dataset.value;

    let updateState = {
        ...localState,
        [blockToBeRemovedFrom]: localState[blockToBeRemovedFrom].filter((item) => item !== itemToBeDeleted)
    };
    localState = updateState;

    localStorage.setItem("state", JSON.stringify(localState));

    
}


// DRAG & DROP

const dragStart = (event) => {
    prevState = event.target.parentNode.parentNode.dataset.block; // to remove the div from where it dragged
    event.target.className += ' hold';
    task = event.target;
    setTimeout(() => (event.target.className = 'invisible'), 0);
}

const dragEnd = (event) => {    
    event.target.className = 'task fill';
}

const dropzones = document.querySelectorAll('.dropzone');

const dragEnter = (event) => {

    event.preventDefault();
    if(event.target.className === "column dropzone") {
        event.target.className += ' hovered';   
    }
}

const dragOver = (event) => {

    event.preventDefault();
}

const dragLeave = (event) => {
  
    if(event.target.className === "column dropzone hovered") {
        event.target.className = "column dropzone"
    }
}

const dragDrop = (event) => {
    nextState = event.target.dataset.block;
  
    if(event.target.className === "column dropzone hovered") {
        event.target.className = "column dropzone"
    }
    event.target.childNodes[3].append(task);
    // event.target.append(task);



    updateState(prevState,nextState)

}
const  updateState= (prevState,nextState) => {
   
    let updatedState = localState; 
    const removedElement = updatedState[prevState].filter((item) => item !== value);
    
     updatedState = {
        ...updatedState,
        [nextState]: [...updatedState[nextState], value],
        [prevState]:removedElement
    };

  

    localState = updatedState;

    localStorage.setItem("state", JSON.stringify(localState));
    
    
}

const dragging = (event) => {
   value= event.target.dataset.value
}

for(const dropzone of dropzones) {
    dropzone.addEventListener('dragenter', dragEnter);
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('dragleave', dragLeave);
    dropzone.addEventListener('drop', dragDrop);
     dropzone.addEventListener('drag',dragging)
}















