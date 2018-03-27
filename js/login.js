var config = {
  apiKey: "AIzaSyDdkr1qp-DbqD_Qy-L5XDkwDEirjKo0UNE",
  authDomain: "entrevistasonline-661df.firebaseapp.com",
  databaseURL: "https://entrevistasonline-661df.firebaseio.com",
  projectId: "entrevistasonline-661df",
  storageBucket: "entrevistasonline-661df.appspot.com",
  messagingSenderId: "538321830580"
};
firebase.initializeApp(config);
  var opDni = false;
  var opEmail = false;
  var opPassword = false;
  var opname = false;
  var opsede = false;
  var opFbLink = false;

  // ocultando formulario
  $('#form-box').hide();
  // Autenticando con google
  var provider = new firebase.auth.GoogleAuthProvider();

  function googleAuth() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      $('#form-box').prepend(`<p>${result.user.displayName}</p><p>${result.user.email}</p>`);
      saveAccount(result.user);
      $('#form-box').show();
      $('#signup-google').hide();
    })
  }

  var userInfo = {};
  
  function saveAccount(user) {
    userInfo.uid = user.uid;
    firebase.database().ref('newDB/' + user.uid).set(userInfo);
  }

  $('#signup-google').on('click', googleAuth);

  // Funcionalidad formulario
  function activeFinalButton() {
    (opDni === true && opPassword === true && opsede === true && opFbLink === true) 
    ? $('#btnSignUp').attr('disabled', false): $('#btnSignUp').attr('disabled', true);
  }

  $('#btnSignUp').attr('disabled', true);
  

  /***** VERIFICACION DE LOS INPUT ****/
  $('#dni').on('input', function(event){
    ($(this).val().length > 5) ? opDni = true: opDni = false;
    activeFinalButton();
  })
  
  $('#password').on('input', function(event) {
    ($(this).val().length >= 6) ? opPassword = true: opPassword = false;
    activeFinalButton();
  });

  // validando Sede y Funcionalidad dropdown toggle de Sedes
  $('.dropdown-item').on('click', function() {
    // console.log($(this).text())
    var sede = $(this).text();
    console.log(sede);
    $('.dropdown-toggle').html(sede + '&nbsp;<span class="caret"></span>');
    ($(this).text()) ? opsede = true: opsede = false;
    activeFinalButton();
  })

  // validando link de facebook
  $('#facebook-link').on('input', function(event) {
    var FACEBOOKESTRUC = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/;
    (FACEBOOKESTRUC.test($(this).val())) ? opFbLink = true: opFbLink= false;
      // console.log('no funciona fb')
    activeFinalButton();
  })

  // eVENTO CUANDO SE DA CLICK EN REGISTRATE
  
  $('#btnSignUp').on('click', function(event) {
    firebase.auth().onAuthStateChanged(function(user){
      if(user){
        // datos de la cuenta de google
        var email = user.email;
        var name = user.displayName;
        var userCode = user.uid;
        console.log(email);
        // haciendo referencia al espacioexclusivo creado para el usuario en la base de datos
        // var userRef = firebase.database().ref('users').child(userCode);
        // var firebasePostEmail = userRef.child('email');
        // firebasePostEmail.set('email');
        // var firebasePostName = userRef.child('name');
        // firebasePostName.set('name');
        // var postDni = $('#dni').val();
        // userRef.child('dni').push(postDni);
        var databaseService = firebase.database();
        var referencia = databaseService.ref('user');
        referencia.set({
          email: email,
          name: name,
          dni: $('#dni').val(),
          password: $('#password').val(),
        });
      }
    });



    window.location.href = 'views/welcome.html';
  });


  


  