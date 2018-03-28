$(document).ready(function () {
  // debugger;
  var $progressButton = $('#progress-button');
  var $progressBar = $('.user-progress-bar');
  var $progressBarContainerWidth = $('.progress-bar-container').css('width');
  var $progressBarPercentage = parseInt($progressBarContainerWidth) / 8;
  var $counter = $('#counter');
  var $plusOne = 1;
  $progressButton.on('click', function () {
    // debugger;
    // Incrementando la barra de progreso
    var $width = $progressBar.css('width');
    //  console.log($progressBar.css('width'));
    $currentWidth = parseInt($width);
    //  console.log($currentWidth);
    var $newWidth = $currentWidth + $progressBarPercentage;
    var $newProgress = $progressBar.css('width', $newWidth + 'px');
    // Incrementando el contador
    var $actualNumberOfQuestionsAnswered = $counter.text();
    console.log($actualNumberOfQuestionsAnswered);
    var $numberOfQuestionsAnswered = parseInt($actualNumberOfQuestionsAnswered);
    if ($numberOfQuestionsAnswered <= 7) {
      var $newNumberOfQuestionsAnswered = $numberOfQuestionsAnswered + $plusOne;
      $counter.text($newNumberOfQuestionsAnswered);
    }
    if ($numberOfQuestionsAnswered === 6) {
      $progressBar.css('width', '99.5%');
    }
    return $newProgress
  });
});