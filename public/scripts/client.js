
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
  for (let tweet of arrTweets) {
    let $tweet = createTweetElement(tweet);
    $('form').after($tweet);
  }
};


const loadTweets = function() {
  $.ajax({
    async: false,
    method: 'GET',
    url: '/tweets/',
    success: (data, status, jqXHR) => {
      renderTweets(data);
    }
  })
}


$(document).ready(
  $('form').submit(function(e) {
    e.preventDefault();
    serialEvent = $(this).serialize();
    if(serialEvent.length <= 145 && serialEvent.length > 5) {
      $.ajax({
        async: false,
        method: 'POST',
        url: '/tweets/',
        data: serialEvent,
        success: () => {
          loadTweets();
        }
      })
    } else {
      if(serialEvent.length > 140) {
        const $error = $(`<div id="error">
        This message exceeds the character limit.
        </div>`);
        $('#error').remove();
        $('textarea').after($error);
      } else {
        const $error = $(`<div id="error">
        Your message must have at least one character.
        </div>`);
        $('#error').remove();
        $('textarea').after($error);
      }
    }
  })
);

$(document).ready(loadTweets());




