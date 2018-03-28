$(document).ready(function() {
  $inputFileVideos = $('#file-2');
  $containerVideosPost = $('#container-videos-post');

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var codeUser = user.uid;
      
      /* Con esta funcion subiremos imagenes a storage de firebase */
      $inputFileVideos.on('change', function() {
        var videoUpload = $(this).prop('files')[0];
        console.log(videoUpload)

        var uploadTask = firebase.storage().ref().child('videoPost/' + videoUpload.name).put(videoUpload);
        uploadTask.on('state_changed', 
          function(s) {
            // var porcentage = (s.bytesTransferred/ s.totalBytes) * 100;
            // uploader.value = porcentage;
          },
          function(error) {
            alert('Hubo un error al subir la imagen');
          },
          function() {
            // Se mostrará cuando se ha subido exitosamente la imagen
            var downloadURL = uploadTask.snapshot.downloadURL;
            createVideoPostFirebaseNode(videoUpload.name, downloadURL);
          });
      });
      
      function createVideoPostFirebaseNode(nameVideoPost, url) {
        firebase.database().ref('bd').child(codeUser).child('videoPost').push({
          name: nameVideoPost,
          url: url
        });
      }
    } else {
      // No user is signed in.
    }
  });
});