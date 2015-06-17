$(document).ready(function() {
  function renderPost(post){
    $('#latest-posts').append(
      "<div class='post'><h6>Published on " +
      post.created_at +
      "</h6><p>" +
      post.description +
      "</p></div>"
      )
  }

  $.ajax({
    type:    'GET',
    url:     'http://localhost:3000/api/v1/posts.json',
    success: function(posts) {
      $.each(posts, function(index, post) {
        renderPost(post)
      })
    }
  })

  $("#create-post").on('click', function() {
    var postParams = {
      post: {
        description: $("#post-description").val()
      }
    }

    $.ajax({
      type:    'POST',
      url:     'http://localhost:3000/api/v1/posts.json',
      data:    postParams,
      success: function(newPost) {
        renderPost(newPost)
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })

})
