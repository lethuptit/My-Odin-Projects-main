const QUOTE_ENDPOINT = 'https://type.fit/api/quotes'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5A9B03OZuMz88-BICfXF9xYGCdN16BnA",
  authDomain: "realtimedb-24c2e.firebaseapp.com",
  databaseURL: "https://realtimedb-24c2e-default-rtdb.firebaseio.com",
  projectId: "realtimedb-24c2e",
  storageBucket: "realtimedb-24c2e.appspot.com",
  messagingSenderId: "523063178950",
  appId: "1:523063178950:web:f45deb86ba5dee6d63c9c7",
};
//init firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
let CUR_QOUTE;
var CUR_USER;

function validatePass() {
  let password = document.getElementById("password")
  let confirmPassword = document.getElementById("confirmedpass")
  const errorMessage = document.querySelector(".error_message");

  if (password.value !== confirmPassword.value) {
    password.classList.add('error')
    confirmPassword.classList.add('error')
    errorMessage.textContent = "* Passwords do not match";

  } else {
    password.classList.remove('error')
    confirmPassword.classList.remove('error')
    errorMessage.textContent = "";

  }
}

function togglePasswordVisibility(e) {
  var passwordInput = e.target.parentNode.parentNode.children[0];
  passwordInput.type = (passwordInput.type === "password") ? "text" : "password";

  // toggle the eye icon
  if (e.target.style.backgroundImage === 'url("./images/icons8-visibility-48.png")')
    e.target.style.backgroundImage = 'url("./images/icons8-invisibility-48.png")'
  else
    e.target.style.backgroundImage = 'url("./images/icons8-visibility-48.png")'

}

const togglePassword = document.querySelectorAll('.toggle-password').forEach(element => {
  element.addEventListener("click", (event) => togglePasswordVisibility(event));
  element.style.backgroundImage = 'url("./images/icons8-visibility-48.png")'
});


// const passwords = document.querySelectorAll('.form-password').forEach(element => {
//   element.addEventListener("click", (event)=> {
//     event.target.nextElementSibling.style.display='flex'
//   });

//   element.addEventListener("focusout", (event)=> {
//     //event.target.nextElementSibling.style.display='none'
//   });
// });

function getValueFromInput(id) {
  return document.querySelector(id).value;
}

function resetFormData() {
  // Clear the input values
  $("#email").val("t@gmail.com");
  $("#fullname").val("John Doe");
  $("#password").val("12345678");
  $("#confirmedpass").val("12345678");
  $("#birthdate").val("2023-12-31");

  //testing
  $('#email-login').val('t@gmail.com');
  $('#password-login').val('12345678')
}

function isValidBirthdate() {
  const inputDate = new Date(getValueFromInput('#birthdate'));
  // Get the current date
  const currentDate = new Date();

  // Compare the input date with the current date
  if (inputDate < currentDate) {
    return true
  } else {
    alert("Your birthdate is not valid. It must be in the past.")
    // console.log('The input date is in the future.');
    return false;
  }
}

function getErrorMessage(e) {
  let mes = 'Process in undefined error';

  switch (e.code) {
    case 'auth/email-already-exists':
    case 'auth/email-already-in-use':
      mes = 'Email address is already used. Please use another one.';
      break;
    case 'auth/internal-error':
      mes = 'The server has some internal error';
      break;
    case 'auth/invalid-password':
      mes = 'The password is invalid.'
      break;
    case 'auth/user-not-found':
      mes = 'The user is not found.'
      break;
    case 'auth/invalid-email':
      mes = 'The email address is badly formatted.';
      break;
    case 'auth/user-token-expired':
      mes = "The user's credential is no longer valid. Sign in again.";
      break;
    case 'auth/invalid-login-credentials':
      mes = "Email or pass is not valid for signing in.";
      break;
    case 'auth/network-request-failed':
      mes = "A network connection interrupted or unreachable host.";
      break;
  }
  return mes;
}

function signupUser(obj) {
  // create user

  firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password).then((cred) => {
    $('.login-container').hide();
    const uid = cred.user.uid
    saveUserProfile(obj, uid);

  }).catch((error) => {//FirebaseError
    console.log("Sign up error.", error)
    alert(getErrorMessage(error));
  })
}

