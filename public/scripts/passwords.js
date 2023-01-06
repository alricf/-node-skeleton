$(document).ready(function(){
  $('ul.side-menu li:nth-child(1)').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/passwords'
    })
    .done((response) => {
      $('.table').empty();
      $('.table').append('<tbody>');
      for(const row of response.passwords) {
        $('.table').append(`<tr>
          <td>${row.title}</td>
          <td>${row.login}</td>
          <td>${row.password}</td>
        </tr>`)
      }
      $('.table').append('</tbody>');
    });
  });

});
