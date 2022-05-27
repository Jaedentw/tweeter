/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const createTweetElement = function(tweet) {
  const tweetFormatted = (`
  <article class="tweet hover-shadow">

    <header class="seperate">
      <div class="center-align">
      <img class="small-image" src="${tweet.user.avatars}">
      ${tweet.user.name}
      </div>
      ${tweet.user.handle}
    </header>

    <p><strong>${tweet.content.text}</strong></p>

    <footer class="seperate overlined">
      <time>created at ${tweet.created_at}</time>
      <div>
        <i class="fa-solid fa-flag hover-blue"></i>
        <i class="fa-solid fa-retweet hover-blue"></i>
        <i class="fa-solid fa-heart hover-blue"></i>
      </div>
    </footer>

  </article>
  `);
  return tweetFormatted;
}

const $tweet = createTweetElement(tweetData);

console.log($tweet);

$('.container').append($tweet);
