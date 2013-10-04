$(function(){
  
  (function(){
    
    var tasks = [
         { name: 'Task1 initial name', desc: 'Description 1 task', status: 'todo' },
         { name: 'Task2 second name', desc: 'Description second task', status: 'in-progress' },
         { name: 'Task3', desc: 'Description third', status: 'done'}
    ];
    
    var project = $('<div />').appendTo('body').addClass('project'),
        headerProject = $('<header />').appendTo(project).addClass('project-name');
        
        
    function addTask(){
      //var render = '<div />';
      var render = '<div class=\'task-item\'>' +
                          '<div class=\'cube\'>' +
                            '<i class=\'cube-top\'></i>'+
                            '<div class=\'task-layout\' />' +
                            '<i class=\'cube-bottom\'></i>'+
                          '</div>' +
                      '</div>'; 
      $(render).appendTo(project);
      
      return render;
    }    
    
    
      

    for(var i in tasks){
      addTask();
    }
       
    
    
    
  })();
  
});