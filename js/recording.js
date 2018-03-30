

var recordButton, stopButton, recorder, liveStream, next;

function capturingAudioAndVideo() {
  $('#turnOnCamera').hide();

  document.getElementById("record").textContent = "GRABAR";
  document.getElementById("stop").textContent = "ENVIAR GRABACION";

  recordButton = document.getElementById('record');
  stopButton = document.getElementById('stop');  
  next = document.getElementById('progress-button');

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
      next.addEventListener('click', desability);

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
  
  stopButton.disabled = true;
  next.disabled = false;

  // Detener el grabador eventualmente activará el evento 'dataavailable' y podremos completar el proceso de grabación
  recorder.stop();
}

function desability() {
  next.disabled = true;
  recordButton.disabled = false;
}

function onRecordingReady(e) {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var codeUser = user.uid;
      var name = user.displayName;

      var uploadTask = firebase.storage().ref('videoAnswer/' + name).put(e.data);
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
function stopChronometer() {        
  clearInterval(cronometro);
 }
          
function chronometer()  {
 
   timeSecond =localStorage.timeCrono;
     
   segundos = document.getElementById("segundos");       
    cronometro = setInterval(

    function(){  
      if(timeSecond==00)  {
        stopChronometer()
      }    

      segundos.innerHTML = timeSecond;
      timeSecond--;
  } 
      ,1000);

    }