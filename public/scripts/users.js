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


  //Add new - button click, displays inputs for creating new password info
  $(".add-new").on("click", function() {
    let titleInput = document.getElementById('new-title');
    let userInput = document.getElementById('new-user');
    let websiteInput = document.getElementById('new-website');
    let categoryInput = document.getElementById('new-category');
    let passInput = document.getElementById('new-password');

    if($('.new-password-box').css('display') === 'none') {
      $('.new-password-box').css("display", "flex");
      $('.new-password-box').slideDown('slow');
    } else {
      $('.new-password-box').css("display", "none");
      titleInput.value = '';
      userInput.value = '';
      websiteInput.value = '';
      categoryInput.value = '';
      passInput.value = '';
    }
  });

  //Edit button function
  $(".edit-button").on("click", function() {
    $('.new-pass-input').css("visibility", "visible");
    this.textContent = "Save";
  });

  //Change range slider label based on user selection
  const slider = document.getElementById('range');

  slider.onchange = function() {
    let sliderVal = slider.value;
    let rangeNum = document.getElementById('rangeNum');

    rangeNum.textContent = sliderVal;
  };




  //Generate new password based on requirements, place in password input
  $(".generate-button").on("click", function() {
    let passInput = document.getElementById('new-password');
    let slider = document.getElementById('range');

    //get array of checked box values
    const checkboxes = document.querySelectorAll('input[name="pass-req"]:checked');
    let checks = [];
    checkboxes.forEach((checkbox) => {
      checks.push(checkbox.value);
    });

    const numbers = [1,2,3,4,5,6,7,8,9];
    const symbols = ["@", "!", "#", "$", "%", "^", "&", "*", "?", "~"];
    const charCodes = Array.from(Array(26)).map((_, i) => i + 97);
    const lowercase = charCodes.map(code => String.fromCharCode(code));
    const uppercase = lowercase.map(letter => letter.toUpperCase());

    //generate password function
    const generatePassword = (checks) => {
      const availableCharacters = [];

      checks.includes("Symbols") ? availableCharacters.push(symbols) : [];
      checks.includes("Numbers") ? availableCharacters.push(numbers) : [];
      checks.includes("Uppercase") ? availableCharacters.push(uppercase) : [];
      checks.includes("Lowercase") ? availableCharacters.push(lowercase) : [];

      //generated pasword
      let pass = [];

      if (availableCharacters.length >= 1) {
        while (pass.length < slider.value) {

          for (let i = 0; i < availableCharacters.length; i++) {
            pass.push(availableCharacters[i][Math.floor(Math.random() * availableCharacters[i].length)]);

            if (pass.length == slider.value) {
              const scramblePass = pass.sort(() => Math.random() - 0.5).join('');
              return (passInput.value = scramblePass);
            }
          }
        }
      } else {
        return (passInput.value = "");
      }
    };

    generatePassword(checks);

  });

  //Copy password to clipboard

  $(".copy-button").on("click", function() {
    const password = document.getElementById("copy-pass");
    const copyText = password.innerHTML;

    // copyText.select();
    navigator.clipboard.writeText(copyText);
  });


  // $(".more-button").on("click", function() {

  //   if(this.textContent === "More") {
  //     $('.hidden-pass').css("display", "flex");
  //     this.textContent = "Hide";
  //   } else {
  //     $('.hidden-pass').css("display", "none");
  //     this.textContent = "More";
  //     $('.new-pass-input').css("visibility", "hidden");
  //     $(".edit-button").innerHTML = "Edit";
  //   }
  // });

});

