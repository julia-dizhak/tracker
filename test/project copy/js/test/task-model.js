'use strict';

var tasks = [
     { name: 'Task1 initial name', desc: 'Description 1 task', status: 'todo' },
     { name: 'Task2 second name', desc: 'Description second task', status: 'in-progress' },
     { name: 'Task3', desc: 'Description third', status: 'done'}
];

function createDiv(divClass, parent){
    var div = document.createElement("div");
    div.className = divClass;
    parent.appendChild(div);
    
    return div;
}

var project = document.createElement('div'),
    projectHeader = document.createElement('header'),
    projectItem = document.createElement('div');
    
    project.className= 'project';
    document.body.appendChild(project).appendChild(projectHeader);


function addTaskItem(className){
    var item = createDiv('task-item ' + 'task-'+ className, project);
    return item;
}

var todoTaskItem = addTaskItem("todo");
var inProgressTaskItem = addTaskItem("in-progress");
var doneTaskItem = addTaskItem("done");
    
function addTask(task){
    if(task.status == "todo"){
        var status = todoTaskItem;
    }
    else if (task.status == "in-progress"){
        var status = inProgressTaskItem;
    } 
    else if (task.status == "done"){
        var status = doneTaskItem;
    }
    var taskDiv = createDiv("task-wrap", status);
    
    var name = createDiv("task-name", taskDiv);
    name.innerHTML = task.name;
    var description = createDiv("task-desc", taskDiv);
    description.innerHTML = task.description;
    var status = createDiv("task-status", taskDiv);
    status.innerHTML = task.status;
}

for(var i in tasks){
    addTask(tasks[i]);
}