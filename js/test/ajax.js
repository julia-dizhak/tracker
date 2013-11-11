$(function(){
  $.ajax({
    url: 'data.js',
    type: 'GET',
    dataType: 'json'
  }).done(function(data) {
    $('.item').text(data.message);
  }).fail(function(){
    console.log('fail');
    console.log(arguments);
  });
  
});


//get
//post 