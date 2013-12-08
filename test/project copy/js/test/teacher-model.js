var tasks = [
    {name: "task1fas.fb", description: "Some test description1", status: "todo"},
    {name: "task2 asfba,sbfmas", description: "Some test description2", status: "todo"},
    {name: "task3", description: "Some test description3", status: "in-progress"},        
    {name: "task4", description: "Some test description4", status: "in-progress"},
    {name: "task5", description: "Some test description5", status: "in-progress"},
    {name: "task6", description: "Some test description6", status: "done"},
    {name: "task7", description: "Some test description7", status: "done"},
    {name: "task8", description: "Some test description8", status: "done"}
];

function createDiv(divClass, parent){
    var div = document.createElement("div");
    div.className = divClass;
    parent.appendChild(div);
    
    return div;
}

var project = document.getElementsByClassName("project")[0];

function addColumn(className){
    var column = createDiv("three columns " + className, project);
    return column;
}

var todoColumn = addColumn("todo");
var inProgressColumn = addColumn("in-progress");
var doneColumn = addColumn("done");
    
function addTask(task){
    if(task.status == "todo"){
        var column = todoColumn;
    }
    else if(task.status == "in-progress"){
        var column = inProgressColumn;
    }
    else if(task.status == "done"){
        var column = doneColumn;
    }
    var taskDiv = createDiv("task", column);
    var name = createDiv("task-name", taskDiv);
    name.innerHTML = task.name;
    var description = createDiv("description", taskDiv);
    description.innerHTML = task.description;
}

for(var i in tasks){
    addTask(tasks[i]);
}



/*var project = document.createElement('div'),
    projectHeader = document.createElement('header'),
    projectItem = document.createElement('div');
    
    project.className= 'project';
    document.body.appendChild(project).appendChild(projectHeader);

var tasks = [
     { name: 'Task1 initial name', desc: 'Description 1 task', status: 'todo' },
     { name: 'Task2 second name', desc: 'Description second task', status: 'in-progress' },
     { name: 'Task3', desc: 'Description third', status: 'done'}
];

function createTaskItem(tasks) {
  var renderTask = '<div class=\'task-item\'>'
                      '<div class=\'cube\'>' +
                        '<i class=\'cube-top\'></i>'+
                       
                        '<i class=\'cube-bottom\'></i>'+
                      '</div>' +
                  '</div>'; 
} 

for(var i in tasks){
  createTaskItem('task',project);
}  */


/*var project = '<div class=\'project\'>'+
                '<header class=\'project-header\'></header>'+     
                renderTask(tasks);       
            '</div>';                

$('body').html('').append(project).show();

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

function renderTask(tasks) {
  var renderTask = '<div class=\'task-item\'>'
                      '<div class=\'cube\'>' +
                        '<i class=\'cube-top\'></i>'+
                       
                        '<i class=\'cube-bottom\'></i>'+
                      '</div>' +
                  '</div>'; 
  
    
}

for(var i in tasks){
  renderTask(tasks[i]);  
}

 
  */
 
/*function createItem(itemClass, parent){
  var item = document.createElement('div');
  item.className = itemClass;
  parent.appendChild(item);
 
  return item;
  
}

function createTaskItem(itemClass, parent){
  var item = document.createElement('div'),
      cube = document.createElement('div'),
      cubeTop = document.createElement('i'),
      cubeBottom = document.createElement('i'),
      layout = document.createElement('div');
  
  item.className = itemClass;
  parent.appendChild(item);
  
  cube.className = 'cube';
  item.appendChild(cube);
  
  cubeTop.className = 'cube-top';
  cube.appendChild(cubeTop);
  
  layout.className = 'task-layout';
  cube.appendChild(layout);
  
  cubeBottom.className = 'cube-bottom';
  cube.appendChild(cubeBottom);
  
  return item;
}


function addTask(){
  var layout = document.createElement('div'),
      taskName = createDiv("task-name", layout);
      
      layout.className = 'task-layout';
      taskName.innerHTML = tasks.name;
}

function addColumn(className){
    var column = createDiv("three columns " + className, project);
    return column;
}*/

/*var project = document.createElement('div'),
    projectHeader = document.createElement('header'),
    projectItem = document.createElement('div');
    
    project.className= 'project';
    document.body.appendChild(project).appendChild(projectHeader);
*/

    
/*for(var i in tasks){
  createTaskItem('task',project);
}*/


    
   
   
