// Leyendo los datos del usuario
firebase.database().ref('bd').on('value', function (datasnapshot) {
  var showName = datasnapshot.child(localStorage.getItem('userCode')).child('name').val();
  console.log(showName);
  $('#hello-msg').text(`¡Hola ${showName}!`);
});

// Redireccionando
var initButton = document.querySelector('.init-js');
initButton.addEventListener('click', function () {
  window.location.href = 'views/question.html'
})
