var opPassword = false;
var opname = false;
var opsede = false;
var opFbLink = false;
$(document).ready(function () {
  // ocultando formulario
  $('#form-box').hide();
  // Autenticando con google
  var provider = new firebase.auth.GoogleAuthProvider();

  function googleAuth() {
    firebase.auth().signInWithPopup(provider).then(function (result) {
      $('#form-box').prepend(`<p class="text-center color-title">¡Finaliza tu registro!</p><br>`);
      saveAccount(result.user);
      $('#form-box').show();
      $('#signup-google').hide();
      $('#account').hide();
    })
  }

  var userInfo = {};

  function saveAccount(user) {
    users = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL
    };
    firebase.database().ref('bd/' + user.uid).set(users);
  }

  $('#signup-google').on('click', googleAuth);

  // Funcionalidad formulario
  function activeFinalButton() {
    (opDni === true && opFbLink === true)
      ? $('#btnSignUp').attr('disabled', false) : $('#btnSignUp').attr('disabled', true);
  }

  $('#btnSignUp').attr('disabled', true);


  /***** VERIFICACION DE LOS INPUT ****/
  $('#dni').on('input', function (event) {
    ($(this).val().length > 5) ? opDni = true : opDni = false;
    activeFinalButton();
  })

  $('#facebook-link').on('input', function (event) {
    var FACEBOOKESTRUC = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/;
    (FACEBOOKESTRUC.test($(this).val())) ? opFbLink = true : opFbLink = false;
    // console.log('no funciona fb')
    activeFinalButton();
  })

  // Evento cuando se de click al registrarse

  $('#btnSignUp').on('click', function (event) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // datos de la cuenta de google
        var email = user.email;
        var name = user.displayName;
        var photo = user.photoURL;
        var userCode = user.uid;
        // almacenando el uid en local storage
        localStorage.setItem('userCode', userCode);

        var databaseService = firebase.database();
        var referencia = databaseService.ref('bd').child(userCode);
        referencia.set({
          email: email,
          name: name,
          photo: photo,
          dni: $('#dni').val(),
          link: $('#facebook-link').val(),
          uid: userCode
        });
      }
    });
    window.location.href = 'views/welcome.html';
  });

  var userRegisterUid;

  // Leyendo los datos del usuario
  firebase.database().ref('bd').on('value', function (datasnapshot) {
    userRegisterUid = datasnapshot.child(localStorage.getItem('userCode')).child('uid').val();
    // console.log(userRegisterUid);
  });

  // Evento que verifique si está o no registrado el usuario
  $('#signIn').on('click', function () {
    if (userRegisterUid) {
      window.location.href = 'views/welcome.html';
    } else {
      alert('Parece que aún no estás registrada.');
    }
  });
});
