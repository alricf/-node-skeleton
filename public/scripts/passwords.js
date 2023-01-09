$(document).ready(function(){

  //display all passwords on page load
  getAllPasswords();

  // Side-Menu Queries //

  // All Passwords
  $('ul.side-menu li:nth-child(1)').on('click', () => {
    getAllPasswords();
  });


  // Work
  $('ul.side-menu li:nth-child(2)').on('click', () => {
    $.ajax({
      method: 'GET',
      url: '/api/passwords/work'
    })
    .done((response) => {
      $('#vault-header-cat').empty();
      $('#vault-header-cat').append('My Vault > Work');
      $('.table').empty();
      $('.table').append('<tbody> <tr class="table-header"><th>Account</th><th>Username</th><th colspan="3">Password</th></tr>');
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
      $('#vault-header-cat').empty();
      $('#vault-header-cat').append('My Vault > Finances');
      $('.table').empty();
      $('.table').append('<tbody> <tr class="table-header"><th>Account</th><th>Username</th><th colspan="3">Password</th></tr>');
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
      $('#vault-header-cat').empty();
      $('#vault-header-cat').append('My Vault > Social Media');
      $('.table').empty();
      $('.table').append('<tbody> <tr class="table-header"><th>Account</th><th>Username</th><th colspan="3">Password</th></tr>');
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
      $('#vault-header-cat').empty();
      $('#vault-header-cat').append('My Vault > Entertainment');
      $('.table').empty();
      $('.table').append('<tbody> <tr class="table-header"><th>Account</th><th>Username</th><th colspan="3">Password</th></tr>');
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
      getAllPasswords();

    })
  });

});

//Load all passwords;
const getAllPasswords = () => {
  $.ajax({
    method: 'GET',
    url: '/api/passwords'
  })
    .done((response) => {
      $('#vault-header-cat').empty();
      $('#vault-header-cat').append('My Vault > All Passwords');
      $('.table').empty();
      $('.table').append('<tbody> <tr class="table-header"><th>Account</th><th>Username</th><th colspan="3">Password</th></tr>');
      for (const row of response.passwords) {
        $('.table').append(`<tr>
          <td>${row.title}</td>
          <td>${row.login}</td>
          <td id="pass-${row.id}" class="password-column">${row.password}</td>
          <td class="pass-buttons"><button type="button" class="copy-button" id="copy-${row.id}">Copy</button></td>
          <td class="pass-buttons edit-delete-btn">
            <form id="form-${row.id}" class="edit-pass"><input type="text" id="new-pass-${row.id}" class="new-pass-input" name="password" placeholder="new password" required>
            <button type="submit" id="save-edit-${row.id}" class="save-edit-button">Save</button></form>
            <button type="button" class="edit-button" id="edit-${row.id}">Edit</button>
            <button type="button" id ="delete-${row.id}" class="delete-button">Delete</button></td>
        </tr>`);
      }
      $('.table').append('</tbody>');

      //Edit button on Click
      $('.edit-button').on('click', function() {
        const id = getId(this.id);
        togglePassInput(id);
      });

      //Copy button on click
      $(".copy-button").on("click", function() {
        const id = getId(this.id);
        console.log(id);
        copyPass(id);
      });


      //Edit password
      $(".edit-pass").on("submit", function(event) {
        event.preventDefault();
        const id = getId(this.id);
        const password = $(this).serialize();
        const formData = (`id=${id}&`).concat(password);
        console.log(formData);
        $.ajax({
          method: 'POST',
          url: `/api/passwords/${id}`,
          data: formData
        })
          .done(()=>{
            getAllPasswords();
          });

      });
    });
};


//get id from element id name
const getId = function(idName) {
  const id = idName.slice(-1);
  return id;
};

//Password Input toggle
const togglePassInput = function(id) {
  $(`#new-pass-${id}`).css("display", "flex");
  $(`#save-edit-${id}`).css("display", "flex");
  $(`#delete-${id}`).css("display", "none");
  $(`#edit-${id}`).css("display", "none");

  const passInputs = document.querySelectorAll('.new-pass-input');
  passInputs.forEach(input => {
    const inputId = getId(input.id);
    if (inputId !== `${id}`) {
      input.style.display = "none";
      $(`#edit-${inputId}`).text("Edit");
      $(`#edit-${inputId}`).css("display", "flex");
      $(`#delete-${inputId}`).css("display", "flex");
      $(`#save-edit-${inputId}`).css("display", "none");
    }
  });
};

//Copy password to clipboard
const copyPass = function(id) {
  const idName = `#pass-${id}`;
  const copyText = $(idName).text();
  navigator.clipboard.writeText(copyText);
};
