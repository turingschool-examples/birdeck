console.log("Hello");

$(document).ready(function(){
  $("button[name=button-fetch]").on("click", function(){
    $.ajax({
      method: "GET",
      url: "https://birdeck.herokuapp.com/api/v1/posts.json",
      dataType: "JSON",
      success: renderPosts
    });
  })

  $("#create-post").on("click", function(){
    var postDescription = $("#post-description").val();
    var postData = { post: { description: postDescription } };
    $.ajax({
      method: "POST",
      url: "https://birdeck.herokuapp.com/api/v1/posts.json",
      dataType: "JSON",
      data: postData,
      success: function(newPost){
        $("#latest-posts").append("<div class='post'>" + newPost.description + "</div>");
      },
      error: function(errorResponse){
        console.log(errorResponse.responseText);
      }
    })
  })

  $("#latest-posts").on('click', '.delete-post', function(){
    var postId = $(this).parent().data('post-id');
    $.ajax({
      method: "DELETE",
      url: "https://birdeck.herokuapp.com/api/v1/posts/" + postId + ".json",
      dataType: "JSON",
      success: function(deletedPost){
        alert("Deleted post with id: " + postId);
        $(".post[data-post-id=" + postId + "]").remove();
      },
      error: function(errorResponse){
        console.log(errorResponse)
      }
    })
  })


})

function renderPosts(responseObject) {
  console.table(responseObject);
  $(responseObject).each(function(index, object){
    $("#latest-posts").append(
      "<div class='post' data-post-id='" + object.id + "'>" +
      object.description + "<br>" +
      "<a href='#' class='delete-post'>Delete</a></div>"
    );
  })
}
