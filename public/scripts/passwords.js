$(document).ready(function(){
  // Side-Menu Queries //

  // All Passwords
  $('ul.side-menu li:nth-child(1)').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/passwords'
    })
    .done((response) => {
      $('.table').empty();
      $('.table').append('<tbody> <tr><td><u>TITLE</u></td><td><u>USER</u></td><td><u>PASSWORD</u></td></tr>');
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

  // Work
  $('ul.side-menu li:nth-child(2)').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/passwords/work'
    })
    .done((response) => {
      $('.table').empty();
      $('.table').append('<tbody> <tr><td><u>TITLE</u></td><td><u>USER</u></td><td><u>PASSWORD</u></td></tr>');
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

  // Finances
  $('ul.side-menu li:nth-child(3)').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/passwords/finance'
    })
    .done((response) => {
      $('.table').empty();
      $('.table').append('<tbody> <tr><td><u>TITLE</u></td><td><u>USER</u></td><td><u>PASSWORD</u></td></tr>');
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

  // Social Media
  $('ul.side-menu li:nth-child(4)').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/passwords/social-media'
    })
    .done((response) => {
      $('.table').empty();
      $('.table').append('<tbody> <tr><td><u>TITLE</u></td><td><u>USER</u></td><td><u>PASSWORD</u></td></tr>');
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

  // Entertainment
  $('ul.side-menu li:nth-child(5)').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/passwords/entertainment'
    })
    .done((response) => {
      $('.table').empty();
      $('.table').append('<tbody> <tr><td><u>TITLE</u></td><td><u>USER</u></td><td><u>PASSWORD</u></td></tr>');
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
