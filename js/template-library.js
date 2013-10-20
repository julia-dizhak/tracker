$(function(){
  
  $.fn.serializeObject = function()
  {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
  };
  
  var generateUUID = function() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x7|0x8)).toString(16);
      });
      return uuid;
  };
  
  Task = {};
  Task.el = $('.wrapper .project');
  
  Task.addTaskForm = function addTaskForm(form) {
    form = '<div class=\'form-task-add\'>' +
              '<div class=\'wrap\'>' +
                '<i class=\'cube-top\'></i>'+
                '<form method="post" class=\'form-task-add-form\'>' +  
                '<label>' + 'Enter name for task' + '</label>' +
                '<input name="name" id="task-name" type="text" />' +
                '<label>' + 'Enter description for task' + '</label>' +
                '<textarea id="task-desc" name="desc" type="text" rows="4" cols="30">' + '</textarea>' + 
                '<input class="btn-add" type="submit" value="create task" />'+
                '</form>' +
                '<i class=\'cube-bottom-shadow\'></i>'+
              '</div>' +
          '</div>';
          Task.el.append(form);
  };
  
  Task.submitForm = function(event){
    event.preventDefault();
    var form = $(event.target);
    var task_data = form.serializeObject();
    task_data.id = generateUUID();
    
    form.find('#task-name').val('');
    form.find('#task-desc').val('');
    
    // push task item to window.Tasks
    Tasks.push(task_data);
    Task.renderItem(task_data);
  };

  Task.template = _.template(
    '<div data-id="<%= id %>" class=\'task-item\'>' +
        '<div class=\'cube\'>' +
          '<i class=\'cube-top\'></i>'+
          '<div class=\'task-layout\'>' +  
            '<div class=\'task-name\'> <%= name %> </div>' +
            '<div class=\'task-desc\'> <%= desc %>  </div>' +
            '<div class=\'task-status\'>' + '<p></p>' + '</div>' +
            '<a href="javascript:;" class=\'btn-delete\'>' + 'delete task' + '</a>' +
          '</div>' +
          '<i class=\'cube-bottom-shadow\'></i>'+
        '</div>' +
    '</div>'
  );

  Task.renderItem = function(item){
    var res = Task.template(item);
    $(res).insertAfter('.form-task-add');

    $('.btn-delete').on('click', Task.removeItem);
  };

  Task.removeItem = function(event){
     event.preventDefault();
     var button = $(event.target),
     task_id = button.closest('div[data-id]').data('id');
     button.closest('.task-item').hide('slow', function(){ $(this).closest('.task-item').remove(); });

     Tasks.pop(_.findWhere(Tasks, {id: task_id}));
  }

  Task.init = function(){
    Task.addTaskForm();
    $('.form-task-add-form').on('submit', Task.submitForm);
    // initial render of all tasks
    _.each(Tasks, this.renderItem);
     $('.btn-delete').on('click', Task.removeItem);

    
    
  }

  Task.init();
});