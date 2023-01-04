// Client facing scripts here

// $('#fetch-users').on('click', () => {
//   $.ajax({
//     method: 'GET',
//     url: '/api/users'
//   })
//   .done((response) => {
//     const $usersList = $('#users');
//     $usersList.empty();

//     for(const user of response.users) {
//       $(`<li class="user">`).text(user.name).appendTo($usersList);
//     }
//   });
// });



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

