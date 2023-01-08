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
      $('.table').append('<tbody> <tr class="table-header"><th>Account</th><th>Username</th><th colspan="3">Password</th></tr>');
        for (const row of response.passwords) {
          $('.table').append(`<tr>
            <td>${row.title}</td>
            <td>${row.login}</td>
            <td id="${row.id}" class="password-column">${row.password}</td>
            <td class="pass-buttons"><button type="button" id="copy-button">Copy</button></td>
            <td class="pass-buttons edit-delete-btn"><input type="text" class="new-pass-input" placeholder="new password">
              <button type="button" class="edit-button">Edit</button>
              <button type="button" class="delete-button">Delete</button></td>
          </tr>`);
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

  // Add New Button into Passwords Table
  $('.addNewButton').on('submit', (event) => {
    event.preventDefault();
    console.log('form');
    const formData = $('.addNewButton').serialize();
    console.log($('form').serialize());
    $.ajax({
      method: 'POST',
      url: '/api/passwords',
      data: formData
    })
    .done(()=>{
      console.log('Ajax Get');
      $.ajax({
        method: 'GET',
        url: '/api/passwords'
      })
    .done((response) => {
      console.log('response:', response);
        $('.table').empty();
        $('.table').append('<tbody> <tr><td><u>TITLE</u></td><td><u>USER</u></td><td><u>PASSWORD</u></td></tr>');
        for(const row of response.passwords) {
          console.log(row.title);
          $('.table').append(`<tr>
            <td>${row.title}</td>
            <td>${row.login}</td>
            <td>${row.password}</td>
          </tr>`)
        }
        $('.table').append('</tbody>');
      });
    })
  });

});
