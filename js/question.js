// var widget = uploadcare.Widget('[role=uploadcare-uploader]');
// widget.onUploadComplete(function(info) {
//   var urlVideo = info.cdnUrl;
//   console.log(urlVideo);
// });


$('#change-description').hide();
$(document).ready(function() {
  var config = {
    apiKey: 'AIzaSyBCVgvNV0gko5O9rNFgQv8aXrtZOF2gzeM',
    authDomain: 'fir-p-a292a.firebaseapp.com',
    databaseURL: 'https://fir-p-a292a.firebaseio.com',
    projectId: 'fir-p-a292a',
    storageBucket: 'fir-p-a292a.appspot.com',
    messagingSenderId: '215671637058'
  };
  firebase.initializeApp(config);


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // obteniendo datos desde la cuenta de google del usuario
      var email = user.email;
      var userCode = user.uid;
      var sede = localStorage.getItem('sede');
      var name = localStorage.getItem('name');
      // haciendo referencia al espacio exclusivo creado para el usuario en la basedatos
      var userRef = firebase.database().ref('users').child(userCode);
      // guardando datos del usuario en la base datos
      var firebasePostREsf = userRef.child('email');
      firebasePostREsf.set(email);
      var firebasePostREsfName = userRef.child('name');
      firebasePostREsfName.set(name);
      var firebasePostREsfSede = userRef.child('sede');
      firebasePostREsfSede.set(sede);
      // mostrando los datos del usuario
      // userRef.on('value', function(datasnapshot) {
      //   var showingName = datasnapshot.child('name').val();
      //   var showingEmail = datasnapshot.child('email').val();
      //   var showingSede = datasnapshot.child('sede').val();
      //   $('#name').text(showingName);
      //   $('#email').text(showingEmail);
      //   $('#sede').text(showingSede);
      //
      // });

      // guardando post tipo texto
      // $('#button-post').on('click', function(event) {
      //   if ($('#textarea-post').val() && $('#textarea-post').val() != 0) {
      //     var newPost = $('#textarea-post').val();
      //     var url = $('#textarea-post').val();
      //     userRef.child('post').push({
      //       pregunta: newPost,
      //       url: url
      //     });
      //     $('#textarea-post').val('');
      //   }
      // });
      // var pregunta = 'pregunta';
      //   var myurl = localStorage.getItem('url');
      //   function preguntas(pregunta, urlVideo) {
      //     firebase.database().ref('users').child(userCode).child('post').push({
      //       pregunta: pregunta,
      //       url: urlVideo
      //     });
      //   }


      var widget = uploadcare.Widget('[role=uploadcare-uploader]');
      widget.onUploadComplete(function(info) {
        var pregunta = 'pregunta';
        var urlVideo = info.cdnUrl + 'nth/0/';
        firebase.database().ref('users').child(user.uid).child('post').push({
          pregunta: pregunta,
          url: urlVideo
        });
        console.log(urlVideo);
        $('#input').val('');
        // localStorage.setItem('url', urlVideo);
      });
    };
  });

  // Funcionalidad cerrar sesión
  $('#logout').on('click', function(event) {
    event.preventDefault();
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('Saliste de sesion');
      window.location.href = '../index.html';
    }).catch(function(error) {
      // An error happened.
      console.log(error);      
    });
  });
});
