$(document).ready(function(){

  fetchPosts();
  fetchPostsButton();


});

// ==================FETCH POSTS=============================
// Fetch Posts when the page loads
// 1.) Send request to get the data
// 2.) Take data and create HTML template for the data
// 3.) Render all Posts with the template
// 4.) Handle a failure

  function fetchPosts(){
    console.log("win")
    // 1.) Send request to get the data
    $.ajax({
      url: "https://turing-birdie.herokuapp.com/api/v1/posts",
      method: "get"
      }
    ).then(collectPosts)  // 2.0 & 3.0) collect all postsHTML to go render
    .then(renderPosts)    // 3.1) render posts to page
    .fail(handleError)    // 4.) handle error
  }

  function renderPosts(postsData){
    // 3.1) render posts to page
    $("#latest-posts").html(postsData);
  }

  function collectPosts(postsData){
    // 3.0) collect all postsHTML to go render
      return postsData.map(createPostHTML);  // 2.) create data and create an HTML template
    }

    // 2.) create data and create an HTML template
    function createPostHTML(postData){
      return $("<div class='post' data-id='"
      + postData.id
      + "'><h6>Published on "
      + postData.created_at
      + "</h6><p>"
      + postData.description
      + "</p>"
      + "<button id='delete-post' name='button-fetch' class='btn btn-default btn-xs'>Delete</button>"
      + "</div>")
    }

    // 4.) Handle Error
    function handleError(data){console.log(data)}


    // ===========Enable Button To Fetch Posts With jQuery Event Delegator==============
    function fetchPostsButton(){
      $("button[name=button-fetch]").on("click", fetchPosts);
    }
