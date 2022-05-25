$(document).ready(function() {
  $('textarea').on('input', function () {
    console.log(this);
    const characters = $(this).val();
    const count = 140 - characters.length;
    const upDOM = $(this).closest('form');
    const downDOM = $(upDOM).find('output');
    $(downDOM).val(count);
  });
});