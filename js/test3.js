//http://jsfiddle.net/fvx64/2/
//http://jsfiddle.net/fvx64/1/

$(function() {
  // MODEL VIEW CONTROLER  MVC
  // ROUTE
  //VIEW
  // CONTROLLER
  //MODEL
  
  //SERVER MVC FRAMEWORK
  //CLIENT MVC FRAMEWORK


});

$(function () {
  registerRoute(1, selectElement);
  registerRoute(2, filter);
  //registerRoute(2, sort);
  
  setupNavigation();
  
  $('.item').on('click', function () {
    var id = $(this).attr('id');
    navigateTo(id);
  });
  
  $('.filter-button').on('click', function () {
    var filterText = $('.filter-text').val();
    navigateTo('filter/' + filterText);
    
    //console.log(  $('.filter-button'));
    
  });
});
       
function selectElement(id) {
  var element = $('#' + id);
  $('.selected').removeClass('selected');
  element.addClass('selected');
}

function filter(filter, filterText) {
  $('.hidden').removeClass('hidden');

  $('.item').each(function(i, el) {
    var $el = $(el);
    var itemText = $el.text();
    
    if (!itemText.match(new RegExp(filterText, 'i'))) {
      $el.addClass('hidden');
    }
  });
  
}

function registerRoute(segmentsCount, handler) {
  if (!('routes' in window)) {
    //window.routes = [];
    window.routes = {};
  }
  window.routes[segmentsCount] = handler;
  
  console.log(segmentsCount);
  console.log(handler);
}

function registerRoute(name, handler) {
  
}



function setupNavigation() {
  resolveNavigation();
  if ('onpopstate' in window) {
    $(window).on('popstate', function () {
      resolveNavigation();
    });
  } else {
    setInterval(resolveNavigation, 100);
  }
}

function navigateTo(route) {
  window.location.hash = route;
  
  console.log(window.location.hash );
  console.log(route);
  
  resolveNavigation();
}

function resolveNavigation() {
  if (window.location.href == window.location.previousHref) {
    return;
  }

  var segments = window.location.hash.substr(1).split('/');
  window.routes[segments.length].apply(this, segments);
  window.location.previousHref = window.location.href;
}


function sort() {
  alert('sort');
}





/*$(function() {
  
  //КЛИЕНТСКАЯ НАВИГАЦИЯ
  registrRoute(1,select)
  setupNavigation();
    
  $('.item').on('click', function(){
    var id = $(this).attr('id');
    navigateTo(id);
        
    //var $this = $(this);
    //$this.addClass('selected');
    //$('.selected').removeClass('selected');
    //window.location.hash = $this.attr('id');
    
    //console.log(this);
    //console.log(window.location.hash);
  });
  
  $('.filter-button').on('click', function(){
    var filterText = $('.filter-text').val();
    $('.hidden').removeClass('hidden');
    
    $('.item').each(function(i, el) {
      var $el = $(el);
      var itemText = $el.text();
      if ( !itemText.match())
    }); 
  });
  
  function registerRoute(segmentsCount, handler){
    //segmentsCount 1/2/3
    if ( !('routes') in window ) {
      
    }
    window.routes = [];
    window.routes[segmentsCount] = handler;
  }


  
  function setupNavigation(){
    
  }
  
  function navigateTo(route){
    window.location.hash = route;
    resolveNavigation();
  }
  
  function resolveNavigation(){
    if ( window.location.href == window.location.previousHref) {
      return;
    }
    
    var segments = window.location.hash
    
    console.log( '1/2/3'.split('/') )
  }
  
  //APPLY
  //Используя apply, вы можете вызывать одну функцию в контексте множества различных объектов. 
  //
  
  function selectElement(id){
    var element = $('#' + id);
    
  }
  
  function filter(filter, ){
    
  }
  
  
   
});*/


