$(document).ready(function(){

  $("#create-post").on('click', createPost);
  $("button[name=button-fetch]").on('click', fetchPosts);
  $("body").on('click', "a.delete-post", deletePost);

  setInterval(fetchPosts, 5000);

});

function fetchPosts(){
  $.getJSON("https://birdeck.herokuapp.com/api/v1/posts.json", function(posts){
      $("#latest-posts").html('');
      $(posts).each(function(index, post){
        // if(post.id){
          renderPost(post);
        // }
      })
      // $("a.delete-post").on("click", deletePost);
    });

}

function createPost(){
  var postParams = {post: {description: $("#post-description").val()}}

  $.ajax({
    url: "https://birdeck.herokuapp.com/api/v1/posts.json",
    method: "POST",
    dataType: "json",
    data: postParams,
    success: function(post){
      renderPost(post);
    }
  })
}

function deletePost(event){
  event.preventDefault();
  var post_id = $(this).parents(".post").data("post-id");

  $.ajax({
    url: "https://birdeck.herokuapp.com/api/v1/posts/" + post_id + ".json",
    method: "DELETE",
    success: function(){
      $(".post[data-post-id=" + post_id + "]").remove();
    }
  })
}

function renderPost(post){
  $("#latest-posts")
    .append("<div class=post data-post-id="
    + post.id
    + "><h6>Published at "
    + post.created_at
    + "</h6><p>"
    + post.description
    + "</p><a class='delete-post' href='#'>Delete</a></div>");
}
