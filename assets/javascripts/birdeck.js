var API;

$(document).ready(function(){
  // #tabs for CRUD actions activated
  $( "#tabs" ).tabs();

  // general form submission prevention
  $('form').on('submit', function(event){
    event.preventDefault();
  });
});
