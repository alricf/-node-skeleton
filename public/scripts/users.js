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


  //Add new button click, shows inputs for creating new password info
  $(".add-new").on("click", function() {
    if($('.new-password-box').css('display') === 'none') {
      $('.new-password-box').css("display", "flex");
      $('.new-password-box').slideDown('slow');
    } else {
      $('.new-password-box').css("display", "none");
    }
  });

  $(".edit-button").on("click", function() {
    $('.new-pass-input').css("visibility", "visible");
    this.textContent = "Save";
  });

  //Generate new password based on requirements, place in password input
  $(".generate-button").on("click", function() {

    let passInput = document.getElementById('new-password');

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



    const generatePassword = (checks) => {
      const availableCharacters = [];

      checks.includes("Symbols") ? availableCharacters.push(symbols) : [];
      checks.includes("Numbers") ? availableCharacters.push(numbers) : [];
      checks.includes("Uppercase") ? availableCharacters.push(uppercase) : [];
      checks.includes("Lowercase") ? availableCharacters.push(lowercase) : [];
      //generated pasword
      let pass = [];

      for (let i = 0; i < 12; i + availableCharacters.length) {
        for (let j = 0; j < availableCharacters.length; j++) {
          pass.push(availableCharacters[j][Math.floor(Math.random() * availableCharacters[j].length)]);
        }
      }
      console.log(pass);
      // const scramblePass = pass.sort(() => Math.random() - 0.5).join('');
      // passInput.value = scramblePass;
      // console.log(scramblePass);
      return;


    };

    generatePassword(checks);

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

