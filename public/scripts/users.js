// Client facing scripts here

$(document).ready(function() {

  $('#fetch-users').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/users'
    })
      .done((response) => {
        const $usersList = $('#users');
        $usersList.empty();

        for(const user of response.users) {
          $(`<li class="user">`).text(user.name).appendTo($usersList);
        }
      });
  });



  $(".add-new").on("click", function() {
    if($('.new-password').css('display') === 'none') {
      $('.new-password').css("display", "flex");
      $('.new-password').slideDown('slow');
    } else {
      $('.new-password').css("display", "none");
    }
  });

  $(".edit-button").on("click", function() {
    $('.new-pass-input').css("visibility", "visible");
    this.textContent = "Save";
  });

  $(".more-button").on("click", function() {

    if(this.textContent === "More") {
      $('.hidden-pass').css("display", "flex");
      this.textContent = "Hide";
    } else {
      $('.hidden-pass').css("display", "none");
      this.textContent = "More";
      $('.new-pass-input').css("visibility", "hidden");
      $(".edit-button").innerHTML = "Edit";
    }
  });
});

