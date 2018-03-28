console.log(questions);
console.log(timeForQuestion);


var recordButton, stopButton, recorder, liveStream;

function capturingAudioAndVideo() {

  
  document.getElementById("record").textContent = "EMPEZAR A GRABAR";
  document.getElementById("stop").textContent = "ENVIAR GRABACION";

  // document.getElementById("minutos").textContent = "00";
  // document.getElementById("segundos").textContent = timeForQuestion;



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

  var uploadTask = firebase.storage().ref('videoPost/' + (+new Date())).put(e.data);
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
}

function createVideoPostFirebaseNode(url) {
  firebase.database().ref('bd').child('videoPost').push({
    url: url
  });
}

// var cronometro;

// function detenerse() {
//    clearInterval(cronometro);
// }

// function carga() {

//  second = 30;
//  minutes =0;

//     s = document.getElementById("segundos");
//     m = document.getElementById("minutos");

//     cronometro = setInterval(
//      function(){
//        if(second==60) {
//         second=0;
//         minutes ++;
//          m.innerHTML = contador_m;
//            if(contador_m == 60) {
//             contador_m = 0;
//            }
//         }

//         s.innerHTML = second;
//         second--;
//           if (second ===-0) {
//             detenerse()
//           }
//         }
//         ,1000);
//    }