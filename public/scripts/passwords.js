$(document).ready(function() {

  //display all passwords on page load
  getPasswords('');
  $('.li-all').css("width", "260px");

  // Side-Menu Queries //

  // All Passwords
  $('ul.side-menu li:nth-child(1)').on('click', () => {
    $('.new-password-box').css('display', "none");
    $('.li-all').css("width", "260px");
    $('.li-work').css("width", "250px");
    $('.li-finance').css("width", "250px");
    $('.li-social-media').css("width", "250px");
    $('.li-entertainment').css("width", "250px");
    getPasswords('');
  });

  // Work
  $('ul.side-menu li:nth-child(2)').on('click', () => {
    $('.new-password-box').css('display', "none");
    $('.li-all').css("width", "250px");
    $('.li-work').css("width", "260px");
    $('.li-finance').css("width", "250px");
    $('.li-social-media').css("width", "250px");
    $('.li-entertainment').css("width", "250px");
    getPasswords('work');
  });

  // Finances
  $('ul.side-menu li:nth-child(3)').on('click', () => {
    $('.new-password-box').css('display', "none");
    $('.li-all').css("width", "250px");
    $('.li-work').css("width", "250px");
    $('.li-finance').css("width", "260px");
    $('.li-social-media').css("width", "250px");
    $('.li-entertainment').css("width", "250px");
    getPasswords('finance');
  });

  // Social Media
  $('ul.side-menu li:nth-child(4)').on('click', () => {
    $('.new-password-box').css('display', "none");
    $('.li-all').css("width", "250px");
    $('.li-work').css("width", "250px");
    $('.li-finance').css("width", "250px");
    $('.li-social-media').css("width", "260px");
    $('.li-entertainment').css("width", "250px");
    getPasswords('social-media');
  });

  // Entertainment
  $('ul.side-menu li:nth-child(5)').on('click', () => {
    $('.new-password-box').css('display', "none");
    $('.li-all').css("width", "250px");
    $('.li-work').css("width", "250px");
    $('.li-finance').css("width", "250px");
    $('.li-social-media').css("width", "250px");
    $('.li-entertainment').css("width", "260px");
    getPasswords('entertainment');
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
      .done(() => {
        getPasswords('');
        $('.new-password-box').css("display", "none");
        $('#new-title').val('');
        $('#new-user').val('');
        $('#new-website').val('');
        $('#new-category').val('');
        $('#new-password').val('');
      });
  });

  // Search
  $(".search-bar").on("input", function() {

    $('.li-all').css("width", "260px");
    $('.li-work').css("width", "250px");
    $('.li-finance').css("width", "250px");
    $('.li-social-media').css("width", "250px");
    $('.li-entertainment').css("width", "250px");
    // Filter current table
    const value = $(this).val().toLowerCase();
    $('.table-header').empty();

    //Get page category
    const pageCat = getPageCat($('#vault-header-cat').text());
    if (value.length === 0) {

      switch (pageCat) {
      case 'All Passwords': getPasswords('');
        break;
      case 'Work': getPasswords('work');
        break;
      case 'Finances': getPasswords('finance');
        break;
      case 'Social Media': getPasswords('social-media');
        break;
      case 'Entertainment': getPasswords('entertainment');
        break;
      }

    }

    const matchedItems = new Set();
    const matchCheck = new Set();

    $(".filt").filter(function() {
      const isMatched = $(this).text().toLowerCase().indexOf(value) > -1;

      if (!isMatched && !matchedItems.has($(this).parent().attr("id"))) {
        if (!matchCheck.has(($(this).parent().attr("id")))) {
          matchCheck.add(($(this).parent().attr("id")));
          return;
        }

        $(this).parent().toggle($(this).text().toLowerCase().indexOf(value) > -1);
        $('.hidden-tr').css("display", "none");
        return;
      }

      matchedItems.add(($(this).parent().attr("id")));
    });

  });

  // Post row with form inputed search term
  $("#search-form").on("submit", function(event) {
    event.preventDefault();
    $('.new-password-box').css('display', "none");
    const form1 = $("#search-form").serialize();
    const searchTerm = $(".search-bar").val();
    $("#search-form")[0].reset();
    $.ajax({
      method: 'GET',
      url: '/api/passwords/search',
      data: form1
    }).done((response) => {
      $('.li-all').css("width", "250px");
      $('.li-work').css("width", "250px");
      $('.li-finance').css("width", "250px");
      $('.li-social-media').css("width", "250px");
      $('.li-entertainment').css("width", "250px");
      $('#vault-header-cat').empty();
      $('#vault-header-cat').append(`My Vault : "${searchTerm}"`);
      $('.table').empty();
      $('.table').append('<tbody id="table-body"> <tr class="table-header"><th>Account</th><th colspan="3">Username</th></tr>');
      for (const row of response.passwords) {
        $('.table').append(`<tr id ="show_tr-${row.id}">
            <td class="td-1">${row.title}</td>
            <td class="td-2">${row.login}</td>
            <td class="pass-buttons td-3"><button type="button" class="copy_go-button" id="copy_go-${row.id}">Copy & Go</button></td>
            <td class="pass-buttons td-4 more-td"><button type="button" id ="more-${row.id}" class="more-button">More</button></td>
            </tr>
            <tr id="tr-${row.id}" class="hidden-tr">
            <td>Password: </td>
            <td id="pass-${row.id}" class="password-column td-1">${row.password}</td>
            <td class="hidden-pass-buttons td-2"><button type="button" class="copy-button" id="copy-${row.id}">Copy</button></td-2>
            <td class="hidden-pass-buttons td-3 edit-delete-btn"><form id="form-${row.id}" class="edit-pass"><input type="text" id="new_pass-${row.id}" class="new-pass-input" name="password" placeholder="new password" required>
            <button type="submit" id="save_edit-${row.id}" class="save_edit-button">Save</button></form>
            <button type="button" class="edit-button" id="edit-${row.id}">Edit</button>
            <button type="button" id ="delete-${row.id}" class="delete-button">Delete</button>
            </td>
          </tr>`);
      }
      $('.table').append('</tbody>');

      //Hide password rows upon submit
      $('.hidden-tr').css("display", "none");

      //Edit button
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
          .done(() => {
            return getPasswords(``);
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
          .done(() => {
            return getPasswords(``);
          });
      });

      //Copy button
      $(".copy-button").on("click", function() {
        const id = getId(this.id);
        return copyPass(id);
      });

      //More button
      $(".more-button").on("click", function() {
        const id = getId(this.id);

        if ($(this).text() === "More") {
          $(this).text('Hide');
          $(`#tr-${id}`).css('display', "table-row");
          return toggleHiddenRows(id);
        } else {
          $(this).text('More');
          $(`#tr-${id}`).css('display', "none");
          $(`#new_pass-${id}`).css("display", "none");
          $(`#save_edit-${id}`).css("display", "none");
          $(`#delete-${id}`).css("display", "flex");
          $(`#edit-${id}`).css("display", "flex");
          $(`#new_pass-${id}`).val('');
        }
      });

    });

  });

  // Copy & Go button
  $("body").on("click", ".copy_go-button", function(event) {
    event.preventDefault();
    const id = getId($(this).attr('id'));
    copyPass(id)
      .then(() => {
        const formData = `id=${id}`;
        $.ajax({
          method: 'GET',
          url: `/api/passwords/${id}`,
          data: formData
        }).done((response) => {
          return window.open(response.link);
        });
      });
  });

});

