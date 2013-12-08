// for simple variable

function observable(){
  var value = arguments[0];
  var handler = function(){
    if ( arguments[0] ) {
      value = arguments[0];
      for (var i in handler.listeners ) {
        handler.listeners[i](value);
      }
    }
    return value;
  }
  handler.listeners = [];
  return handler;
} 

var obj = observable("2");
var listener1 =  function(value){
 // console.log("Value updated to: "  + value );
  
}
var listener2 = function(value){
  //console.log("Value updated to: "  + value );
}
obj.listeners.push(listener1);
obj.listeners.push(listener2);


obj("3");
obj("4");

// получать уведомления от изменения в массиве?
function observableArray(){
  var array = [];
  var handler = function(){
    return array
  }
  handler.listeners = [];
  
  handler.push = function(item){
    array.push(item);
    for ( var i in handler.listeners ) {
      handler.listeners[i].push(item);
    }
  }
  
  handler.remove = function(item){
    for ( var i in array ) {
      if (array[i] == item) {
        array.splice(i,1);
        for (var j in handler.listeners) {
          handler.listeners[j].remove(item);
        }
        return;
      }
    }
    
    throw "Object " + item + "not found";
    
  }
  
  return handler;
}  

var array = observableArray();
array.listeners.push({
  push: function(item){
    console.log("item added: " + item);
  },
  remove: function(item){
    console.log("item removed: " + item);
  } 
});

array.push(1);
array.push(2);
array.push(3);
array.remove(1);
//console.log(array());


//

var tasks = {
  
}

var template = {
  {name: "div", attr: { contentEditable: "true" } }
}

var object = {
  
}


function ViewModel(model){
  this.projects = observableArray();
  for ( var i in model.projects ) {
    this.projects.push(ProjectViewModel(model.project[i]));
  }
}

function ProjectViewModel(project){
  this.name = observable(project.name);
  this.tasks = observableArray();
  
  for ( var i in project.tasks ) {
    this.tasks.push(new TaskViewModel(project.tasks[i]));
  }
}

function TaskViewModel(task){
  this.name = observable(task.name);
  this.description = observable(task.description);
  //this.status = ;
  
  this.getModel = function(){
    return (name: this.name(), description: this.description, )
  }
}

var viewModel = new ViewModel(object);

function text(element) {
  return function(value) {
    element.text(value());
    element.on("blur", function() {
      value(element.text());
    })
  }
}

function generateMarkup(template, container, object) {
  if ( "name" ) {
    
  }
  
  if ( "class" in template ) {
  
  }

  if ( "attr" in template && "name" in template ) {
    for (var i in )
  }

  if ( "if" in template && "children" in template ) {
  
  }

  if ( "children" in template )

  
  if ( "foreach" in template && "children" in template ) {
    var foreachProperty = template.foreach;
    var array = object[foreachProperty]
  }
  
  if ("with" )

  if ('bind' in template ) {
    for ( var i in template.bind ) {
      var bind = template.bind[i](element);
      //var content = object[i]();
      object[i].listeners.push(bind);
    }
  }
  
  
}

window.viewModel = new ViewModel(object);
window.TaskViewModel = TaskViewModel();

generateMarkup(template, $("#application"), viewModel);

// template nvc , nvm

// template nvi

// Model -> View previous lesson
// today: Model -> ViewModel -> View (controling View)
//
//





