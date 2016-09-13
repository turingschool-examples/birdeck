$(document).ready(function(){

  fetchPosts();


});


// Fetch Posts when the page loads
// 1.) Send request to get the data
// 2.) Take data and create HTML template for the data
// 3.) Render all Posts with the template
// 4.) Handle a failure

  function fetchPosts(){
    // 1.) Send request to get the data
    $.ajax({
      url: "https://turing-birdie.herokuapp.com/api/v1/posts",
      method: "get",
      success: function(xhr){
        // 3.) render template for all Posts
        for(var i = 0; i < xhr.length; i++ ){
          $("#latest-posts").append(
            // 2.) create data and create an HTML template
            "<div class='post' data-id='"
            + xhr[i].id
            + "'><h6>Published on "
            + xhr[i].created_at
            + "</h6><p>"
            + xhr[i].description
            + "</p>"
            + "<button id='delete-post' name='button-fetch' class='btn btn-default btn-xs'>Delete</button>"
            + "</div>") };

        },
        // 4.) Handle failure
        failure: function(){console.log(xhr)}
    })

  }
