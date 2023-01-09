$(document).ready(function(){

  //display all passwords on page load
  getAllPasswords('');

  // Side-Menu Queries //

  // All Passwords
  $('ul.side-menu li:nth-child(1)').on('click', () => {
    $('.new-password-box').css('display', "none");
    getAllPasswords('');
  });


  // Work
  $('ul.side-menu li:nth-child(2)').on('click', () => {
    $('.new-password-box').css('display', "none");
    getAllPasswords('work');
  });

  // Finances
  $('ul.side-menu li:nth-child(3)').on('click', () => {
    $('.new-password-box').css('display', "none");
    getAllPasswords('finance');
  });

  // Social Media
  $('ul.side-menu li:nth-child(4)').on('click', () => {
    $('.new-password-box').css('display', "none");
    getAllPasswords('social-media');
  });

  // Entertainment
  $('ul.side-menu li:nth-child(5)').on('click', () => {
    $('.new-password-box').css('display', "none");
    getAllPasswords('entertainment');
  });

  // Add New Button into Passwords Table
  $('.addNewButton').on('submit', (event) => {
    event.preventDefault();
    const formData = $('.addNewButton').serialize();
    $.ajax({
      method: 'POST',
      url: '/api/passwords',
      data: formData
    })
    .done(()=>{
      getAllPasswords();
      $('.new-password-box').css("display", "none");
      $('#new-title').val('');
      $('#new-user').val('');
      $('#new-website').val('');
      $('#new-category').val('');
      $('#new-password').val('');
    })
  });

});

//Load all passwords;
const getAllPasswords = (category) => {
  let categoryUrl = `api/passwords/${category}`;
  let headerCategory = '';

  //Switch case to display category name
  switch (category) {
  case 'work': headerCategory = "Work";
    break;
  case 'finance': headerCategory = 'Finance';
    break;
  case 'social-media': headerCategory = 'Social Media';
    break;
  case 'entertainment': headerCategory = 'Entertainment';
    break;
  default: headerCategory = 'All Passwords';
    break;
  }

  $.ajax({
    method: 'GET',
    url: categoryUrl
  })
    .done((response) => {
      console.log(response);
      $('#vault-header-cat').empty();
      $('#vault-header-cat').append(`My Vault : ${headerCategory}`);
      $('.table').empty();
      $('.table').append('<tbody> <tr class="table-header"><th>Account</th><th>Username</th><th colspan="3">Password</th></tr>');
      for (const row of response.passwords) {
        $('.table').append(`<tr>
          <td>${row.title}</td>
          <td>${row.login}</td>
          <td id="pass-${row.id}" class="password-column">${row.password}</td>
          <td class="pass-buttons"><button type="button" class="copy-button" id="copy-${row.id}">Copy</button></td>
          <td class="pass-buttons edit-delete-btn">
            <form id="form-${row.id}" class="edit-pass"><input type="text" id="new_pass-${row.id}" class="new-pass-input" name="password" placeholder="new password" required>
            <button type="submit" id="save_edit-${row.id}" class="save_edit-button">Save</button></form>
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


      //Edit password
      $(".edit-pass").on("submit", function(event) {
        event.preventDefault();
        const id = getId(this.id);
        const password = $(this).serialize();
        const formData = (`id=${id}&`).concat(password);
        $.ajax({
          method: 'POST',
          url: `/api/passwords/${id}`,
          data: formData
        })
          .done(()=>{
            return getAllPasswords(`${category}`);
          });

      });

      //Delete password
      $(".delete-button").on("click", function() {
        const id = getId(this.id);
        const formData = `id=${id}`;

        $.ajax({
          method: 'POST',
          url: `/api/passwords/${id}/delete`,
          data: formData
        })
          .done(()=>{
            return getAllPasswords(`${category}`);
          });
      });

      //Copy button on click
      $(".copy-button").on("click", function() {
        const id = getId(this.id);
        return copyPass(id);
      });
    });
};


//get id from element id name
const getId = function(idName) {
  const id = idName.split('-')[1];
  return id;
};

//Password Input toggle
const togglePassInput = function(id) {
  $(`#new_pass-${id}`).css("display", "flex");
  $(`#save_edit-${id}`).css("display", "flex");
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
      $(`#save_edit-${inputId}`).css("display", "none");
    }
  });
};

//Copy password to clipboard
const copyPass = function(id) {
  const idName = `#pass-${id}`;
  const copyText = $(`${idName}`).text();
  navigator.clipboard.writeText(copyText);
};
