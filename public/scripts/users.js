// Client facing scripts here
$(() => {
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

  // NavUsername script
  $.ajax({
    method: 'GET',
    url: '/api/users'
  })
  .done((response) => {
  $( ".nav-links li:nth-child(1)" ).text(response.name)
  });
});
