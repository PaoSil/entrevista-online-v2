var recordButton, stopButton, recorder, liveStream;
window.onload = function () {
  recordButton = document.getElementById('record');
  stopButton = document.getElementById('stop');
  // get video & audio stream from user
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })
    .then(function (stream) {
      liveStream = stream;
      var liveVideo = document.getElementById('live');
      liveVideo.src = URL.createObjectURL(stream);
      console.log(liveVideo.src)
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
  // Stopping the recorder will eventually trigger the 'dataavailable' event and we can complete the recording process
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
      // Se mostrará cuando se ha subido exitosamente el video
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