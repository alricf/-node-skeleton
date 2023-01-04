// Client facing scripts here
$(document).ready(function() {

  $(".add-new").on("click", function() {

    if($('.new-password').css('display') === 'none') {
      $('.new-password').css("display", "flex");
      $('.new-password').slideDown('slow');
    } else {
      $('.new-password').css("display", "none");
    }
  });
});
