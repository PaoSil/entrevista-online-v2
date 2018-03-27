  var config = {
    apiKey: 'AIzaSyBCVgvNV0gko5O9rNFgQv8aXrtZOF2gzeM',
    authDomain: 'fir-p-a292a.firebaseapp.com',
    databaseURL: 'https://fir-p-a292a.firebaseio.com',
    projectId: 'fir-p-a292a',
    storageBucket: 'fir-p-a292a.appspot.com',
    messagingSenderId: '215671637058'
  };
  firebase.initializeApp(config);

  var opEmail = false;
  var opPassword = false;
  var opname = false;
  var opsede = true;

  function activeFinalButton() {
    if (opEmail === true && opPassword === true && opname === true && opsede === true) {
      $('#btnSignUp1').attr('disabled', false);
      $('#btnSignUp').attr('disabled', false);
    } else {
      $('#btnSignUp1').attr('disabled', true);
      $('#btnSignUp').attr('disabled', true);
    }
  }

  $('#name').on('input', function(event) {
    if ($(this).val().length >= 5) {
      opname = true;
    } else {
      opname = false;
    }
    activeFinalButton();
  });

  $('#email').on('input', function(event) {
    var EMAILESTRUC = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
    if (EMAILESTRUC.test($(this).val())) {
      opEmail = true;
    } else {
      opEmail = false;
    }
    activeFinalButton();
  });

  // validando password
  $('#password').on('input', function(event) {
    if ($(this).val().length >= 6) {
      opPassword = true;
    } else {
      opPassword = false;
    }
    activeFinalButton();
  });

  $('#btnSignUp').on('click', function(event) {
    var emailText = $('#email').val();
    var passwordText = $('#password').val();
    firebase.auth().createUserWithEmailAndPassword(emailText, passwordText).catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode) {
        $('#password1').val('');
        alert(errorMessage);
      }
    });
  });

  // realizando acciones cuando el usuario este autenticado
  $('#btnSignUp1').on('click', function(event) {
    // event.preventDefault();
    var emailText = $('#email1').val();
    var passwordText = $('#password1').val();
    firebase.auth().signInWithEmailAndPassword(emailText, passwordText).catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode) {
        $('#password1').val('');
        alert(errorMessage);
      }
    });
  });
  
  function observer() { 
    firebase.auth().onAuthStateChanged(function(user) {
      // si el usuario esta activo
      if (user) {
        var name = $('#name').val();
        var sede = $('#sede').val();
        localStorage.setItem('name', name);
        localStorage.setItem('sede', sede);
        window.location.href = 'views/welcome.html';
      } else {
        console.log('usuario no logeado');
      }
    });
  };
  observer()