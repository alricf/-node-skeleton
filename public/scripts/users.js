// Client facing scripts here

$(document).ready(function() {



  //Add new - button click, displays inputs for creating new password info
  $(".add-new").on("click", function() {

    if($('.new-password-box').css('display') === 'none') {
      $('.new-password-box').css("display", "flex");
      $('.new-password-box').slideDown('slow');
    } else {
      $('.new-password-box').css("display", "none");
      $('#new-title').val('');
      $('#new-user').val('');
      $('#new-website').val('');
      $('#new-category').val('');
      $('#new-password').val('');
    }
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


});

