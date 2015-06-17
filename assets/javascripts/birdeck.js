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
    url:     'https://turing-birdie.herokuapp.com/api/v1/posts.json',
    success: function(posts) {
      $.each(posts, function(index, post) {
        renderPost(post)
      })
    }
  })
})
