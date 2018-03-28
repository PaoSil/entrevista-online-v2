// Leyendo los datos del usuario
 firebase.database().ref('bd').on('value', function(datasnapshot) {
   var showName = datasnapshot.child(localStorage.getItem('userCode')).child('name').val();
   console.log(showName);
   $('#hello-msg').text(`¡Hola ${showName}!`);
  // var user = data.val();
  // console.log(user);
  // console.log(localStorage.getItem('userCode'));
  // if(user === GvgYT02kwuZH8uC9plCcMCjrb2S2  ){
  //   console.log(user);
  // }
});

// redireccionando
    var initButton = document.querySelector('.init-js');
    initButton.addEventListener('click', function () {
      window.location.href= 'views/question.html'
    })
