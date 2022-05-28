/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {
  const $tweet = $(`
  <article class="tweet hover-shadow">
  
    <header class="seperate">
      <div class="center-align">
      <img class="small-image" src=${tweet.user.avatars}>
      ${tweet.user.name}
      </div>
      ${tweet.user.handle}
    </header>
  
    <p><strong>${tweet.content.text}</strong></p>
  
    <footer class="seperate overlined">
      <time>${timeago.format(tweet.created_at)}</time>
      <div>
        <i class="fa-solid fa-flag hover-blue"></i>
        <i class="fa-solid fa-retweet hover-blue"></i>
        <i class="fa-solid fa-heart hover-blue"></i>
      </div>
    </footer>
  
  </article>
  `);
  return $tweet;
};

const renderTweets = function(arrTweets) {
  console.log(arrTweets);
  for (let tweet of arrTweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};

$(document).ready(
  $('form').submit(function(e) {
    e.preventDefault();
    serialEvent = $(this).serialize();
    console.log(serialEvent.length);
    if(serialEvent.length <= 145 && serialEvent.length > 5) {
      $.post("/tweets/", serialEvent, () => { 
      console.log(serialEvent);
    })
    } else {
      if(serialEvent.length > 140) {
        alert("This message exceeds the character limit");
      } else {
        alert("Message too short");
      }
    }
  })
);

$(document).ready(
  function loadTweets() {
    $.get("/tweets/", (data) => {
      console.log(data);
    })
    .done(function(data) {
      renderTweets(data);
    });
  }
);


