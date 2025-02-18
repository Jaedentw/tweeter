//Counts the amount of characters being typed for a tweet and returns the amount of characters they have left to use. upon passing the char limit the counter goes red.
$(document).ready(function() {
  $('textarea').on('input', function() {
    const characters = $(this).val();
    const count = 140 - characters.length;
    const upDOM = $(this).closest('form');
    const counter = $(upDOM).find('output');
    $(counter).val(count);
    //style red upon exceeding char limit
    if (count <= -1) {
      $(counter).toggleClass('red', true);
    } else {
      $(counter).toggleClass('red', false);
    }
  });
});

//I know the style should be done in CSS but this is the least complicated and most effective way to do the color change on the character counter.