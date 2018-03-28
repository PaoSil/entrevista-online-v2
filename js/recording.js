
var recordButton, stopButton, recorder, liveStream;

window.onload = function () {
  recordButton = document.getElementById('record');
  stopButton = document.getElementById('stop');

  // obtener video y transmisión de audio del usuario
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })
    .then(function (stream) {
      liveStream = stream;

      var liveVideo = document.getElementById('live');
      liveVideo.src = URL.createObjectURL(stream);
      liveVideo.play();

      recordButton.disabled = false;
      recordButton.addEventListener('click', startRecording);
      stopButton.addEventListener('click', stopRecording);

    });
};

function startRecording() {
  recorder = new MediaRecorder(liveStream);

  recorder.addEventListener('dataavailable', onRecordingReady);

  recordButton.disabled = true;
  stopButton.disabled = false;

  recorder.start();
}

function stopRecording() {
  recordButton.disabled = false;
  stopButton.disabled = true;

  // Detener el grabador eventualmente activará el evento 'dataavailable' y podremos completar el proceso de grabación
  recorder.stop();
}

function onRecordingReady(e) {
  console.log(e.data);
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var codeUser = user.uid;
      var name = user.displayName;

      var uploadTask = firebase.storage().ref('videoAnswer/' + name).child((+new Date())).put(e.data);
      uploadTask.on('state_changed',
        function (s) {
          // var porcentage = (s.bytesTransferred/ s.totalBytes) * 100;
          // uploader.value = porcentage;
        },
        function (error) {
          alert('Hubo un error al subir la imagen');
        },
        function () {
          // Se mostrará cuando se ha subido exitosamente la imagen
          var downloadURL = uploadTask.snapshot.downloadURL;
          createVideoPostFirebaseNode(downloadURL);
        }
      );

      function createVideoPostFirebaseNode(url) {
        firebase.database().ref('bd').child(codeUser).child('videoAnswer').push({
          url: url
        });
      }
    } else {
      // No user is signed in.
    }
  });
}

var cronometro;

function detenerse() {
  clearInterval(cronometro);
}

function carga() {
  contador_s = 30;
  contador_m = 0;

  s = document.getElementById("segundos");
  m = document.getElementById("minutos");

  cronometro = setInterval(
    function () {
      if (contador_s == 60) {
        contador_s = 0;
        contador_m++;
        m.innerHTML = contador_m;
        if (contador_m == 60) {
          contador_m = 0;
        }
      }

      s.innerHTML = contador_s;
      contador_s--;
      if (contador_s === -0) {
        detenerse()
      }
    }
    , 1000);
}
