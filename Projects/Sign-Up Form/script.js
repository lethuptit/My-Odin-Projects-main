function passValid(){
    let password = document.getElementById("password")
    let confirmPassword = document.getElementById("confirmedpass")
    const errorMessage = document.querySelector(".error_message");

    if(password.value !== confirmPassword.value){
        password.classList.add('error')
        confirmPassword.classList.add('error')
        errorMessage.textContent= "* Passwords do not match";
        button.disabled = true;

    }else{
        password.classList.remove('error')
        confirmPassword.classList.remove('error')
        errorMessage.textContent= "";
        button.disabled = false;
    }
}

function validatePhone() {
  var phoneInput = document.getElementById("phone");
  phoneInput.value = phoneInput.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
}

function togglePasswordVisibility() {
  var passwordInput = document.getElementById("password");
  passwordInput.type = (passwordInput.type === "password") ? "text" : "password";
}

function toggleConfirmPasswordVisibility() {
  let passwordEye = document.getElementById("password-eye")
  var confirmPasswordInput = document.getElementById("confirmedpass");
  confirmPasswordInput.type = (confirmPasswordInput.type === "password") ? "text" : "password";

}

var first = document.querySelector('body').chilrend[0];
first.innerHTML = 'BROWN BEARS ARE AWESOME!';
var elementToRemove = document.querySelector('#vespa');