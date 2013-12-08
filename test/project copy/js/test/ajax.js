$(function(){
  
 /* $.ajax({
    //url: '../data/0c...', 
    url: '../js/test/data-json.js',
    type: 'GET',
    dataType: 'json',
    cache: false
  }).done(function(data) {
    $('.item').text(data.message);
    
    
  }).fail(function(){
    console.log('fail');
    console.log(arguments);
  });*/
  
  $.ajax({
    //url: '../data/0c...', 
    //url: '/data/_all_docs',
    url: '../js/test/data-json.js',
    type: 'GET',
    dataType: 'json',
    cache: false
  }).done(function(allDocs) {
    var items = allDocs.rows;
    for ( var i in items ) {
      var url = "/data/" + items[i].key;
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        cache: false
      }).done(function(item) {
        //$('<div />').text(item.message).appendTo('.item');
        addItem(item);
      });
    }
    
    
  }).fail(function(){
    console.log('fail');
    console.log(arguments);
  });
  
  // get получаем данные (указать dataType)
  // post(put) отдаем данные (указаать conentType)
  $('.add').on('click', function(){
    var message = $('.text').val();
    var item = { message: message };
    $.ajax({
      type: 'POST',
      //url: '/data',
      url: '../js/test/data-json.js',
      contentType: 'application/json',
      data: JSON.stringify(item) //преобразует значения javascript в json
    }).done(function(item){
      addItem(item);
    });
  });
  
  function addItem(item) {
    $('<div />').text(item.message).appendTo('.item');
  }
  
});


//get
//post 
//put
//delete

//jsonP for get see!

//apache couchDB - база данных
//конкуретные запросы
// client and server
// _id и _rev (ревизия) отвечают
// можно хранить файлы как данные а можно использовать как web приложения
// поле _ attachements

//parol Bionic 8 (18)