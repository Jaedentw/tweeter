
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//format and creation of a new tweet
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

//rendering process
const renderTweets = function(arrTweets) {
  for (let tweet of arrTweets) {
    let $tweet = createTweetElement(tweet);
    $('form').after($tweet);
  }
};

//gets all tweets and renders them
const loadTweets = function() {
  $.ajax({
    async: false,
    method: 'GET',
    url: '/tweets/',
    success: (data, status, jqXHR) => {
      renderTweets(data);
    },
    error: () => {
      alert('Error: Cannot load tweets')
    }
  });
};

//gets the most recently added tweet and renders it
const loadNewestTweet = function() {
  $.ajax({
    async: false,
    method: 'GET',
    url: '/tweets/',
    success: (data, status, jqXHR) => {
      renderTweets([data[data.length - 1]]);
    },
    error: () => {
      alert('Error: Cannot load newest tweet')
    }
  });
};

// on submission rendering and error handling for incorrectly formatted tweets
$(document).ready(
  $('form').submit(function(e) {
    e.preventDefault();
    const serialEvent = $('textarea').serialize();
    const val = $('textarea').val();
    if (val.length <= 140 && val.length > 0) {
      //Posting newest tweet if it's within the char limit
      $('#counter').val(140);
      $('#tweet-text').val('');
      $('#error').remove();
      $.ajax({
        async: false,
        method: 'POST',
        url: '/tweets/',
        data: serialEvent,
        success: () => {
          loadNewestTweet();
        },
        error: (xhr, text, error) => {
          alert(`Error: Cannot post tweet at this time`);
        }
      });
    } else {
      if (val.length > 140) {
        //error for too many chars
        const $error = $(`<div id="error">
        This message exceeds the character limit.
        </div>`);
        $('#error').remove();
        $('textarea').after($error);
      } else {
        //error for no chars
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




