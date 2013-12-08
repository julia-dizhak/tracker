$(function () {
           setupNavigation();
           $('.item').on('click', function () {
               var $this = $(this);
               $this.addClass('selected');
               $('.selected').removeClass('selected');
               window.location.hash = $this.attr('id');
           });
           $('.filter-button').on('click', function () {
               var filterText = $('.filter-text').val();
               $('.hidden').removeClass('hidden');

               $('.item').each(function (i, el) {
                   var $el = $(el);
                   var itemText = $el.text();
                   if (!itemText.match(new RegExp(filterText, 'i'))) {
                       $el.addClass('hidden');
                   }
               });
           });
       });
       
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
       function resolveNavigation() {
           if (window.location.href == window.location.previousHref) {
               return;
           }

           var id = window.location.hash;
           var element = $(id);
           $('.selected').removeClass('selected');
           element.addClass('selected');

           window.location.previousHref = window.location.href;
       }
