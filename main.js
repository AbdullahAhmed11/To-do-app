let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");

//Empry array to store the tasks 
let arrayOfTasks = [];

//check if there tasks in local storage 
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

//triggle get data from local storage 
getDataFromLocalStorage();

//add task
submit.onclick = function ( ) {
    if(input.value !== "") {
        addTaskToArray(input.value); //add task to array 
        input.value = ""; // Empty input value
    }
};

//click in task element 
taskDiv.addEventListener("click", (e) => {
    //delete button 
    if (e.target.classList.contains("del")) {
        //remove task from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        //remove element from page 
        e.target.parentElement.remove();
    }
})

function addTaskToArray(taskText) {
    //task data 
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    //push task to array of tasks 
    arrayOfTasks.push(task);
    // add tasks to page 
    addElementsToPageFrom(arrayOfTasks);
    //add tasks to local storage
    addDataToLocalStorageFrom(arrayOfTasks)
}
function addElementsToPageFrom(arrayOfTasks) {
    //Empty tasks div 
    taskDiv.innerHTML = "";
    //looping the array of tasks 
    arrayOfTasks.forEach((task) => {
        //create main div
        let div = document.createElement("div");
        div.className = "task";
        //check if task is done 
        if(task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        //create Delete Button
        let span = document.createElement('span');
        span.className = "del";
        //append to main div
        span.appendChild(document.createTextNode("Delet"))
        div.appendChild(span);
        //add task div to Task container
        taskDiv.appendChild(div)
    })

};

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if(data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks)
    }
}

function deleteTaskWith(taskId) {
arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
addDataToLocalStorageFrom(arrayOfTasks)
}