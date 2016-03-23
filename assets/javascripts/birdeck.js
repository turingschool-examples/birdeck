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
        description: $postDescription.val()
      }
    }

  $.post("https://turing-birdie.herokuapp.com/api/v1/posts.json", postParams)
    .then(renderPost)
    .then(appendPostsToPage)
    .fail(handleError)
  })
}

function deletePost() {
  $latestPosts.on('click', '#delete-post', function() {
    var $post = $(this).closest(".post")

    $.ajax({
      type: 'DELETE',
      url: 'https://turing-birdie.herokuapp.com/api/v1/posts/' + $post.data('id') + ".json"
    }).then(function () {
      $post.remove()
    }).fail(handleError)
  })
}
