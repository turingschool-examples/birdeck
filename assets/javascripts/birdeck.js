var $latestPosts, $postDescription;

$(document).ready(function() {
  $latestPosts = $("#latest-posts")
  $postDescription = $("#post-description")

  fetchPosts()
  fetchPostsButton()
  pollData()
  createPost()
  deletePost()
})

function renderPost(post) {
  return $(
    "<div class='post' data-id='"
    + post.id
    + "'><h6>Published on "
    + post.created_at
    + "</h6><p>"
    + post.description
    + "</p>"
    + "<button id='delete-post' name='button-fetch' class='btn btn-default btn-xs'>Delete</button>"
    + "</div>"
  )
}

function renderPosts(posts) {
  return posts.map(renderPost)
}

function addPostToPage(post) {
  $latestPosts.append(post);
}

function addPostsToPage(posts) {
  $latestPosts.html(posts)
}

function handleError(xhr) {
  console.log(xhr.responseText)
}

function fetchPostsButton() {
  $("#button-fetch-posts").on("click", fetchPosts)
}

function fetchPosts() {
  $.getJSON("https://turing-birdie.herokuapp.com/api/v1/posts.json")
    .then(renderPosts)
    .then(addPostsToPage)
    .fail(handleError)
}

function pollData() {
  setInterval(fetchPosts, 5000)
}

function createPost() {
  $("#create-post").on("click", function() {
    var postParams = {
      post: {
        description: $("#post-description").val()
      }
    }

    $.ajax({
      type:    "POST",
      url:     "https://turing-birdie.herokuapp.com/api/v1/posts.json",
      data:    postParams,
      success: function(newPost) {
        renderPost(newPost)
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
}

function deletePost() {
  $('#latest-posts').on('click', '#delete-post', function() {
    var $post = $(this).closest(".post")

    $.ajax({
      type: 'DELETE',
      url: 'https://turing-birdie.herokuapp.com/api/v1/posts/' + $post.attr('data-id') + ".json",
      success: function() {
        $post.remove()
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
}