function saveUserProfile(obj, uid) {
  const d1 = new Date()
  firebase.database()
    .ref('users/' + uid + "/profile")
    .set({
      userName: obj.fullname,
      userEmail: obj.email,
      birthDate: obj.birthdate,
      // creationDate: d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate()
      creationDate: d1.toUTCString()
    })
    .then(() => {
      alert("Your registration is sucessful. You logged in!")
      afterSignIn(uid)
    }).catch((error) => {
      console.log("Save user profile error.", error.message)
      throw error;
    });
}

function submitFormData(e) {
  e.preventDefault();

  if (isValidBirthdate() === true) {
    let fullname = getValueFromInput('#signup-form #fullname');
    let email = getValueFromInput('#signup-form #email');
    let password = getValueFromInput('#signup-form #password');
    let birthdate = getValueFromInput('#signup-form #birthdate');

    let obj = {
      fullname: fullname,
      email: email,
      password: password,
      birthdate: birthdate
    };

    signupUser(obj);
  }
}

function showContent(user) {
  if (user) {
    let today = new Date();
    var dayInMs = 24 * 60 * 60 * 1000;
    var nextBirthdate = new Date(today.getFullYear(), user.birthdate.getMonth(), user.birthdate.getDate());
    if (today - nextBirthdate > dayInMs) {
      nextBirthdate = new Date(today.getFullYear() + 1, user.birthdate.getMonth(), user.birthdate.getDate())
    }
    console.log(user.birthdate, nextBirthdate)
    const dayLeft = Math.ceil((nextBirthdate - today) / (dayInMs));

    $('#right-container').hide();

    if (dayLeft === 0) {
      showQuote();
      $('.nonbirthday-content').hide();
      $('.birthday-content h2').text(`Happy birthday, ${user.name}!`);
      $('.birthday-content').show();

    }
    else {
      $('.birthday-content').hide();
      $('.nonbirthday-content h2').text(`Hello, ${user.name}!`);
      $('.nonbirthday-content h3').text(`${dayLeft} DAY(S) LEFT`);      // Append the new elements    
      $('.nonbirthday-content p').text('UNTIL YOUR BIRTHDAY!');
      $('.nonbirthday-content').show();


    }
    $('.login-container').fadeIn('slow');
  }
}

var QUOTES = []
function fetchData() {

  if (QUOTES.length === 0) {
    //Fetch quote
    const url = QUOTE_ENDPOINT;
    fetch(url).then((prom) => {
      if (prom.ok) {
        const jsonResponse = prom.json()
        //console.log(jsonResponse)
        QOUTES = (jsonResponse);
      }
    }, (error => {
      console.log("Request failed.", error)
      throw new Error("Fetching quote error.")
    }))
  }

  //Fecth User Info
  const ref = firebase.database().ref('users/' + uid + "/profile");
  ref.get().then((snapshot) => {
    showUserContent(snapshot);
  }, (errorObject) => {
    console.log(errorObject)
    reject('Reading Firebase failed in: ' + errorObject.name); s
  });
}

function showUserContent(snapshot) {
  try {
    let bdate = (snapshot.val().birthDate).split('-')
    let birthdate = new Date(bdate[0], bdate[1] - 1, bdate[2]);
    const user = { name: snapshot.val().userName, birthdate: birthdate };
    showContent(user)

  } catch (e) {
    console.log('Catch Error:', e)
    throw ('Convert birthdate failed in: ' + e);
  }
}

function afterSignIn(uid) {
  const ref = firebase.database().ref('users/' + uid + "/profile");
  ref.get().then((snapshot) => {
    try {

      let bdate = (snapshot.val().birthDate).split('-')
      let birthdate = new Date(bdate[0], bdate[1] - 1, bdate[2]);
      const user = { name: snapshot.val().userName, birthdate: birthdate };
      showContent(user)

    } catch (e) {
      console.log('Catch Error:', e)
      throw ('Convert birthdate failed in: ' + e);
    }
  }, (errorObject) => {
    console.log(errorObject)
    throw ('Reading Firebase failed in: ' + errorObject.name); s
  });
}