//Load all passwords;
const getPasswords = (category) => {
  let categoryUrl = `api/passwords/${category}`;
  let headerCategory = '';

  //Switch case to display category name
  switch (category) {
  case 'work': headerCategory = "Work";
    break;
  case 'finance': headerCategory = 'Finances';
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
      $('#vault-header-cat').empty();
      $('#vault-header-cat').append(`My Vault : ${headerCategory}`);
      $('.table').empty();
      $('.table').append('<tbody id="table-body"> <tr class="table-header"><th>Account</th><th colspan="3">Username</th></tr>');
      for (const row of response.passwords) {
        $('.table').append(`<tr id ="show_tr-${row.id}">
          <td class="td-1 filt">${row.title}</td>
          <td class="td-2 filt">${row.login}</td>
          <td class="pass-buttons td-3"><button type="button" class="copy_go-button" id="copy_go-${row.id}">Copy & Go</button></td>
          <td class="pass-buttons td-4 more-td"><button type="button" id ="more-${row.id}" class="more-button">More</button></td>
          </tr>
          <tr id="tr-${row.id}" class="hidden-tr">
          <td>Password: </td>
          <td id="pass-${row.id}" class="password-column td-1">${row.password}</td>
          <td class="hidden-pass-buttons td-2"><button type="button" class="copy-button" id="copy-${row.id}">Copy</button></td-2>
          <td class="hidden-pass-buttons td-3 edit-delete-btn"><form id="form-${row.id}" class="edit-pass"><input type="text" id="new_pass-${row.id}" class="new-pass-input" name="password" placeholder="new password" required>
          <button type="submit" id="save_edit-${row.id}" class="save_edit-button">Save</button></form>
          <button type="button" class="edit-button" id="edit-${row.id}">Edit</button>
          <button type="button" id ="delete-${row.id}" class="delete-button">Delete</button>
          </td>
        </tr>`);
      }
      $('.table').append('</tbody>');

      //Edit button
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
          .done(() => {
            return getPasswords(`${category}`);
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
          .done(() => {
            return getPasswords(`${category}`);
          });
      });

      //Copy button
      $(".copy-button").on("click", function() {
        const id = getId(this.id);
        return copyPass(id);
      });

      //More button
      $(".more-button").on("click", function() {
        const id = getId(this.id);

        if ($(this).text() === "More") {
          $(this).text('Hide');
          $(`#tr-${id}`).css('display', "table-row");
          return toggleHiddenRows(id);
        } else {
          $(this).text('More');
          $(`#tr-${id}`).css('display', "none");
          $(`#new_pass-${id}`).css("display", "none");
          $(`#save_edit-${id}`).css("display", "none");
          $(`#delete-${id}`).css("display", "flex");
          $(`#edit-${id}`).css("display", "flex");
          $(`#new_pass-${id}`).val('');
        }
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

const toggleHiddenRows = function(id) {
  const hiddenRows = document.querySelectorAll('.hidden-tr');
  hiddenRows.forEach(row => {
    const rowId = getId(row.id);
    if (rowId !== id) {
      $(`#more-${rowId}`).text('More');
      $(`#tr-${rowId}`).css('display', "none");
    }
  });
};

//Copy password to clipboard
const copyPass = function(id) {
  const idName = `#pass-${id}`;
  const copyText = $(`${idName}`).text();
  return navigator.clipboard.writeText(copyText);
};

//get current page header - to get category
const getPageCat = function(header) {
  const category = header.slice(11);
  return category;
};
