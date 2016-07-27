console.log("Hello");

$(document).ready(function(){
  console.log("Hello");

  var appendPost = function(post){
    $("#latest-posts").append(
      "<div class='post' id='post" + post.id + "' contenteditable='true' data-post-id='" + post.id +"'>"
        + post.description +
      "</div>" +
      "<button class='edit-button' data-target='post" + post.id + "'>Update</button>"
    )
  }

  $("body").on('click', ".edit-button", function(){
    var targetPostId = $(this).data("target")
    var $targetPost = $("#" + targetPostId)
    // debugger;
    var id = $targetPost.data("post-id")
    var postDescription = $targetPost.val()
    var postData = {post: {description: postDescription}};
    $.ajax({
      url: "http://192.168.30.33:3000/api/v1/posts/" + id + ".json",
      method: "PATCH",
      data: postData
    })
  })

  $("button[name=button-fetch]").on('click', function(){
    $.ajax({
      url: "http://192.168.30.33:3000/api/v1/posts.json",
      method: "GET",
      dataType: "JSON",
      success: function(posts){
        $("#latest-posts").html("")
        console.table(posts)
        $(posts).each(function(index, post){
          appendPost(post);
        })
      },
      error: function(errorResponse){
        console.log(errorResponse)
      }
    })
  })


  $("#create-post").on('click', function(){
    var postDescription = $("#post-description").val()
    var postData = {post: {description: postDescription}}
    console.log(postData);
    $.ajax({
      method: "POST",
      url: "http://192.168.30.33:3000/api/v1/posts.json",
      dataType: "JSON",
      data: postData,
      success: appendPost
    })
  })

});
