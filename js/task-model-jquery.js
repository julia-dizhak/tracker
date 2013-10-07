$(function(){
  
  (function(){
    var projectHeader = 'Project Header';
    var tasks = [
         { name: 'Task1 first task name', desc: 'Description first task', status: 'todo' },
         { name: 'Task2 second task name', desc: 'Description second task', status: 'inprogress' },
         { name: 'Task3 third task name', desc: 'Description third task', status: 'done'},
         { name: 'Task4 fourth task name', desc: 'Description fourth task', status: 'todo'},
         { name: 'Task5', desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dol', status: 'done'}
    ];  
    
    var project = $('<div />').appendTo('body').addClass('project'),
        projectHeader = $('<header />').appendTo(project);
        //btnAdd = $('<a class="btn-add" />').text('create task').appendTo(project);
        
    project.wrap('<div class="wrapper"></div>'); 
    projectHeader.text('projectHeader');   
        
    function addTask(item){
      var render = '<div class=\'task-item\'>' +
                          '<div class=\'cube\'>' +
                            '<i class=\'cube-top\'></i>'+
                            '<div class=\'task-layout\'>' +  
                            '<div class=\'task-name\'>' + item.name + '</div>' +
                            '<div class=\'task-desc\'>' + item.desc + '</div>' +
                            '<div class=\'task-status\'>' + '<p>' + item.status + '</p>' + '</div>' +
                            '<a href="#" class=\'btn-delete\'>' + 'delete task' + '</a>' +
                            '</div>'
                            '<i class=\'cube-bottom\'></i>'+
                          '</div>' +
                      '</div>';  
                        
      $(render).appendTo(project);
      
      return render;
    }   
    
    for(var i in tasks){
      addTask(tasks[i]);
    }
    
    $('.task-status').each(function(index, elem) {
      $(this).addClass( $(elem).text());
    });
   
    
    /*function deleteTask(item) {
      console.log(item);
    }*/
    
    $('.btn-delete').on('click',function(){
      $(this).closest('.task-item').hide('slow', function(){ $(this).closest('.task-item').remove(); });
    });
    
    function addTaskForm(form) {
      form = '<div class=\'form-task-add\'>' +
                          '<div class=\'wrap\'>' +
                            '<i class=\'cube-top\'></i>'+
                            '<form>' +  
                            '<label>' + 'Enter name for task' + '</label>' +
                            '<input id="task-name" type="text" />' +
                            '<label>' + 'Enter description for task' + '</label>' +
                            '<textarea type="text" rows="4" cols="30">' + '</textarea>' + 
                            '<input class="btn-add" type="submit" value="create task" />'+
                            '</form>' +
                            '<i class=\'cube-bottom\'></i>'+
                          '</div>' +
                      '</div>';  
                        
      $(form).insertAfter(projectHeader);
      
      var taskName = $(form).find('#task-name').val();
      console.log(taskName);
      
      return form;
    }   
    
    addTaskForm();
    
        
    $('.btn-add').on('click',function(){
     
     
    }); 
        
})();
  
});