function setQuote(quote) {
  if (quote) {
    $('#quote').text(`"${quote.text}"`);
    $('#author').text(quote.author);
    $('#author').css({ "font-style": "italic", color: 'gray', 'font-size': '12px' })
  }
}

function fetchQuote() {
  return new Promise((resolve, reject) => {
    const url = QUOTE_ENDPOINT;
    fetch(url).then((prom) => {
      if (prom.ok) {
        const jsonResponse = prom.json()
        //console.log(jsonResponse)
        resolve(jsonResponse);
      }
      else {
        console.log("Request failed.")
        reject("Fetching quote error.")
        //throw new Erro("Fetching quote error.")
      }
    })
  })
}

async function showQuote() {
  if (QUOTES.length === 0) {
    const url = QUOTE_ENDPOINT;
    const prom = await fetch(url);
    if (prom.ok) {
      const jsonResponse = await prom.json()
      //console.log(jsonResponse)
      let quote = jsonResponse[Math.ceil(Math.random() * jsonResponse.length)];
      console.log(quote)
      setQuote(quote);
      $('.login-container').fadeIn('slow');
    }
    else {
      console.log("Fetching quote error")
      alert("Fetching quote error.")
    }
  }
  else {
    let quote = QUOTES[Math.ceil(Math.random() * QUOTES.length)];
    console.log(quote)
    setQuote(quote);
  }

}

function fetchUserInfo() {
  return new Promise((resolve, reject) => {
    const ref = firebase.database().ref('users/' + uid + "/profile");
    ref.get().then((snapshot) => {
      resolve(snapshot.val())
    }, (errorObject) => {
      console.log(errorObject)
      reject('Reading Firebase failed in: ' + errorObject.name); s
    });
  });
}


function signinUser(email, password) {

  auth.signInWithEmailAndPassword(email, password).then((credVal) => {
    $('.login-container').hide();
    console.log("User is logged in with id: ", credVal.user.uid)
    afterSignIn(credVal.user.uid);
    //fetchData();

  }).catch(function (error) {
    console.log("error", error)
    alert(getErrorMessage(error))
  })
}

$(document).ready(() => {

  firebase.auth().onAuthStateChanged(function (loginUser) {
    $('#right-container').hide()
    $('.login-container').hide();
    if (loginUser) {
      // User is signed in.
      $('#right-container').hide()
      $('.login-container').show()

      afterSignIn(loginUser.uid);
    } else {
      // User is not signed in.
      $('#right-container').show()
      $('.login-container').hide();
    }
  });

  resetFormData();

  $('#signup-form').on('submit', submitFormData);

  $('#login-form').on('submit', (e) => {
    e.preventDefault();

    //receive the values of login input on click of the button
    const email = $('#email-login').val();
    const password = $('#password-login').val();

    //validate data
    if (email === '' || password === '') {
      $('#email-login').addClass('error')
      $('#password-login').addClass('error')
      $('#login-form.errorMessage').val("Please enter correct email and password to login.");
    }
    else {
      $('#email-login').removeClass('error')
      $('#password-login').removeClass('error')
      signinUser(email, password);
    }


  });

  $('#registerBtn').on('click', () => {
    //console.log('Press register')
    $('#right-container').addClass("right-panel-active");
    $('.backdrop').addClass("right-panel-active");
    resetFormData();
  });

  $('#loginBtn').on('click', () => {
    $('#right-container').removeClass("right-panel-active");
    $('.backdrop').removeClass("right-panel-active");
  });

  $('#logoutBtn').on('click', () => {

    firebase.auth().signOut().then(() => {
      console.log('Logout successfully.')
      $('.login-container').hide();
      $('#right-container').hide();
      $('#right-container').fadeIn('slow');
    }).catch((error) => {
      console.log("Logout error!", error)// An error happened.
    });
  });

  $('#google-signin').on('click', () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        console.log(result.user);

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // IdP data available in result.additionalUserInfo.profile.
        // ...
      }).catch((error) => {

        console.log(error)
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  });
})
